// This script ensures the home page is properly loaded
if (window.location.pathname === '/' || window.location.pathname === '') {
  // Check if the blog posts are visible
  setTimeout(() => {
    const featuredPosts = document.querySelector('[data-section="featured-posts"]');
    const recentPosts = document.querySelector('[data-section="recent-posts"]');
    
    if (!featuredPosts && !recentPosts) {
      console.log('Home page content not found, refreshing page...');
      window.location.reload();
    }
  }, 1000);
}
