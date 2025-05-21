import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import path from 'path';
import * as schema from '../shared/schema';
import { fileURLToPath } from 'url';

// Get dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database instance - will be initialized
let db: ReturnType<typeof drizzle>;

// Initialize database with the URL if available
function initializeDatabase(connectionString: string) {
  try {
    // Create a PostgreSQL client
    const client = postgres(connectionString);
    
    // Create a Drizzle ORM instance
    db = drizzle(client, { schema });
    
    // Log successful connection
    console.log('Database connection initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return false;
  }
}

// Function to load the database URL and initialize the database
async function loadDatabaseConfig() {
  // Try environment variable first
  let databaseUrl = process.env.DATABASE_URL;
  
  // If not available, try to load from config file
  if (!databaseUrl) {
    try {
      // Check if we're in development mode
      const isDev = process.env.NODE_ENV !== 'production';
      if (isDev) {
        console.log('Development mode detected, loading environment variables from config file');
        
        // Try to load the config file
        const configPath = path.resolve(__dirname, '../config.js');
        try {
          // Use dynamic import for ESM compatibility with proper file:// URL format
          console.log(`Loading config from: ${configPath}`);
          const config = await import(`file://${configPath}`);
          databaseUrl = config.DATABASE_URL;
          
          if (databaseUrl) {
            console.log('Database URL loaded from config file');
          } else {
            console.warn('DATABASE_URL not found in config file');
          }
        } catch (err) {
          console.warn('Error importing config:', err);
        }
      }
    } catch (error) {
      console.warn('Error checking for config file:', error);
    }
  }
  
  // Initialize with the URL if available
  if (databaseUrl) {
    return initializeDatabase(databaseUrl);
  } else {
    console.warn('No DATABASE_URL found in environment or config - continuing without database');
    return false;
  }
}

// Immediately execute the initialization
loadDatabaseConfig().then(success => {
  if (success) {
    console.log('Database ready for use');
  } else {
    console.warn('Running without database connection - some features may be limited');
  }
});

// Export the db instance and a function to check if it's initialized
export { db };
export function isDatabaseInitialized() {
  return !!db;
}
