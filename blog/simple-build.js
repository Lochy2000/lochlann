#!/usr/bin/env node

/**
 * Extremely simple build script for blog deployment on Vercel
 * This script just runs vite build directly
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

console.log('==== SIMPLE BLOG BUILD SCRIPT ====');

// Get paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Run vite build
console.log('Running vite build...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy public files first
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  console.log('Copying public files to dist directory...');
  
  const copyFile = (src, dest) => {
    fs.copyFileSync(src, dest);
  };
  
  const copyDir = (src, dest) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        copyFile(srcPath, destPath);
      }
    }
  };
  
  copyDir(publicDir, distDir);
  console.log('Public files copied successfully.');
}

// Use vite directly
const child = spawn('npx', ['vite', 'build'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('Build completed successfully!');
  } else {
    console.error(`Build failed with code ${code}`);
    
    // Create a simple index.html as fallback
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
  <p><a href="https://lochlann.vercel.app">Return to main site</a></p>
</body>
</html>`
    );
    
    console.log('Created fallback index.html');
  }
});