# KTR Cycle World

## Overview

KTR Cycle World is a premium cycle showroom website built as a catalog application. It's a client-side React application that uses Google Sheets as a lightweight CMS for product data, with no backend database or e-commerce functionality. The site showcases cycles, provides detailed product information, and helps users discover the showroom location and services.

The application emphasizes a premium, glassy aesthetic with golden yellow accents, smooth animations, and responsive design optimized for mobile, tablet, and desktop viewing.

**Note**: This project has been configured for local development. See README.md for complete setup instructions including removing Replit-specific dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Static site generation - no server-side rendering, purely client-side routing

**UI Component System**
- Shadcn/ui components with Radix UI primitives for accessible, customizable UI elements
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for animations, transitions, and interactive effects
- Design system based on "new-york" style with custom golden yellow primary color (#FFBF00)

**Routing & Navigation**
- Wouter for lightweight client-side routing
- Lazy-loaded route components with React Suspense for code splitting
- Breadcrumb navigation on product detail pages

**State Management**
- Redux Toolkit for global state management
- Redux Persist with encrypted local storage for caching category data
- React Query (TanStack Query) for server state management and data fetching
- Custom encryption using CryptoJS for securing persisted Redux state

**Data Fetching Strategy**
- Google Sheets API as the content management system via Apps Script
- Axios for HTTP requests to Google Sheets endpoints
- React Query handles caching, background updates, and loading states
- In-memory caching for product details with 5-minute TTL to minimize API calls

### Design System

**Color Palette**
- Primary: Golden Yellow (HSL: 45 100% 50%)
- Background: White with glassy overlays using backdrop-blur
- Rounded corners throughout (no sharp edges) - minimum 8px radius
- Shadow system using elevation variables (elevate-1, elevate-2)
- Custom CSS variables for consistent theming across light mode

**Typography**
- Primary font: Poppins (headings, features)
- Secondary font: Inter (body text, details)
- Responsive type scale from mobile to desktop

**Component Patterns**
- Glassy cards with backdrop-blur and subtle borders
- Hover elevation effects for interactive elements
- Smooth transitions and animations using Framer Motion
- Skeleton loaders for loading states
- Infinite scroll/pagination for product lists

### Page Structure

**Home Page**
- Hero carousel with motivational cycling quotes
- Featured/most-sold products preview
- Services section with icon cards (delivery, pickup, quality, experience)
- Benefits of cycling section
- Embedded Google Map for showroom location
- Comprehensive footer with contact information

**Product List Page**
- Grid layout with filters (brand, category, type, price range)
- Lazy loading with skeleton placeholders
- "Load More" pagination
- Sidebar filters with collapsible sections
- Responsive grid (1 column mobile, 2-3 columns desktop)

**Product Detail Page**
- Image carousel supporting multiple product images
- Breadcrumb navigation
- Price breakdown showing original, discount, and current price
- Product specifications and features
- User reviews section with feedback submission dialog
- Smooth scroll animations

### Performance Optimizations

**Code Splitting & Lazy Loading**
- Route-based code splitting using React.lazy()
- Suspense boundaries with custom loading spinners
- Image lazy loading for product galleries

**Caching Strategy**
- Redux Persist for categories (encrypted local storage)
- React Query cache with staleTime: Infinity (manual invalidation)
- In-memory product cache with 5-minute TTL
- Service Worker potential for offline support (not yet implemented)

**Bundle Optimization**
- Vite's automatic code splitting and tree shaking
- Path aliases for clean imports (@/, @shared/, @assets/)
- Production build minification via esbuild

### Error Handling

- React Error Boundary at app root level
- Custom error fallback UI with reload functionality
- Query error states handled per-component
- 404 page for unmatched routes

## External Dependencies

### Third-Party Services

**Google Sheets API**
- Primary CMS for product and category data
- Accessed via Google Apps Script Web App endpoint
- Two sheets: "products" and "categories"
- No authentication required (public read-only endpoint)

**Map Integration**
- Google Maps Embed API for showroom location
- Configurable embed URL in GoogleMap component

### Major Libraries & Frameworks

**Core Framework**
- React 18.x with TypeScript
- Vite 5.x for build tooling

**UI & Styling**
- Tailwind CSS 3.x for utility-first styling
- Radix UI primitives for accessible components
- Framer Motion for animations
- Lucide React for icons
- React Icons for brand icons (WhatsApp, Instagram, Facebook)

**State & Data**
- Redux Toolkit for state management
- Redux Persist for local storage persistence
- TanStack React Query for server state
- Axios for HTTP requests
- CryptoJS for state encryption

**Routing & Navigation**
- Wouter for client-side routing

**Carousel & Media**
- Embla Carousel for hero and product image carousels
- React Hook Form with Zod resolvers for form validation (reviews)

### Database Schema

While the application uses Google Sheets as a CMS (not a traditional database), the data structure follows this schema:

**Products Sheet**
- id (string): Unique product identifier
- name (string): Product name
- brand (string, optional): Manufacturer brand
- category (string, optional): Product category
- type (string, optional): Product type/subcategory
- actualPrice (number): Original price before discount
- discount (number, optional): Discount percentage
- currentPrice (number): Final selling price
- description (string, optional): Product description
- specifications (string, optional): Technical specifications
- features (string, optional): Key features
- images (string): Comma-separated image URLs
- stock (string, optional): Stock status

**Categories Sheet**
- id (string): Unique category identifier
- name (string): Category name
- description (string, optional): Category description

The application includes validation schemas using Zod for runtime type checking and data integrity.

### Development & Deployment

**Development Environment**
- Replit-specific plugins for error overlay and dev banner
- Hot Module Replacement (HMR) via Vite
- TypeScript strict mode enabled

**Build Process**
- Client build: Vite bundles React app to dist/public
- Server build: esbuild bundles Express server to dist (minimal, serves static files)
- Production mode runs compiled Express server serving static assets

**Environment Variables**
- DATABASE_URL: Required for Drizzle config (prepared for future backend)
- VITE_GOOGLE_SHEET_URL: Google Sheets API endpoint (referenced in docs)