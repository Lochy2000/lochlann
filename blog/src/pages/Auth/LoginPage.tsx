import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from state or default to admin dashboard
  const from = location.state?.from?.pathname || '/admin';

  // If already authenticated, redirect to the destination page
  React.useEffect(() => {
    console.log("Login page - Auth state:", isAuthenticated ? "Authenticated" : "Not authenticated");
    console.log("Login page - Redirect destination:", from);
    
    if (isAuthenticated) {
      console.log("Login page - Redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      // Navigate will happen in the useEffect
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Helmet>
        <title>Login | Lochlann's Tech Blog</title>
      </Helmet>
      
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-lofi-terminal rounded-xl shadow-lofi p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">
            Blog Admin Login
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="lofi-input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="lofi-input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="lofi-button w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="mt-4 text-center">
              <a href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Back to Blog
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;