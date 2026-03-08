# GamerPro Website

Professional gaming control panel website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎮 **Game Module Management**: Control 10 different game modules
- 📊 **Real-time Performance Monitoring**: CPU, Memory, and FPS tracking
- 🎨 **Modern UI/UX**: Glass morphism design with animations
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Fast Performance**: Static site generation with Next.js

## Supported Games

1. ARC Raiders (UGP-ARC-001)
2. THE FINALS (UGP-FINALS-002)
3. Borderlands 4 (UGP-BL4-003)
4. Call of Duty (UGP-COD-004)
5. Dying Light The Beast (UGP-DLTB-005)
6. Forza Horizon 5 (UGP-FH5-006)
7. Red Dead Redemption 2 (UGP-RDR2-007)
8. Grand Theft Auto V (UGP-GTA5-008)
9. Rainbow Six Siege (UGP-R6S-009)
10. The Elder Scrolls Online (UGP-ESO-010)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/LilToreyFTW/GamerPro-Website.git
cd GamerPro-Website

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## Project Structure

```
├── components/          # React components
│   ├── GameCard.tsx    # Individual game card
│   ├── ModuleControl.tsx # Module control panel
│   ├── PerformanceMonitor.tsx # Performance metrics
│   └── StatusPanel.tsx # Engine status
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   └── index.tsx      # Home page
├── public/            # Static assets
│   └── images/        # Game images
├── styles/            # CSS files
│   └── globals.css    # Global styles
└── styles/            # Tailwind config
```

## Deployment

### Vercel

1. Push to GitHub repository
2. Connect to Vercel
3. Automatic deployment

### Manual Build

```bash
npm run build
npm run export
```

The static files will be in the `out` directory.

## Customization

### Adding New Games

1. Update game data in `pages/index.tsx`
2. Add game images to `public/images/games/`
3. Update the game count in components

### Styling

The project uses Tailwind CSS with custom themes:

- `gamer-primary`: Main background color
- `gamer-secondary`: Secondary background
- `gamer-accent`: Accent color
- `gamer-highlight`: Highlight/brand color
- `module-*`: Module status colors

### Fonts

- **Orbitron**: Gaming font for headers
- **Rajdhani**: Tech font for body text

## API Integration

The website is designed to integrate with the GamerPro desktop application:

```typescript
// Example API call
const response = await fetch('/api/modules/status')
const modules = await response.json()
```

## Performance

- Static site generation for fast loading
- Optimized images with Next.js Image component
- Minimal JavaScript bundle
- CSS-in-JS with Tailwind CSS

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, contact the development team or create an issue on GitHub.

---

© 2026 GamerPro Control Panel. All rights reserved.
