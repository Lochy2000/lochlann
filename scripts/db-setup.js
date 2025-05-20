// Script to set up the database
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting database setup...');

try {
  // Generate the SQL for migrations
  console.log('Generating migration SQL...');
  execSync('npx drizzle-kit generate:pg', {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit'
  });
  
  console.log('Running database setup...');
  execSync('tsx server/setupDatabase.ts', {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit'
  });
  
  console.log('Database setup completed successfully!');
} catch (error) {
  console.error('Error setting up database:', error);
  process.exit(1);
}
