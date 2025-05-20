# Blog System Setup Guide

This guide explains the blog system setup in your personal portfolio project and provides instructions for getting it up and running.

## Overview

Your blog system consists of two main parts:
1. A React frontend for displaying blog posts and an admin dashboard
2. A Supabase backend for storing and retrieving blog content

The system is set up to work both as a standalone blog and as part of your main portfolio website.

## ES Module Compatibility

The project is configured to use ES modules (ESM) throughout. We've made several updates to ensure compatibility:

1. All import statements use `.js` file extensions, even for TypeScript files
2. `__dirname` is properly handled in ES modules using `fileURLToPath`
3. The `package.json` has `"type": "module"` set

## Database Setup

We've created several scripts to help you set up the database:

### Option 1: Using the Direct Setup Script

This is the simplest approach:

```bash
npm run db:setup-direct
```

This script:
1. Generates SQL migrations from your schema
2. Executes the SQL directly against your Supabase database
3. Seeds the database with sample blog posts if needed

### Option 2: Using Individual Scripts

If you need more control, you can run the steps individually:

```bash
# Generate migrations
npm run db:generate

# Run migrations and seed data
npm run db:migrate
```

## Database Configuration

Your Supabase database credentials are stored in `config.js` for easy access:

- Database URL: `postgresql://postgres:hfQbs95lVKtCkRwI@db.naheomblzirlsxkowygx.supabase.co:5432/postgres`
- Supabase URL: `https://naheomblzirlsxkowygx.supabase.co`
- Supabase Anon Key: Used for client-side access
- Supabase Service Role: Used for admin operations

## Admin Dashboard

You can access the admin dashboard at `/admin` path. Login with:
- Username: `admin`
- Password: `password`

The admin dashboard allows you to:
- View all blog posts
- Create new posts
- Edit existing posts
- Delete posts

## Blog Frontend

The blog frontend is available at the root path `/` and includes:
- Home page with featured and recent posts
- Individual blog post pages
- Category and tag filtering
- Dark/light mode toggle

## Important Files and Components

### Server-Side

- `server/db.ts`: Database connection setup
- `server/supabase.ts`: Supabase client initialization
- `server/storage.ts`: Data access layer using Drizzle ORM
- `server/routes.ts`: API endpoints
- `server/setupDatabase.ts`: Database initialization
- `shared/schema.js`: Database schema definitions

### Frontend

- `blog/src/App.tsx`: Main application routing
- `blog/src/pages/Blog.tsx`: Blog listing page
- `blog/src/pages/BlogPost.tsx`: Individual blog post page
- `blog/src/pages/Admin/AdminDashboard.tsx`: Admin interface
- `blog/src/utils/supabase.ts`: Frontend Supabase client

## Development Workflow

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The blog will be available at `http://localhost:5001`
3. The admin dashboard will be at `http://localhost:5001/admin`

## Adding Blog Posts

You can add blog posts in two ways:

1. Through the admin dashboard at `/admin`
2. Directly through the API using POST requests to `/api/blog/posts`

## Deployment

When deploying to Vercel:

1. Add your Supabase environment variables in the Vercel dashboard
2. Set up the build command to `npm run build`
3. The blog should be accessible at `/blog` on your main website

## Troubleshooting

If you encounter issues:

1. Check the server logs for error messages
2. Verify that the database tables are created correctly
3. Ensure all environment variables are properly set
4. Make sure you're using the correct admin credentials

## Future Enhancements

Some potential improvements for the future:

1. Implement proper JWT-based authentication for the admin area
2. Add image upload functionality using Supabase Storage
3. Implement a rich text editor for better content creation
4. Add Google Docs integration for importing content
5. Implement comment functionality for blog posts

## Need Help?

If you have questions or need assistance, you can:
1. Review the code documentation in each file
2. Check the README-BLOG.md file for additional information
3. Refer to the Supabase and Drizzle ORM documentation
