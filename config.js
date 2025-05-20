// Configuration file for environment variables
// This loads environment variables from .env file

// Instead of hardcoding credentials, use environment variables
export const SUPABASE_URL = process.env.SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
export const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || "";
export const DATABASE_URL = process.env.DATABASE_URL || "";

// JWT secret for authentication
export const JWT_SECRET = process.env.JWT_SECRET || "";

// Server configuration
export const PORT = process.env.PORT || 5000;
