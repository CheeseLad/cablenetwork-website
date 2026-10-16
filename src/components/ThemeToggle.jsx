import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-lg text-gray-500 hover:text-green-500 dark:text-[#a1a1aa] dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-[#1a1a20] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 flex items-center justify-center ${className}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 transition-transform duration-200 hover:rotate-45 motion-reduce:hover:rotate-0" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-200 hover:-rotate-12 motion-reduce:hover:rotate-0" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
