import assert from 'node:assert/strict';
import { build } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { profile } from '../src/data/portfolio.js';

const renderOutput = resolve('node_modules/.cache/portfolio-render-check');
await build({ logLevel: 'silent', build: { ssr: 'src/App.jsx', outDir: renderOutput, emptyOutDir: true } });
{
  const { default: App } = await import(pathToFileURL(resolve(renderOutput, 'App.js')).href);
  const html = renderToStaticMarkup(createElement(App));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML IDs');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Expected one primary heading');
  for (const section of ['home', 'about', 'projects', 'skills', 'experience', 'contact']) assert(ids.includes(section), `Missing ${section}`);
  for (const [, href] of html.matchAll(/\bhref="([^"]*)"/g)) {
    assert(href && href !== '#', 'A link has an empty destination');
    if (href.startsWith('#')) assert(ids.includes(href.slice(1)), `Broken section link: ${href}`);
    else assert(href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('/'), `Unexpected link: ${href}`);
  }
  assert.equal((html.match(/class="project-card /g) || []).length, 6, 'Expected six rendered projects');
  assert(html.includes('aria-controls="main-navigation"'), 'Mobile menu must reference navigation');
  assert(html.includes('aria-labelledby="selected-work-title"'), 'Selected Work needs a heading association');
  assert(html.includes('id="more-work-title"'), 'Additional projects area is missing');
  const featuredMarkup = html.split('class="featured-work"')[1].split('class="more-work"')[0];
  assert.deepEqual([...featuredMarkup.matchAll(/id="project-title-([^"]+)"/g)].map(match => match[1]), ['cams', 'ares', 'gitc', 'nexus'], 'Featured project order is incorrect');
  assert.equal((html.match(/class="project-card work-secondary/g) || []).length, 2, 'Expected two additional projects');
  if (!profile.portrait) assert(html.includes('Portrait to be added'), 'Missing photo should have an honest placeholder');
  for (const [, attributes] of html.matchAll(/<img\b([^>]+)>/g)) {
    assert(/\bsrc="[^"]+"/.test(attributes), 'An image has no source');
    assert(/\balt="[^"]+"/.test(attributes), 'A content image has no descriptive alt text');
    const source = attributes.match(/\bsrc="([^"]+)"/)[1];
    if (source.startsWith('/')) assert(existsSync(resolve('dist', source.slice(1))), `Image missing from build: ${source}`);
  }
  const dist = resolve('dist');
  const builtHtml = readFileSync(resolve(dist, 'index.html'), 'utf8');
  const assets = [...builtHtml.matchAll(/(?:src|href)="(\/[^\"]+)"/g)].map(match => match[1]);
  for (const asset of assets) assert(existsSync(resolve(dist, asset.slice(1))), `Missing built asset: ${asset}`);
  const cssFiles = readdirSync(resolve(dist, 'assets')).filter(file => file.endsWith('.css'));
  for (const file of cssFiles) {
    const css = readFileSync(resolve(dist, 'assets', file), 'utf8');
    for (const [, asset] of css.matchAll(/url\(([^)]+)\)/g)) {
      const cleaned = asset.replace(/["']/g, '');
      if (cleaned.startsWith('/')) assert(existsSync(resolve(dist, cleaned.slice(1))), `Missing font/CSS asset: ${cleaned}`);
    }
    assert(css.includes('prefers-reduced-motion'), 'Reduced motion styles missing');
  }
  console.log('React render, section links, six projects, accessible control labels, and all built HTML/CSS assets verified.');
}
