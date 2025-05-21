import React, { useState, useEffect } from 'react';
import { testFirebaseConnection } from '../utils/firebaseDebug';
import { firebaseBlogService } from '../utils/firebaseBlogService';

const FirebaseDebug: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [allPosts, setAllPosts] = useState<any[]>([]);
  
  const runFirebaseTest = async () => {
    setLoading(true);
    setResult('');
    
    // Capture console logs
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    const logs: string[] = [];
    
    // Override console methods to capture logs
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
      originalConsoleLog(...args);
    };
    
    console.error = (...args) => {
      logs.push('ERROR: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
      originalConsoleError(...args);
    };
    
    console.warn = (...args) => {
      logs.push('WARNING: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
      originalConsoleWarn(...args);
    };
    
    try {
      // Run the test
      await testFirebaseConnection();
      
      // Try to get all posts
      const posts = await firebaseBlogService.getAllBlogPosts();
      setAllPosts(posts);
      
      logs.push(`\n----- FOUND ${posts.length} POSTS -----`);
      if (posts.length > 0) {
        logs.push(JSON.stringify(posts[0], null, 2));
      }
    } catch (error) {
      logs.push(`Test failed with error: ${error}`);
    } finally {
      // Restore original console methods
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      
      setResult(logs.join('\n'));
      setLoading(false);
    }
  };
  
  useEffect(() => {
    runFirebaseTest();
  }, []);
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Firebase Debug Panel</h1>
      
      <div className="mb-4">
        <button 
          onClick={runFirebaseTest}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Run Firebase Test'}
        </button>
      </div>
      
      {loading && (
        <div className="my-4 flex items-center">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
          <span>Testing Firebase connection...</span>
        </div>
      )}
      
      {result && (
        <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800 dark:text-white">
          <h2 className="text-lg font-semibold mb-2">Test Results</h2>
          <pre className="whitespace-pre-wrap overflow-auto max-h-96 text-sm font-mono">
            {result}
          </pre>
        </div>
      )}
      
      {allPosts.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Retrieved Posts ({allPosts.length})</h2>
          <div className="grid grid-cols-1 gap-4">
            {allPosts.map((post, index) => (
              <div key={post.id || index} className="border p-3 rounded">
                <div className="font-bold">{post.title}</div>
                <div className="text-sm">ID: {post.id}</div>
                <div className="text-sm">Slug: {post.slug}</div>
                <div className="text-sm">Published: {post.published ? 'Yes' : 'No'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseDebug;