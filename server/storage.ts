import { 
  type User, 
  type InsertUser,
  type ContactMessage,
  type InsertContactMessage,
  type BlogPost,
  type InsertBlogPost,
  type PortfolioProject,
  type InsertPortfolioProject,
  type CvData,
  type InsertCvData,
  users,
  contactMessages,
  blogPosts,
  portfolioProjects,
  cvData
} from "../shared/schema.js";
import { db, isDatabaseInitialized } from "./db.js";
import { eq } from "drizzle-orm";

// Full interface for all CRUD operations needed
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Portfolio methods
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  
  // CV data methods
  getCvData(): Promise<CvData[]>;
  createCvData(data: InsertCvData): Promise<CvData>;
}

export class DrizzleStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    if (!db) {
      console.error('Database connection not initialized');
      return undefined;
    }
    
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) {
      console.error('Database connection not initialized');
      return undefined;
    }
    
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0];
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) {
      throw new Error('Database connection not initialized');
    }
    
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    if (!db) {
      throw new Error('Database connection not initialized');
    }
    
    const now = new Date();
    const contactMessage = {
      ...message,
      createdAt: now,
      read: false
    };
    
    const result = await db.insert(contactMessages).values(contactMessage).returning();
    return result[0];
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    if (!db) {
      console.error('Database connection not initialized');
      return [];
    }
    
    try {
      return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
    } catch (error) {
      console.error('Error getting contact messages:', error);
      return [];
    }
  }
  
  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    if (!isDatabaseInitialized()) {
      console.error('Database connection not initialized');
      return [];
    }
    
    try {
      return await db.select()
        .from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(blogPosts.date);
    } catch (error) {
      console.error('Error getting blog posts:', error);
      return [];
    }
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    if (!isDatabaseInitialized()) {
      console.error('Database connection not initialized');
      return undefined;
    }
    
    try {
      const result = await db.select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .where(eq(blogPosts.published, true));
      
      return result[0];
    } catch (error) {
      console.error('Error getting blog post by slug:', error);
      return undefined;
    }
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    if (!isDatabaseInitialized()) {
      console.error('Database connection not initialized. Make sure the database is properly configured.');
      throw new Error('Database connection not initialized');
    }
    
    try {
      const now = new Date();
      const blogPost = {
        ...post,
        published: post.published ?? true,
        createdAt: now,
        updatedAt: now
      };
      
      const result = await db.insert(blogPosts).values(blogPost).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw new Error(`Failed to create blog post: ${error.message}`);
    }
  }
  
  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    if (!isDatabaseInitialized()) {
      console.error('Database connection not initialized');
      return undefined;
    }
    
    try {
      const now = new Date();
      const updateData = {
        ...post,
        updatedAt: now
      };
      
      const result = await db.update(blogPosts)
        .set(updateData)
        .where(eq(blogPosts.id, id))
        .returning();
      
      return result[0];
    } catch (error) {
      console.error('Error updating blog post:', error);
      return undefined;
    }
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    if (!isDatabaseInitialized()) {
      console.error('Database connection not initialized');
      return false;
    }
    
    try {
      const result = await db.delete(blogPosts)
        .where(eq(blogPosts.id, id))
        .returning({ id: blogPosts.id });
      
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  }
  
  // Portfolio methods
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    if (!db) {
      console.error('Database connection not initialized');
      return [];
    }
    
    try {
      return await db.select()
        .from(portfolioProjects)
        .orderBy(portfolioProjects.order);
    } catch (error) {
      console.error('Error getting portfolio projects:', error);
      return [];
    }
  }
  
  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    if (!db) {
      throw new Error('Database connection not initialized');
    }
    
    const portfolioProject = {
      ...project,
      shortTitle: project.shortTitle || null,
      demoLink: project.demoLink || null,
      githubLink: project.githubLink || null,
      featured: project.featured ?? false,
      order: project.order ?? 0
    };
    
    const result = await db.insert(portfolioProjects).values(portfolioProject).returning();
    return result[0];
  }
  
  // CV data methods
  async getCvData(): Promise<CvData[]> {
    if (!db) {
      console.error('Database connection not initialized');
      return [];
    }
    
    try {
      return await db.select()
        .from(cvData)
        .orderBy(cvData.order);
    } catch (error) {
      console.error('Error getting CV data:', error);
      return [];
    }
  }
  
  async createCvData(data: InsertCvData): Promise<CvData> {
    if (!db) {
      throw new Error('Database connection not initialized');
    }
    
    const cvDataItem = {
      ...data,
      order: data.order ?? 0
    };
    
    const result = await db.insert(cvData).values(cvDataItem).returning();
    return result[0];
  }
  
  // Initialize demo data for development (can be used to seed the database)
  async initDemoData() {
    if (!db) {
      console.error('Database connection not initialized');
      return;
    }
    
    try {
      // Check if data already exists
      const existingPosts = await db.select().from(blogPosts);
      if (existingPosts.length > 0) {
        console.log('Demo data already initialized, skipping...');
        return;
      }
      
      // Add sample blog posts
      await this.createBlogPost({
        slug: 'getting-started-with-web-development',
        title: 'Getting Started with Web Development',
        excerpt: 'A beginner\'s guide to starting your journey in web development.',
        content: 'This is a sample blog post content about web development basics.',
        date: '2023-09-15',
        readTime: '5 min',
        category: 'Web Development',
        categoryColor: 'blue',
        image: '/images/blog/web-dev.jpg',
        published: true
      });
      
      await this.createBlogPost({
        slug: 'mastering-react-hooks',
        title: 'Mastering React Hooks',
        excerpt: 'Learn how to use React Hooks effectively in your projects.',
        content: 'This is a sample blog post content about React Hooks.',
        date: '2023-10-20',
        readTime: '8 min',
        category: 'React',
        categoryColor: 'green',
        image: '/images/blog/react-hooks.jpg',
        published: true
      });
      
      // Add sample portfolio projects
      await this.createPortfolioProject({
        title: 'E-commerce Platform',
        shortTitle: 'E-commerce',
        description: 'A full-stack e-commerce platform with payment integration.',
        image: '/images/portfolio/ecommerce.jpg',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
        demoLink: 'https://example.com/demo1',
        githubLink: 'https://github.com/username/ecommerce',
        featured: true,
        order: 1
      });
      
      await this.createPortfolioProject({
        title: 'Task Management App',
        shortTitle: 'Task App',
        description: 'A responsive task management application with drag-and-drop functionality.',
        image: '/images/portfolio/task-app.jpg',
        technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
        demoLink: 'https://example.com/demo2',
        githubLink: 'https://github.com/username/task-app',
        featured: true,
        order: 2
      });
      
      console.log('Demo data initialized successfully');
    } catch (error) {
      console.error('Error initializing demo data:', error);
    }
  }
}

// Create and export the storage instance
export const storage = new DrizzleStorage();
