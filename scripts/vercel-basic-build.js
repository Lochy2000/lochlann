#! /usr/bin/env node
/**
 * Ultra-simple build script for Vercel deployment
 * This is a bare-bones script to create a working deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Output directory
const distDir = path.join(projectRoot, 'dist');
const staticDir = path.join(distDir, 'static');

// Create directories if they don't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Create a minimal index.html in the dist directory
const indexHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio</title>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>Lochlann O'Higgins</h1>
  <p>Welcome to my portfolio.</p>
  <p>This is a simple static site deployed on Vercel.</p>
</body>
</html>
`;

// Write the index.html file
fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
console.log('Created index.html in dist directory');

console.log('Basic build completed!');
