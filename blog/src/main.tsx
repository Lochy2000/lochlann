import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

// Initialize Firebase early
import { firebaseBlogService } from './utils/firebaseBlogService';

// Initialize Firebase data
firebaseBlogService.initialize().then(() => {
  console.log('Firebase initialized successfully');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)