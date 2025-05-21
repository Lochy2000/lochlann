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

// Clean up any existing output directories
console.log('==== CLEANING OUTPUT DIRECTORIES ====');
[mainOutputDir, publicOutputDir, blogOutputDir].forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Removing existing directory: ${dir}`);
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Directory removed: ${dir}`);
  }
});

// Create the output directories
console.log('Creating fresh output directories...');
[mainOutputDir, publicOutputDir, blogOutputDir].forEach(dir => {
  console.log(`Creating directory: ${dir}`);
  fs.mkdirSync(dir, { recursive: true });
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

// Function to fix paths in portfolio index.html
function fixPortfolioIndexPaths() {
  const indexPath = path.join(publicOutputDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log(`Fixing asset paths in ${indexPath}`);
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Fix asset paths
    content = content.replace(/src="\/assets\//g, 'src="/public/assets/');
    content = content.replace(/href="\/assets\//g, 'href="/public/assets/');
    
    // Remove base tag which might be causing issues
    content = content.replace(/<base[^>]*>/, '');
    
    // Write the file back
    fs.writeFileSync(indexPath, content);
    console.log('Portfolio asset paths fixed');
  } else {
    console.error(`Could not find index.html at ${indexPath}`);
  }
}

// Function to fix paths in blog index.html
function fixBlogIndexPaths() {
  const indexPath = path.join(blogOutputDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log(`Fixing asset paths in ${indexPath}`);
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Fix asset paths
    content = content.replace(/src="\/assets\//g, 'src="/blog/assets/');
    content = content.replace(/href="\/assets\//g, 'href="/blog/assets/');
    
    // Remove base tag which might be causing issues
    content = content.replace(/<base[^>]*>/, '');
    
    // Write the file back
    fs.writeFileSync(indexPath, content);
    console.log('Blog asset paths fixed');
  } else {
    console.error(`Could not find blog index.html at ${indexPath}`);
  }
}

// Function to create a root index.html that redirects to the portfolio
function createRootRedirect() {
  // First, let's see if we can just copy the public/index.html to root
  const publicIndexPath = path.join(publicOutputDir, 'index.html');
  const rootIndexPath = path.join(mainOutputDir, 'index.html');
  
  if (fs.existsSync(publicIndexPath)) {
    // Copy the portfolio index.html to the root
    fs.copyFileSync(publicIndexPath, rootIndexPath);
    console.log(`Copied portfolio index.html to root`);
  } else {
    // Fallback to a redirect
    const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=/public/index.html">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting to Portfolio...</title>
    <script>
        window.location.href = "/public/index.html";
    </script>
</head>
<body>
    <p>Redirecting to portfolio...</p>
</body>
</html>
    `.trim();
    
    fs.writeFileSync(rootIndexPath, content);
    console.log(`Created redirect at ${rootIndexPath}`);
  }
}

async function build() {
  console.log('==== BUILD SCRIPT STARTED ====');
  console.log('Current directory:', process.cwd());
  console.log('Project root:', projectRoot);
  
  try {
    // Build the main CV/Portfolio site
    console.log('==== STARTING CV BUILD ====');
    try {
      await runCommand('npm', ['run', 'build'], cvPath);
      console.log('==== CV BUILD COMPLETED SUCCESSFULLY ====');
    } catch (cvError) {
      console.error('==== CV BUILD FAILED ====');
      console.error('Error details:', cvError.message);
      // Continue anyway so we can still try to build the blog
      console.log('Continuing to blog build despite CV build error...');
    }
    
    // Build the blog
    console.log('==== STARTING BLOG BUILD ====');
    console.log('Blog path:', blogPath);
    console.log('Files in blog directory:', fs.readdirSync(blogPath).join(', '));
    
    try {
      // Always use the custom build script for the blog
      console.log('Building blog with custom build-no-ts.js script...');
      if (fs.existsSync(path.join(blogPath, 'build-no-ts.js'))) {
        await runCommand('node', ['build-no-ts.js'], blogPath);
        console.log('Blog built successfully with build-no-ts.js');
      } else {
        console.error('Custom build script not found, falling back to standard build');
        await runCommand('npm', ['run', 'build'], blogPath);
      }
      
      console.log('==== BLOG BUILD COMPLETED SUCCESSFULLY ====');
      
      // Verify the blog build output
      const blogDistDir = path.join(blogPath, 'dist');
      console.log('Checking blog build output directory:', blogDistDir);
      if (fs.existsSync(blogDistDir)) {
        console.log('Blog dist directory contents:');
        fs.readdirSync(blogDistDir).forEach(file => console.log(`  - ${file}`));
      } else {
        console.error('Blog dist directory not found after build!');
      }
    } catch (blogError) {
      console.error('==== BLOG BUILD FAILED ====');
      console.error('Error details:', blogError.message);
      console.log('Continuing with the build process despite blog build errors');
    }
    
    // Check if blog dist directory was created
    console.log('Checking if blog dist directory exists...');
    const blogDistExists = fs.existsSync(path.join(blogPath, 'dist'));
    console.log(`Blog dist directory exists: ${blogDistExists}`);
    if (blogDistExists) {
      console.log('Blog dist directory contents:');
      fs.readdirSync(path.join(blogPath, 'dist')).forEach(file => {
        console.log(`  - ${file}`);
      });
    }
    
    // Copy main site build to the public directory
    console.log('==== COPYING MAIN SITE BUILD ====');
    const clientBuildDir = path.join(cvPath, 'dist', 'public');
    if (fs.existsSync(clientBuildDir)) {
      copyDirectory(clientBuildDir, publicOutputDir);
      console.log('Main site build copied successfully');
    } else {
      console.warn('Warning: Main site build directory not found at expected location:', clientBuildDir);
      console.warn('Checking alternate location...');
      
      // Try alternate location
      const altBuildDir = path.join(cvPath, 'client', 'dist');
      if (fs.existsSync(altBuildDir)) {
        copyDirectory(altBuildDir, publicOutputDir);
        console.log('Main site build copied from alternate location');
      } else {
        console.error('Error: Could not find main site build directory');
        // Continue instead of exiting to see if we can still copy the blog
      }
    }
    
    // Copy blog build to the blog directory
    console.log('==== COPYING BLOG BUILD ====');
    const blogBuildDir = path.join(blogPath, 'dist');
    console.log(`Looking for blog build at: ${blogBuildDir}`);
    
    if (fs.existsSync(blogBuildDir)) {
      // First clear the target directory to avoid mixing old and new files
      if (fs.existsSync(blogOutputDir)) {
        console.log(`Clearing existing blog output directory: ${blogOutputDir}`);
        fs.rmSync(blogOutputDir, { recursive: true, force: true });
        fs.mkdirSync(blogOutputDir, { recursive: true });
      }
      
      console.log(`Copying from ${blogBuildDir} to ${blogOutputDir}`);
      copyDirectory(blogBuildDir, blogOutputDir);
      
      // Verify the copy worked
      if (fs.existsSync(path.join(blogOutputDir, 'index.html'))) {
        console.log('Blog index.html copied successfully');
      } else {
        console.error('Blog index.html failed to copy!');
      }
      
      console.log('Blog build copied successfully');
    } else {
      console.error(`Error: Could not find blog build directory: ${blogBuildDir}`);
      console.log('Continuing without blog build');
    }
    
    // Create a version marker file to track which build was deployed
    try {
      const versionMarkerPath = path.join(blogOutputDir, 'version-info.json');
      console.log(`Creating version marker at: ${versionMarkerPath}`);
      
      const versionInfo = {
        buildTime: new Date().toISOString(),
        buildMachine: process.env.COMPUTERNAME || 'unknown',
        buildType: process.env.VERCEL ? 'vercel' : 'local',
        buildCommit: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
        customMarker: "build-v2-with-admin-" + Date.now()
      };
      
      fs.writeFileSync(versionMarkerPath, JSON.stringify(versionInfo, null, 2));
      console.log('Version marker created successfully');
    } catch (versionError) {
      console.error('Failed to create version marker:', versionError.message);
    }
    
    // Fix asset paths
    console.log('==== FIXING ASSET PATHS ====');
    try {
      fixPortfolioIndexPaths();
      console.log('Portfolio asset paths fixed');
    } catch (portfolioPathError) {
      console.error('Error fixing portfolio paths:', portfolioPathError.message);
    }
    
    try {
      fixBlogIndexPaths();
      console.log('Blog asset paths fixed');
    } catch (blogPathError) {
      console.error('Error fixing blog paths:', blogPathError.message);
    }
    
    // Create root redirect
    console.log('==== CREATING ROOT REDIRECT ====');
    try {
      createRootRedirect();
      console.log('Root redirect created');
    } catch (redirectError) {
      console.error('Error creating root redirect:', redirectError.message);
    }
    
    console.log('==== BUILD PROCESS COMPLETED ====');
    console.log(`The unified build is available in: ${mainOutputDir}`);
    console.log(`Main site: ${publicOutputDir}`);
    console.log(`Blog: ${blogOutputDir}`);
    
    // List the final dist directory structure for verification
    console.log('Final build directory structure:');
    listDirectory(mainOutputDir, '  ');
    
  } catch (error) {
    console.error('==== BUILD FAILED ====');
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

// Helper function to list directory contents
function listDirectory(dir, prefix = '') {
  if (!fs.existsSync(dir)) {
    console.log(`${prefix}Directory does not exist: ${dir}`);
    return;
  }
  
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      console.log(`${prefix}${isDirectory ? '[DIR]' : '[FILE]'} ${file}`);
      
      // Only list subdirectories up to 1 level deep to avoid excessive output
      if (isDirectory && prefix.length < 4) {
        listDirectory(filePath, `${prefix}  `);
      }
    });
  } catch (error) {
    console.error(`${prefix}Error reading directory ${dir}:`, error.message);
  }
}

// Run the build process
build();