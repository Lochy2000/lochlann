#!/usr/bin/env node

/**
 * Simple build script for blog that skips TypeScript validation
 * Use this for deployment only after manual fixes
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

console.log('==== BLOG CUSTOM BUILD SCRIPT STARTED ====');

// Debug environment variables (without revealing sensitive values)
console.log('Environment variables check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FIREBASE_API_KEY exists:', !!process.env.FIREBASE_API_KEY);
console.log('FIREBASE_AUTH_DOMAIN exists:', !!process.env.FIREBASE_AUTH_DOMAIN);
console.log('FIREBASE_PROJECT_ID exists:', !!process.env.FIREBASE_PROJECT_ID);
console.log('FIREBASE_STORAGE_BUCKET exists:', !!process.env.FIREBASE_STORAGE_BUCKET);
console.log('FIREBASE_MESSAGING_SENDER_ID exists:', !!process.env.FIREBASE_MESSAGING_SENDER_ID);
console.log('FIREBASE_APP_ID exists:', !!process.env.FIREBASE_APP_ID);
console.log('FIREBASE_MEASUREMENT_ID exists:', !!process.env.FIREBASE_MEASUREMENT_ID);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Blog build script directory:', __dirname);
console.log('Current working directory:', process.cwd());

// Check for essential files
const viteConfigPath = path.join(__dirname, 'vite.build.config.js');
console.log(`Checking Vite build config at: ${viteConfigPath}`);
if (fs.existsSync(viteConfigPath)) {
  console.log('✓ Vite build config found');
} else {
  console.error('✗ Vite build config not found - this is required for the build');
}

// Check for important project files
const packageJsonPath = path.join(__dirname, 'package.json');
const envPath = path.join(__dirname, '.env');
const envProductionPath = path.join(__dirname, '.env.production');

console.log('Checking project files:');
console.log(`- package.json: ${fs.existsSync(packageJsonPath) ? '✓ Found' : '✗ Missing'}`);
console.log(`- .env: ${fs.existsSync(envPath) ? '✓ Found' : '✗ Missing'}`);
console.log(`- .env.production: ${fs.existsSync(envProductionPath) ? '✓ Found' : '✗ Missing'}`);

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

async function build() {
  try {
    console.log('Building blog without TypeScript checks...');
    
    // Create a diagnostic file to prove this script ran
    const diagnosticPath = path.join(__dirname, 'dist');
    if (!fs.existsSync(diagnosticPath)) {
      fs.mkdirSync(diagnosticPath, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(diagnosticPath, 'build-diagnostic.json'),
      JSON.stringify({
        buildTime: new Date().toISOString(),
        builder: 'custom-blog-build-script',
        buildEnvironment: process.env.NODE_ENV || 'unknown',
        hasEnvVars: {
          FIREBASE_API_KEY: !!process.env.FIREBASE_API_KEY,
          FIREBASE_AUTH_DOMAIN: !!process.env.FIREBASE_AUTH_DOMAIN,
          FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID
        }
      }, null, 2)
    );
    console.log('Created build diagnostic file');
    
    // Use the custom config file
    await runCommand('npx', ['vite', 'build', '--config', 'vite.build.config.js'], __dirname);
    
    console.log('Blog build completed successfully!');
    
    // Verify the build output
    const distDir = path.join(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      console.log('Blog dist directory exists. Contents:');
      const files = fs.readdirSync(distDir);
      files.forEach(file => console.log(`  - ${file}`));
      
      // Check for critical files
      if (files.includes('index.html')) {
        console.log('✓ index.html found in build output');
      } else {
        console.error('✗ index.html not found in build output - this will cause issues');
      }
      
      if (files.includes('assets')) {
        console.log('✓ assets directory found in build output');
      } else {
        console.error('✗ assets directory not found in build output - this will cause issues');
      }
    } else {
      console.error('Blog dist directory not found after build - this is a critical error');
    }
  } catch (error) {
    console.error('Build failed:', error);
    console.error('Error stack:', error.stack);
    
    // Create a failure diagnostic file instead of exiting
    const diagnosticPath = path.join(__dirname, 'dist');
    if (!fs.existsSync(diagnosticPath)) {
      fs.mkdirSync(diagnosticPath, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(diagnosticPath, 'build-failure.json'),
      JSON.stringify({
        buildTime: new Date().toISOString(),
        error: {
          message: error.message,
          stack: error.stack
        }
      }, null, 2)
    );
    console.error('Created build failure diagnostic file');
    
    // Exit with error code for proper error reporting
    process.exit(1);
  }
}

// Run the build process
console.log('Starting blog build...');
build().then(() => {
  console.log('==== BLOG CUSTOM BUILD SCRIPT COMPLETED SUCCESSFULLY ====');
}).catch(err => {
  console.error('==== BLOG CUSTOM BUILD SCRIPT FAILED ====');
  console.error(err);
  process.exit(1);
});