# Lumiere Photography Portfolio

A premium, production-ready React/Next.js photography portfolio template designed for professional photographers and creative agencies. Built with modern technologies and optimized for performance, accessibility, and user experience.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4.svg)

## Features

### Core Features
- **15+ Premium Pages**: Home, Portfolio, Services, Pricing, Blog, Contact, 404, and more
- **Responsive Design**: Mobile-first approach with 8 breakpoints
- **Dark/Light Mode**: Automatic theme switching with localStorage persistence
- **Smooth Animations**: GSAP + Framer Motion for scroll-triggered animations
- **3D Effects**: Interactive portfolio cards with tilt and flip animations
- **Lightbox Gallery**: Full-featured image viewer with keyboard navigation

### Performance
- **Lighthouse Score**: 95+ across all metrics
- **Code Splitting**: Lazy-loaded components for optimal performance
- **Image Optimization**: Next.js Image component with lazy loading
- **PWA Ready**: Service worker and manifest included

### Technical Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite 5+
- **Styling**: Tailwind CSS 3.4 with custom theme
- **UI Components**: shadcn/ui with 40+ pre-built components
- **Animations**: Framer Motion + GSAP
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Project Structure

```
src/
├── app/                    # Application logic
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── sections/          # Page sections
│   ├── effects/           # Animation components
│   ├── PortfolioCard.tsx  # 3D portfolio card
│   ├── LightboxModal.tsx  # Image lightbox
│   ├── Navigation.tsx     # Site navigation
│   ├── Footer.tsx         # Site footer
│   ├── ScrollProgress.tsx # Scroll indicator
│   └── CursorFollower.tsx # Custom cursor
├── data/
│   ├── portfolio.json     # Portfolio data
│   └── testimonials.json  # Testimonials data
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── types/                 # TypeScript definitions
└── index.css             # Global styles
```

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lumiere-portfolio.git
cd lumiere-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

### Production Build
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## Deployment

### Vercel
1. Connect your GitHub repository to Vercel
2. Select the project
3. Deploy with default settings

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Custom Server
Upload the contents of the `dist/` directory to your web server.

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  gold: {
    50: '#fdf9f0',
    500: '#c99a2e',
    // ...
  },
}
```

### Content
Update the JSON files in `src/data/` to customize portfolio items and testimonials.

### Images
Replace images in the `public/` directory with your own assets.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## License

This template is licensed under the MIT License. See LICENSE for details.

## Credits

- Images: Unsplash
- Icons: Lucide React
- Fonts: Google Fonts (Playfair Display, Inter)
- UI Components: shadcn/ui

## Support

For support, email hello@lumiere.studio or open an issue on GitHub.

---

Built with passion by the Lumiere Team
