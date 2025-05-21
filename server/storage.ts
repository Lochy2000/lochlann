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

// Sample data for when the database is not available
const mockPortfolioProjects = [
  {
    id: 1,
    title: 'Phonetic Focus',
    shortTitle: 'Phonetic Focus',
    description: 'A responsive website for a digital literacy consulting firm with custom animations and content management system.',
    image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1747676704/frentic-focus_c4o1u2.png',
    technologies: ['WordPress', 'Custom Themes', 'Responsive','DigitalOceans'],
    demoLink: 'https://www.freneticfocus.com/',
    githubLink: 'https://github.com/Lochy2000/frenticfocus-',
    featured: true,
    order: 1
  },
  {
    id: 2,
    title: 'Dating Events Platform',
    shortTitle: 'Dating Events',
    description: 'A full-featured events platform for dating services with booking system, user profiles, and payment integration.',
    image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1747676704/dating-events_im2wpb.png',
    technologies: ['DJANGO', 'PYTHON', 'Postgresql'],
    demoLink: null,
    githubLink: 'https://github.com/hannahro15/CI-Feb25-hackathon',
    featured: true,
    order: 2
  }
];

const mockCvData = [
  {
    id: 1,
    type: 'experience',
    data: {
      title: 'Software Developer',
      company: 'Phonetic Focus',
      period: '2024 - Present',
      description: 'Developing responsive web applications using React, TypeScript, and Node.js.'
    },
    order: 1
  },
  {
    id: 2,
    type: 'education',
    data: {
      institution: 'University of Development',
      degree: 'BSc in Computer Science',
      period: '2020 - 2024',
      description: 'Focused on web development, algorithms, and data structures.'
    },
    order: 1
  }
];

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
    if (!isDatabaseInitialized()) {
      console.warn('Database not available, returning mock data');
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
    if (!isDatabaseInitialized()) {
      console.warn('Database not available, returning mock data');
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
    if (!isDatabaseInitialized()) {
      console.warn('Database not available, returning mock response');
      return {
        id: 1,
        ...insertUser
      } as User;
    }
    
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    if (!isDatabaseInitialized()) {
      console.warn('Database not available, returning mock response');
      const now = new Date();
      return {
        id: 1,
        ...message,
        createdAt: now,
        read: false
      } as ContactMessage;
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
    if (!isDatabaseInitialized()) {
      console.warn('Database not available, returning mock data');
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
      console.warn('Database not available, returning mock data');
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
      console.warn('Database not available, returning mock data');
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
      console.warn('Database not available, returning mock response');
      const now = new Date();
      return {
        id: 1,
        ...post,
        published: post.published ?? true,
        createdAt: now,
        updatedAt: now
      } as BlogPost;
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
      console.warn('Database not available, returning mock response');
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
      console.warn('Database not available, returning mock response');
      return true;
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
    if (!isDatabaseInitialized()) {
      console.warn('Database not available, returning mock data');
      return mockPortfolioProjects as PortfolioProject[];
    }
    
    try {
      return await db.select()
        .from(portfolioProjects)
        .orderBy(portfolioProjects.order);
    } catch (error) {
      console.error('Error getting portfolio projects:', error);
      return mockPortfolioProjects as PortfolioProject[];
    }
  }
  
  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    if (!isDatabaseInitialized()) {
      console.warn('Database not available, returning mock response');
      return {
        id: 99,
        ...project,
        shortTitle: project.shortTitle || null,
        demoLink: project.demoLink || null,
        githubLink: project.githubLink || null,
        featured: project.featured ?? false,
        order: project.order ?? 0
      } as PortfolioProject;
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
    if (!isDatabaseInitialized()) {
      console.warn('Database not available, returning mock data');
      return mockCvData as CvData[];
    }
    
    try {
      return await db.select()
        .from(cvData)
        .orderBy(cvData.order);
    } catch (error) {
      console.error('Error getting CV data:', error);
      return mockCvData as CvData[];
    }
  }
  
  async createCvData(data: InsertCvData): Promise<CvData> {
    if (!isDatabaseInitialized()) {
      console.warn('Database not available, returning mock response');
      return {
        id: 99,
        ...data,
        order: data.order ?? 0
      } as CvData;
    }
    
    const cvDataItem = {
      ...data,
      order: data.order ?? 0
    };
    
    const result = await db.insert(cvData).values(cvDataItem).returning();
    return result[0];
  }
}

// Create and export the storage instance
export const storage = new DrizzleStorage();
