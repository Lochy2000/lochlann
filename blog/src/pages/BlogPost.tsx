import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTag, FaArrowLeft, FaShareAlt, FaTwitter, FaLinkedin, FaFacebook, FaCode, FaCoffee } from 'react-icons/fa';
import { firebaseBlogService, type BlogPost as BlogPostType } from '../utils/firebaseBlogService';

interface AuthorType {
  name: string;
  image: string;
  bio: string;
}

// Define fadeIn animation locally
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } }
};

// Mock data for fallback
// Type without the required fields for easier mock data
type MockBlogPost = Partial<BlogPostType> & {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
  category: string;
  categorySlug: string;
  categoryColor: string;
  tags: string[];
  featured: boolean;
  relatedPosts: string[];
  author: {
    name: string;
    bio: string;
    image: string;
  };
};

const mockBlogPosts: MockBlogPost[] = [
  {
    id: '1',
    slug: 'choosing-right-tech-stack',
    title: 'Choosing the Right Tech Stack for Your Project',
    content: `
      <p>When embarking on a new web development project, one of the most critical decisions you'll make is selecting the right technology stack. This choice will impact everything from development speed and cost to long-term maintenance and scalability.</p>
      
      <h2>What is a Tech Stack?</h2>
      <p>A technology stack is the combination of programming languages, frameworks, libraries, and tools used to build a web or mobile application. It typically consists of:</p>
      <ul>
        <li>Frontend technologies (client-side)</li>
        <li>Backend technologies (server-side)</li>
        <li>Database management systems</li>
        <li>Infrastructure and hosting solutions</li>
      </ul>
      
      <h2>Factors to Consider</h2>
      <h3>1. Project Requirements</h3>
      <p>Begin by clearly defining what your application needs to do. Consider:</p>
      <ul>
        <li>Type of application (e-commerce, content management, social network, etc.)</li>
        <li>Expected traffic volume</li>
        <li>Data complexity</li>
        <li>Security requirements</li>
        <li>Integration needs</li>
      </ul>
      
      <h3>2. Team Expertise</h3>
      <p>Your team's existing skills should heavily influence your decision. While learning new technologies can be valuable, using familiar tools will typically result in faster development and fewer bugs.</p>
      
      <h3>3. Scalability</h3>
      <p>Consider your growth projections. Will your application need to handle increasing loads or additional features? Some technology stacks scale more easily than others.</p>
      
      <h3>4. Community and Support</h3>
      <p>A vibrant community means better documentation, more third-party libraries, and easier problem-solving. Popular technologies like React, Node.js, and PostgreSQL have large communities.</p>
      
      <h3>5. Long-term Maintenance</h3>
      <p>Technology choices should be sustainable. Consider:</p>
      <ul>
        <li>How active is the development of the technology?</li>
        <li>Will it be around in 5+ years?</li>
        <li>Is it easy to find developers for this stack?</li>
      </ul>
      
      <h2>Popular Tech Stack Combinations</h2>
      <h3>MERN Stack</h3>
      <p><strong>MongoDB, Express.js, React, Node.js</strong></p>
      <p>Best for: Single-page applications with dynamic content</p>
      
      <div class="code-snippet">
      <pre><code>
// Example React component from MERN stack
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Fetch users from Express/Node backend
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);
  
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
      </code></pre>
      </div>
      
      <h3>LAMP Stack</h3>
      <p><strong>Linux, Apache, MySQL, PHP</strong></p>
      <p>Best for: Traditional web applications and content management systems</p>
      
      <h3>JAMstack</h3>
      <p><strong>JavaScript, APIs, Markup</strong></p>
      <p>Best for: Static sites with dynamic functionality via APIs</p>
      
      <h2>Conclusion</h2>
      <p>There's no one-size-fits-all solution when it comes to choosing a tech stack. The right choice depends on your specific project requirements, team expertise, and long-term goals. By carefully considering these factors, you can select a technology stack that sets your project up for success.</p>
    `,
    excerpt: "When embarking on a new web development project, one of the most critical decisions you will make is selecting the right technology stack.",
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: 'May 15, 2025',
    readTime: '5 min read',
    category: 'Web Development',
    categorySlug: 'web-development',
    categoryColor: 'bg-blue-500',
    tags: ['react', 'javascript', 'frontend'],
    featured: true,
    relatedPosts: ['2', '5'],
    author: {
      name: 'Lochlann O\'Higgins',
      image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
      bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
    },
    published: true,
    createdAt: '2025-05-15T12:00:00Z',
    updatedAt: '2025-05-15T12:00:00Z'
  },
  {
    id: '2',
    slug: 'demystifying-databases',
    title: 'Demystifying Databases: What I Wish I Knew Sooner',
    content: `
      <p>Okay, so real talk—I used to think all databases were just <em>SQL</em>. I mean, that's what most tutorials start with, right? You make a table, insert some data, run a SELECT query, boom—you're a backend dev now.</p>
      
      <p>But once I started building actual projects (even small ones), I kept running into terms like <strong>NoSQL</strong>, <strong>Firebase</strong>, <strong>Redis</strong>, <strong>document stores</strong>, and a bunch of other words that sounded fancy but didn't <em>click</em> at all.</p>
      
      <p>So I did what I do best: got overwhelmed, then wrote this post to make sense of it all.</p>

      <h2>What Even <em>Is</em> a Database?</h2>

      <p>At its core, a database is just a way to store and organize data so your app can use it later.</p>

      <p>But depending on what kind of data you have (is it structured like a spreadsheet? or is it more like random blobs of user settings, chat messages, or logs?), the way you <em>store</em> it matters a lot.</p>

      <h2>SQL Databases (Relational) 🟦</h2>

      <h3>"The one everyone learns first"</h3>

      <p><strong>Examples:</strong> MySQL, PostgreSQL, SQLite</p>

      <p>This is your standard, go-to structure. You create tables (like spreadsheets), define what each column should be (e.g., <code>name</code> = text, <code>age</code> = number), and then insert rows of data.</p>

      <div class="code-snippet">
      <pre><code>
Users Table:
| id | name     | email            |
|----|----------|------------------|
| 1  | Alice    | alice@email.com  |
| 2  | Bob      | bob@email.com    |
      </code></pre>
      </div>

      <p>Perfect for when your data:</p>

      <ul>
        <li>Has clear relationships (like users and their orders)</li>
        <li>Is predictable and structured</li>
        <li>Needs to be consistent (no weird duplicates or mismatched types)</li>
      </ul>

      <p><strong>Why it's great:</strong></p>

      <ul>
        <li>Strong rules = fewer bugs</li>
        <li>You can do powerful joins and filters</li>
        <li>Everyone (and every tool) supports it</li>
      </ul>

      <p><strong>When it starts to hurt:</strong></p>

      <ul>
        <li>Your data changes <em>a lot</em> (you have to constantly update your table structure)</li>
        <li>You're working with unstructured data (like logs, media, or variable user settings)</li>
      </ul>

      <p><strong>Personal tip:</strong><br>
      I started with SQLite when building a local app. Then I moved to PostgreSQL for anything hosted. It felt a bit clunky at first, but once I got used to SQL queries, it was 🔥.</p>

      <h2>NoSQL Databases (Non-Relational) 🟩</h2>

      <h3>"For when SQL tables feel too rigid"</h3>

      <p>Here's where I got confused at first—"NoSQL" isn't just one thing. It's a whole category with multiple subtypes. They're designed for flexibility, not structure.</p>

      <h3>1. Document Stores (e.g., MongoDB, Firestore)</h3>

      <p>These store data in JSON-like documents. That means every "record" can have different fields—perfect for messy, ever-changing data.</p>

      <div class="code-snippet">
      <pre><code>
{
  "name": "Alice",
  "hobbies": ["coding", "swimming"],
  "preferences": {
    "darkMode": true,
    "notifications": false
  }
}
      </code></pre>
      </div>

      <p>Use this when:</p>

      <ul>
        <li>You're building APIs or web apps</li>
        <li>Data changes often or is deeply nested</li>
        <li>You need fast reads/writes, not fancy joins</li>
      </ul>

      <p><strong>Caveat:</strong> Relationships are trickier. Want to link a user to multiple orders? You'll have to think ahead.</p>

      <h3>2. Key-Value Stores (e.g., Redis, DynamoDB)</h3>

      <p>This is basically a giant dictionary:</p>

      <div class="code-snippet">
      <pre><code>
"user:1234" -> "Alice"
"cart:1234" -> ["banana", "pizza"]
      </code></pre>
      </div>

      <p>These are blazingly fast and often live in memory (like RAM), so they're great for:</p>

      <ul>
        <li>Caching</li>
        <li>Session management</li>
        <li>Real-time stuff like chat or games</li>
      </ul>

      <p><strong>BUT</strong> don't try to store your whole app's data here. It's not meant for relationships or complex queries.</p>

      <h2>Wrapping Up</h2>

      <p>Databases are a <em>lot</em>. But once you break them down, it's more about choosing the right tool for the job than memorizing features.</p>

      <p>Start with something simple. Learn the trade-offs. And don't be afraid to switch it up when your project grows.</p>
    `,
    excerpt: "Trying to choose the right database for your app? Here is a no-fluff breakdown of SQL, NoSQL, flat files, and cloud DBs—explained like you are new here.",
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: 'May 12, 2025',
    readTime: '7 min read',
    category: 'Databases',
    categorySlug: 'databases',
    categoryColor: 'bg-green-500',
    tags: ['sql', 'nosql', 'backend'],
    featured: true,
    relatedPosts: ['1', '3', '4'],
    author: {
      name: 'Lochlann O\'Higgins',
      image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
      bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
    },
    published: true,
    createdAt: '2025-05-12T12:00:00Z', 
    updatedAt: '2025-05-12T12:00:00Z'
  }
];

