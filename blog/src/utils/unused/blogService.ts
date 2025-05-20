import { v4 as uuidv4 } from 'uuid';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  coverImage?: string;
  date: string;
  readTime: string;
  category: string;
  categorySlug: string;
  categoryColor: string;
  tags: string[] | string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  author?: {
    name: string;
    image: string;
    bio: string;
  };
}

// Default author info
const defaultAuthor = {
  name: 'Lochlann O\'Higgins',
  image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
  bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
};

// Sample blog posts for initial setup
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
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
    createdAt: '2025-05-15T10:30:00Z',
    updatedAt: '2025-05-15T10:30:00Z',
    featured: true,
    author: defaultAuthor
  },
  {
    id: '2',
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
    createdAt: '2025-05-12T09:15:00Z',
    updatedAt: '2025-05-12T09:15:00Z',
    featured: true,
    author: defaultAuthor
  }
];

class BlogService {
  private STORAGE_KEY = 'lochlann_blog_posts';
  
  constructor() {
    // Initialize with sample data if storage is empty
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleBlogPosts));
    }
  }
  
  // Get all blog posts
  getAllBlogPosts = async (): Promise<BlogPost[]> => {
    try {
      const postsJson = localStorage.getItem(this.STORAGE_KEY);
      if (!postsJson) return [];
      return JSON.parse(postsJson);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }
  
  // Get published posts only
  getPublishedPosts = async (): Promise<BlogPost[]> => {
    const posts = await this.getAllBlogPosts();
    return posts.filter(post => post.published).sort((a, b) => {
      // Sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
  
  // Get a single post by slug
  getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const posts = await this.getAllBlogPosts();
      const post = posts.find(post => post.slug === slug);
      return post || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }
  
  // Create a new post
  createBlogPost = async (post: Partial<BlogPost>): Promise<BlogPost> => {
    try {
      const posts = await this.getAllBlogPosts();
      
      // Generate slug if not provided
      const slug = post.slug || this.generateSlug(post.title || 'untitled');
      
      const now = new Date().toISOString();
      
      const newPost: BlogPost = {
        id: uuidv4(),
        slug,
        title: post.title || 'Untitled',
        content: post.content || '',
        excerpt: post.excerpt || '',
        image: post.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
        coverImage: post.coverImage || post.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
        date: post.date || new Date().toISOString().split('T')[0],
        readTime: post.readTime || '5 min read',
        category: post.category || 'Uncategorized',
        categorySlug: this.generateSlug(post.category || 'uncategorized'),
        categoryColor: post.categoryColor || 'bg-blue-500',
        tags: post.tags || [],
        published: post.published !== undefined ? post.published : true,
        createdAt: now,
        updatedAt: now,
        featured: post.featured || false,
        author: post.author || defaultAuthor
      };
      
      posts.push(newPost);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
      
      return newPost;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw new Error('Failed to create blog post');
    }
  }
  
  // Update an existing post
  updateBlogPost = async (id: string, updatedPost: Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      const posts = await this.getAllBlogPosts();
      const index = posts.findIndex(post => post.id === id);
      
      if (index === -1) return null;
      
      // Update category slug if category is updated
      const categorySlug = updatedPost.category 
        ? this.generateSlug(updatedPost.category) 
        : posts[index].categorySlug;
      
      // Update the post
      posts[index] = {
        ...posts[index],
        ...updatedPost,
        categorySlug,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
      return posts[index];
    } catch (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
  }
  
  // Delete a post
  deleteBlogPost = async (id: string): Promise<boolean> => {
    try {
      const posts = await this.getAllBlogPosts();
      const filteredPosts = posts.filter(post => post.id !== id);
      
      if (filteredPosts.length === posts.length) return false;
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPosts));
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
export const blogService = new BlogService();
