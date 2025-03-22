import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/theme-variables.css' // Import our custom theme variables

// Initialize theme early to prevent flash of wrong theme
const initializeTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || 
    (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.add('light');
  }
};

// Execute before render
initializeTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
