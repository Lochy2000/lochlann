# Lochlann's Portfolio & Blog

This repository contains both the personal portfolio/CV website and the blog website. The project is designed to be deployed as a unified website with the blog accessible at `/blog`.

## Project Structure

- `client/` - Main portfolio/CV site frontend (React)
- `blog/` - Blog site frontend (React)
- `scripts/deployment/` - Build and deployment scripts

## Development

### Running locally

The project has two main parts that can be run independently or together:

#### Portfolio/CV Site Only

```bash
npm run dev
```

#### Blog Site Only

```bash
cd blog
npm run dev
```

#### Both Together

```bash
npm run dev:all
```

This command will start both the portfolio and blog sites concurrently.

### Authentication Setup

The blog uses Firebase Authentication for the admin area. To set this up:

1. Go to the Firebase console for your project
2. Navigate to Authentication > Users
3. Add a user with your email and password
4. Use these credentials to log in to the blog admin area

## Deployment

The project is configured for deployment to Firebase Hosting, which will serve both the portfolio site and the blog from a single domain.

### Prerequisites

1. Install Firebase CLI globally (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

### Deployment Steps

1. Build both projects:
   ```bash
   npm run build:all
   ```
   
   This command builds both the portfolio and blog sites and organizes them in the `dist` directory with the blog site located in `dist/blog`.

2. Deploy to Firebase:
   ```bash
   npm run deploy
   ```
   
   This is a shortcut for running `npm run build:all && firebase deploy`.

### Manual Deployment

If you prefer to deploy manually:

1. Build both projects:
   ```bash
   npm run build:all
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Environment Variables

Both projects require specific environment variables:

### Portfolio/CV Site (.env.local)

```
# None required for static build
```

### Blog Site (blog/.env.local)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Maintenance

### Adding Content

- **Portfolio Content**: Update content through the Firebase Firestore database
- **Blog Content**: Add new blog posts through the admin interface at `/blog/admin`

## Notes for Future Development

- The CV site is now static and does not require backend services
- The blog uses Firebase for authentication and data storage
- All data is managed through the Firebase console or the admin interface
