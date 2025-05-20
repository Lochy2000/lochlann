# Firebase Authentication Setup

To use the admin panel of the blog, you need to set up Firebase Authentication.

## 1. Enable Email/Password Authentication

1. Go to your Firebase Console (https://console.firebase.google.com/)
2. Select your project (lochlann-blog)
3. Navigate to Authentication > Sign-in methods
4. Enable the Email/Password provider

## 2. Create an Admin User

1. In Firebase Authentication console, go to the "Users" tab
2. Click "Add User"
3. Enter your email and a password
4. Save it

## 3. Access the Admin Panel

Once authentication is set up, you can log in to the admin panel:

1. Navigate to `/blog/admin` on your site
2. You'll be redirected to the login page
3. Use the email and password you created
4. After successful login, you'll have access to the admin dashboard

## Common Issues

If you can't access the admin panel:

1. Make sure you've enabled Email/Password authentication in Firebase
2. Create an admin user in the Firebase console
3. Check for console errors using your browser's developer tools (F12)
4. Clear browser storage if needed (Applications tab > Storage > Clear Site Data)

That's it! You should now be able to use the admin panel to manage your blog posts.
