# Technology Stack

## Next.js Application

### Framework & Runtime
- **Next.js 16.1.1** with App Router
- **React 19.2.3** with React DOM
- **TypeScript 5** for type safety
- **Node.js** runtime environment

### Styling & UI
- **Tailwind CSS 4** for utility-first styling
- **PostCSS** for CSS processing
- **Custom CSS** for vanilla HTML version
- **Dark theme** with gradient accents
- **Responsive design** (mobile-first)

### Development Tools
- **ESLint 9** with Next.js config for code quality
- **TypeScript compiler** with strict mode enabled
- **Next.js dev server** with hot reload

### Build System
```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build optimized production bundle
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint checks
```

### Project Structure
- **App Router**: Uses Next.js 13+ app directory structure
- **Component Architecture**: Modular React components
- **Static Assets**: Images and SVGs in `/public`
- **Type Definitions**: Comprehensive TypeScript coverage

### Deployment
- **Vercel Platform**: Recommended deployment target
- **Static Export**: Can be deployed as static site
- **CDN Ready**: Optimized for global content delivery

### Performance Features
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Geist font family with next/font
- **Bundle Splitting**: Automatic code splitting
- **Static Generation**: Pre-rendered pages where possible