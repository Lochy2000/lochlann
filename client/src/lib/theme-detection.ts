// Advanced theme detection and application utility
// This ensures consistent theme behavior across all environments

export const THEME_CONFIG = {
  STORAGE_KEY: 'theme',
  THEMES: ['light', 'dark'] as const,
  DEFAULT_THEME: 'dark' as const,
  CSS_CLASS_PREFIX: '',
  DATA_ATTRIBUTE: 'data-theme',
} as const;

export type Theme = typeof THEME_CONFIG.THEMES[number];

export interface ThemeState {
  theme: Theme;
  systemPreference: Theme;
  isSystemTheme: boolean;
}

/**
 * Get the current system theme preference
 */
export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return THEME_CONFIG.DEFAULT_THEME;
  
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return THEME_CONFIG.DEFAULT_THEME;
  }
};

/**
 * Get stored theme from localStorage
 */
export const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
    if (stored && THEME_CONFIG.THEMES.includes(stored as Theme)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  
  return null;
};

/**
 * Store theme to localStorage
 */
export const storeTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(THEME_CONFIG.STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to store theme to localStorage:', error);
  }
};

/**
 * Apply theme to the document
 */
export const applyTheme = (theme: Theme): void => {
  if (typeof document === 'undefined') return;
  
  // Remove all theme classes
  THEME_CONFIG.THEMES.forEach(t => {
    document.documentElement.classList.remove(t);
  });
  
  // Add the current theme class
  document.documentElement.classList.add(theme);
  
  // Set data attribute for CSS targeting
  document.documentElement.setAttribute(THEME_CONFIG.DATA_ATTRIBUTE, theme);
};

/**
 * Get the effective theme (stored or system preference)
 */
export const getEffectiveTheme = (): ThemeState => {
  const storedTheme = getStoredTheme();
  const systemPreference = getSystemTheme();
  
  if (storedTheme) {
    return {
      theme: storedTheme,
      systemPreference,
      isSystemTheme: false,
    };
  }
  
  return {
    theme: systemPreference,
    systemPreference,
    isSystemTheme: true,
  };
};

/**
 * Initialize theme immediately (for use in HTML script tags)
 */
export const initializeThemeImmediate = (): void => {
  const { theme } = getEffectiveTheme();
  applyTheme(theme);
};

/**
 * Toggle between light and dark themes
 */
export const toggleTheme = (currentTheme: Theme): Theme => {
  return currentTheme === 'dark' ? 'light' : 'dark';
};

/**
 * Listen for system theme changes
 */
export const listenForSystemThemeChanges = (
  callback: (theme: Theme) => void
): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      callback(newTheme);
    };
    
    // Use the appropriate method based on browser support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  } catch (error) {
    console.warn('Failed to listen for system theme changes:', error);
    return () => {};
  }
};
