// Runs before styles and React so the saved preference is applied before paint.
(() => {
  let theme = 'dark';
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch { /* Theme controls still work when storage is unavailable. */ }
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.documentElement.style.backgroundColor = theme === 'dark' ? '#111111' : '#FAF8F5';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111111' : '#FAF8F5');
})();
