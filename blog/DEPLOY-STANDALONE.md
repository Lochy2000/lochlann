# Blog Deployment Instructions

This blog is designed to be deployed as a standalone static site.

## How to Deploy to Vercel

1. **Create a new Vercel project**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - **Important:** Select only the `/blog` folder as the root directory
   - This will deploy only the blog component separately

2. **Configure Environment Variables**
   - Add all Firebase environment variables:
     - `FIREBASE_API_KEY`
     - `FIREBASE_AUTH_DOMAIN`
     - `FIREBASE_PROJECT_ID`
     - `FIREBASE_STORAGE_BUCKET`
     - `FIREBASE_MESSAGING_SENDER_ID`
     - `FIREBASE_APP_ID`
     - `FIREBASE_MEASUREMENT_ID`

3. **Deploy Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Development Command: `npm run dev`

## Access the Blog Admin

To access the blog admin panel:
- Navigate to `/admin` on your deployed blog URL
- Login with your Firebase credentials

## Troubleshooting

If you encounter issues:
1. Check that all environment variables are correctly set in Vercel
2. Verify the deployment logs for any build errors
3. Make sure your Firebase project has Authentication enabled for email/password
