#!/usr/bin/env node
/**
 * Portfolio-only build script for Vercel deployment.
 * This script ONLY builds the CV/Portfolio part, not the blog.
 * The blog should be deployed separately.
 */

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../');

console.log('==== PORTFOLIO-ONLY BUILD SCRIPT STARTED ====');
console.log('Current directory:', process.cwd());
console.log('Project root:', projectRoot);

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

async function buildPortfolioOnly() {
  try {
    console.log('==== BUILDING PORTFOLIO ONLY ====');
    
    // Build just the main CV/Portfolio site using the existing vite config
    await runCommand('npm', ['run', 'build'], projectRoot);
    
    console.log('==== PORTFOLIO BUILD COMPLETED SUCCESSFULLY ====');
    
    // Verify the build output
    const outputDir = path.join(projectRoot, 'dist', 'public');
    if (fs.existsSync(outputDir)) {
      console.log('✅ Portfolio build output found at:', outputDir);
      
      // List the contents
      console.log('Build output contents:');
      const files = fs.readdirSync(outputDir);
      files.forEach(file => {
        const filePath = path.join(outputDir, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        console.log(`  ${isDirectory ? '[DIR]' : '[FILE]'} ${file}`);
        
        // Show contents of subdirectories
        if (isDirectory) {
          const subFiles = fs.readdirSync(filePath);
          subFiles.forEach(subFile => {
            console.log(`    [FILE] ${subFile}`);
          });
        }
      });
      
      // Verify critical files exist
      const indexPath = path.join(outputDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        console.log('✅ index.html found');
      } else {
        console.error('❌ index.html missing');
      }
    } else {
      console.error('❌ Portfolio build output directory not found:', outputDir);
      throw new Error('Build output not found');
    }
    
    console.log('==== PORTFOLIO-ONLY BUILD COMPLETED SUCCESSFULLY ====');
    
  } catch (error) {
    console.error('==== PORTFOLIO BUILD FAILED ====');
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

// Run the build process
buildPortfolioOnly();
