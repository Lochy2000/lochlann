/**
 * Mobile detection utilities for handling mobile-specific behaviors
 */

// Check if device is mobile based on screen size and user agent
export const isMobileDevice = (): boolean => {
  // Check screen size first (most reliable)
  const isMobileScreen = window.innerWidth <= 768;
  
  // Check user agent as secondary indicator
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  // Check for touch support
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Consider it mobile if any two of these conditions are true
  const indicators = [isMobileScreen, isMobileUserAgent, isTouchDevice];
  const trueCount = indicators.filter(Boolean).length;
  
  return trueCount >= 2;
};

// Check if device is specifically a mobile phone (not tablet)
export const isMobilePhone = (): boolean => {
  return window.innerWidth <= 480 && isMobileDevice();
};

// Check if device is tablet
export const isTablet = (): boolean => {
  return window.innerWidth > 480 && window.innerWidth <= 768 && isMobileDevice();
};

// Check if device supports touch
export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Get device type string
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (isMobilePhone()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

// Mobile-specific configurations
export const getMobileQueryConfig = () => {
  if (!isMobileDevice()) {
    return {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    };
  }

  // Mobile-optimized settings
  return {
    staleTime: 10 * 60 * 1000, // 10 minutes (longer for mobile)
    gcTime: 20 * 60 * 1000, // 20 minutes (longer for mobile)
    retry: 1, // Less retries on mobile
    refetchOnWindowFocus: false, // Critical for mobile
    refetchOnMount: false, // Don't refetch if data exists
    refetchOnReconnect: false, // Don't refetch on network changes
    refetchInterval: false, // Disable automatic refetching
    notifyOnChangeProps: ['data', 'error', 'isLoading'], // Only essential updates
  };
};

// Debounce utility for mobile event handlers
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for mobile scroll handlers
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
