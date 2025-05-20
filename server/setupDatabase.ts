import path from 'path';
import fs from 'fs';
import { db } from './db.js';
import { storage } from './storage.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

// Get dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import config directly instead of using dotenv
import * as config from '../config.js';

// Setup database - run migrations and seed data
async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Use config variables
    const databaseUrl = config.DATABASE_URL;
    const supabaseUrl = config.SUPABASE_URL;
    const supabaseServiceRole = config.SUPABASE_SERVICE_ROLE;
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set in config');
    }

    if (!supabaseUrl || !supabaseServiceRole) {
      throw new Error('Supabase credentials are not set in config');
    }
    
    // Create Supabase client with service role
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRole,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
    
    console.log('Created Supabase admin client');
    
    // Create a PostgreSQL client for migrations
    const connectionString = databaseUrl;
    const migrationClient = postgres(connectionString, { max: 1 });
    console.log('Migration client created');
    
    // Read the migration SQL file
    const migrationPath = path.resolve(__dirname, '../migrations/0000_initial.sql');
    
    if (fs.existsSync(migrationPath)) {
      console.log('Running SQL migration...');
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      
      // Execute the migration SQL
      try {
        await migrationClient.unsafe(migrationSQL);
        console.log('SQL migration completed successfully');
      } catch (error) {
        console.error('Error executing SQL migration:', error);
      }
    } else {
      console.log('Migration file not found. Using drizzle schema...');
      
      // Alternative approach: use the schema directly (not needed if using SQL migrations)
      // This is just a fallback for development purposes
      const migrationDb = drizzle(migrationClient);
      
      try {
        // Seed demo data
        console.log('Seeding demo data...');
        await storage.initDemoData();
        console.log('Demo data seeded successfully');
      } catch (error) {
        console.error('Error seeding demo data:', error);
      }
    }
    
    // Check if we have blog posts
    const { count } = await supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });
    
    if (count === 0) {
      console.log('No blog posts found. Adding sample posts...');
      
      // Add sample blog posts
      const samplePosts = [
        {
          slug: 'getting-started-with-web-development',
          title: 'Getting Started with Web Development',
          excerpt: 'A beginner\'s guide to starting your journey in web development.',
          content: '<p>This is a sample blog post content about web development basics.</p><p>In this post, we\'ll explore the foundations of web development and how to get started.</p>',
          date: '2023-09-15',
          read_time: '5 min read',
          category: 'Web Development',
          category_color: 'bg-blue-500',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
          tags: ['html', 'css', 'javascript'],
          published: true
        },
        {
          slug: 'mastering-react-hooks',
          title: 'Mastering React Hooks',
          excerpt: 'Learn how to use React Hooks effectively in your projects.',
          content: '<p>This is a sample blog post content about React Hooks.</p><p>React Hooks have revolutionized how we build components in React.</p>',
          date: '2023-10-20',
          read_time: '8 min read',
          category: 'React',
          category_color: 'bg-green-500',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
          tags: ['react', 'javascript', 'hooks'],
          published: true
        }
      ];
      
      // Insert sample posts
      const { error } = await supabaseAdmin
        .from('blog_posts')
        .insert(samplePosts);
      
      if (error) {
        console.error('Error adding sample blog posts:', error);
      } else {
        console.log('Sample blog posts added successfully');
      }
    } else {
      console.log(`Found ${count} existing blog posts`);
    }
    
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
setupDatabase().catch(console.error);
