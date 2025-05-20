// This script checks if the build output is correct for Vercel deployment
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const distPath = path.join(projectRoot, 'dist');
const publicPath = path.join(distPath, 'public');
const blogPath = path.join(distPath, 'blog');

console.log('Checking build output for Vercel deployment...');

// Check if directories exist
const directories = [
  { path: distPath, name: 'dist' },
  { path: publicPath, name: 'dist/public' },
  { path: blogPath, name: 'dist/blog' }
];

let success = true;

for (const dir of directories) {
  if (fs.existsSync(dir.path)) {
    console.log(`✅ ${dir.name} directory exists`);
    
    // Check if the directory has files
    const files = fs.readdirSync(dir.path);
    console.log(`   Contains ${files.length} files/directories`);
    
    if (files.length === 0) {
      console.log(`❌ Warning: ${dir.name} is empty`);
      success = false;
    }
  } else {
    console.log(`❌ Error: ${dir.name} directory does not exist`);
    success = false;
  }
}

// Check if index.html files exist
const indexFiles = [
  { path: path.join(distPath, 'index.html'), name: 'dist/index.html' },
  { path: path.join(publicPath, 'index.html'), name: 'dist/public/index.html' },
  { path: path.join(blogPath, 'index.html'), name: 'dist/blog/index.html' }
];

for (const file of indexFiles) {
  if (fs.existsSync(file.path)) {
    console.log(`✅ ${file.name} file exists`);
  } else {
    console.log(`❌ Error: ${file.name} file does not exist`);
    success = false;
  }
}

// Final verdict
if (success) {
  console.log('\n✅ Build output looks good for Vercel deployment!');
} else {
  console.log('\n❌ There are issues with the build output that might cause deployment problems.');
  console.log('   Please check the errors above and fix them before deploying.');
}
