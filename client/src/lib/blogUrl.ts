/**
 * Gets the appropriate blog URL based on environment
 * - In development: uses localhost with port 5001
 * - In production: uses the standalone blog deployment
 */
export function getBlogUrl(): string {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                        window.location.hostname === 'localhost';
  
  if (isDevelopment) {
    return 'http://localhost:5001';
  } else {
    // In production, use the standalone blog URL
    // This prevents any routing conflicts with the main portfolio
    return 'https://lochlann-blog.vercel.app';
  }
}
