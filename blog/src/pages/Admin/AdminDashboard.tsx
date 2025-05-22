import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaPlus, FaEdit, FaTrash, FaEye, FaCheck, FaTimes, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { firebaseBlogService, type BlogPost } from '../../utils/firebaseBlogService';
import { RichTextEditor, ImageUploader } from '../../components/Editor';
import ErrorBoundary from '../../components/ErrorBoundary';
import CategoryManager from '../../components/CategoryManager';
import { useAuth } from '../../context/AuthContext';

// Firebase Auth implementation
const AdminDashboard: React.FC = () => {
  const { currentUser, isLoading: authLoading, login, logout, isAuthenticated } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [showCategoryManager, setShowCategoryManager] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch categories for the editor dropdown
  const { data: availableCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => firebaseBlogService.getCategories(),
    enabled: isAuthenticated
  });

  // Helper function to clean post data and ensure all fields are properly formatted
  const cleanPostData = (post: Partial<BlogPost>) => {
    // Parse tags: handle string, array, or empty cases
    let parsedTags: string[] = [];
    if (post.tags) {
      if (typeof post.tags === 'string') {
        parsedTags = post.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      } else if (Array.isArray(post.tags)) {
        parsedTags = post.tags.filter(tag => tag && tag.trim().length > 0);
      }
    }

    // Clean up excerpt if it has HTML
    let cleanExcerpt = post.excerpt || '';
    if (cleanExcerpt.includes('<')) {
      cleanExcerpt = cleanExcerpt.replace(/<[^>]*>?/gm, '');
    }

    // If no excerpt is provided, generate one from the content
    if (!cleanExcerpt && post.content) {
      cleanExcerpt = post.content.replace(/<[^>]*>?/gm, '');
      cleanExcerpt = cleanExcerpt.substring(0, 150) + (cleanExcerpt.length > 150 ? '...' : '');
    }

    // Generate slug if not provided
    const slug = post.slug || (post.title ? 
      post.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-') : 
      'untitled-post');

    // Return clean data with all required fields
    const cleanData = {
      title: post.title || '',
      content: post.content || '',
      slug: slug,
      excerpt: cleanExcerpt,
      image: post.image || '',
      coverImage: post.coverImage || post.image || '',
      category: post.category || 'Uncategorized',
      categoryColor: post.categoryColor || 'bg-blue-500',
      date: post.date || new Date().toISOString().split('T')[0],
      readTime: post.readTime || '5 min read',
      tags: parsedTags, // Always an array, never undefined
      published: post.published !== undefined ? post.published : true,
      featured: post.featured !== undefined ? post.featured : false,
    };

    // Only include ID if updating (not creating)
    if (post.id) {
      return { ...cleanData, id: post.id };
    }

    return cleanData;
  };

  // Firebase login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid credentials. Please try again.');
    }
  };
  
  // Test Firebase token
  const testFirebaseToken = async () => {
    try {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        console.log('Firebase token first 20 chars:', token.substring(0, 20) + '...');
        console.log('Token length:', token.length);
        return `Token retrieved (${token.length} chars)`;
      } else {
        console.error('No current user to get token from');
        return 'No user logged in';
      }
    } catch (error) {
      console.error('Error getting token:', error);
      return 'Error getting token';
    }
  };

  // Token state
  const [tokenStatus, setTokenStatus] = useState<string>('Not checked');

  // Check token on mount
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      testFirebaseToken().then(setTokenStatus);
    }
  }, [isAuthenticated, currentUser]);

  // Fetch blog posts
  const { data: blogPosts, isLoading: postsLoading, error } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      return await firebaseBlogService.getAllBlogPosts();
    },
    enabled: isAuthenticated
  });

  // Create blog post mutation
  const createPostMutation = useMutation({
    mutationFn: async (post: Partial<BlogPost>) => {
      try {
        console.log('Creating blog post:', post);
        const cleanedPost = cleanPostData(post);
        console.log('Cleaned post data:', cleanedPost);
        
        const result = await firebaseBlogService.createBlogPost(cleanedPost);
        console.log('Blog post created:', result);
        return result;
      } catch (error) {
        console.error('Error in creation mutation:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      setShowCreateForm(false);
      setCurrentPost(null);
      alert('Blog post created successfully!');
    },
    onError: (error: any) => {
      console.error('Mutation error:', error);
      alert(`Error: ${error.message || 'Failed to create blog post. Please try again later.'}`);
    }
  });
  
  // Update blog post mutation
  const updatePostMutation = useMutation({
    mutationFn: async (post: Partial<BlogPost>) => {
      if (!post.id) {
        throw new Error('Post ID is required for update');
      }
      
      console.log('Updating blog post:', post);
      
      // Clean up the data before sending to Firebase
      const cleanedPost = cleanPostData(post);
      console.log('Cleaned update data:', cleanedPost);
      
      try {
        const result = await firebaseBlogService.updateBlogPost(post.id.toString(), cleanedPost);
        
        if (!result) {
          throw new Error('Failed to update blog post - no result returned');
        }
        
        console.log('Blog post updated successfully:', result);
        return result;
      } catch (error: any) {
        console.error('Error in update mutation:', error);
        
        // More detailed error logging
        if (error.code) {
          console.error(`Firebase error code: ${error.code}`);
        }
        
        if (error.message) {
          console.error(`Error message: ${error.message}`);
        }
        
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      setShowCreateForm(false);
      setCurrentPost(null);
      alert('Blog post updated successfully!');
    },
    onError: (error: any) => {
      console.error('Update mutation error:', error);
      
      let errorMessage = 'Failed to update blog post.';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'You do not have permission to update this blog post. Please check your Firebase security rules.';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      alert(errorMessage);
    }
  });
  
  // Delete blog post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      console.log('Deleting blog post:', postId);
      const success = await firebaseBlogService.deleteBlogPost(postId);
      
      if (!success) {
        throw new Error('Failed to delete blog post - operation returned false');
      }
      
      console.log('Blog post deleted successfully');
      return { success };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      alert('Blog post deleted successfully!');
    },
    onError: (error: any) => {
      console.error('Delete mutation error:', error);
      alert(`Error: ${error.message || 'Failed to delete blog post. Please try again later.'}`);
    }
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPost?.title || !currentPost?.content) {
      alert('Title and content are required');
      return;
    }

    // Find the selected category to get its slug and color
    const selectedCategory = availableCategories?.find(cat => cat.name === currentPost.category);
    
    // Prepare post data with proper category information
    const postData = {
      ...currentPost,
      categorySlug: selectedCategory?.slug || currentPost.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized',
      categoryColor: selectedCategory?.color || currentPost.categoryColor || 'bg-gray-500'
    };
    
    console.log('Submitting post data:', postData);
    
    if (currentPost.id) {
      // Update existing post
      updatePostMutation.mutate(postData);
    } else {
      // Create new post
      createPostMutation.mutate(postData);
    }
  };
  
  // Handle delete confirmation
  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post? This cannot be undone.')) {
      deletePostMutation.mutate(postId);
    }
  };

  // Handle form field changes with proper validation
  const handleFieldChange = (field: keyof BlogPost, value: any) => {
    setCurrentPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    navigate('/login', { state: { from: { pathname: '/admin' } } });
    return null;
  }

  // Create/Edit post form
  const renderPostForm = () => {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
          {currentPost?.id ? 'Edit Post' : 'Create New Post'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                className="lofi-input w-full"
                value={currentPost?.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Slug
              </label>
              <input
                type="text"
                className="lofi-input w-full"
                value={currentPost?.slug || ''}
                onChange={(e) => handleFieldChange('slug', e.target.value)}
                placeholder="Leave empty to auto-generate"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Excerpt
            </label>
            <textarea
              className="lofi-input w-full"
              rows={2}
              value={currentPost?.excerpt || ''}
              onChange={(e) => handleFieldChange('excerpt', e.target.value)}
              placeholder="A brief summary of your post (plain text only)"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Content *
            </label>
            <ErrorBoundary fallback={
              <div className="p-4 border border-red-300 rounded bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
                <h3 className="font-medium mb-2">Editor Error</h3>
                <p>There was a problem loading the rich text editor. Please refresh the page and try again.</p>
              </div>
            }>
              <RichTextEditor
                value={currentPost?.content || ''}
                onChange={(content) => handleFieldChange('content', content)}
              />
            </ErrorBoundary>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                className="lofi-input w-full"
                value={currentPost?.category || ''}
                onChange={(e) => {
                  const selectedCategory = availableCategories?.find(cat => cat.name === e.target.value);
                  handleFieldChange('category', e.target.value);
                  // Auto-set category color when category is selected
                  if (selectedCategory) {
                    handleFieldChange('categoryColor', selectedCategory.color);
                  }
                }}
              >
                <option value="">Select Category</option>
                {availableCategories?.length > 0 ? (
                  availableCategories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Date
              </label>
              <input
                type="date"
                className="lofi-input w-full"
                value={currentPost?.date || new Date().toISOString().split('T')[0]}
                onChange={(e) => handleFieldChange('date', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Read Time
              </label>
              <input
                type="text"
                className="lofi-input w-full"
                value={currentPost?.readTime || ''}
                onChange={(e) => handleFieldChange('readTime', e.target.value)}
                placeholder="e.g. 5 min read"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <ImageUploader
                label="Featured Image URL"
                currentUrl={currentPost?.image || ''}
                onImageUrl={(url) => {
                  handleFieldChange('image', url);
                  handleFieldChange('coverImage', url);
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tags
              </label>
              <input
                type="text"
                className="lofi-input w-full"
                value={
                  typeof currentPost?.tags === 'string' 
                    ? currentPost.tags 
                    : Array.isArray(currentPost?.tags) 
                      ? currentPost.tags.join(', ') 
                      : ''
                }
                onChange={(e) => handleFieldChange('tags', e.target.value)}
                placeholder="Enter tags separated by commas"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4"
                checked={currentPost?.published || false}
                onChange={(e) => handleFieldChange('published', e.target.checked)}
              />
              Published
            </label>
            
            <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4"
                checked={currentPost?.featured || false}
                onChange={(e) => handleFieldChange('featured', e.target.checked)}
              />
              Featured
            </label>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="lofi-button-secondary"
              onClick={() => {
                setShowCreateForm(false);
                setCurrentPost(null);
              }}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="lofi-button"
              disabled={createPostMutation.isPending || updatePostMutation.isPending}
            >
              {createPostMutation.isPending || updatePostMutation.isPending ? 'Saving...' : (currentPost?.id ? 'Update Post' : 'Create Post')}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <Helmet>
        <title>Blog Admin Dashboard | Lochlann's Tech Blog</title>
      </Helmet>
      
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white dark:bg-lofi-terminal rounded-xl shadow-lofi p-6">
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Blog Admin Dashboard
              </h1>
              
              <div className="flex space-x-2">
                <button
                  className="lofi-button-secondary"
                  onClick={() => navigate('/')}
                >
                  Back to Blog
                </button>
                
                <button
                  className={`lofi-button-secondary ${showCategoryManager ? 'bg-blue-600 text-white' : ''}`}
                  onClick={() => {
                    setShowCategoryManager(!showCategoryManager);
                    setShowCreateForm(false);
                  }}
                >
                  <FaCog className="mr-2" /> Categories
                </button>
                
                <button
                  className="lofi-button"
                  onClick={() => {
                    setCurrentPost({
                      // Initialize with default values to prevent undefined errors
                      title: '',
                      content: '',
                      excerpt: '',
                      slug: '',
                      image: '',
                      category: 'Uncategorized', // Use a default category that exists
                      categoryColor: 'bg-gray-500',
                      date: new Date().toISOString().split('T')[0],
                      readTime: '5 min read',
                      tags: [], // Always initialize as empty array
                      published: true,
                      featured: false
                    });
                    setShowCreateForm(true);
                    setShowCategoryManager(false);
                  }}
                >
                  <FaPlus className="mr-2" /> New Post
                </button>
                
                <button
                  className="lofi-button-danger"
                  onClick={async () => {
                    try {
                      await logout();
                      navigate('/');
                    } catch (error) {
                      console.error('Logout error:', error);
                    }
                  }}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
            
            {/* Debug info */}
            <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <p>Auth Status: {isAuthenticated ? 'Authenticated ✅' : 'Not Authenticated ❌'}</p>
              <p>User Email: {currentUser?.email || 'None'}</p>
              <p>Token Status: {tokenStatus}</p>
              <button 
                onClick={async () => setTokenStatus(await testFirebaseToken())}
                className="text-blue-500 underline"
              >
                Refresh Token
              </button>
            </div>
          </div>
          
          {/* Category Manager */}
          {showCategoryManager && (
            <CategoryManager 
              onCategoryCreated={() => {
                // Optionally refresh blog posts if needed
                queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
              }}
            />
          )}
          
          {/* Create/Edit Form */}
          {showCreateForm && renderPostForm()}
          
          {/* Posts Table */}
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              Blog Posts
            </h2>
            
            {postsLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg p-4">
                Error loading blog posts. Please try again.
              </div>
            ) : blogPosts?.length === 0 ? (
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg p-4">
                No blog posts found. Create your first post!
              </div>
            ) : (
              <table className="w-full text-sm text-left text-slate-700 dark:text-slate-300">
                <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 rounded-r-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts?.map((post: BlogPost) => (
                    <tr key={post.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="px-4 py-3 font-medium">{post.title}</td>
                      <td className="px-4 py-3">
                        <span className={`${post.categoryColor} text-white text-xs px-2 py-1 rounded-full`}>
                          {post.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">{post.date}</td>
                      <td className="px-4 py-3">
                        {post.published ? (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center w-fit">
                            <FaCheck className="mr-1" /> Published
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded-full flex items-center w-fit">
                            <FaTimes className="mr-1" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            onClick={() => navigate(`/post/${post.slug}`)}
                            title="View Post"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                            onClick={() => {
                              // Ensure tags is always an array when editing
                              const postToEdit = {
                                ...post,
                                tags: Array.isArray(post.tags) ? post.tags : 
                                      typeof post.tags === 'string' ? post.tags.split(',').map(t => t.trim()) : 
                                      []
                              };
                              setCurrentPost(postToEdit);
                              setShowCreateForm(true);
                            }}
                            title="Edit Post"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            onClick={() => handleDelete(post.id.toString())}
                            title="Delete Post"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;