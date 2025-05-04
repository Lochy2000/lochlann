import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogHeader from './components/BlogHeader';
import BlogFooter from './components/BlogFooter';
import FeaturedPosts from './components/FeaturedPosts';
import RecentPosts from './components/RecentPosts';
import Sidebar from './components/Sidebar';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const App: React.FC = () => {
  // For debugging
  console.log('Blog App rendered, basename: /blog');
  
  return (
    <BrowserRouter>
      <div className="min-h-screen blog-root">
        <BlogHeader />
        <main className="blog-main pt-4">
          <div className="container mx-auto py-8 px-6">
            <Routes>
              <Route path="/" element={<Blog />} />
              <Route path="/post1" element={<BlogPost />} />
              <Route path="/category/news" element={<div>Category News</div>} />
            </Routes>
          </div>
        </main>
        <BlogFooter />
      </div>
    </BrowserRouter>
  );
};

export default App;