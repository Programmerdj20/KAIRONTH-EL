# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for "THAELYON-KODH-EL - The Solar Name Code", a spiritual/mystical landing page. Built with vanilla HTML, CSS, and JavaScript — no build process, no framework, no package manager.

**Identity transition**: The site evolved from KAIRONTH-EL to THAELYON-KODH-EL. Historical references to KAIRONTH-EL are preserved in temple narratives (LL50, LA114) and the published book title. All brand/identity references use THAELYON-KODH-EL.

## Architecture

Three core files + asset directories:
- `index.html` — Single-page layout with all sections inline
- `styles.css` — All styling with CSS custom properties and responsive breakpoints
- `script.js` — All interactivity: navigation, animations, form handling
- `Assets/` — Images in `.webp` format (posters, favicon, logos, hero portrait `THAELYON.webp`)
- `Books/` — Downloadable PDF (`KAIRONTH-EL_Libro_Capitulos1y2.pdf`)

## Development

No build step. Open `index.html` directly in a browser or serve via any static server. Cache-busting is done via query string on the CSS link (`styles.css?v=3.0`).

## Page Sections (in order)

`#home` (hero with portrait + narrative grid) → `#about` → `#solar-code` → `#mission` → `#temples` (4 individual temple cards with anchor IDs: `#temple-main-celestial`, `#temple-ll50`, `#temple-layma`, `#temple-cerro-campana`) → `#events` → `#books` (book download + premium PayPal options) → `#donation` (PayPal + crypto wallets) → `#sacred-texts` (early access form) → footer

## Hero Section Layout

The hero uses a CSS Grid layout: portrait image on the left (sticky on desktop), narrative on the right. The narrative includes:
- Main title (THAELYON-KODH-EL)
- 4 spiritual titles (list)
- Subtitle line
- Transition narrative honoring KAIRONTH-EL
- 3 trident declarations
- 3 closing cosmic lines

On mobile (768px and below), it collapses to a single column with image on top.

## Key Integrations

### PayPal Hosted Buttons
SDK loaded in `<head>` with a specific client-id. Three hosted buttons rendered via inline `<script>` at the bottom of `index.html`:
- `3DAW57WTNMRD2` — Monthly subscription ($4.99/month)
- `E4P6765SC7VLG` — Complete membership ($39 one-time)
- `VNEAQQAWPRGA2` — Donation button

### Crypto Donations
Wallet addresses are hardcoded in HTML: Bitcoin (SegWit), Ethereum/BNB (ERC-20/BEP-20), TRON (TRC-20), and Binance ID.

## CSS Architecture

### Custom Properties (`:root`)
- Colors: `--primary-dark` (#0a1628), `--secondary-dark` (#1a2332), `--accent-gold` (#f4d03f), `--accent-gold-dark` (#f39c12), `--accent-gold-light` (#fce588)
- Gradients: `--gradient-gold`, `--gradient-gold-subtle`
- Shadows: `--shadow-gold`, `--shadow-gold-strong`
- Borders: `--border-gold`, `--border-gold-strong`
- Transitions: `--transition: all 0.3s ease`, `--transition-slow: all 0.6s ease`

### Responsive Breakpoints
`1024px` → `768px` → `480px` → `360px` (mobile-first with progressive enhancement)

### Typography
- Headings: `"Cinzel", serif` (Google Fonts)
- Body: `"Inter", sans-serif` (Google Fonts)

## JavaScript Patterns

### Scroll-driven behavior
Multiple `window.addEventListener("scroll", ...)` listeners handle: navbar background opacity, scroll progress bar, back-to-top visibility, active nav link highlighting, parallax effects. These are separate listeners, not consolidated.

### IntersectionObserver animations
- Hero narrative: Sequential reveal with `.revealed` class added to children with staggered delays
- Other sections: Elements set to `opacity: 0; transform: translateY(30px)` then revealed on intersection

### Form handling
The early access form (`#early-access-form`) simulates submission with `setTimeout` — there is no backend endpoint. Validation uses a basic email regex.

### Dynamic CSS injection
`script.js` appends a `<style>` element to `<head>` with keyframe animations (`slideIn`, `slideOut`, `twinkle`) and notification styles.

## Known Quirks

- **HTML lang mismatch**: `<html lang="es">` but the vast majority of content is in English.
- **No backend**: Form submissions are simulated client-side only.
- **Navbar fixed height**: 70px, used as scroll offset in JS (`offsetTop - 70`).
- **Historical name references**: KAIRONTH-EL appears in temple LL50, temple LA114, book title/description, and PDF file paths — these are intentional historical/narrative preservations.
