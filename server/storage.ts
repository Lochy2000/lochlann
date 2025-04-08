import { 
  users, 
  type User, 
  type InsertUser,
  type ContactMessage,
  type InsertContactMessage,
  type BlogPost,
  type InsertBlogPost,
  type PortfolioProject,
  type InsertPortfolioProject,
  type CvData,
  type InsertCvData 
} from "@shared/schema";

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
  
  // Portfolio methods
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  
  // CV data methods
  getCvData(): Promise<CvData[]>;
  createCvData(data: InsertCvData): Promise<CvData>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private blogPosts: Map<number, BlogPost>;
  private portfolioProjects: Map<number, PortfolioProject>;
  private cvData: Map<number, CvData>;
  
  private userIdCounter: number;
  private contactIdCounter: number;
  private blogIdCounter: number;
  private portfolioIdCounter: number;
  private cvDataIdCounter: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.blogPosts = new Map();
    this.portfolioProjects = new Map();
    this.cvData = new Map();
    
    this.userIdCounter = 1;
    this.contactIdCounter = 1;
    this.blogIdCounter = 1;
    this.portfolioIdCounter = 1;
    this.cvDataIdCounter = 1;
    
    // Initialize with some mock data for development
    this.initDemoData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactIdCounter++;
    const now = new Date();
    const contactMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: now, 
      read: false 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }
  
  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug && post.published
    );
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogIdCounter++;
    const now = new Date();
    const blogPost: BlogPost = { 
      ...post, 
      id, 
      published: post.published ?? true,
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  
  // Portfolio methods
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    const id = this.portfolioIdCounter++;
    
    // Ensure null values for optional fields to match the PortfolioProject type
    const portfolioProject: PortfolioProject = { 
      ...project, 
      id, 
      shortTitle: project.shortTitle || null,
      demoLink: project.demoLink || null,
      githubLink: project.githubLink || null,
      featured: project.featured ?? false,
      order: project.order ?? 0 
    };
    
    this.portfolioProjects.set(id, portfolioProject);
    return portfolioProject;
  }
  
  // CV data methods
  async getCvData(): Promise<CvData[]> {
    return Array.from(this.cvData.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async createCvData(data: InsertCvData): Promise<CvData> {
    const id = this.cvDataIdCounter++;
    const cvDataItem: CvData = { 
      ...data, 
      id, 
      order: data.order ?? 0 
    };
    this.cvData.set(id, cvDataItem);
    return cvDataItem;
  }
  
  // Initialize with demo data
  private initDemoData() {
    // Add sample blog posts
    this.createBlogPost({
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
    
    this.createBlogPost({
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
    this.createPortfolioProject({
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
    
    this.createPortfolioProject({
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
  }
}

export const storage = new MemStorage();
