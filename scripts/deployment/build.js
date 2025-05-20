#! /usr/bin/env node
/**
 * Unified build script for the entire project.
 * This script builds both the CV and blog parts of the site.
 * Optimized for Vercel deployment.
 * 
 * Usage:
 *   node scripts/deployment/build.js
 */

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Paths for both projects
const cvPath = projectRoot;
const blogPath = path.join(projectRoot, 'blog');

// Output directories
const mainOutputDir = path.join(projectRoot, 'dist');
const publicOutputDir = path.join(mainOutputDir, 'public');
const blogOutputDir = path.join(mainOutputDir, 'blog');

// Create the output directories if they don't exist
[mainOutputDir, publicOutputDir, blogOutputDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to run a command in a specific directory
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

// Function to copy files from one directory to another
function copyDirectory(source, destination) {
  console.log(`Copying from ${source} to ${destination}`);
  
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourceFile = path.join(source, file);
    const destFile = path.join(destination, file);
    
    if (fs.statSync(sourceFile).isDirectory()) {
      copyDirectory(sourceFile, destFile);
    } else {
      fs.copyFileSync(sourceFile, destFile);
    }
  }
}

// Function to create a simple index.html redirect file
function createIndexRedirect() {
  const indexPath = path.join(mainOutputDir, 'index.html');
  const content = `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0;url=/public/index.html">
    <title>Redirecting...</title>
  </head>
  <body>
    Redirecting to main site...
  </body>
</html>
  `.trim();
  
  fs.writeFileSync(indexPath, content);
  console.log(`Created redirect at ${indexPath}`);
}

async function build() {
  try {
    // Build the main CV/Portfolio site
    console.log('Building CV/Portfolio site...');
    await runCommand('npm', ['run', 'build'], cvPath);
    
    // Build the blog
    console.log('Building Blog...');
    await runCommand('npm', ['run', 'build'], blogPath);
    
    // Copy main site build to the public directory
    console.log('Copying main site build to public directory...');
    const clientBuildDir = path.join(cvPath, 'dist', 'public');
    if (fs.existsSync(clientBuildDir)) {
      copyDirectory(clientBuildDir, publicOutputDir);
    } else {
      console.warn('Warning: Main site build directory not found at expected location:', clientBuildDir);
      console.warn('Checking alternate location...');
      
      // Try alternate location
      const altBuildDir = path.join(cvPath, 'client', 'dist');
      if (fs.existsSync(altBuildDir)) {
        copyDirectory(altBuildDir, publicOutputDir);
      } else {
        console.error('Error: Could not find main site build directory');
        process.exit(1);
      }
    }
    
    // Copy blog build to the blog directory
    console.log('Copying blog build to blog directory...');
    const blogBuildDir = path.join(blogPath, 'dist');
    if (fs.existsSync(blogBuildDir)) {
      copyDirectory(blogBuildDir, blogOutputDir);
    } else {
      console.error('Error: Could not find blog build directory:', blogBuildDir);
      process.exit(1);
    }
    
    // Create index.html redirect in the root
    createIndexRedirect();
    
    // Create a .vercel directory to indicate this is a static site
    const vercelDir = path.join(mainOutputDir, '.vercel');
    if (!fs.existsSync(vercelDir)) {
      fs.mkdirSync(vercelDir, { recursive: true });
    }
    
    console.log('Build completed successfully!');
    console.log(`The unified build is available in: ${mainOutputDir}`);
    console.log(`Main site: ${publicOutputDir}`);
    console.log(`Blog: ${blogOutputDir}`);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run the build process
build();