import { createClient } from '@supabase/supabase-js';
import path from 'path';

// Use environment variables directly without dotenv
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

// Check if we're missing essential variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('SUPABASE_URL and/or SUPABASE_ANON_KEY environment variables are not set.');
  console.warn('Will attempt to load them from config file if available.');
  
  // Try to load from config file - create this file manually with your credentials
  try {
    // Check if we're in development mode
    const isDev = process.env.NODE_ENV !== 'production';
    if (isDev) {
      // Try to load the config file
      const configPath = path.resolve(__dirname, '../config.js');
      import(`file://${configPath}`).then(config => {
        const configSupabaseUrl = config.SUPABASE_URL;
        const configSupabaseAnonKey = config.SUPABASE_ANON_KEY;
        const configSupabaseServiceRole = config.SUPABASE_SERVICE_ROLE;
        
        if (configSupabaseUrl && configSupabaseAnonKey) {
          console.log('Supabase credentials loaded from config file');
          initializeSupabaseClients(configSupabaseUrl, configSupabaseAnonKey, configSupabaseServiceRole);
        } else {
          console.error('Supabase credentials not found in config file');
        }
      }).catch(err => {
        console.error('Error importing config:', err);
      });
    }
  } catch (error) {
    console.error('Error loading config file:', error);
  }
} else {
  // Initialize clients with environment variables
  initializeSupabaseClients(supabaseUrl, supabaseAnonKey, supabaseServiceRole);
}

// Client variables
let supabaseClient: ReturnType<typeof createClient>;
let supabaseAdmin: ReturnType<typeof createClient> | null = null;

// Function to initialize clients
function initializeSupabaseClients(url: string, anonKey: string, serviceRole?: string) {
  // Create a Supabase client for browser usage (public)
  supabaseClient = createClient(url, anonKey);

  // Create a Supabase admin client (only for server-side operations)
  if (serviceRole) {
    supabaseAdmin = createClient(url, serviceRole, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }

  // Log successful initialization
  console.log('Supabase client initialized successfully');
}

// Export the database URL for Drizzle ORM
const databaseUrl = process.env.DATABASE_URL;

// Export the clients
export { supabaseClient, supabaseAdmin, databaseUrl };
