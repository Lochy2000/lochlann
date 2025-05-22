#!/usr/bin/env node
/**
 * Simple Vercel build script - Portfolio ONLY
 * This will ONLY build the portfolio/CV site, NOT the blog
 */

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname);

console.log('==== VERCEL PORTFOLIO BUILD ====');
console.log('Building portfolio only...');

// Function to run a command
function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    
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

// Function to copy directory recursively
function copyDirectory(source, destination) {
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

async function buildForVercel() {
  try {
    // Build the portfolio using vite
    await runCommand('npx', ['vite', 'build'], projectRoot);
    
    console.log('✅ Portfolio build completed');
    
    // Copy attached_assets to the dist directory so they're accessible
    const assetsSource = path.join(projectRoot, 'attached_assets');
    const assetsDestination = path.join(projectRoot, 'dist', 'attached_assets');
    
    if (fs.existsSync(assetsSource)) {
      console.log('📁 Copying attached assets...');
      copyDirectory(assetsSource, assetsDestination);
      console.log('✅ Assets copied successfully');
    }
    
    // Also copy to public directory for consistency
    const publicAssetsDestination = path.join(projectRoot, 'dist', 'public', 'attached_assets');
    if (fs.existsSync(assetsSource)) {
      console.log('📁 Copying attached assets to public...');
      copyDirectory(assetsSource, publicAssetsDestination);
      console.log('✅ Public assets copied successfully');
    }
    
    // Verify the build
    const buildPath = path.join(projectRoot, 'dist', 'public');
    if (fs.existsSync(buildPath)) {
      console.log('✅ Build output verified at:', buildPath);
      
      // List contents
      const files = fs.readdirSync(buildPath);
      console.log('Build contains:', files.join(', '));
      
      if (files.includes('index.html')) {
        console.log('✅ index.html found');
      } else {
        throw new Error('index.html missing from build');
      }
    } else {
      throw new Error('Build output directory not found');
    }
    
    console.log('🎉 Portfolio build ready for Vercel!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildForVercel();
