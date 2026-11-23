import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => typeof document === 'undefined' ? 'dark' : document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    const timeout = window.setTimeout(() => document.documentElement.classList.remove('theme-switching'), 250);
    return () => window.clearTimeout(timeout);
  }, [theme]);
  function changeTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add('theme-switching');
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    document.documentElement.style.backgroundColor = next === 'dark' ? '#111111' : '#FAF8F5';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#111111' : '#FAF8F5');
    try { localStorage.setItem('portfolio-theme', next); } catch { /* Session-only preference. */ }
    setTheme(next);
  }
  return <button type="button" className="theme-toggle" onClick={changeTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
    {theme === 'dark' ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
    <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
  </button>;
}
