// Debug utility for Firebase issues
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'debugApp');
const db = getFirestore(app);

/**
 * Test Firebase connection and collection data
 * @param collectionName The Firestore collection to check
 */
export async function testFirebaseConnection(collectionName: string = 'blog_posts'): Promise<void> {
  console.log('==== FIREBASE DEBUG UTILITY ====');
  console.log('Testing Firebase connection...');
  console.log('Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? '✓ Set' : '✗ Missing',
    authDomain: firebaseConfig.authDomain ? '✓ Set' : '✗ Missing',
    projectId: firebaseConfig.projectId ? '✓ Set' : '✗ Missing',
    storageBucket: firebaseConfig.storageBucket ? '✓ Set' : '✗ Missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✓ Set' : '✗ Missing',
    appId: firebaseConfig.appId ? '✓ Set' : '✗ Missing',
  });
  
  try {
    // Try to get documents from the specified collection
    console.log(`Attempting to read from collection: ${collectionName}`);
    const querySnapshot = await getDocs(collection(db, collectionName));
    
    if (querySnapshot.empty) {
      console.log(`✗ Connection successful, but no documents found in '${collectionName}' collection.`);
      console.log('This might indicate that:');
      console.log('1. The collection name is incorrect');
      console.log('2. The collection exists but has no documents');
      console.log('3. You might not have permission to read this collection');
    } else {
      console.log(`✓ Connection successful! Found ${querySnapshot.docs.length} documents in '${collectionName}' collection.`);
      console.log('Sample document data:', querySnapshot.docs[0].data());
    }
  } catch (error) {
    console.error('✗ Firebase connection failed:', error);
    console.log('Error details:', error);
    console.log('This might indicate that:');
    console.log('1. Your Firebase config values are incorrect');
    console.log('2. There are network connectivity issues');
    console.log('3. You might not have permission to access this Firebase project');
  }
  
  console.log('==== END DEBUG ====');
}
