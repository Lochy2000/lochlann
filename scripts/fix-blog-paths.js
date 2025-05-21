#! /usr/bin/env node
/**
 * Simple script to fix asset paths in the blog HTML files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('==== BLOG PATH FIXING SCRIPT STARTED ====');

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Current script directory:', __dirname);

// Path to the blog index.html file
const blogIndexPath = path.join(__dirname, '..', 'dist', 'blog', 'index.html');
console.log('Blog index file path:', blogIndexPath);

// Check if the file exists
if (!fs.existsSync(blogIndexPath)) {
  console.error(`==== ERROR: Blog index file not found: ${blogIndexPath} ====`);
  
  // Let's check if the directory exists
  const blogDir = path.join(__dirname, '..', 'dist', 'blog');
  if (fs.existsSync(blogDir)) {
    console.log('Blog directory exists, but index.html is missing.');
    console.log('Files in the blog directory:');
    try {
      const files = fs.readdirSync(blogDir);
      files.forEach(file => console.log(`  - ${file}`));
    } catch (error) {
      console.error('Error reading blog directory:', error.message);
    }
  } else {
    console.error('Blog directory does not exist. The blog was likely not built or copied properly.');
    
    // Let's check the dist directory
    const distDir = path.join(__dirname, '..', 'dist');
    if (fs.existsSync(distDir)) {
      console.log('Dist directory exists. Contents:');
      try {
        const files = fs.readdirSync(distDir);
        files.forEach(file => console.log(`  - ${file}`));
      } catch (error) {
        console.error('Error reading dist directory:', error.message);
      }
    } else {
      console.error('Dist directory does not exist. The build process likely failed.');
    }
  }
  
  // Let's check if the blog was built but not copied
  const originalBlogDist = path.join(__dirname, '..', 'blog', 'dist');
  if (fs.existsSync(originalBlogDist)) {
    console.log('Original blog dist directory exists. This suggests the blog was built but not copied.');
    try {
      const files = fs.readdirSync(originalBlogDist);
      if (files.includes('index.html')) {
        console.log('Blog index.html exists in the original blog dist directory.');
        console.log('Will attempt to copy it to the right location...');
        
        // Create the target directory if it doesn't exist
        if (!fs.existsSync(blogDir)) {
          fs.mkdirSync(blogDir, { recursive: true });
          console.log('Created missing blog directory in dist');
        }
        
        // Copy the index.html file
        fs.copyFileSync(
          path.join(originalBlogDist, 'index.html'),
          blogIndexPath
        );
        console.log('Successfully copied blog index.html from original location');
        
        // Copy other files too
        files.forEach(file => {
          const source = path.join(originalBlogDist, file);
          const destination = path.join(blogDir, file);
          
          if (fs.statSync(source).isDirectory()) {
            // For directories, copy recursively
            if (!fs.existsSync(destination)) {
              fs.mkdirSync(destination, { recursive: true });
            }
            copyDirectory(source, destination);
          } else {
            // For files, just copy
            fs.copyFileSync(source, destination);
          }
        });
        console.log('Successfully copied all blog files from original location');
      } else {
        console.log('Blog index.html not found in the original blog dist directory either.');
      }
    } catch (error) {
      console.error('Error processing original blog dist directory:', error.message);
    }
  } else {
    console.log('Original blog dist directory not found. This suggests the blog was not built.');
  }
  
  // Continue with the script anyway to see if there are other issues
  console.log('Will continue execution for diagnostic purposes...');
} else {
  console.log('Blog index file found. Proceeding with path fixing...');
}

// Function to copy directory recursively
function copyDirectory(source, destination) {
  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourceFile = path.join(source, file);
    const destFile = path.join(destination, file);
    
    if (fs.statSync(sourceFile).isDirectory()) {
      if (!fs.existsSync(destFile)) {
        fs.mkdirSync(destFile, { recursive: true });
      }
      copyDirectory(sourceFile, destFile);
    } else {
      fs.copyFileSync(sourceFile, destFile);
    }
  }
}

// Read the file if it exists
try {
  if (fs.existsSync(blogIndexPath)) {
    console.log(`Reading blog index: ${blogIndexPath}`);
    let content = fs.readFileSync(blogIndexPath, 'utf8');

    // Fix asset paths - first identify any asset paths
    const assetMatches = content.match(/src="([^"]+)"|href="([^"]+)"/g);
    if (assetMatches) {
      console.log('Found asset references:', assetMatches.length);
      console.log('Sample asset references:');
      assetMatches.slice(0, 5).forEach(match => console.log(`  ${match}`));
      
      // Fix relative paths to absolute paths with /blog prefix
      content = content.replace(/src="\.\//g, 'src="/blog/');
      content = content.replace(/href="\.\//g, 'href="/blog/');
      
      // Fix already absolute paths to have /blog prefix
      content = content.replace(/src="\/assets\//g, 'src="/blog/assets/');
      content = content.replace(/href="\/assets\//g, 'href="/blog/assets/');
      
      // Remove any base tags
      content = content.replace(/<base[^>]*>/g, '');
      
      // Write the file back
      console.log(`Writing updated blog index: ${blogIndexPath}`);
      fs.writeFileSync(blogIndexPath, content);
      console.log('Blog paths fixed successfully!');
    } else {
      console.log('No asset references found in the blog index.');
    }
  } else {
    console.log('Skipping file operations as index.html does not exist.');
  }
} catch (error) {
  console.error('Error during blog path fixing:', error.message);
}

// List all assets in the blog directory for debugging
console.log('\n==== LISTING BLOG ASSETS ====');
function listFiles(dir, prefix = '') {
  if (!fs.existsSync(dir)) {
    console.log(`${prefix}Directory does not exist: ${dir}`);
    return;
  }
  
  try {
    const files = fs.readdirSync(dir);
    console.log(`${prefix}Directory ${dir} contains ${files.length} files/directories`);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          console.log(`${prefix}[DIR] ${file}`);
          // Only go one level deep to avoid excessive output
          if (prefix.length < 4) {
            listFiles(filePath, `${prefix}  `);
          }
        } else {
          console.log(`${prefix}[FILE] ${file}`);
        }
      } catch (statError) {
        console.error(`${prefix}Error stating file ${filePath}:`, statError.message);
      }
    });
  } catch (error) {
    console.error(`${prefix}Error reading directory ${dir}:`, error.message);
  }
}

listFiles(path.join(__dirname, '..', 'dist', 'blog'));

// Check the public directory as well
console.log('\n==== CHECKING PUBLIC DIRECTORY ====');
listFiles(path.join(__dirname, '..', 'dist', 'public'));

console.log('==== BLOG PATH FIXING SCRIPT COMPLETED ====');