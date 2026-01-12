# Project Structure

## Repository Organization

### Root Level
```
/
├── next-landing/          # Next.js application (main project)
├── index.html            # Vanilla HTML version
├── script.js             # Vanilla JavaScript implementation
├── styles.css            # Custom CSS for HTML version
├── Image (8).jpg         # Promo image asset
└── Image (9).jpg         # Rate sheet image
```

### Next.js Application (`/next-landing`)
```
next-landing/
├── src/
│   ├── app/              # App Router directory
│   │   ├── layout.tsx    # Root layout component
│   │   ├── page.tsx      # Home page (minimal starter)
│   │   ├── globals.css   # Global Tailwind styles
│   │   └── favicon.ico   # Site favicon
│   └── components/
│       └── LandingPage.tsx # Main landing page component
├── public/               # Static assets
│   ├── kinabalu-promo.jpg
│   ├── rate-sheet.jpg
│   └── *.svg            # Icon assets
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── next.config.ts       # Next.js configuration
├── postcss.config.mjs   # PostCSS configuration
└── eslint.config.mjs    # ESLint configuration
```

## Architecture Patterns

### Dual Implementation
- **Next.js Version**: Modern React application with TypeScript
- **Vanilla Version**: Plain HTML/CSS/JS for broader compatibility
- **Shared Logic**: Rate calculation and WhatsApp integration logic

### Component Structure
- **LandingPage.tsx**: Single-page component containing all sections
- **Modular Sections**: Hero, rates, booking form, FAQ, footer
- **Reusable Logic**: Rate calculation, WhatsApp URL building, form handling

### Data Management
- **Static Rate Data**: Hardcoded vehicle rates and specifications
- **Form State**: React hooks for booking form management
- **Local Storage**: Not currently used (stateless design)

### Styling Approach
- **Tailwind Classes**: Utility-first CSS in React components
- **Custom CSS Variables**: Design tokens for colors and spacing
- **Responsive Design**: Mobile-first breakpoints
- **Dark Theme**: Single theme with gradient accents

### Asset Organization
- **Images**: Stored in `/public` for Next.js, root for vanilla
- **Icons**: SVG files for scalability
- **Fonts**: Google Fonts (Inter) loaded via CDN

## File Naming Conventions
- **Components**: PascalCase (e.g., `LandingPage.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`)
- **Assets**: descriptive names (e.g., `kinabalu-promo.jpg`)
- **Config Files**: framework conventions (e.g., `next.config.ts`)