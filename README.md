# Harith Yusri — Personal Portfolio

A responsive, editorial portfolio for Mohamad Harith Yusri, built with React, Vite, Tailwind CSS, JavaScript, and Lucide icons. Fonts are bundled locally; there are no runtime font services, analytics, or API keys. Subtle CSS scroll reveals respect reduced-motion preferences.

## Run locally

Use Node.js 22.12 or newer (Node 22 LTS recommended).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173.

```sh
npm run check   # Validate data, URL formats, and configured local assets
npm run build   # Production output in dist/
npm run check:render # Check rendered sections, anchors, labels, and built assets
npm run preview # Preview that build, normally http://127.0.0.1:4173
```

`check` does not claim to verify external website availability. Missing optional personal details are reported but do not fail the build.

## Edit your content

All personal information, project descriptions, technologies, links, skill categories, and timeline entries are in `src/data/portfolio.js`. Components are in `src/components/`; page sections are in `src/App.jsx`; visual styling and responsive breakpoints are in `src/styles.css`.

### Portrait and contact details

Your latest supplied portrait is stored unchanged at `public/images/harith-yusri.png`, preserving its transparency. The hero uses the cutout layout to show the photograph against the orange background. Your email, international phone number, and LinkedIn URL are configured in `profile`. The contact section includes email and telephone links, and the LinkedIn link appears in the hero and footer. Edit these values in `src/data/portfolio.js` whenever needed.

To replace the portrait, put the new file in `public/images/` and update `profile.portrait`. Set `portraitIsCutout: true` only if the supplied replacement has a transparent background.

### Still needed from you

- Résumé PDF. Put it in `public/` and set `profile.resume`, for example `/harith-yusri-resume.pdf`. The real download action appears when configured.
- Actual screenshots for the web projects, your GITC network diagram, and photographs of the bathtub prototype. Put them in `public/images/` and set each project's `image` and `imageAlt`. Current previews are explicitly labeled placeholders, not screenshots or the original GITC topology.
- NEXUS HUB's live URL; optional repository/demo links for projects that do not yet have them. Set the relevant `github` or `live` field. A null value renders no misleading link.

Selected Work uses the `featured` flag to present UiTM CAMS, A.R.E.S., GITC, and NEXUS HUB as four alternating editorial showcases. Laravel and Smart Bathtub appear under Explore All Projects. Edit `discipline` and optional `showcaseTitle` for presentation labels. Web project images automatically appear in browser frames; GITC diagrams and prototype photos appear in uncropped frames. For CAMS, set `image` to the web dashboard capture and `mobileImage` / `mobileImageAlt` to the Android capture. Each missing capture has a clearly labeled placeholder; the frames contain no fabricated application data.

Use local WebP/AVIF/JPEG images at sensible sizes (roughly 1000–1600px wide for previews). The portrait is loaded with high priority and project images are lazy-loaded. Prefer readable landscape screenshots; previews use cover cropping.

When adding or replacing a file or link, run `npm run check` and `npm run build` again. Manually open the project previews, dialogs, navigation, contact/download links, and mobile menu after changes.

## GitHub Pages

Target: https://harith-yusri.github.io/

The user-site repository is **harith-yusri.github.io**. Vite uses `base: '/'`, as required for a user site. No client-side routes need server rewrites; navigation uses section anchors.

The GitHub Actions workflow deploys changes pushed to `main`. To configure hosting:

1. Create or select your `harith-yusri.github.io` repository on GitHub.
2. Add this source to its `main` branch, including `package-lock.json` and `.github/workflows/deploy.yml`.
3. In repository **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.
4. Pushing to `main` (or running the workflow manually) installs the locked dependencies, validates content, builds, and deploys `dist/` to Pages. Future pushes to `main` redeploy the site.

The deployment job requests only the Pages and identity permissions it requires. If GitHub asks to approve the `github-pages` environment, review and approve it there.

If hosting at a project URL instead, change `base` and the root-relative asset URLs, canonical URL, Open Graph URLs, robots.txt, and sitemap accordingly.

References: [Vite's GitHub Pages guide](https://vite.dev/guide/static-deploy.html#github-pages), [Tailwind's Vite integration](https://tailwindcss.com/docs/installation/using-vite).

## Accessibility and interactions

- Semantic sections, one main heading, skip navigation, visible keyboard focus, and descriptive link text.
- Native modal dialogs with focus containment, Escape dismissal, a close button, and focus restoration.
- Mobile navigation with expanded state and Escape dismissal.
- Featured project previews and View Project buttons open accessible details, with available GitHub and Live Demo links alongside them.
- Reduced-motion settings disable smooth scrolling and reveal transitions.
- Missing personal details are readable placeholders, not dead buttons or invented contact information.
- Project descriptions distinguish proposed networks, physical prototypes, and simulated safety calculations.

The included SVG social card works as a local graphic. For broad social network preview support, replace it with a 1200 × 630 PNG/JPEG and update `og:image` in `index.html`.

## Implementation verification

The production build, content validation, and rendered HTML/asset checks passed during implementation. The supplied GitHub profile, three repositories, and A.R.E.S. live URL returned HTTP 200. Responsive CSS covers desktop, tablet, and mobile, and the oversized nameplate was checked against the bundled font's metrics to prevent horizontal overflow. Full visual mobile and interaction testing could not be completed because browser access was unavailable and Safari Computer Use access was not approved. Check the site in a browser before publishing, including at 320px, 390px, 768px, and desktop widths.
