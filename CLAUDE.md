# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "KAIRONTH-EL - The Solar Name Code", a spiritual/mystical landing page built with vanilla HTML, CSS, and JavaScript. The site features:

- Single-page application with smooth scrolling navigation
- Responsive design with mobile-first approach
- Cosmic/mystical theming with golden accents and dark backgrounds
- Interactive elements including form handling, animations, and scroll effects
- Loading overlays, progress indicators, and notification systems

## Architecture

The project uses a simple three-file structure:
- `index.html` - Main HTML structure with semantic sections
- `styles.css` - Complete CSS styling with responsive breakpoints
- `script.js` - JavaScript functionality for interactivity
- `Assets/` - Contains images (favicon.webp, Principalimg.webp)

## Key Features & Components

### Navigation System
- Fixed navbar with mobile hamburger menu
- Smooth scrolling to sections with offset for fixed header
- Active section highlighting based on scroll position
- Mobile-responsive with slide-out menu

### Hero Section
- Responsive portrait frame with golden mandala effects
- Two-column text layout that stacks on mobile
- Animated cosmic particles background
- Call-to-action buttons with hover effects

### Form Handling
- Early access email form with validation
- Success/error feedback system
- Loading states and animations
- Email regex validation

### Animation System
- Intersection Observer for scroll-triggered animations
- CSS keyframe animations for cosmic particles, loading spinners
- Hover effects on cards and buttons
- Parallax scrolling effects

## CSS Architecture

### CSS Custom Properties (Variables)
- Color scheme: `--primary-dark`, `--secondary-dark`, `--accent-gold`
- Consistent spacing and transition values
- Responsive font sizes using `clamp()`

### Responsive Design
- Mobile-first approach with progressive enhancement
- Breakpoints: 1024px (tablet landscape), 768px (tablet portrait), 480px (mobile large), 360px (mobile small)
- Grid layouts that adapt to single columns on mobile
- Font and spacing scaling based on viewport

### Typography
- "Cinzel" serif font for headings and titles
- "Inter" sans-serif for body text
- Text shadows and glowing effects for mystical appearance

## JavaScript Functionality

### Core Features
- Mobile menu toggle with hamburger animation
- Scroll progress indicator
- Back-to-top button with visibility control
- Form submission with validation and feedback
- Smooth scrolling navigation
- Intersection Observer for animations

### Animation Controllers
- Cosmic particle generation
- Portrait hover effects
- Card hover animations
- Loading state management

## Development Notes

### File Structure
- All assets referenced with absolute paths (`/Assets/`)
- Placeholder images for development (`/placeholder.svg`)
- No build process required - pure static files

### Browser Support
- Uses modern JavaScript features (Intersection Observer, CSS Custom Properties)
- Graceful degradation for older browsers
- Touch-friendly mobile interactions

### Performance Considerations
- Lazy loading for images
- CSS animations using transform for GPU acceleration
- Minimal JavaScript footprint
- Optimized for fast loading

## Common Development Tasks

Since this is a static site with no build process:
- Edit HTML directly in `index.html`
- Modify styles in `styles.css`
- Update functionality in `script.js`
- Replace placeholder images in `Assets/` folder
- Test responsiveness across different screen sizes

The site can be served directly from any static file server or opened in a browser locally.