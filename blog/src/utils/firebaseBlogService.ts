// Firebase configuration for the blog
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, query, where, orderBy, setDoc } from "firebase/firestore";

// Firebase configuration 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Log the config for debugging (hiding the actual values)
console.log('Firebase Config Status:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '✓ Set' : '✗ Missing',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✓ Set' : '✗ Missing',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✓ Set' : '✗ Missing',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✓ Set' : '✗ Missing',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✓ Set' : '✗ Missing',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ? '✓ Set' : '✗ Missing',
});

// Initialize Firebase - use existing app if available
let app;
if (getApps().length === 0) {
  console.log('No Firebase apps found, initializing a new one');
  app = initializeApp(firebaseConfig);
} else {
  console.log('Using existing Firebase app');
  app = getApps()[0];
}

const db = getFirestore(app);

// Note: Skipping offline persistence setup to avoid browser storage issues in development
console.log('Firestore initialized without persistence for better compatibility');

// Blog Post type definition
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  coverImage?: string;
  date: string;
  readTime: string;
  category: string;
  categorySlug?: string; 
  categoryColor: string;
  tags: string[] | string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  relatedPosts?: string[];
  author?: {
    name: string;
    bio: string;
    image: string;
  };
}

// Category type definition
export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
  postCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Default author info
const defaultAuthor = {
  name: 'Lochlann O\'Higgins',
  image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
  bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
};

