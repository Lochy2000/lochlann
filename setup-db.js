// Direct script to set up the database - ES Module compatible
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to run a command and show output
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, {
      cwd: __dirname,
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error(`Error running command: ${command}`);
    console.error(error.message);
    return false;
  }
}

console.log('Starting database setup...');

// First, generate the migrations
const migrationsResult = runCommand('npx drizzle-kit generate:pg');
if (!migrationsResult) {
  console.error('Failed to generate migrations, but continuing...');
}

// Second, run the SQL migration directly
try {
  console.log('Reading migration SQL...');
  
  // Instead of using the setupDatabase script, we'll run the migration SQL directly
  const { createClient } = await import('@supabase/supabase-js');
  const postgres = await import('postgres');
  const fs = await import('fs');
  const { DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE } = await import('./config.js');
  
  console.log('Connecting to database...');
  const client = postgres.default(DATABASE_URL);
  
  // Read the migration SQL file
  const migrationPath = path.resolve(__dirname, 'migrations/0000_initial.sql');
  
  if (fs.existsSync(migrationPath)) {
    console.log('Running SQL migration...');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Execute the migration SQL
    try {
      await client.unsafe(migrationSQL);
      console.log('SQL migration completed successfully');
      
      // Create Supabase client with service role
      const supabaseAdmin = createClient(
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );
      
      console.log('Created Supabase admin client');
      
      // Add sample posts if none exist
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
            excerpt: "A beginner's guide to starting your journey in web development.",
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
        console.log(`Found ${count} existing blog posts, skipping sample data`);
      }
      
      console.log('Database setup completed successfully');
    } catch (error) {
      console.error('Error executing SQL migration:', error);
    }
  } else {
    console.error('Migration file not found');
  }
} catch (error) {
  console.error('Error in database setup:', error);
}

console.log('Database setup process completed');
