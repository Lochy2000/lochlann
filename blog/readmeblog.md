# Lochlann's Personal Portfolio Blog System

This is a blog system for Lochlann's personal portfolio website. It uses Supabase as the database backend and includes an admin dashboard for creating and managing blog posts.

## System Overview

The blog system consists of:

1.  **Frontend Blog**: A React-based blog with responsive design and dark/light mode
2.  **Admin Dashboard**: A secured area to create, edit, and manage blog posts
3.  **Supabase Backend**: Database integration for storing and retrieving blog posts
4.  **API Endpoints**: Express routes for fetching blog content

## Project Structure

-   `/blog`: Contains the React-based blog frontend
-   `/server`: Contains the Express server and API routes
-   `/migrations`: Contains database migration files
-   `/shared`: Contains shared schemas and types

## Setup Instructions

### Prerequisites

-   Node.js 16+ installed
-   A Supabase account with a project created
-   The Supabase project URL and API keys

### Environment Setup

1.  Create a `.env.local` file in the project root with the following content:

    ```
    # Supabase configuration
    SUPABASE_URL=https://your-project-id.supabase.co
    SUPABASE_ANON_KEY=your-anon-key
    SUPABASE_SERVICE_ROLE=your-service-role-key
    DATABASE_URL=postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres

    # Add a secure JWT_SECRET for authentication (generate your own)
    JWT_SECRET=your-secret-key

    # Server configuration
    PORT=5000
    NODE_ENV=development
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Database Setup

Run the database setup script to create tables and add sample data:

```bash
npm run db:setup
```

This will:
-   Create required database tables in Supabase
-   Add an admin user (username: admin, password: password)
-   Add sample blog posts if none exist

## Running the Development Server

1.  Start the backend server:

    ```bash
    npm run dev
    ```

2.  Database Migration:

    ```bash
    npm run db:setup
    ```

3.  In a separate terminal, start the blog frontend:

    ```bash
    cd blog
    npm run dev
    ```

The blog will be accessible at `http://localhost:5001` and the admin dashboard at `http://localhost:5001/admin`.

## Using the Admin Dashboard

1.  Navigate to `/admin` in your browser
2.  Log in with username `admin` and password `password`
3.  Use the dashboard to create, edit, and manage blog posts

## Deploying to Vercel

To deploy this project on Vercel:

1.  Create a Vercel project and link it to your repository
2.  Configure the following environment variables in your Vercel project:
    -   SUPABASE_URL
    -   SUPABASE_ANON_KEY
    -   SUPABASE_SERVICE_ROLE
    -   DATABASE_URL
    -   JWT_SECRET
3.  Set the build command to `npm run build`
4.  Set the output directory to `dist`

## Application Structure Overview

Let me provide you with a comprehensive overview of your blog application structure and how the different components work together:

### Core Structure

1.  **Main Application (App.tsx)**
    *   **Purpose**: Entry point of the application that sets up routing and global providers
    *   **Key Features**:
        *   Configures `QueryClientProvider` for data fetching
        *   Sets up `ThemeProvider` for dark/light mode
        *   Configures React Router with dynamic basename detection
        *   Defines the main layout structure with background effects
        *   Sets up metadata with Helmet for SEO

2.  **Theme System**
    *   **ThemeContext.tsx**
        *   **Purpose**: Manages theme state (dark/light mode) across the application
        *   **Key Features**:
            *   Stores theme preference in `localStorage`
            *   Detects system preference for theme
            *   Provides theme toggle functionality
            *   Exposes `useTheme` hook for components to access theme data
    *   **ThemeToggle.tsx**
        *   **Purpose**: UI component for switching between dark/light modes
        *   **Key Features**:
            *   Renders sun/moon icon based on current theme
            *   Toggles theme on click

### Layout Components

*   **BlogHeader.tsx**
    *   **Purpose**: Navigation and search UI at the top of every page
    *   **Key Features**:
        *   Dynamic navigation links with active state
        *   Mobile-responsive menu with animations
        *   Search functionality that expands/collapses
        *   Smart link handling for local development vs production
        *   Theme toggle integration
*   **BlogFooter.tsx**
    *   **Purpose**: Bottom section with additional links and copyright info
    *   **Key Features**:
        *   Category navigation
        *   Social media links
        *   Quick tags navigation
        *   Copyright information
        *   Dynamically calculated current year

