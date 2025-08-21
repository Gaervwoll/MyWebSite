# Personal Website — MyWebSite

A modern single‑page portfolio with an interactive animated background. Desktop‑first; mobile adaptation planned later.

## What’s included

- **Home** (`templates/index.html`): full‑screen canvas background, centered title/subtitle and CTA button, Contacts section.
- **Styles** (`static/style.css`): dark theme, glassmorphism card, responsive typography, animated CTA, contact cards.
- **Animation** (`static/script.js`): particle system with connecting lines, cursor interaction, performance optimizations.

## Background and interactions design ideas

- **Particle nodes** with density based on viewport area; lines drawn for nearby particles.
- **Pointer interaction**: gentle attraction within an influence radius; stronger line visibility near the cursor.
- **Performance**: `requestAnimationFrame`, fixed canvas layer, DPR cap, adaptive particle count, throttled `resize`.
- **Color and depth**: subtle radial gradients below the canvas; synchronized accent colors.
- **No‑JS fallback**: content remains accessible; `noscript` hints about disabled JavaScript.

## Project structure

```
templates/
  index.html        # Home markup and Contacts section
static/
  style.css         # Page, CTA and contacts styles
  script.js         # Background animation and interactions
src/
  main.rs           # Backend (configure as needed)
```

## Roadmap

- **Responsiveness**: media queries for mobile (type, spacing, sizes, touch gestures).
- **Sections**: add `about`, `projects`, `blog`; smooth anchor scrolling, sticky header.
- **Accessibility**: contrast, focus indicators, `prefers-reduced-motion` support.
- **Dark/Light theme**: auto via `prefers-color-scheme` + manual toggle.
- **SEO/OG**: richer meta tags, favicons, Open Graph, sitemap/robots.

## Local development

1. Ensure `/static/style.css` and `/static/script.js` are served as static assets.
2. Route `templates/index.html` as the home page.

## Customize

- Replace contacts in `index.html`: `you@example.com`, `github.com/yourname`, `t.me/yourname`.
- Update your name/subtitle on the home card.
- Tweak `:root` colors and animation params in `static/script.js` (`density`, `linkDistance`, `maxVelocity`).

## License

See `LICENSE`.
