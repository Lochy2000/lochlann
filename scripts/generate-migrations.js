// Script to generate migrations using Drizzle Kit
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the migrations directory exists
const migrationsDir = path.resolve(__dirname, '../migrations');
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

console.log('Generating database migrations...');

try {
  // Run the Drizzle Kit migration generator
  execSync('npx drizzle-kit generate:pg', {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit'
  });
  
  console.log('Migrations generated successfully!');
} catch (error) {
  console.error('Error generating migrations:', error);
  process.exit(1);
}
