#! /usr/bin/env node
/**
 * Utility script to verify build output structure
 * Run this after a build to check if everything is in place
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('==== BUILD VERIFICATION SCRIPT ====');
console.log('Checking build output at:', path.join(rootDir, 'dist'));

// Check main dist directory
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
  console.error('❌ ERROR: dist directory does not exist. Build failed.');
  process.exit(1);
}

// Check for public and blog directories
const publicDir = path.join(distDir, 'public');
const blogDir = path.join(distDir, 'blog');

console.log('\nChecking required directories:');
console.log(`- dist: ${fs.existsSync(distDir) ? '✅ exists' : '❌ missing'}`);
console.log(`- dist/public: ${fs.existsSync(publicDir) ? '✅ exists' : '❌ missing'}`);
console.log(`- dist/blog: ${fs.existsSync(blogDir) ? '✅ exists' : '❌ missing'}`);

// Check critical files
console.log('\nChecking critical files:');
const rootIndexPath = path.join(distDir, 'index.html');
const publicIndexPath = path.join(publicDir, 'index.html');
const blogIndexPath = path.join(blogDir, 'index.html');

console.log(`- dist/index.html: ${fs.existsSync(rootIndexPath) ? '✅ exists' : '❌ missing'}`);
console.log(`- dist/public/index.html: ${fs.existsSync(publicIndexPath) ? '✅ exists' : '❌ missing'}`);
console.log(`- dist/blog/index.html: ${fs.existsSync(blogIndexPath) ? '✅ exists' : '❌ missing'}`);

// Check for assets directories
const publicAssetsPath = path.join(publicDir, 'assets');
const blogAssetsPath = path.join(blogDir, 'assets');

console.log('\nChecking assets directories:');
console.log(`- dist/public/assets: ${fs.existsSync(publicAssetsPath) ? '✅ exists' : '❌ missing'}`);
console.log(`- dist/blog/assets: ${fs.existsSync(blogAssetsPath) ? '✅ exists' : '❌ missing'}`);

// Check for debug file
const debugFilePath = path.join(blogDir, 'debug.json');
console.log(`- dist/blog/debug.json: ${fs.existsSync(debugFilePath) ? '✅ exists' : '❌ missing'}`);

// Function to count files recursively
function countFiles(directory) {
  let count = 0;
  
  function traverse(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        traverse(filePath);
      } else {
        count++;
      }
    }
  }
  
  if (fs.existsSync(directory)) {
    traverse(directory);
  }
  
  return count;
}

// Count files in critical directories
console.log('\nFile count in key directories:');
if (fs.existsSync(publicDir)) {
  console.log(`- dist/public: ${countFiles(publicDir)} files`);
}
if (fs.existsSync(blogDir)) {
  console.log(`- dist/blog: ${countFiles(blogDir)} files`);
}

// Check content of index files
function checkIndexContent(filePath, name) {
  console.log(`\nAnalyzing ${name}:`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  Cannot analyze ${name} as it does not exist.`);
    return;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for basic HTML structure
    const hasDoctype = content.includes('<!DOCTYPE html>') || content.includes('<!doctype html>');
    const hasHtmlTag = content.includes('<html');
    const hasHeadTag = content.includes('<head');
    const hasBodyTag = content.includes('<body');
    
    console.log(`  - Has DOCTYPE: ${hasDoctype ? '✅' : '❌'}`);
    console.log(`  - Has HTML tag: ${hasHtmlTag ? '✅' : '❌'}`);
    console.log(`  - Has HEAD tag: ${hasHeadTag ? '✅' : '❌'}`);
    console.log(`  - Has BODY tag: ${hasBodyTag ? '✅' : '❌'}`);
    
    // Check for script and link tags
    const scriptMatches = content.match(/<script[^>]*>/g) || [];
    const linkMatches = content.match(/<link[^>]*>/g) || [];
    
    console.log(`  - Number of script tags: ${scriptMatches.length}`);
    console.log(`  - Number of link tags: ${linkMatches.length}`);
    
    // Check for asset paths
    const assetPaths = [];
    
    // Extract src attributes
    const srcMatches = content.match(/src="([^"]+)"/g) || [];
    srcMatches.forEach(match => {
      const path = match.substring(5, match.length - 1);
      assetPaths.push(path);
    });
    
    // Extract href attributes
    const hrefMatches = content.match(/href="([^"]+)"/g) || [];
    hrefMatches.forEach(match => {
      const path = match.substring(6, match.length - 1);
      assetPaths.push(path);
    });
    
    console.log(`  - Found ${assetPaths.length} asset paths`);
    console.log('  - Sample asset paths:');
    assetPaths.slice(0, 5).forEach(assetPath => {
      console.log(`    ${assetPath}`);
    });
    
    // Check for specific blog paths
    if (name === 'Blog index.html') {
      const hasBlogAssets = assetPaths.some(path => path.includes('/blog/assets/'));
      console.log(`  - Has /blog/assets/ paths: ${hasBlogAssets ? '✅' : '❌'}`);
    }
  } catch (error) {
    console.error(`  Error analyzing ${name}:`, error.message);
  }
}

// Check content of index.html files
if (fs.existsSync(blogIndexPath)) {
  checkIndexContent(blogIndexPath, 'Blog index.html');
}

console.log('\n==== BUILD VERIFICATION COMPLETE ====');
if (!fs.existsSync(blogDir) || !fs.existsSync(blogIndexPath)) {
  console.error('\n❌ CRITICAL ERROR: Blog files are missing. The build is incomplete.');
  process.exit(1);
} else {
  console.log('\n✅ Build structure appears to be correct.');
}
