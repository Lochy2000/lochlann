# Simple build script for Vercel deployment
# To run: node vercel-static-build.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a simple index.html for static deployment
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lochlann O'Higgins Portfolio</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      line-height: 1.6;
      color: #333;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 1.8rem;
      margin-top: 40px;
      margin-bottom: 10px;
      color: #555;
    }
    p {
      margin-bottom: 20px;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .section {
      margin-bottom: 40px;
    }
    .contact {
      background-color: #f7f7f7;
      padding: 20px;
      border-radius: 8px;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <h1>Lochlann O'Higgins</h1>
  <p>Software Developer | Web Enthusiast</p>
  
  <div class="section">
    <h2>About Me</h2>
    <p>Welcome to my portfolio! I am a passionate software developer with experience in modern web technologies and application development.</p>
    <p>This is a simple version of my portfolio that demonstrates a successful Vercel deployment. I'm working on a more comprehensive version that will showcase my projects, experience, and blog.</p>
  </div>
  
  <div class="section">
    <h2>My Skills</h2>
    <p>JavaScript • TypeScript • React • Node.js • Express • Firebase • Tailwind CSS</p>
  </div>
  
  <div class="section">
    <h2>Projects</h2>
    <p>Coming soon! I'm working on adding my portfolio projects here.</p>
  </div>
  
  <div class="contact">
    <h2>Get In Touch</h2>
    <p>Feel free to reach out if you'd like to connect or discuss potential opportunities.</p>
    <p>Email: example@email.com</p>
  </div>
</body>
</html>
`;

// Write the index.html file
fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
console.log('Created index.html in the dist directory');

console.log('Static build for Vercel completed!');
