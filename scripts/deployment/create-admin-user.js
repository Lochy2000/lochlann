// A script to create a Firebase admin user
// This is a utility script to run locally to create an admin user
// Do not include this in production

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Load environment variables
const envPath = path.join(projectRoot, 'blog', '.env');
dotenv.config({ path: envPath });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

console.log('Firebase config:', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create a new admin user
async function createAdmin(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Admin user created successfully:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('Error creating admin user:', error.code, error.message);
    throw error;
  }
}

// Get email and password from command line arguments
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Please provide email and password arguments:');
  console.error('node scripts/deployment/create-admin-user.js your-email@example.com yourpassword');
  process.exit(1);
}

// Create the admin user
createAdmin(email, password)
  .then(() => {
    console.log('✅ Admin user created successfully');
    process.exit(0);
  })
  .catch(() => {
    console.error('❌ Failed to create admin user');
    process.exit(1);
  });
