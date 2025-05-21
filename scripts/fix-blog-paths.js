#! /usr/bin/env node
/**
 * Simple script to fix asset paths in the blog HTML files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the blog index.html file
const blogIndexPath = path.join(__dirname, '..', 'dist', 'blog', 'index.html');

// Check if the file exists
if (!fs.existsSync(blogIndexPath)) {
  console.error(`Blog index file not found: ${blogIndexPath}`);
  process.exit(1);
}

// Read the file
console.log(`Reading blog index: ${blogIndexPath}`);
let content = fs.readFileSync(blogIndexPath, 'utf8');

// Fix asset paths - first identify any asset paths
const assetMatches = content.match(/src="([^"]+)"|href="([^"]+)"/g);
if (assetMatches) {
  console.log('Found asset references:');
  assetMatches.forEach(match => console.log(`  ${match}`));
  
  // Fix relative paths to absolute paths with /blog prefix
  content = content.replace(/src="\.\//g, 'src="/blog/');
  content = content.replace(/href="\.\//g, 'href="/blog/');
  
  // Fix already absolute paths to have /blog prefix
  content = content.replace(/src="\/assets\//g, 'src="/blog/assets/');
  content = content.replace(/href="\/assets\//g, 'href="/blog/assets/');
  
  // Remove any base tags
  content = content.replace(/<base[^>]*>/g, '');
}

// Write the file back
console.log(`Writing updated blog index: ${blogIndexPath}`);
fs.writeFileSync(blogIndexPath, content);

console.log('Blog paths fixed successfully!');

// List all assets in the blog directory for debugging
console.log('\nListing blog assets:');
function listFiles(dir, prefix = '') {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      console.log(`${prefix}[DIR] ${file}`);
      listFiles(filePath, `${prefix}  `);
    } else {
      console.log(`${prefix}[FILE] ${file}`);
    }
  });
}

listFiles(path.join(__dirname, '..', 'dist', 'blog'));