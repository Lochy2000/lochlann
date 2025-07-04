import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getEffectiveTheme, 
  applyTheme, 
  storeTheme, 
  toggleTheme as toggleThemeUtil,
  listenForSystemThemeChanges,
  type Theme 
} from '@/lib/theme-detection';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const defaultContext: ThemeContextType = {
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  console.log("ThemeContext value:", context);
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme immediately to prevent hydration mismatch
    if (typeof window === 'undefined') return 'dark';
    return getEffectiveTheme().theme;
  });

  useEffect(() => {
    // Apply theme immediately on mount
    applyTheme(theme);
    
    // Listen for system theme changes
    const cleanup = listenForSystemThemeChanges((newSystemTheme) => {
      const { isSystemTheme } = getEffectiveTheme();
      if (isSystemTheme) {
        setTheme(newSystemTheme);
        applyTheme(newSystemTheme);
      }
    });
    
    return cleanup;
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    console.log("Setting theme to:", newTheme);
    setTheme(newTheme);
    storeTheme(newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = toggleThemeUtil(theme);
    handleThemeChange(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}