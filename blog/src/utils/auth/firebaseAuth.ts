// Firebase authentication service
import { initializeApp, getApps } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  type User,
  type Auth
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase - use existing app if available
let app;
if (getApps().length === 0) {
  console.log('No Firebase apps found in Auth, initializing a new one');
  app = initializeApp(firebaseConfig);
} else {
  console.log('Using existing Firebase app in Auth');
  app = getApps()[0];
}

const auth = getAuth(app);

class FirebaseAuthService {
  private auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  // Login with email and password
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Logout the current user
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  // Get the current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Subscribe to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, callback);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  // Get user token
  async getUserToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (!user) return null;
    
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error("Error getting user token:", error);
      return null;
    }
  }
}

// Create and export a singleton instance
export const firebaseAuthService = new FirebaseAuthService(auth);