### Page Components

*   **Blog.tsx (Home Page)**
    *   **Purpose**: Main landing page showing blog posts and categories
    *   **Key Features**:
        *   Hero section with search
        *   Featured posts section
        *   Category filtering
        *   Pagination controls
        *   Newsletter signup
        *   Uses mock data for posts (would connect to API in production)
*   **BlogPost.tsx (Individual Post Page)**
    *   **Purpose**: Displays a single blog post with full content
    *   **Key Features**:
        *   Hero image with post metadata
        *   Content display with rich formatting
        *   Tag display
        *   Related posts sidebar
        *   Author information
        *   Social sharing
        *   Newsletter signup in sidebar
        *   Processes URL parameters to load correct post
*   **NotFound.tsx**
    *   **Purpose**: Displayed when a URL doesn't match any route
    *   **Key Features**:
        *   Terminal-themed 404 display
        *   Animation effects
        *   Navigation links back to main content

### Data Components

*   **FeaturedPosts.tsx**
    *   **Purpose**: Displays highlighted posts in a grid layout
    *   **Key Features**:
        *   Animated entry effects
        *   Image display with hover effects
        *   Category badges
        *   Post metadata display
*   **RecentPosts.tsx**
    *   **Purpose**: Shows latest blog posts in a list format
    *   **Key Features**:
        *   Compact display for multiple posts
        *   Category and tag display
        *   Date and read time information
        *   View all posts link
*   **Sidebar.tsx**
    *   **Purpose**: Secondary column with additional content and navigation
    *   **Key Features**:
        *   Search functionality
        *   Category listing
        *   Recent posts list
        *   Tag cloud
        *   Newsletter signup form

### Styling System

Your blog implements a sophisticated styling system with:

*   **Base Layer**:
    *   CSS variables for colors and theming in `lofi-theme.css`
    *   Root styling for fonts and base elements
*   **Component Layer**:
    *   Custom component classes defined with `@layer components` in Tailwind
    *   Specialized Lo-Fi themed UI elements (cards, buttons, inputs)
*   **Utility Layer**:
    *   Tailwind utility classes for layout and responsive design
    *   Animation classes for interactive elements

### Data Flow

Currently, your blog uses mock data stored in the component files, but is structured to easily transition to a real API:

*   **Mock Posts Data**:
    *   Defined in `Blog.tsx` and `BlogPost.tsx`
    *   Contains sample content, metadata, and relationships
*   **Query System**:
    *   Uses React Query (via `QueryClientProvider`)
    *   Simulates API requests with mock data
    *   Ready to be connected to a real API endpoint
*   **Context System**:
    *   Theme data flows through `ThemeContext`
    *   Will allow for additional contexts (like user data or content filters)

### Routing Architecture

The blog has a flexible routing system that:

*   Detects whether it's running in local development or as part of the main site
*   Adjusts base paths accordingly (`"/blog"` on main site, `""` for local dev)
*   Provides routes for:
    *   Home page (`/`)
    *   Blog posts (`/post/:slug`)
    *   Category pages (`/category/:categoryName`)
    *   Tag pages (`/tags/:tagName`)
    *   404 page for any unmapped routes

## Planned Features

Based on the code, it appears you're planning to implement:

*   **Search Functionality**:
    *   UI is already in place for searching
    *   Query state managed in components
    *   Would connect to search API or filter local content
*   **Categories and Tags**:
    *   Structure set up for categorizing content
    *   Tag cloud and category filters ready for use
*   **Newsletter Integration**:
    *   Forms in place for email collection
    *   Would connect to email service API
*   **RSS Feed**:
    *   Link exists in the footer
    *   Would generate feed from blog content
*   **Google Docs Integration (Future Feature)**:
    *   A planned feature is to allow importing blog content directly from Google Docs. This will involve:
        *   Setting up Google OAuth for the admin dashboard
        *   Adding an import option in the blog post editor
        *   Converting Google Docs content to HTML for the blog

## Security Considerations

-   The admin dashboard uses a simple authentication system for demo purposes
-   In production, consider implementing stronger authentication (JWT with proper expiration)
-   Make sure to secure your Supabase API keys and database credentials
-   Regularly update the admin password

## License

This project is licensed under the MIT License.
