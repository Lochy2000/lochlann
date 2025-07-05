#!/usr/bin/env node

/**
 * Fixed build script for blog deployment 
 * This script runs vite build and then copies only necessary public assets
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

console.log('==== BLOG BUILD SCRIPT (FIXED) ====');

// Get paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('Running vite build...');

// Run vite build FIRST
const child = spawn('npx', ['vite', 'build'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('Vite build completed successfully!');
    
    // Now copy only non-HTML assets from public directory
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
      console.log('Copying non-HTML public assets...');
      
      const copyFile = (src, dest) => {
        fs.copyFileSync(src, dest);
      };
      
      const entries = fs.readdirSync(publicDir, { withFileTypes: true });
      
      for (const entry of entries) {
        const srcPath = path.join(publicDir, entry.name);
        const destPath = path.join(distDir, entry.name);
        
        if (entry.isFile()) {
          // Only copy non-HTML files and specific assets we need
          const ext = path.extname(entry.name).toLowerCase();
          const allowedExtensions = ['.css', '.js', '.json', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'];
          const allowedFiles = ['admin.js', 'home-fix.js', 'editor-fix.css'];
          
          if (allowedExtensions.includes(ext) || allowedFiles.includes(entry.name)) {
            copyFile(srcPath, destPath);
            console.log(`Copied: ${entry.name}`);
          } else {
            console.log(`Skipped HTML file: ${entry.name}`);
          }
        }
      }
      
      console.log('Public assets copied successfully (HTML files excluded).');
    }
    
    console.log('✅ Blog build completed successfully!');
  } else {
    console.error(`❌ Build failed with code ${code}`);
    
    // Create a simple fallback index.html
    fs.writeFileSync(
      path.join(distDir, 'index.html'),
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lochlann's Blog</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 40px auto; padding: 0 20px; line-height: 1.6; }
    h1 { line-height: 1.2; }
  </style>
</head>
<body>
  <h1>Lochlann's Blog</h1>
  <p>The blog is currently being updated. Please check back soon!</p>
  <p><a href="/">Return to main site</a></p>
</body>
</html>`
    );
    
    console.log('Created fallback index.html');
  }
});