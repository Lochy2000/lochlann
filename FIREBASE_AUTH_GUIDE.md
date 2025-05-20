# Firebase Authentication Setup Guide

This guide will help you set up and test Firebase Authentication for your blog admin panel.

## Step 1: Enable Firebase Authentication in the Console

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (lochlann-blog)
3. Click on "Authentication" in the left sidebar
4. Click on the "Sign-in method" tab
5. Click on "Email/Password" to enable it
6. Toggle the switch to enable Email/Password authentication
7. Save the changes

## Step 2: Create an Admin User

You need to create an admin user for your blog. You can do this directly in the Firebase Console:

1. While in the Authentication section, click on the "Users" tab
2. Click on "Add User"
3. Enter your email and create a password
4. Click "Add User"

## Step 3: Test the Authentication

To test if your authentication is working properly:

1. Start your development server:
   ```
   npm run dev:all
   ```

2. Go to http://localhost:5001/test-auth
   - This is a special testing page I've created to help debug authentication issues
   - You should see your current authentication status

3. Try logging in with the email and password you created in Step 2
   - If successful, you'll see a confirmation message
   - If unsuccessful, you'll see an error message

4. Once logged in, try visiting http://localhost:5001/admin
   - You should now be able to access the admin dashboard

## Step 4: If You Still Have Problems

If you still encounter issues after following the steps above:

1. Check the browser console for error messages
   - Right-click on the page and select "Inspect" or press F12
   - Go to the "Console" tab

2. Check for Firebase errors
   - Look for any error messages related to Firebase or Authentication

3. Verify your Firebase configuration
   - Make sure your `.env` file contains all the required Firebase variables
   - Check that the values match those in your Firebase project

4. Clear your browser storage
   - Open the browser developer tools
   - Go to the "Application" tab
   - Select "Storage" > "Clear site data"
   - Reload the page and try again

## Troubleshooting Common Issues

1. **"Firebase app already exists" error**: This means there's a conflict between multiple Firebase initializations. This has been fixed in the latest code, but if you see it, make sure you're using the latest version.

2. **Login succeeds but admin page redirects**: Make sure the authentication state is being properly saved. This could be due to CORS issues or browser security settings.

3. **Cannot find auth user**: Make sure Firebase Authentication is properly enabled and that you've created a user with email and password authentication.

## Using the Admin Dashboard

Once you've successfully logged in to the admin dashboard, you can:

1. **Create New Blog Posts**:
   - Click the "New Post" button
   - Fill out the form with title, content, category, etc.
   - Choose whether to publish immediately or save as a draft
   - Click "Create Post"

2. **Edit Existing Posts**:
   - Find the post you want to edit in the table
   - Click the edit icon
   - Make your changes
   - Click "Update Post"

3. **Delete Posts**:
   - Find the post you want to delete in the table
   - Click the delete icon
   - Confirm the deletion

4. **Manage Post Status**:
   - You can toggle posts between published and draft status

5. **Preview Posts**:
   - Click the eye icon to view how a post will look on the blog

## Deployment Considerations

When deploying to production:

1. **Firebase Authentication Rules**:
   - By default, Firebase Authentication works the same in production as in development
   - No additional configuration is needed for authentication to work in production

2. **Security Considerations**:
   - Consider setting up Firebase Security Rules to protect your blog posts data
   - In the Firebase Console, go to Firestore > Rules and set up appropriate access rules

3. **Environment Variables**:
   - Make sure your production environment has the correct Firebase configuration variables

4. **Testing After Deployment**:
   - After deploying, test the authentication flow on your production site
   - Ensure you can log in and access the admin dashboard

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firebase Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