// Sample blog posts for initial setup
const sampleBlogPosts: Omit<BlogPost, 'id'>[] = [
  {
    slug: 'getting-started-with-web-development',
    title: 'Getting Started with Web Development',
    excerpt: "A beginner's guide to starting your journey in web development.",
    content: '<p>This is a sample blog post content about web development basics.</p><p>In this post, we\'ll explore the foundations of web development and how to get started.</p>',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: '2025-05-15',
    readTime: '5 min read',
    category: 'Web Development',
    categorySlug: 'web-development',
    categoryColor: 'bg-blue-500',
    tags: ['html', 'css', 'javascript'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: true,
    relatedPosts: [],
    author: defaultAuthor
  },
  {
    slug: 'mastering-react-hooks',
    title: 'Mastering React Hooks',
    excerpt: 'Learn how to use React Hooks effectively in your projects.',
    content: '<p>This is a sample blog post content about React Hooks.</p><p>React Hooks have revolutionized how we build components in React.</p>',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: '2025-05-12',
    readTime: '7 min read',
    category: 'React',
    categorySlug: 'react',
    categoryColor: 'bg-green-500',
    tags: ['react', 'javascript', 'hooks'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: true,
    relatedPosts: [],
    author: defaultAuthor
  }
];

class FirebaseBlogService {
  private collectionName = 'blog_posts';
  private categoriesCollectionName = 'categories';
  private initialized = false;
  private initializing = false;
  
  // Initialize the database with sample data if empty
  async initialize() {
    // Prevent multiple simultaneous initializations
    if (this.initialized || this.initializing) {
      console.log('Firebase already initialized or initializing, skipping...');
      return;
    }
    
    this.initializing = true;
    console.log('Initializing Firebase Blog Service...');
    
    try {
      // Simple initialization - just check if we can connect
      console.log('Testing Firebase connection...');
      
      // Try a simple read operation to test connectivity
      const testQuery = await getDocs(collection(db, this.collectionName));
      console.log(`Firebase connection successful. Found ${testQuery.size} existing posts`);
      
      // Only initialize categories if absolutely none exist
      const categoriesQuery = await getDocs(collection(db, this.categoriesCollectionName));
      if (categoriesQuery.empty) {
        console.log('No categories found. Adding minimal default categories...');
        await this.initializeMinimalCategories();
      } else {
        console.log(`Found ${categoriesQuery.size} existing categories`);
      }
      
      this.initialized = true;
      this.initializing = false;
      console.log('Firebase Blog Service initialized successfully');
    } catch (error) {
      console.error('Error initializing blog service:', error);
      this.initializing = false;
      // Mark as initialized anyway to prevent hanging
      this.initialized = true;
      throw error;
    }
  }

  // Minimal category initialization - much faster
  async initializeMinimalCategories(): Promise<void> {
    try {
      const minimalCategories = [
        {
          name: 'Web Development',
          slug: 'web-development',
          color: 'bg-blue-500',
          description: 'Web development posts',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          name: 'Uncategorized',
          slug: 'uncategorized',
          color: 'bg-gray-500',
          description: 'General posts',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      // Add only essential categories quickly
      for (const category of minimalCategories) {
        await addDoc(collection(db, this.categoriesCollectionName), category);
      }
      
      console.log('Minimal categories initialized');
    } catch (error) {
      console.error('Error initializing minimal categories:', error);
      // Don't throw - this shouldn't block the app
    }
  }
  
  // Get all blog posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    await this.initialize();
    
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }
  
  // Get published posts only, sorted by date
  async getPublishedPosts(): Promise<BlogPost[]> {
    await this.initialize();
    
    try {
      console.log('Fetching published blog posts');
      
      // Just get all posts first
      console.log('Fetching all posts...');
      const allDocsSnapshot = await getDocs(collection(db, this.collectionName));
      
      const allPosts = allDocsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      
      console.log(`Found ${allPosts.length} total posts in the collection`);
      
      // Debug: Log each post with its published status
      allPosts.forEach(post => {
        console.log(`Post: ${post.title}, Published: ${post.published}, Featured: ${post.featured}, Date: ${post.date}`);
      });
      
      // Even if a post doesn't have the published field, include it
      const publishedPosts = allPosts.filter(post => post.published !== false);
      console.log(`After filtering, found ${publishedPosts.length} published posts`);
      
      // Sort by date descending (newest first)
      return publishedPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    } catch (error) {
      console.error('Error fetching published blog posts:', error);
      return [];
    }
  }
  
  // Get a single post by slug
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    await this.initialize();
    
    if (!slug) {
      console.error('No slug provided to getBlogPostBySlug');
      return null;
    }
    
    try {
      console.log(`Searching for post with slug: ${slug}`);
      
      // First try direct document lookup (in case the slug is the document ID)
      try {
        const docRef = doc(db, this.collectionName, slug);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log(`Found post with direct ID lookup: ${slug}`);
          const post = {
            id: docSnap.id,
            ...docSnap.data()
          } as BlogPost;
          console.log('Post data:', post);
          return post;
        } else {
          console.log(`No document with ID ${slug} exists, trying query by slug field...`);
        }
      } catch (directLookupError) {
        console.log('Direct document lookup failed, trying query by slug field...');
      }
      
      // Create a query by slug field
      const q = query(
        collection(db, this.collectionName),
        where('slug', '==', slug)
      );
      
      // Get the documents
      const querySnapshot = await getDocs(q);
      console.log(`Query returned ${querySnapshot.docs.length} document(s)`);
      
      if (querySnapshot.empty) {
        console.log('No posts found with this slug');
        
        // Try one more approach - get all posts and inspect them
        console.log('Getting all posts to inspect them manually...');
        const allPostsSnapshot = await getDocs(collection(db, this.collectionName));
        console.log(`Found ${allPostsSnapshot.docs.length} total posts`);
        
        // Log all slugs for debugging
        if (allPostsSnapshot.docs.length > 0) {
          console.log('Available slugs:');
          allPostsSnapshot.docs.forEach(doc => {
            const data = doc.data();
            console.log(`- ID: ${doc.id}, Slug: ${data.slug}`);
          });
        }
        
        return null;
      }
      
      // Get the first document
      const docData = querySnapshot.docs[0];
      const post = {
        id: docData.id,
        ...docData.data()
      } as BlogPost;
      
      console.log('Found post:', post);
      return post;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
    }
  }
  
  // Create a new post with complete data
  async createBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
    await this.initialize();
    
    try {
      // Generate slug if not provided
      const slug = post.slug || this.generateSlug(post.title || 'untitled');
      
      // Generate categorySlug if category is provided
      const categorySlug = post.category ? 
        this.generateSlug(post.category) : 'uncategorized';
      
      // Ensure tags is properly formatted and never undefined
      let formattedTags: string[] = [];
      if (Array.isArray(post.tags)) {
        formattedTags = post.tags.filter(tag => tag && tag.trim().length > 0);
      } else if (typeof post.tags === 'string') {
        formattedTags = post.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      }
      
      // Create a complete post with all required fields - no undefined values
      const newPost = {
        title: post.title || 'Untitled',
        slug: slug,
        content: post.content || '',
        excerpt: post.excerpt || '',
        image: post.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
        coverImage: post.coverImage || post.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
        date: post.date || new Date().toISOString().split('T')[0],
        category: post.category || 'Uncategorized',
        categorySlug: categorySlug,
        categoryColor: post.categoryColor || 'bg-blue-500',
        readTime: post.readTime || '5 min read',
        tags: formattedTags, // Always an array, never undefined
        published: post.published !== undefined ? Boolean(post.published) : true,
        featured: post.featured !== undefined ? Boolean(post.featured) : false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: post.author || defaultAuthor,
        relatedPosts: post.relatedPosts || []
      };
      
      // Validate that no field is undefined before creating
      const hasUndefinedValues = Object.values(newPost).some(value => value === undefined);
      if (hasUndefinedValues) {
        console.error('New post data contains undefined values:', newPost);
        throw new Error('Cannot create document with undefined values');
      }
      
      console.log('Creating post with complete data:', newPost);
      
      // Add the document to Firestore
      const docRef = await addDoc(collection(db, this.collectionName), newPost);
      console.log('Document created with ID:', docRef.id);
      
      // Return the created post with its ID
      return {
        id: docRef.id,
        ...newPost
      } as BlogPost;
    } catch (error) {
      console.error('Error creating blog post:', error);
      
      // Log detailed error information
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      throw error;
    }
  }
  
  // Update an existing post with all fields
  async updateBlogPost(id: string, updatedPost: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      console.log(`Updating blog post ID: ${id} with full data`);
      
      if (!id) {
        console.error('No ID provided for update');
        return null;
      }
      
      // Get a reference to the document
      const docRef = doc(db, this.collectionName, id);
      
      // Get the current document to merge with updates
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        console.error(`Document with ID ${id} does not exist`);
        return null;
      }
      
      // Current document data
      const currentData = docSnap.data();
      
      // Process the update data and remove undefined values
      const updateData: Record<string, any> = {};
      
      // Only include fields that are not undefined
      Object.entries(updatedPost).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id') {
          updateData[key] = value;
        }
      });
      
      // Update categorySlug if category is being updated
      if (updatedPost.category && updatedPost.category !== currentData.category) {
        updateData.categorySlug = this.generateSlug(updatedPost.category);
      }
      
      // Ensure tags is always an array, never undefined
      if ('tags' in updatedPost) {
        if (Array.isArray(updatedPost.tags)) {
          updateData.tags = updatedPost.tags.filter(tag => tag && tag.trim().length > 0);
        } else if (typeof updatedPost.tags === 'string') {
          updateData.tags = updatedPost.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        } else if (updatedPost.tags === null || updatedPost.tags === undefined) {
          updateData.tags = []; // Set to empty array instead of undefined
        }
      }
      
      // Ensure other fields have proper defaults
      if ('published' in updatedPost && updateData.published === undefined) {
        updateData.published = true;
      }
      
      if ('featured' in updatedPost && updateData.featured === undefined) {
        updateData.featured = false;
      }
      
      // Always update the timestamp
      updateData.updatedAt = new Date().toISOString();
      
      console.log('Applying updates:', updateData);
      
      // Validate that no field is undefined before updating
      const hasUndefinedValues = Object.values(updateData).some(value => value === undefined);
      if (hasUndefinedValues) {
        console.error('Update data contains undefined values:', updateData);
        throw new Error('Cannot update document with undefined values');
      }
      
      // Update the document
      await updateDoc(docRef, updateData);
      console.log('Document updated successfully');
      
      // Get the updated document
      const updatedDocSnap = await getDoc(docRef);
      
      // Return the updated document with ID
      return {
        id: updatedDocSnap.id,
        ...updatedDocSnap.data()
      } as BlogPost;
    } catch (error) {
      console.error('Error updating blog post:', error);
      
      // Log detailed error information
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      return null;
    }
  }
  
  // Delete a post
  async deleteBlogPost(id: string): Promise<boolean> {
    await this.initialize();
    
    try {
      console.log(`Deleting blog post with ID: ${id}`);
      
      // First check if the document exists
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        console.error(`Document with ID ${id} does not exist`);
        return false;
      }
      
      // Document exists, proceed with deletion
      await deleteDoc(docRef);
      console.log(`Blog post deleted successfully: ${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  }
  
  // Helper function to generate slug from text
  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')  // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-');      // Remove consecutive hyphens
  }

  // ========== CATEGORY MANAGEMENT METHODS ==========
  
  // Get all categories
  async getCategories(): Promise<Category[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.categoriesCollectionName));
      const categories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];

      // Calculate post count for each category
      const categoriesWithCount = await Promise.all(
        categories.map(async (category) => {
          const postCount = await this.getCategoryPostCount(category.slug);
          return { ...category, postCount };
        })
      );

      return categoriesWithCount.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // Get category post count
  async getCategoryPostCount(categorySlug: string): Promise<number> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('categorySlug', '==', categorySlug),
        where('published', '==', true)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting category post count:', error);
      return 0;
    }
  }

  // Create a new category
  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    try {
      // Generate slug if not provided
      const slug = category.slug || this.generateSlug(category.name);
      
      const newCategory = {
        ...category,
        slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Creating category:', newCategory);
      
      const docRef = await addDoc(collection(db, this.categoriesCollectionName), newCategory);
      console.log('Category created with ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...newCategory
      } as Category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Update an existing category
  async updateCategory(id: string, updatedCategory: Partial<Category>): Promise<Category | null> {
    try {
      console.log(`Updating category ID: ${id}`);
      
      const docRef = doc(db, this.categoriesCollectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        console.error(`Category with ID ${id} does not exist`);
        return null;
      }

      // Process the update data
      const updateData: Record<string, any> = {};
      
      Object.entries(updatedCategory).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id') {
          updateData[key] = value;
        }
      });

      // Update slug if name is being updated
      if (updatedCategory.name && updatedCategory.name !== docSnap.data().name) {
        updateData.slug = this.generateSlug(updatedCategory.name);
      }

      updateData.updatedAt = new Date().toISOString();
      
      console.log('Applying category updates:', updateData);
      
      await updateDoc(docRef, updateData);
      console.log('Category updated successfully');
      
      // Get the updated document
      const updatedDocSnap = await getDoc(docRef);
      
      return {
        id: updatedDocSnap.id,
        ...updatedDocSnap.data()
      } as Category;
    } catch (error) {
      console.error('Error updating category:', error);
      return null;
    }
  }

  // Delete a category
  async deleteCategory(id: string): Promise<boolean> {
    try {
      console.log(`Deleting category with ID: ${id}`);
      
      const docRef = doc(db, this.categoriesCollectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        console.error(`Category with ID ${id} does not exist`);
        return false;
      }
      
      // Check if category has posts
      const categoryData = docSnap.data();
      const postCount = await this.getCategoryPostCount(categoryData.slug);
      
      if (postCount > 0) {
        throw new Error(`Cannot delete category "${categoryData.name}" because it has ${postCount} posts. Please move or delete the posts first.`);
      }
      
      await deleteDoc(docRef);
      console.log(`Category deleted successfully: ${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  // Initialize default categories - simplified version
  async initializeDefaultCategories(): Promise<void> {
    // This method is now replaced by initializeMinimalCategories
    // Keeping for compatibility but redirecting to simpler version
    return this.initializeMinimalCategories();
  }
}

// Export singleton instance
export const firebaseBlogService = new FirebaseBlogService();