import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const defaultContext: ThemeContextType = {
  theme: 'dark',
  setTheme: () => {},
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
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Get the saved theme from localStorage or use system preference
    let savedTheme: Theme | null = null;
    try {
      savedTheme = localStorage.getItem('theme') as Theme | null;
      console.log("Theme from localStorage:", savedTheme);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    const initialTheme = savedTheme || systemPreference;
    setTheme(initialTheme);
    
    // Apply the theme class to the document
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    console.log("Setting theme to:", newTheme);
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
      console.log("Theme set in localStorage:", newTheme);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}