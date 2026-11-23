import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { profile, projects, skills, experience } from '../src/data/portfolio.js';

const root = resolve(import.meta.dirname, '..');
const missing = [];
function checkUrl(value, label, localAllowed = false) {
  if (!value) { missing.push(label); return; }
  if (localAllowed && value.startsWith('/') && !value.startsWith('//')) {
    assert(existsSync(resolve(root, 'public', value.slice(1))), `${label}: local file is missing: ${value}`);
    return;
  }
  assert.equal(new URL(value).protocol, 'https:', `${label}: expected an HTTPS URL`);
}
assert.equal(projects.length, 6, 'Expected all six projects');
assert.equal(new Set(projects.map(project => project.id)).size, projects.length, 'Project IDs must be unique');
assert.equal(skills.length, 7, 'Expected all seven skill categories');
assert.equal(experience.length, 3, 'Expected all three timeline entries');
assert.equal(profile.name, 'Mohamad Harith Yusri');
checkUrl(profile.github, 'GitHub');
checkUrl(profile.linkedin, 'LinkedIn');
checkUrl(profile.resume, 'Résumé PDF', true);
checkUrl(profile.portrait, 'Actual portrait', true);
if (profile.email) assert(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email), 'Email is invalid');
else missing.push('Professional email');
if (profile.phone) assert(/^\+[1-9]\d{7,14}$/.test(profile.phone.replace(/[\s()-]/g, '')), 'Phone must use international format');
for (const project of projects) {
  assert(project.title && project.description && project.detail && project.stack.length && project.features.length, `Incomplete project: ${project.id}`);
  if (project.github) checkUrl(project.github, `${project.title} source code`);
  if (project.live) checkUrl(project.live, `${project.title} live demo`);
  if (project.image) checkUrl(project.image, `${project.title} screenshot`, true);
  else missing.push(`${project.title}: screenshot or original project image`);
  if (project.mobileImage) checkUrl(project.mobileImage, `${project.title} Android screenshot`, true);
  else if (project.id === 'cams') missing.push('UiTM CAMS: Android screenshot');
}
for (const asset of ['favicon.svg', 'social-card.svg', 'robots.txt', 'sitemap.xml']) assert(existsSync(resolve(root, 'public', asset)), `Missing ${asset}`);
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
assert(html.includes('lang="en"') && html.includes('name="description"'), 'Missing basic SEO/accessibility metadata');
assert(!html.includes('href="#"'), 'Empty navigation destination');
console.log('Portfolio content and configured local assets are valid.');
console.log('Intentionally missing, shown as labeled placeholders:\n' + missing.map(item => `  • ${item}`).join('\n'));
