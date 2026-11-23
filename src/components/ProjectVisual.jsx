import { Camera, Monitor, Network, Smartphone } from 'lucide-react';

function MissingAsset({ type = 'web', compact = false }) {
  const content = {
    web: [Monitor, 'Web dashboard', 'Screenshot to be added'],
    android: [Smartphone, 'Android interface', 'Screenshot to be added'],
    navigation: [Monitor, 'Mars navigation interface', 'Screenshot to be added'],
    collaboration: [Monitor, 'Student collaboration platform', 'Screenshot to be added'],
    topology: [Network, 'Network topology', 'Original diagram to be added'],
    prototype: [Camera, 'Physical IoT prototype', 'Photograph to be added'],
  };
  const [Icon, title, note] = content[type];
  return <div className={`asset-placeholder ${compact ? 'asset-placeholder-compact' : ''}`}>
    <Icon size={compact ? 24 : 34} strokeWidth={1.25} aria-hidden="true" />
    <span className="asset-placeholder-title">{title}</span>
    <span className="asset-placeholder-note">{note}</span>
  </div>;
}

function BrowserFrame({ project, type }) {
  return <div className="preview-browser">
    <div className="browser-toolbar" aria-hidden="true"><span className="browser-dots"><i /><i /><i /></span><span>{project.id === 'cams' ? 'UiTM CAMS · Web' : project.title}</span><Monitor size={13} /></div>
    <div className="browser-viewport" style={project.image && project.imageWidth && project.imageHeight ? { aspectRatio: `${project.imageWidth} / ${project.imageHeight}` } : undefined}>{project.image ? <img src={project.image} alt={project.imageAlt} width={project.imageWidth || 1440} height={project.imageHeight || 900} loading="lazy" /> : <MissingAsset type={type} />}</div>
  </div>;
}

export default function ProjectVisual({ project }) {
  const isWeb = !['gitc', 'bathtub'].includes(project.id);
  const showPhone = project.id === 'cams' && (project.mobileImage || !project.image);
  const type = project.id === 'ares' ? 'navigation' : project.id === 'nexus' ? 'collaboration' : 'web';
  return <div className={`project-visual visual-${project.theme} ${project.image ? 'has-project-image' : ''}`}>
    <div className={`preview-stage ${showPhone ? 'preview-stage-devices' : ''}`}>
      {isWeb ? <BrowserFrame project={project} type={type} /> : <div className={`preview-original ${project.id === 'gitc' ? 'preview-topology' : ''}`}>
        {project.image ? <img src={project.image} alt={project.imageAlt} width={project.imageWidth || 1400} height={project.imageHeight || 950} loading="lazy" /> : <MissingAsset type={project.id === 'gitc' ? 'topology' : 'prototype'} />}
      </div>}
      {showPhone && <div className="preview-phone"><div className="phone-speaker" aria-hidden="true" /><div className="phone-viewport">{project.mobileImage ? <img src={project.mobileImage} alt={project.mobileImageAlt} width={project.mobileImageWidth || 420} height={project.mobileImageHeight || 900} loading="lazy" /> : <MissingAsset type="android" compact />}</div></div>}
    </div>
  </div>;
}
