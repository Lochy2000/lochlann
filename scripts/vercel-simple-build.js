#! /usr/bin/env node
/**
 * Simplified build script specifically for Vercel deployment
 */

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Output directories
const outputDir = path.join(projectRoot, 'dist');
const publicDir = path.join(outputDir, 'public');
const blogDir = path.join(outputDir, 'blog');

// Create the output directories
[outputDir, publicDir, blogDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to run a command
function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    console.log(`Running command: ${command} ${args.join(' ')} in ${cwd}`);
    
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

// Simple function to copy a directory
function copyDirectory(source, destination) {
  console.log(`Copying from ${source} to ${destination}`);
  
  if (!fs.existsSync(source)) {
    console.error(`Source directory does not exist: ${source}`);
    return false;
  }
  
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
  
  return true;
}

async function build() {
  try {
    // Create a simple landing page for the root
    console.log('Creating a landing page...');
    const rootIndexHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=/public/">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to the main site...</p>
</body>
</html>
    `;
    fs.writeFileSync(path.join(outputDir, 'index.html'), rootIndexHtml);
    
    // Create a simple static page for the public directory
    console.log('Creating a test page in public directory...');
    const publicHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Main Site</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>Main Site</h1>
  <p>This is a test page for the main site.</p>
  <p><a href="/blog/">Go to Blog</a></p>
</body>
</html>
    `;
    fs.writeFileSync(path.join(publicDir, 'index.html'), publicHtml);
    
    // Create a simple static page for the blog directory
    console.log('Creating a test page in blog directory...');
    const blogHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Blog</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>Blog</h1>
  <p>This is a test page for the blog.</p>
  <p><a href="/public/">Go to Main Site</a></p>
</body>
</html>
    `;
    fs.writeFileSync(path.join(blogDir, 'index.html'), blogHtml);
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run the build process
build();