import { useEffect, useState } from 'react';
import { Asterisk, Braces, Check, ChevronDown, Code2, Copy, Database, Download, Github, Globe2, GraduationCap, Linkedin, Mail, MapPin, Network, Phone, ShieldCheck, Sparkles, Terminal, Wrench } from 'lucide-react';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import { experience, profile, skills } from './data/portfolio';

const skillIcons = { code: Code2, web: Globe2, database: Database, tools: Wrench, network: Network, security: ShieldCheck, ai: Sparkles };

function useReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => { element.classList.add('will-reveal'); observer.observe(element); });
    return () => observer.disconnect();
  }, []);
}

function Hero() {
  const [portraitError, setPortraitError] = useState(false);
  return <section className="hero container" id="home" aria-labelledby="hero-title">
    <div className="hero-kicker"><span>COMPUTER SCIENCE UNDERGRADUATE</span><span><MapPin size={14} /> BASED IN MALAYSIA</span></div>
    <h1 id="hero-title" className="hero-title">HARITH YUSRI<span>.</span></h1>
    <div className="hero-layout">
      <div className="hero-intro">
        <span className="eyebrow intro-label">Hello, I’m Harith</span>
        <h2>Software, networks<br />& everything<br /><em>between.</em></h2>
        <div className="hero-socials" role="group" aria-label="Connect with Harith">
          <a className="hero-social-button hero-social-github" href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={22} aria-hidden="true" />
            <span className="hero-social-label"><span>View My</span>{' '}GitHub</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {profile.linkedin && <a className="hero-social-button hero-social-linkedin" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={22} aria-hidden="true" />
            <span className="hero-social-label"><span>Connect on</span>{' '}LinkedIn</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>}
        </div>
        <p>I build software, explore technology, and work through problems with curiosity and care.</p>
        <a href="#projects" className="button button-dark">View my projects <Braces size={18} /></a>
      </div>
      <div className={`portrait-panel ${profile.portrait && !portraitError ? 'has-portrait' : ''} ${profile.portraitIsCutout ? 'portrait-cutout' : ''}`}>
        <span className="portrait-top">ALWAYS CURIOUS. ALWAYS LEARNING.</span>
        <div className="portrait-orbit" aria-hidden="true" />
        {profile.portrait && !portraitError ? <img className="hero-portrait" src={profile.portrait} onError={() => setPortraitError(true)} alt="Mohamad Harith Yusri" width="1312" height="1199" fetchPriority="high" /> : <div className="portrait-placeholder"><span className="portrait-monogram" aria-hidden="true">hy<span>.</span></span><div className="portrait-placeholder-label"><span>THE PERSON BEHIND THE PROJECTS</span><p>Portrait to be added</p><small>A space for my actual photograph.</small></div></div>}
        <span className="portrait-bottom">MOHAMAD HARITH YUSRI <Asterisk size={20} /></span>
      </div>
      <aside className="hero-aside"><Asterisk className="hero-asterisk" strokeWidth={1.2} aria-hidden="true" /><p>Computer Science<br /><strong>Netcentric Computing</strong><br />Universiti Teknologi MARA</p><div className="availability"><span className="availability-dot" /><span>SEEKING AN INTERNSHIP<strong>{profile.availability}</strong></span></div><a className="scroll-cue" href="#about">A little more about me <ChevronDown size={20} /></a></aside>
    </div>
    <div className="hero-bottom"><span>CODE WITH PURPOSE. EXPLORE WITH CURIOSITY.</span><span>SOFTWARE / SYSTEMS / CONNECTIONS</span></div>
  </section>;
}

function About() {
  return <section id="about" className="about-section section-space"><div className="container about-grid">
    <div className="reveal"><p className="eyebrow">A little context</p><h2>A DEVELOPER.<br />A PROBLEM SOLVER.<br /><span className="serif-word">A work in progress.</span></h2><div className="about-location"><MapPin size={17} /><span>Malaysia <span aria-hidden="true">/</span> Universiti Teknologi MARA</span></div></div>
    <div className="about-copy reveal"><p className="large-copy">I’m Mohamad Harith Yusri, a Computer Science undergraduate who likes understanding how things work—and making them work better.</p><p>At UiTM, I’m pursuing a Bachelor of Computer Science (Hons.) in Netcentric Computing. My interests span software development, networking, cybersecurity, cloud technologies, and IT infrastructure.</p><p>Through academic and collaborative projects, I’ve worked on web applications, network designs, and physical IoT prototypes. I’m still learning, and I enjoy the process of connecting ideas across different areas of computing.</p><div className="about-facts"><div><GraduationCap size={22} /><span>Current degree CGPA<strong>3.81<span> / 4.00</span></strong></span></div><div><Terminal size={22} /><span>My approach<strong className="fact-text">Build. Understand. Improve.</strong></span></div></div></div>
  </div></section>;
}

