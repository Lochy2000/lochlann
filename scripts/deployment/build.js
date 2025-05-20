#! /usr/bin/env node
/**
 * Unified build script for the entire project.
 * This script builds both the CV and blog parts of the site.
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

// Output directory for the unified build
const outputDir = path.join(projectRoot, 'dist');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

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

async function build() {
  try {
    // Build the main CV/Portfolio site
    console.log('Building CV/Portfolio site...');
    await runCommand('npm', ['run', 'build'], cvPath);
    
    // Build the blog
    console.log('Building Blog...');
    await runCommand('npm', ['run', 'build'], blogPath);
    
    // Copy main site build to the output directory
    console.log('Copying main site build to output directory...');
    // Assume the vite build output is in the 'dist' directory
    copyDirectory(path.join(cvPath, 'dist'), outputDir);
    
    // Create a blog directory in the output directory
    const blogOutputDir = path.join(outputDir, 'blog');
    if (!fs.existsSync(blogOutputDir)) {
      fs.mkdirSync(blogOutputDir, { recursive: true });
    }
    
    // Copy blog build to the blog directory
    console.log('Copying blog build to output directory...');
    copyDirectory(path.join(blogPath, 'dist'), blogOutputDir);
    
    console.log('Build completed successfully!');
    console.log(`The unified build is available in: ${outputDir}`);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run the build process
build();
