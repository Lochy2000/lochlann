-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  read BOOLEAN DEFAULT FALSE NOT NULL
);

-- Create Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  category TEXT NOT NULL,
  category_color TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create Portfolio Projects Table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  short_title TEXT,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  demo_link TEXT,
  github_link TEXT,
  featured BOOLEAN DEFAULT FALSE NOT NULL,
  "order" INTEGER DEFAULT 0 NOT NULL
);

-- Create CV Data Table
CREATE TABLE IF NOT EXISTS cv_data (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  data JSONB NOT NULL,
  "order" INTEGER DEFAULT 0 NOT NULL
);

-- Add example admin user
INSERT INTO users (username, password)
VALUES ('admin', '$2b$10$1XNjFEh4vZBHrg0Jg/8sMeLZgYdJPSOJY9W7/Ro7HfXnrjQ3vBj6G') -- password: password
ON CONFLICT (username) DO NOTHING;

-- Add indexes for commonly queried columns
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts (published);
CREATE INDEX IF NOT EXISTS portfolio_projects_featured_idx ON portfolio_projects (featured);
