import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`toggle ${theme === 'dark' ? 'toggle-active' : ''}`}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Αλλαγή σε φωτεινό θέμα' : 'Αλλαγή σε σκοτεινό θέμα'}
    >
      <span className="sr-only">
        {theme === 'dark' ? 'Αλλαγή σε φωτεινό θέμα' : 'Αλλαγή σε σκοτεινό θέμα'}
      </span>
      <span className={`toggle-dot ${theme === 'dark' ? 'translate-x-5' : 'translate-x-1'}`}>
        {theme === 'dark' ? (
          <MoonIcon className="h-3 w-3 text-gray-800" />
        ) : (
          <SunIcon className="h-3 w-3 text-amber-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;