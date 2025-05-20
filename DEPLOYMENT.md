# Deployment Guide

This document provides a step-by-step guide for deploying your portfolio and blog to Firebase Hosting.

## Prerequisites

1. **Firebase Account**: Create an account at [firebase.google.com](https://firebase.google.com) if you don't have one.
2. **Firebase CLI**: Install the Firebase CLI globally on your machine.
   ```bash
   npm install -g firebase-tools
   ```
3. **Firebase Project**: Create a new Firebase project in the Firebase Console for your site.
4. **GitHub Account**: For automated deployments using GitHub Actions.

## Local Setup and Testing

### 1. Firebase Login

```bash
firebase login
```

### 2. Configure Firebase Project

Make sure your project is correctly set up in `.firebaserc` with your Firebase project ID:

```json
{
  "projects": {
    "default": "lochlann-blog"
  }
}
```

### 3. Environment Variables

Ensure all Firebase environment variables are set for the blog:

1. For local development, copy `.env.example` to `.env.local` in the blog directory and fill in the Firebase configuration values.
2. For production deployment via GitHub Actions, set up the same environment variables as GitHub secrets.

### 4. Test the Build Process Locally

```bash
npm run build:all
```

This should create a unified build in the `dist` directory with the main site at the root and the blog at `/blog`.

### 5. Test with Firebase Emulator

```bash
firebase emulators:start
```

## Manual Deployment

### 1. Build Both Projects

```bash
npm run build:all
```

### 2. Deploy to Firebase

```bash
firebase deploy
```

## Automated Deployment via GitHub Actions

The project is set up to automatically deploy to Firebase Hosting whenever you push to the main branch.

### Required GitHub Secrets

Add the following secrets to your GitHub repository:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`
- `FIREBASE_SERVICE_ACCOUNT` (Generated from Firebase Project Settings > Service Accounts)

### Setting Up Firebase Service Account

1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate New Private Key"
3. Save the JSON file securely
4. Convert the JSON file to a base64 string:
   ```bash
   # On macOS/Linux
   cat path/to/serviceAccountKey.json | base64
   
   # On Windows PowerShell
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\serviceAccountKey.json"))
   ```
5. Add the base64 string as the `FIREBASE_SERVICE_ACCOUNT` secret in GitHub

## Post-Deployment

After deployment, you'll need to:

1. **Set up Firebase Authentication**: Enable Email/Password authentication in the Firebase Console.
2. **Create an Admin User**: Use the script to create an admin user for the blog:
   ```bash
   npm run create-admin your-email@example.com yourpassword
   ```
3. **Add Custom Domain (Optional)**: Configure your custom domain in the Firebase Hosting settings.

## Troubleshooting

Common issues and solutions:

- **404 Errors for Blog Routes**: Make sure the Firebase hosting configuration has the correct rewrite rules in firebase.json.
- **Authentication Issues**: Verify that Email/Password authentication is enabled in Firebase Auth.
- **Build Failures**: Check that all dependencies are correctly installed for both projects.
- **Environment Variables**: Ensure all Firebase environment variables are correctly set.

## Maintenance

- Update blog content through the admin interface at `/blog/admin`
- For code changes, push to the main branch and GitHub Actions will handle the deployment
- Monitor Firebase Analytics and Hosting usage in the Firebase Console
