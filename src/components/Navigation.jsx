import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [['about', 'About'], ['projects', 'Projects'], ['skills', 'Skills'], ['experience', 'Journey']];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = event => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  return <header className="site-header">
    <div className="container nav-inner">
      <a href="#home" className="wordmark" aria-label="Harith Yusri, home" onClick={() => setOpen(false)}>hy<span>.</span></a>
      <span className="nav-caption">A curious mind. A practical approach.</span>
      <button className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {links.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        <a href="#contact" className="nav-contact" onClick={() => setOpen(false)}>Let’s connect <span aria-hidden="true">✳</span></a>
      </nav>
    </div>
  </header>;
}
