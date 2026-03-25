import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      onClick={toggleTheme}
      className="theme-toggle"
      style={{ padding: '8px', fontSize: '1.2rem', borderRadius: '50%' }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
};

export default ThemeToggle;
