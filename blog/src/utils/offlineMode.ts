// Offline mode utilities
export const isOfflineMode = () => {
  // Check if we should run in offline mode (no Firebase)
  return import.meta.env.VITE_OFFLINE_MODE === 'true' || false;
};

export const getMockData = () => {
  const mockCategories = [
    { id: 'all', name: 'All', slug: 'all', color: 'bg-slate-500', createdAt: '', updatedAt: '' },
    { id: 'web-dev', name: 'Web Development', slug: 'web-development', color: 'bg-blue-500', createdAt: '', updatedAt: '' },
    { id: 'databases', name: 'Databases', slug: 'databases', color: 'bg-green-500', createdAt: '', updatedAt: '' },
    { id: 'tutorials', name: 'Tutorials', slug: 'tutorials', color: 'bg-purple-500', createdAt: '', updatedAt: '' },
    { id: 'uncategorized', name: 'Uncategorized', slug: 'uncategorized', color: 'bg-gray-500', createdAt: '', updatedAt: '' }
  ];

  const mockPosts = [
    {
      id: '1',
      slug: 'choosing-right-tech-stack',
      title: 'Choosing the Right Tech Stack for Your Project',
      excerpt: "When embarking on a new web development project, one of the most critical decisions you'll make is selecting the right technology stack.",
      content: '<h1>Choosing the Right Tech Stack</h1><p>This is a sample blog post content...</p>',
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200",
      date: '2025-05-15',
      readTime: '5 min read',
      category: 'Web Development',
      categorySlug: 'web-development',
      categoryColor: 'bg-blue-500',
      tags: ['react', 'javascript', 'frontend'],
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        name: 'Lochlann O\'Higgins',
        image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
        bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
      },
      relatedPosts: []
    },
    {
      id: '2',
      slug: 'demystifying-databases',
      title: 'Demystifying Databases: What I Wish I Knew Sooner',
      excerpt: "Trying to choose the right database for your app? Here's a no-fluff breakdown of SQL, NoSQL, flat files, and cloud DBs—explained like you're new here.",
      content: '<h1>Demystifying Databases</h1><p>This is a sample blog post about databases...</p>',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
      date: '2025-05-12',
      readTime: '7 min read',
      category: 'Databases',
      categorySlug: 'databases',
      categoryColor: 'bg-green-500',
      tags: ['sql', 'nosql', 'backend'],
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        name: 'Lochlann O\'Higgins',
        image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
        bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
      },
      relatedPosts: []
    },
    {
      id: '3',
      slug: 'javascript-best-practices',
      title: 'JavaScript Best Practices for 2025',
      excerpt: 'Modern JavaScript development techniques and patterns that will make your code cleaner, faster, and more maintainable.',
      content: '<h1>JavaScript Best Practices</h1><p>This is a sample blog post about JavaScript best practices...</p>',
      coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
      date: '2025-05-10',
      readTime: '6 min read',
      category: 'Web Development',
      categorySlug: 'web-development',
      categoryColor: 'bg-blue-500',
      tags: ['javascript', 'best-practices', 'coding'],
      published: true,
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        name: 'Lochlann O\'Higgins',
        image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
        bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
      },
      relatedPosts: []
    }
  ];

  return { categories: mockCategories, posts: mockPosts };
};
