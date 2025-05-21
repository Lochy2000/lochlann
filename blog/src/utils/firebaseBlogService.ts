// Firebase configuration for the blog
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, query, where, orderBy, setDoc } from "firebase/firestore";
import { enableIndexedDbPersistence, CACHE_SIZE_UNLIMITED } from "firebase/firestore";

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

// Enable offline persistence - but wrapped in a try/catch and only done once
try {
  console.log('Setting up Firestore persistence');
  
  // Enable persistence explicitly with a safer approach
  try {
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Firebase persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        console.warn('Firebase persistence not supported in this browser');
      } else {
        console.warn('Firebase persistence failed:', err);
      }
    });
  } catch (err) {
    console.warn('Could not enable persistence:', err);
  }
} catch (error) {
  console.error('Could not enable offline persistence:', error);
}

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
  private initialized = false;
  
  // Initialize the database with sample data if empty
  async initialize() {
    if (this.initialized) return;
    
    try {
      console.log('Checking for existing blog posts...');
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      
      // If no posts exist, add sample posts
      if (querySnapshot.empty) {
        console.log('No blog posts found. Adding sample data...');
        
        // Add sample posts one by one with proper error handling
        for (const post of sampleBlogPosts) {
          try {
            // Ensure tags is an array
            const tags = Array.isArray(post.tags) ? post.tags : 
                         (typeof post.tags === 'string' ? [post.tags].filter(Boolean) : []);
            
            // Format the post data correctly
            const formattedPost = {
              ...post,
              tags: tags,
              author: post.author || defaultAuthor,
              published: post.published === undefined ? true : post.published,
              featured: post.featured === undefined ? false : post.featured,
              createdAt: post.createdAt || new Date().toISOString(),
              updatedAt: post.updatedAt || new Date().toISOString()
            };
            
            // Add the document
            const docRef = await addDoc(collection(db, this.collectionName), formattedPost);
            console.log(`Sample post "${formattedPost.title}" added with ID: ${docRef.id}`);
          } catch (error) {
            console.error('Error adding sample post:', error);
          }
        }
      } else {
        console.log(`Found ${querySnapshot.size} existing blog posts, skipping initialization`);
      }
      
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing blog service:', error);
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
      
      // Ensure tags is properly formatted
      let formattedTags = post.tags || [];
      if (typeof formattedTags === 'string') {
        formattedTags = formattedTags.split(',').map(tag => tag.trim()).filter(Boolean);
      }
      
      // Create a complete post with all required fields
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
        tags: formattedTags,
        published: post.published !== undefined ? post.published : true,
        featured: post.featured !== undefined ? post.featured : false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: post.author || defaultAuthor,
        relatedPosts: post.relatedPosts || []
      };
      
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
      
      // Process the update data
      const updateData: Record<string, any> = { ...updatedPost };
      
      // Remove the ID field if present
      if ('id' in updateData) {
        delete updateData.id;
      }
      
      // Update categorySlug if category is being updated
      if (updatedPost.category && updatedPost.category !== currentData.category) {
        updateData.categorySlug = this.generateSlug(updatedPost.category);
      }
      
      // Format tags if provided as string
      if (updatedPost.tags && typeof updatedPost.tags === 'string') {
        updateData.tags = updatedPost.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      }
      
      // Always update the timestamp
      updateData.updatedAt = new Date().toISOString();
      
      console.log('Applying updates:', updateData);
      
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
}

// Export singleton instance
export const firebaseBlogService = new FirebaseBlogService();