// Basic author info for fallback
const defaultAuthor = {
  name: 'Lochlann O\'Higgins',
  image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
  bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
};

// Find related posts
const getRelatedPosts = (postId: string, allPosts: (BlogPostType | MockBlogPost)[]) => {
  const currentPost = allPosts.find(post => post.id === postId);
  if (!currentPost?.relatedPosts) return [];
  
  return currentPost.relatedPosts.map((id: string) => 
    allPosts.find(post => post.id === id)
  ).filter(Boolean) as (BlogPostType | MockBlogPost)[];
};

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Fetch all posts for related post functionality
  const { data: allPosts, isLoading: allPostsLoading } = useQuery<(BlogPostType | MockBlogPost)[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      try {
        console.log('Fetching all posts for related posts functionality');
        const posts = await firebaseBlogService.getPublishedPosts();
        console.log(`Fetched ${posts.length} posts`);
        
        if (posts.length > 0) {
          return posts; // Return Firebase posts if available
        }
        
        // Only fallback to mock data if no posts are found
        console.log('No posts found in Firebase, using mock data');
        return mockBlogPosts;
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback to mock data if Firebase fails
        return mockBlogPosts;
      }
    }
  });
  
  // Fetch the specific blog post by slug
  const { data: post, isLoading, error } = useQuery<BlogPostType | MockBlogPost>({
    queryKey: [`blog/post/${slug}`],
    queryFn: async () => {
      try {
        console.log(`Fetching blog post with slug: ${slug}`);
        const post = await firebaseBlogService.getBlogPostBySlug(slug || '');
        
        if (post) {
          console.log('Found post in Firebase:', post);
          
          // Process post to ensure it has all required fields
          const processedPost = {
            ...post,
            // Ensure categorySlug exists
            categorySlug: post.categorySlug || post.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized',
            // Ensure tags is always an array
            tags: Array.isArray(post.tags) ? post.tags : 
                  (typeof post.tags === 'string' ? post.tags.split(',').map(t => t.trim()) : []),
            // Ensure image and coverImage exist
            image: post.image || post.coverImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
            coverImage: post.coverImage || post.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
            // Ensure author exists
            author: post.author || {
              name: 'Lochlann O\'Higgins',
              image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
              bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
            }
          };
          
          return processedPost;
        }
        
        // If not found in Firebase, check mock data
        console.log('Post not found in Firebase, checking mock data');
        const foundPost = mockBlogPosts.find(p => p.slug === slug);
        if (foundPost) {
          return foundPost;
        }
        
        // No post found anywhere
        throw new Error('Post not found');
      } catch (error) {
        console.error('Error fetching blog post:', error);
        
        // Last resort: check mock data
        const foundPost = mockBlogPosts.find(p => p.slug === slug);
        if (foundPost) {
          return foundPost;
        }
        
        throw error;
      }
    },
    enabled: !!slug // Only run the query if we have a slug
  });

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading || allPostsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-20 mt-16 text-center">
        <h1 className="text-3xl font-space font-bold text-slate-800 dark:text-white mb-4">Post Not Found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="lofi-button inline-flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  // Add author metadata if missing
  const author = post.author || defaultAuthor;

  // Find related posts
  const relatedPosts = allPosts ? getRelatedPosts(post.id, allPosts) : [];

  // Process post.tags if it comes as a string
  const tags = Array.isArray(post.tags) 
    ? post.tags
    : (typeof post.tags === 'string' && post.tags ? post.tags.split(',').map((tag: string) => tag.trim()) : []);

  return (
    <>
      <Helmet>
        <title>{post.title} | Lochlann's Tech Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={tags.join(', ')} />
        <meta property="og:title" content={`${post.title} | Lochlann's Tech Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage || ('image' in post ? post.image : '')} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage || ('image' in post ? post.image : '')} />
      </Helmet>
      
      <div className="mt-16 pb-20">
        {/* Hero Section */}
        <div className="w-full h-[60vh] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/90 z-10"></div>
          <img 
            src={post.coverImage || ('image' in post ? post.image : '')} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-12 z-20">
            <div className="max-w-4xl">
              <Link 
                to={`/category/${post.categorySlug}`}
                className={`${post.categoryColor} text-white text-sm px-3 py-1 rounded-full inline-flex items-center`}
              >
                {post.category === 'Coffee Thoughts' ? <FaCoffee className="mr-1" /> : <FaCode className="mr-1" />}
                {post.category}
              </Link>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-white mt-3 mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-white/80 gap-4">
                <div className="flex items-center">
                  <img 
                    src={author.image}
                    alt={author.name}
                    className="w-6 h-6 rounded-full mr-2 border border-white/20"
                  />
                  <span>{author.name}</span>
                </div>
                
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1" /> {post.date}
                </span>
                
                <span className="flex items-center">
                  <FaClock className="mr-1" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Article Content */}
            <motion.article 
              className="lg:w-2/3"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              <div className="bg-white dark:bg-lofi-terminal rounded-xl shadow-lofi dark:shadow-none p-6 md:p-10">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map((tag: string) => (
                    <Link
                      key={tag}
                      to={`/tags/${tag}`}
                      className="lofi-tag"
                    >
                      <FaTag className="mr-1 text-xs" /> {tag}
                    </Link>
                  ))}
                </div>
                
                {/* Content */}
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                
                {/* Author Bio */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-start md:items-center flex-col md:flex-row gap-4">
                    <img 
                      src={author.image}
                      alt={author.name}
                      className="w-16 h-16 rounded-full border-2 border-white dark:border-slate-700 shadow-lofi"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        About {author.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {author.bio}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Share and Navigation */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <Link to="/" className="lofi-link inline-flex items-center">
                    <FaArrowLeft className="mr-2" /> Back to Blog
                  </Link>
                  
                  <div className="flex space-x-2 items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Share:</span>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-slate-500 hover:text-blue-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebook />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
            
            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-6">
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white dark:bg-lofi-terminal rounded-xl shadow-lofi dark:shadow-none p-6">
                  <h3 className="text-xl font-bold mb-4 font-space text-slate-900 dark:text-white">
                    Related Posts
                  </h3>
                  
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => relatedPost && (
                      <Link 
                        key={relatedPost.id}
                        to={`/post/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <img 
                            src={relatedPost.coverImage || ('image' in relatedPost ? relatedPost.image : '')}
                            alt={relatedPost.title}
                            className="w-20 h-20 object-cover rounded-lg shadow-lofi"
                          />
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {relatedPost.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags Cloud */}
              <div className="bg-white dark:bg-lofi-terminal rounded-xl shadow-lofi dark:shadow-none p-6">
                <h3 className="text-xl font-bold mb-4 font-space text-slate-900 dark:text-white">
                  Popular Tags
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(allPosts?.flatMap((post) => Array.isArray(post.tags) && post.tags ? post.tags : []) || [])).map((tag: string) => (
                    <Link
                      key={tag}
                      to={`/tags/${tag}`}
                      className="lofi-tag"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lofi dark:shadow-none p-6">
                <h3 className="text-xl font-bold mb-2 font-space text-slate-900 dark:text-white">
                  Join the Newsletter
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  Get notified when I publish new articles and tutorials.
                </p>
                
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email"
                    placeholder="your@email.com"
                    className="lofi-input w-full"
                  />
                  <button className="lofi-button w-full">
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
