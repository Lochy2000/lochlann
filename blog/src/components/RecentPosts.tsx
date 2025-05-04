import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../client/src/components/ThemeProvider';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  image: string;
  published: boolean;
}

const RecentPosts: React.FC = () => {
  const { theme } = useTheme();
  const cardBgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BlogPost[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Could not fetch blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className={`${cardBgColor} rounded-lg shadow-md overflow-hidden`}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className={`${textColor}`}>{post.excerpt}</p>
                <a href={`/blog/post/${post.slug}`} className="inline-block mt-4 text-blue-500 hover:text-blue-700">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
