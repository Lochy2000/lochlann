# Admin Login Troubleshooting Guide

## The Issue: Admin Panel Redirects to Main Blog Page

If you're experiencing an issue where accessing `localhost:5001/admin` briefly shows a loading screen and then redirects to the main blog page without showing a login prompt, follow these troubleshooting steps.

## Quick Fix Solution

The most likely cause is that there's a conflict between Firebase instances or the authentication flow isn't working correctly. Here's the quickest way to fix it:

1. **Access the Test Auth Page First**:
   - Navigate to http://localhost:5001/test-auth
   - This dedicated test page will help diagnose authentication issues
   - Try logging in with your Firebase admin credentials
   - If you can successfully log in here, you should be able to access the admin panel

2. **Directly Access Admin After Login**:
   - After successful login on the test page, click the "Go to Admin" link
   - This should take you directly to the admin dashboard

3. **Clear Browser Storage**:
   - If you're still having issues, clear your browser's storage:
     - Open developer tools (F12)
     - Go to Application tab > Storage > Clear Site Data
     - Reload and try again

## Step-by-Step Troubleshooting

If the quick fix doesn't work, follow these more detailed steps:

### 1. Check Console Logs

Open your browser's developer console (F12) to check for errors:

- Look for authentication-related errors
- Look for Firebase initialization errors
- Look for routing/navigation errors

### 2. Verify Firebase Authentication is Enabled

1. Go to your Firebase Console
2. Select the "lochlann-blog" project
3. Navigate to Authentication > Sign-in methods
4. Ensure Email/Password is enabled
5. Check that you have at least one user created

### 3. Review Environment Variables

Make sure your `.env` file in the blog directory contains all the required Firebase variables:

```
VITE_FIREBASE_API_KEY=AIzaSyCT_T-s3zqIdVtPQ_0EW7EPaocbvDOijS0
VITE_FIREBASE_AUTH_DOMAIN=lochlann-blog.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=lochlann-blog
VITE_FIREBASE_STORAGE_BUCKET=lochlann-blog.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=558737527279
VITE_FIREBASE_APP_ID=1:558737527279:web:aa80b65705addf88ba261a
VITE_FIREBASE_MEASUREMENT_ID=G-301L6XGSW8
```

### 4. Test with a Different Browser

Sometimes browser extensions or settings can interfere with authentication:

- Try using an incognito/private browsing window
- Try a different browser entirely

### 5. Check for Firebase Authentication Initialization Order

The code has been updated to properly initialize Firebase Authentication separately from Firestore. Make sure:

1. The `firebaseAuth.ts` file is properly exporting the authentication service
2. The AuthContext is properly wrapping your application in `main.tsx`
3. Protected routes are correctly set up in `App.tsx`

### 6. Restart Development Server

Sometimes a clean restart fixes authentication issues:

1. Stop both development servers (Ctrl+C)
2. Run `npm run dev:all` again
3. Try accessing the test auth page and admin panel

## Manual Testing Steps

If you still can't access the admin panel, try these manual testing steps:

1. **Direct Firebase Auth Check**:
   - Open the browser console on any page
   - Type: `firebase.auth().currentUser`
   - If it shows `null`, you're not authenticated
   - If it shows an object with your email, you are authenticated

2. **Check Authentication State in Local Storage**:
   - Open developer tools
   - Go to Application > Local Storage
   - Check for Firebase auth tokens
   - If they exist, try clearing them and logging in again

3. **Test Auth Context**:
   - Open the browser console
   - Type: `window.DEBUG_AUTH = true;`
   - Reload the page
   - Check for additional auth context debugging logs

## If All Else Fails

If you've tried everything and still can't access the admin panel:

1. Try using a completely different approach to generate the blog content
2. Consider using a different content management system like Contentful or Sanity
3. If you need to stick with Firebase, consider rebuilding the authentication from scratch

Remember that the `/test-auth` page should be your first stop for troubleshooting authentication issues, as it provides a simple interface to test login/logout functionality without any routing complications.
