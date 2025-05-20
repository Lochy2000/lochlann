#! /usr/bin/env node
/**
 * Debug build script for Vercel
 * This script shows the environment and creates a simple static site for debugging
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Output directory
const outputDir = path.join(projectRoot, 'dist');
const publicDir = path.join(outputDir, 'public');
const blogDir = path.join(outputDir, 'blog');

// Create directories
[outputDir, publicDir, blogDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Get debug info
const debugInfo = {
  environment: process.env,
  directories: {
    cwd: process.cwd(),
    projectRoot,
    outputDir,
    publicDir,
    blogDir
  },
  exists: {
    outputDir: fs.existsSync(outputDir),
    publicDir: fs.existsSync(publicDir),
    blogDir: fs.existsSync(blogDir)
  }
};

// Create index.html in the dist directory
const indexHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Debug Info</title>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    pre { background: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; }
  </style>
</head>
<body>
  <h1>Debug Info</h1>
  <pre>${JSON.stringify(debugInfo, null, 2)}</pre>
  
  <h2>Navigation</h2>
  <ul>
    <li><a href="/public/">Public Directory</a></li>
    <li><a href="/blog/">Blog Directory</a></li>
  </ul>
</body>
</html>
`;

// Create index files
fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);

// Create a simple public index.html
const publicHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Public Directory</title>
  <meta charset="utf-8">
</head>
<body>
  <h1>Public Directory</h1>
  <p>This is the main site content.</p>
  <a href="/">Back to Debug</a>
</body>
</html>
`;
fs.writeFileSync(path.join(publicDir, 'index.html'), publicHtml);

// Create a simple blog index.html
const blogHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Blog Directory</title>
  <meta charset="utf-8">
</head>
<body>
  <h1>Blog Directory</h1>
  <p>This is the blog content.</p>
  <a href="/">Back to Debug</a>
</body>
</html>
`;
fs.writeFileSync(path.join(blogDir, 'index.html'), blogHtml);

console.log('Debug build completed successfully!');
console.log(`Created debug files in ${outputDir}`);
