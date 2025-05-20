import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Using API fallback.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Blog post types
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  coverImage?: string; // Added for compatibility with components
  date: string;
  readTime: string;
  category: string;
  categorySlug?: string; 
  categoryColor: string;
  tags: string[] | string; // Updated to accept string or string[] for compatibility
  published: boolean;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  relatedPosts?: number[]; // Added for related posts functionality
  author?: {
    name: string;
    image: string;
    bio: string;
  }; // Added author type
}

// Function to get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // If Supabase is not configured, use the API
    if (!supabaseUrl || !supabaseAnonKey) {
      const response = await fetch('/api/blog/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts from API');
      }
      return await response.json();
    }
    
    // Fetch posts from Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts from Supabase:', error);
      throw error;
    }
    
    // Transform data to match BlogPost interface
    return data.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      coverImage: post.cover_image || post.image, // Map cover_image if it exists
      date: post.date,
      readTime: post.read_time,
      category: post.category,
      categorySlug: post.category?.toLowerCase().replace(/\s+/g, '-'),
      categoryColor: post.category_color,
      tags: Array.isArray(post.tags) ? post.tags : (post.tags ? String(post.tags).split(',') : []),
      published: post.published,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      featured: post.featured || false, // Use the value if it exists
      relatedPosts: post.related_posts || [], // Map related posts if they exist
      author: post.author || null // Map author if it exists
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Function to get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // If Supabase is not configured, use the API
    if (!supabaseUrl || !supabaseAnonKey) {
      const response = await fetch(`/api/blog/post/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch post from API');
      }
      return await response.json();
    }
    
    // Fetch post from Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // PGRST116 is the error code for "No rows found"
        return null;
      }
      console.error('Error fetching blog post from Supabase:', error);
      throw error;
    }
    
    if (!data) {
      return null;
    }
    
    // Transform data to match BlogPost interface
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      coverImage: data.cover_image || data.image, // Map cover_image if it exists
      date: data.date,
      readTime: data.read_time,
      category: data.category,
      categorySlug: data.category?.toLowerCase().replace(/\s+/g, '-'),
      categoryColor: data.category_color,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? String(data.tags).split(',') : []),
      published: data.published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      featured: data.featured || false, // Use the value if it exists
      relatedPosts: data.related_posts || [], // Map related posts if they exist
      author: data.author || null // Map author if it exists
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Function to create a new blog post (requires authentication)
export async function createBlogPost(post: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    // For now, use the API to create posts
    const response = await fetch('/api/blog/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create blog post');
    }
    
    const result = await response.json();
    return result.post;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error; // Re-throw so the UI can handle it properly
  }
}

// Function to update an existing blog post (requires authentication)
export async function updateBlogPost(id: number, post: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    // If Supabase is not configured, use the API
    if (!supabaseUrl || !supabaseAnonKey) {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update blog post');
      }
      
      const result = await response.json();
      return result.post;
    }
    
    // Update post in Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        read_time: post.readTime,
        category: post.category,
        category_color: post.categoryColor,
        image: post.image,
        cover_image: post.coverImage,
        featured: post.featured,
        tags: post.tags,
        related_posts: post.relatedPosts,
        published: post.published,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating blog post in Supabase:', error);
      throw error;
    }
    
    if (!data) {
      return null;
    }
    
    // Transform data to match BlogPost interface
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      coverImage: data.cover_image || data.image, // Map cover_image if it exists
      date: data.date,
      readTime: data.read_time,
      category: data.category,
      categorySlug: data.category?.toLowerCase().replace(/\s+/g, '-'),
      categoryColor: data.category_color,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? String(data.tags).split(',') : []),
      published: data.published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      featured: data.featured || false,
      relatedPosts: data.related_posts || [],
      author: data.author || null
    };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
}

// Function to delete a blog post (requires authentication)
export async function deleteBlogPost(id: number): Promise<boolean> {
  try {
    // If Supabase is not configured, use the API
    if (!supabaseUrl || !supabaseAnonKey) {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }
      
      return true;
    }
    
    // Delete post from Supabase
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting blog post from Supabase:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}
