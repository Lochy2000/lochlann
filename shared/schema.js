// ES Module version of the schema
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (base schema that comes with template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

// Blog post schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
  readTime: text("read_time").notNull(),
  category: text("category").notNull(),
  categoryColor: text("category_color").notNull(),
  image: text("image").notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  date: z.string(),
  readTime: z.string(),
  category: z.string(),
  categoryColor: z.string(),
  image: z.string(),
  published: z.boolean().optional(),
});

// Portfolio project schema
export const portfolioProjects = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  shortTitle: text("short_title"),
  description: text("description").notNull(),
  image: text("image").notNull(),
  technologies: text("technologies").array().notNull(),
  demoLink: text("demo_link"),
  githubLink: text("github_link"),
  featured: boolean("featured").default(false).notNull(),
  order: integer("order").default(0).notNull(),
});

export const portfolioProjectSchema = z.object({
  title: z.string(),
  shortTitle: z.string().optional(),
  description: z.string(),
  image: z.string(),
  technologies: z.array(z.string()),
  demoLink: z.string().optional(),
  githubLink: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

// CV Data schema (for storing experience, education, etc.)
export const cvData = pgTable("cv_data", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // experience, education, certification, skill, achievement
  data: jsonb("data").notNull(),
  order: integer("order").default(0).notNull(),
});

export const cvDataSchema = z.object({
  type: z.enum(['experience', 'education', 'certification', 'skill', 'achievement']),
  data: z.record(z.unknown()),
  order: z.number().optional(),
});
