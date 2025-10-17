# HRP Landing Page Components

This directory contains all the React components for the HRP (Human Resource Photographer) landing page.

## Component Structure

1. **HeroSection** - Main hero section with interactive booking widget
2. **ServicesSection** - Value proposition and key features
3. **PhotographerShowcase** - Grade system explanation and photographer cards
4. **HowItWorks** - Interactive timeline for clients and photographers
5. **PortfolioGallery** - Masonry layout portfolio showcase
6. **Testimonials** - Carousel of client and photographer testimonials
7. **LocationCoverage** - Interactive map visualization
8. **CtaSection** - Dual conversion paths and newsletter signup

## Key Features

- Fully responsive design using Tailwind CSS
- Interactive components with React hooks
- Mobile-first approach
- Accessible UI components
- Performance optimized with lazy loading patterns
- TypeScript type safety

## Design Principles

- Purple/indigo gradient primary color scheme
- Clean, modern aesthetic with ample white space
- Clear visual hierarchy and typography
- Consistent spacing and alignment
- Interactive elements with hover/focus states
- Mobile-friendly touch targets

## Usage

All components are designed to work together as part of the main landing page but can also be used independently if needed.

```tsx
import HeroSection from '@/components/landing/HeroSection'
import ServicesSection from '@/components/landing/ServicesSection'
// ... other imports

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      {/* ... other components */}
    </div>
  )
}
```