function Skills() {
  return <section id="skills" className="skills-section section-space"><div className="container">
    <div className="section-heading reveal"><div><p className="eyebrow">The tools behind the work</p><h2>A GROWING <span className="serif-word">toolkit.</span></h2></div><p>Different problems call for different tools.<br />Here are the ones I work with.</p></div>
    <div className="skills-grid">{skills.map(({name, icon, items}) => { const Icon = skillIcons[icon]; return <article className="skill-group reveal" key={name}><Icon size={24} strokeWidth={1.5} /><h3>{name}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>; })}</div>
    <p className="toolkit-note"><Asterisk size={20} /> An evolving toolkit, shaped by coursework, collaboration, and hands-on exploration.</p>
  </div></section>;
}

function Journey() {
  return <section id="experience" className="journey-section section-space"><div className="container journey-grid"><div className="journey-heading reveal"><p className="eyebrow">Learning, then doing</p><h2>THE STORY<br /><span className="serif-word">so far.</span></h2><p>Classrooms, collaborative projects,<br />and experience in the field.</p></div><div className="timeline">{experience.map(item => <article className="timeline-item reveal" key={item.title}><div className="timeline-meta"><span className="eyebrow">{item.type}</span><span>{item.date}</span></div><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p>{item.description && <p>{item.description}</p>}{item.grade && <span className="grade">{item.grade}</span>}</article>)}</div></div></section>;
}

function Contact() {
  const [status, setStatus] = useState('');
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setStatus('Email copied to clipboard.'); }
    catch { setStatus(`Copy this email: ${profile.email}`); }
  }
  return <section id="contact" className="contact-section"><div className="container">
    <div className="contact-top"><p className="eyebrow">Good things start with a conversation</p><span className="contact-availability"><span className="availability-dot" /> Internship · {profile.availability}</span></div>
    <div className="contact-headline reveal"><h2>LET’S BUILD<br />SOMETHING <em>good.</em></h2><Asterisk strokeWidth={1} aria-hidden="true" /></div>
    <div className="contact-bottom"><p>I’m looking for an internship where I can contribute,<br />learn from others, and keep growing.</p><div className="contact-actions">{profile.email ? <div className="email-actions"><a className="button button-dark" href={`mailto:${profile.email}`}><Mail size={18} />Get in touch</a><button className="icon-button" onClick={copyEmail} aria-label="Copy email address">{status === 'Email copied to clipboard.' ? <Check size={18} /> : <Copy size={18} />}</button></div> : <div className="contact-pending"><Mail size={18} /><span>Professional email<span>To be added</span></span></div>}{profile.resume ? <a className="button button-outline" href={profile.resume} download><Download size={18} />Download résumé</a> : <div className="contact-pending"><Download size={18} /><span>Résumé<span>To be added</span></span></div>}</div></div>
    <address className="contact-details">
      {profile.email && <a href={`mailto:${profile.email}`}><Mail size={19} /><span><span className="contact-detail-label">Email</span>{profile.email}</span></a>}
      {profile.phone && <a href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}><Phone size={19} /><span><span className="contact-detail-label">Phone</span>{profile.phone}</span></a>}
    </address>
    <p className="copy-status" role="status">{status}</p>
    <footer className="site-footer"><a className="wordmark" href="#home" aria-label="Back to top">hy<span>.</span></a><span>© {new Date().getFullYear()} Mohamad Harith Yusri</span><div><a href={profile.github} target="_blank" rel="noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span></a>{profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a> : <span>LinkedIn · to be added</span>}<a href="#home">Back to top</a></div></footer>
  </div></section>;
}

export default function App() {
  useReveals();
  return <><a className="skip-link" href="#main">Skip to content</a><Navigation /><main id="main"><Hero /><About /><Projects /><Skills /><Journey /><Contact /></main></>;
}
