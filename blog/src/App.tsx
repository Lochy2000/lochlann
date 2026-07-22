import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import BlogHeader from './components/BlogHeader';
import BlogFooter from './components/BlogFooter';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/Admin/AdminDashboard';
import LoginPage from './pages/Auth/LoginPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import FirebaseDebug from './components/FirebaseDebug';
import { Helmet } from 'react-helmet';
import { isMobileDevice, getMobileQueryConfig } from './utils/mobileDetection';
import './utils/authDomainHelper';

// Create a new query client with mobile-optimized settings
const mobileConfig = getMobileQueryConfig();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: mobileConfig.retry,
      refetchOnWindowFocus: mobileConfig.refetchOnWindowFocus,
      staleTime: mobileConfig.staleTime,
      gcTime: mobileConfig.gcTime,
      refetchOnMount: mobileConfig.refetchOnMount,
      refetchOnReconnect: mobileConfig.refetchOnReconnect,
    },
  },
});

const App: React.FC = () => {
  // Detect mobile device on mount
  useEffect(() => {
    console.log('Device type detected:', isMobileDevice() ? 'Mobile' : 'Desktop');
  }, []);

  // Determine if we need a basename - always use empty for standalone
  const basename = "";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter basename={basename}>
          <Helmet>
            <title>Lochlann's Tech Blog | Developer Insights & Tutorials</title>
            <meta name="description" content="Explore web development tutorials, coding tips, and tech insights from Lochlann O'Higgins. A junior developer's journey through tech, AI, and lo-fi aesthetics." />
            <meta name="keywords" content="web development, coding, programming, javascript, typescript, react, tech blog, developer blog, junior developer, lo-fi, tech tutorials" />
            <meta property="og:title" content="Lochlann's Tech Blog" />
            <meta property="og:description" content="Developer insights, coding tutorials, and tech explorations with a lo-fi aesthetic." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://lochlannohiggins.com/blog" />
            {/* Add Google Fonts for Inter and Space Grotesk */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
          </Helmet>
          
          <Routes>
            {/* Admin Routes - No Header/Footer */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute redirectPath="/login">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Auth Routes - No Header/Footer */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Debug Routes */}
            <Route path="/debug" element={<div style={{padding: '2rem', background: 'white'}}>
              <h1>Debug Page</h1>
              <p>This page is for debugging routing issues.</p>
            </div>} />
            
            <Route path="/firebase-debug" element={
              <div style={{padding: '2rem', background: 'white', minHeight: '100vh'}}>
                <FirebaseDebug />
              </div>
            } />
            
            {/* Regular Blog Routes - With Header/Footer */}
            <Route path="/post/:slug" element={
              <div className="min-h-screen blog-root relative">
                <div className="nightscape-bg hidden dark:block"></div>
                <div className="dots-bg block dark:hidden"></div>
                <BlogHeader />
                <main className="blog-main pt-4">
                  <div className="container mx-auto py-8 px-6">
                    <BlogPost />
                  </div>
                </main>
                <BlogFooter />
              </div>
            } />
            
            <Route path="/category/:category" element={
              <div className="min-h-screen blog-root relative">
                <div className="nightscape-bg hidden dark:block"></div>
                <div className="dots-bg block dark:hidden"></div>
                <BlogHeader />
                <main className="blog-main pt-4">
                  <div className="container mx-auto py-8 px-6">
                    <Blog />
                  </div>
                </main>
                <BlogFooter />
              </div>
            } />
            
            <Route path="/tags/:tag" element={
              <div className="min-h-screen blog-root relative">
                <div className="nightscape-bg hidden dark:block"></div>
                <div className="dots-bg block dark:hidden"></div>
                <BlogHeader />
                <main className="blog-main pt-4">
                  <div className="container mx-auto py-8 px-6">
                    <Blog />
                  </div>
                </main>
                <BlogFooter />
              </div>
            } />
            
            {/* Home Route */}
            <Route path="/" element={
              <div className="min-h-screen blog-root relative">
                <div className="nightscape-bg hidden dark:block"></div>
                <div className="dots-bg block dark:hidden"></div>
                <BlogHeader />
                <main className="blog-main pt-4">
                  <div className="container mx-auto py-8 px-6">
                    <Blog />
                  </div>
                </main>
                <BlogFooter />
              </div>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;