import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Plus, X } from 'lucide-react';
import { projects } from '../data/portfolio';
import ProjectVisual from './ProjectVisual';

export function ProjectLinks({ project }) {
  return <div className="project-links">
    {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={17} aria-hidden="true" />Live Demo<span className="sr-only"> for {project.title} (opens in a new tab)</span></a>}
    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" />GitHub<span className="sr-only"> for {project.title} (opens in a new tab)</span></a>}
  </div>;
}

function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  const dismiss = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    dismiss.current?.focus();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return <dialog ref={dialog} className="project-dialog" style={{ '--project-dialog-width': `${Math.min(project.imageWidth || 850, 1280)}px` }} aria-labelledby="dialog-title" onCancel={onClose} onClick={event => {
    if (event.target === dialog.current) {
      const rect = dialog.current.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }
  }}>
    <div className="dialog-top"><span className="eyebrow">{project.category}</span><button ref={dismiss} onClick={onClose} aria-label="Close project details" className="icon-button"><X /></button></div>
    <ProjectVisual project={project} />
    {project.image && <div className="project-asset-actions"><a href={project.image} target="_blank" rel="noopener noreferrer">Open full-size image <ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> for {project.title} (opens in a new tab)</span></a></div>}
    {project.mobileImage && <div className="project-asset-actions"><a href={project.mobileImage} target="_blank" rel="noopener noreferrer">Open Android screenshot <ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div>}
    <div className="dialog-content"><h2 id="dialog-title">{project.showcaseTitle || project.title}</h2><p className="dialog-subtitle">{project.subtitle}</p><p>{project.detail}</p><h3>Project scope</h3><ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><div className="tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div><ProjectLinks project={project} />{(!project.image || (project.id === 'cams' && !project.mobileImage)) && <p className="asset-note">{project.assetNote}{!project.github && !project.live ? ' Project links have not been supplied yet.' : ''}</p>}</div>
  </dialog>;
}

function ProjectShowcase({ project, number, secondary, onSelect }) {
  const Heading = secondary ? 'h4' : 'h3';
  return <article className={`project-card ${secondary ? 'work-secondary' : 'work-showcase'} reveal`} aria-labelledby={`project-title-${project.id}`}>
    <div className="work-info">
      <div className="work-meta"><span className="work-number" aria-label={`Project ${number}`}>{number}</span><span className="work-discipline">{project.discipline}</span></div>
      <Heading className="work-title" id={`project-title-${project.id}`}>{project.showcaseTitle || project.title}</Heading>
      <p className="work-subtitle">{project.subtitle}</p>
      <p className="work-description">{project.description}</p>
      {project.id === 'gitc' && <p className="work-design-note">Academic design proposal</p>}
      <ul className="work-stack" aria-label={`${project.title} technologies`}>{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <div className="work-actions"><button className="work-detail-button" onClick={() => onSelect(project)}>View Project <Plus size={17} aria-hidden="true" /><span className="sr-only">: {project.title}</span></button><ProjectLinks project={project} /></div>
    </div>
    <div className="work-preview">
      <ProjectVisual project={project} />
      <button className="preview-open" onClick={() => onSelect(project)} aria-label={`View ${project.title} project details`}><span><Plus size={19} aria-hidden="true" />Explore project</span></button>
    </div>
  </article>;
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const featured = projects.filter(project => project.featured);
  const additional = projects.filter(project => !project.featured);
  return <section id="projects" className="projects-section section-space" aria-labelledby="selected-work-title">
    <div className="container">
      <div className="section-heading work-heading reveal"><div><p className="eyebrow">Ideas put into practice</p><h2 id="selected-work-title">SELECTED <span className="serif-word">work.</span></h2></div><p>Software, connected systems, and the spaces between.<br />Four projects. Different kinds of problems.</p></div>
      <div className="work-index reveal"><span>FEATURED PROJECTS</span><span>WEB / MOBILE / INFRASTRUCTURE</span></div>
      <div className="featured-work">{featured.map((project, index) => <ProjectShowcase key={project.id} project={project} number={String(index + 1).padStart(2, '0')} onSelect={setSelected} />)}</div>
      <section className="more-work" aria-labelledby="more-work-title">
        <div className="more-work-heading reveal"><div><p className="eyebrow">More ways of making things work</p><h3 id="more-work-title">Explore All <em>Projects.</em></h3></div><p>A Laravel application and a hands-on IoT prototype.</p></div>
        <div className="additional-work">{additional.map((project, index) => <ProjectShowcase key={project.id} project={project} number={String(featured.length + index + 1).padStart(2, '0')} secondary onSelect={setSelected} />)}</div>
      </section>
    </div>
    {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
  </section>;
}
