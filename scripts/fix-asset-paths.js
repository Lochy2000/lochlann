#! /usr/bin/env node
/**
 * Simple script to fix asset paths in the built HTML files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the index.html file
const indexPath = path.join(__dirname, '..', 'dist', 'public', 'index.html');

// Check if the file exists
if (!fs.existsSync(indexPath)) {
  console.error(`File not found: ${indexPath}`);
  process.exit(1);
}

// Read the file
console.log(`Reading file: ${indexPath}`);
let content = fs.readFileSync(indexPath, 'utf8');

// Fix asset paths
console.log('Fixing asset paths...');
content = content.replace(/src="\/assets\//g, 'src="/public/assets/');
content = content.replace(/href="\/assets\//g, 'href="/public/assets/');

// Remove base tag which might be causing issues
console.log('Removing base tag...');
content = content.replace(/<base href="\/" \/>\s*/, '');

// Write the file back
console.log(`Writing file: ${indexPath}`);
fs.writeFileSync(indexPath, content);

console.log('Asset paths fixed successfully!');
