import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { contactSchema } from "../shared/schema.js";
import { ZodError } from "zod";
import path from "path";
import { fileURLToPath } from 'url';
import { isDatabaseInitialized } from "./db.js"; // Import DB check

// Get dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables - using Node.js built-in process.env
// No dotenv import needed

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body against the contactSchema
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact message
      const message = await storage.createContactMessage(validatedData);
      
      return res.status(200).json({ 
        success: true, 
        message: "Your message has been received! I'll get back to you soon." 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      console.error("Error processing contact form:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your message. Please try again later." 
      });
    }
  });

  // Get blog posts
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      return res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog posts" 
      });
    }
  });

  // Get a specific blog post by slug
  app.get("/api/blog/post/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
      }
      
      return res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog post" 
      });
    }
  });

  // Get portfolio projects
  app.get("/api/portfolio/projects", async (req, res) => {
    try {
      const projects = await storage.getPortfolioProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching portfolio projects:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch portfolio projects" 
      });
    }
  });

  // Get CV data
  app.get("/api/cv", async (req, res) => {
    try {
      const cvData = await storage.getCvData();
      return res.status(200).json(cvData);
    } catch (error) {
      console.error("Error fetching CV data:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch CV data" 
      });
    }
  });

  // Add new routes for blog management
  
  // Create a new blog post (protected route - will add authentication later)
  app.post("/api/blog/posts", async (req, res) => {
    try {
      // Check if database is initialized
      if (!isDatabaseInitialized()) {
        return res.status(503).json({
          success: false,
          message: "Database is not available. Please try again later."
        });
      }
      
      const newPost = await storage.createBlogPost(req.body);
      return res.status(201).json({
        success: true,
        message: "Blog post created successfully",
        post: newPost
      });
    } catch (error) {
      console.error("Error creating blog post:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create blog post",
        error: error.message
      });
    }
  });
  
  // Delete a blog post by ID
  app.delete("/api/blog/posts/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid post ID" 
        });
      }
      
      const deleted = await storage.deleteBlogPost(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Blog post deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete blog post"
      });
    }
  });
  
  // Update a blog post
  app.put("/api/blog/posts/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid post ID" 
        });
      }
      
      const updatedPost = await storage.updateBlogPost(id, req.body);
      
      if (!updatedPost) {
        return res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Blog post updated successfully",
        post: updatedPost
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update blog post"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
