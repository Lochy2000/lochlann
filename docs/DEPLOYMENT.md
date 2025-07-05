# Deployment Guide

## Overview

This guide covers building and deploying the personal portfolio website to various hosting platforms. The project is built as a static site using Vite and can be deployed to any static hosting service.

## Build Process

### Production Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The build process creates optimized static files in the `dist/` directory:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [image-files]
└── [static-assets]
```

### Build Configuration

The build is configured in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion']
        }
      }
    }
  }
});
```

### Environment Variables

Create environment files for different environments:

```bash
# .env.local (development)
VITE_SITE_URL=http://localhost:5000

# .env.production (production)
VITE_SITE_URL=https://yourdomain.com
VITE_ANALYTICS_ID=your-analytics-id
```

## Hosting Platforms

### Vercel (Recommended)

Vercel provides excellent support for Vite projects with automatic deployments.

#### Setup

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

#### Configuration

Create `vercel.json` in the project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Continuous Deployment

Connect your GitHub repository to Vercel for automatic deployments:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables in the Vercel dashboard

### Netlify

Netlify offers similar features to Vercel with drag-and-drop deployment options.

#### Manual Deployment

1. Build the project locally:
```bash
npm run build
```

2. Drag the `dist/` folder to [netlify.com/drop](https://netlify.com/drop)

#### Continuous Deployment

1. Connect GitHub repository in Netlify dashboard
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

Create `netlify.toml` for advanced configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### GitHub Pages

Deploy directly from your GitHub repository.

#### Setup

1. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as source

2. **Create workflow file**
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_SITE_URL: https://yourusername.github.io/repository-name
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Base URL Configuration

For GitHub Pages, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/repository-name/', // Replace with your repo name
  plugins: [react()],
  // ... other config
});
```

### Firebase Hosting

Google Firebase provides fast hosting with CDN.

#### Setup

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase**
```bash
firebase init hosting
```

Configuration options:
- Public directory: `dist`
- Single-page app: `Yes`
- Automatic builds: `No` (we'll build manually)

#### Configuration

Firebase creates `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

#### Deploy

```bash
# Build and deploy
npm run build
firebase deploy
```

### AWS S3 + CloudFront

For enterprise-level hosting with AWS services.

#### S3 Setup

1. **Create S3 bucket**
```bash
aws s3 mb s3://your-portfolio-bucket
```

2. **Configure bucket for static hosting**
```bash
aws s3 website s3://your-portfolio-bucket --index-document index.html --error-document index.html
```

3. **Upload files**
```bash
npm run build
aws s3 sync dist/ s3://your-portfolio-bucket --delete
```

#### CloudFront Distribution

```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

CloudFront configuration (`cloudfront-config.json`):

```json
{
  "CallerReference": "portfolio-2024",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-Portfolio",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "Compress": true
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-Portfolio",
        "DomainName": "your-portfolio-bucket.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "Comment": "Portfolio CloudFront Distribution",
  "Enabled": true,
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 300
      }
    ]
  }
}
```

## Custom Domain Setup

### DNS Configuration

For custom domains, configure DNS records:

```
# A Record (for root domain)
Type: A
Name: @
Value: [hosting-provider-ip]

# CNAME Record (for www subdomain)
Type: CNAME
Name: www
Value: [hosting-provider-domain]
```

### SSL Certificate

Most hosting providers offer automatic SSL certificates. For manual setup:

1. **Let's Encrypt** (free)
2. **CloudFlare** (free with CDN)
3. **AWS Certificate Manager** (free for AWS resources)

### Vercel Custom Domain

```bash
# Add domain via CLI
vercel domains add yourdomain.com

# Or use the dashboard at vercel.com
```

### Netlify Custom Domain

1. Go to Site Settings > Domain Management
2. Add custom domain
3. Configure DNS records as shown
4. SSL certificate is automatically provisioned

## Performance Optimization

### Build Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          router: ['react-router-dom']
        }
      }
    },
    // Enable compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
```

### Asset Optimization

```bash
# Install optimization tools
npm install --save-dev vite-plugin-imagemin

# Add to vite.config.ts
import { defineConfig } from 'vite';
import { ViteImageOptimize } from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    ViteImageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.65, 0.8] },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'addAttributesToSVGElement', params: { attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }] } }
        ]
      }
    })
  ]
});
```

### CDN Configuration

```javascript
// Configure CDN headers
const headers = {
  '/assets/*': {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Encoding': 'gzip'
  },
  '/*.html': {
    'Cache-Control': 'public, max-age=0, must-revalidate'
  }
};
```

## Monitoring and Analytics

### Google Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring

```typescript
// Add to main.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Error Tracking

```typescript
// Add Sentry for error tracking
npm install @sentry/react

// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE
});
```

## Security

### Content Security Policy

```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://www.google-analytics.com;
">
```

### Security Headers

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

## Continuous Integration

### GitHub Actions

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run type check
        run: npm run check
      
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_SITE_URL: ${{ secrets.SITE_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
```

## Troubleshooting

### Common Deployment Issues

**Build Failures:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

**Routing Issues (404 on refresh):**
Ensure your hosting provider is configured for SPA routing:
- Add rewrite rules to serve `index.html` for all routes
- Configure `_redirects` file for Netlify
- Set up CloudFront error pages for AWS

**Environment Variable Issues:**
```bash
# Check environment variables are prefixed with VITE_
VITE_API_URL=https://api.example.com

# Not accessible in client code
API_SECRET=secret-key
```

**Performance Issues:**
```bash
# Analyze bundle size
npm run build
npm run analyze

# Check for large dependencies
npx bundlephobia [package-name]
```

### Rollback Strategy

```bash
# Vercel rollback
vercel rollback [deployment-url]

# Git-based rollback
git revert [commit-hash]
git push origin main
```

## Backup and Recovery

### Code Backup
- Git repository (GitHub/GitLab)
- Multiple remote repositories
- Regular commits and tags

### Asset Backup
```bash
# Backup static assets
aws s3 sync s3://portfolio-assets s3://portfolio-assets-backup

# Local backup
rsync -av public/ backup/public/
```

### Database Backup (if applicable)
```bash
# Export data
npm run export-data

# Backup to cloud storage
aws s3 cp data-export.json s3://backup-bucket/
```
