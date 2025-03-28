import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode } from '@/lib/types';

interface ThemeContextProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const defaultContext: ThemeContextProps = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextProps>(defaultContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme state from localStorage or system preference if available
  const [theme, setTheme] = useState<ThemeMode>('light');
  
  // On first mount, check for saved theme preference
  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If no saved theme, check system preference
      setTheme('dark');
    }
  }, []);
  
  // Apply theme class to document element whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes
    root.classList.remove('light', 'dark');
    // Add the current theme class
    root.classList.add(theme);
    
    // Save the theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for accessing theme context
export const useTheme = () => useContext(ThemeContext);