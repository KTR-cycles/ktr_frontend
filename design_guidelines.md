# KTR Cycle World - Comprehensive Design Guidelines

## Design Approach
**Selected Approach:** Reference-Based with Custom Premium Aesthetic  
**Primary Inspiration:** Premium e-commerce (Airbnb's card aesthetics + Apple's minimalism) with cycling-focused storytelling  
**Key Principle:** Glassy sophistication meets cycling adventure - every element should evoke quality, freedom, and movement

---

## Core Design Elements

### A. Color Palette

**Light Mode (Primary):**
- Primary Golden: `45 100% 50%` (#FFBF00) - Hero CTAs, key highlights, premium accents
- Golden Hover: `45 100% 45%` - Interactive states
- Background White: `0 0% 100%` - Clean canvas
- Text Primary: `0 0% 15%` - High contrast readability
- Text Secondary: `0 0% 45%` - Supporting content
- Border/Divider: `0 0% 90%` - Subtle separation
- Success Green: `142 70% 45%` - Positive feedback
- Glassy Overlay: `0 0% 100% / 0.1` - Card backgrounds with backdrop-blur

**Dark Mode Accents (for glassy effects):**
- Subtle dark overlay: `0 0% 0% / 0.05` for depth in white backgrounds

### B. Typography

**Font Stack:**
- Primary: 'Poppins', sans-serif (headings, features)
- Secondary: 'Inter', sans-serif (body text, details)

**Type Scale:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl font-bold
- Section Titles: text-3xl md:text-4xl font-semibold
- Card Titles: text-xl md:text-2xl font-medium
- Body Text: text-base md:text-lg leading-relaxed
- Small Text: text-sm text-gray-600
- Quote Text: text-2xl md:text-3xl font-light italic

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistency
- Section padding: py-16 md:py-24 lg:py-32
- Card padding: p-6 md:p-8
- Element gaps: gap-4, gap-6, gap-8
- Container: max-w-7xl mx-auto px-4 md:px-6

**Responsive Grid:**
- Mobile: grid-cols-1 (single column)
- Tablet: grid-cols-2 (two columns)
- Desktop: grid-cols-3 lg:grid-cols-4 (three/four columns)

### D. Component Specifications

**1. Hero Section (Home Page)**
- Full-width carousel with cycling lifestyle images
- Overlay: backdrop-blur-sm bg-black/20
- Quote placement: Centered, white text with text-shadow
- Height: min-h-[600px] md:min-h-[700px]
- CTA Button: Golden bg with white text, rounded-full px-8 py-4

**2. Glassy Cards (Universal)**
- Background: bg-white/80 backdrop-blur-md
- Border: border border-gray-200/50
- Shadows: shadow-lg shadow-gray-200/50
- Corners: rounded-2xl (consistent rounded, NO sharp corners)
- Hover: transform scale-[1.02] transition-all duration-300

**3. Product Cards**
- Image container: aspect-[4/3] rounded-xl overflow-hidden
- Hover overlay: bg-gradient-to-t from-black/60 via-black/20 to-transparent
- Price display: Original (line-through) + Discount badge (golden bg) + Current (bold, large)
- "View Details" button: Slide up animation on hover

**4. Quote/Description Sections**
- Background: Alternating white and subtle gradient (bg-gradient-to-br from-gray-50 to-white)
- Quote cards: Glassy effect with large quotation marks in golden
- Text: Centered, max-w-4xl, generous line-height
- Include global cycling images: rounded-3xl with shadow, positioned asymmetrically

**5. Benefits/Motivation Section**
- Grid layout: 2x2 on mobile, 2x3 on tablet, single row on desktop
- Icon style: Golden outlined icons (64px size)
- Card style: Minimal white cards with subtle hover lift
- Content: Short impactful headlines + brief descriptions

**6. Services Section**
- Four-column grid (stacks to 2x2 on mobile)
- Icon + Title + Description format
- Icons: Line-style, golden color, 48px
- Glassy background cards with rounded-2xl

**7. Footer**
- Three-column layout: About/Quick Links/Contact
- Golden divider line at top
- Social icons: Golden on hover
- Background: bg-gray-50 with subtle texture

**8. Navigation**
- Sticky header with backdrop-blur-lg bg-white/90
- Logo: Left-aligned
- Links: Centered, hover underline in golden
- Mobile: Hamburger with smooth slide-in menu

### E. Animation Specifications

**Page Transitions:**
- Route changes: Fade + slide from right (300ms ease-out)
- Scroll reveals: Fade up with stagger (children delay by 100ms)

**Micro-interactions:**
- Button hover: Scale 1.05, golden glow shadow
- Card hover: Lift (translateY -8px), enhanced shadow
- Image hover: Zoom 1.1 on product images
- Link hover: Smooth underline expansion

**Loading States:**
- Initial load: Full-screen cycling animation (wheel spinning + bike silhouette)
- Content loading: Shimmer skeleton with rounded-2xl shapes matching content
- Infinite scroll: Small spinner in golden

**Transition Timing:**
- Quick interactions: 200ms
- Standard: 300ms
- Smooth reveals: 500ms
- Carousel: 600ms ease-in-out

---

## Images Strategy

**Hero Section:**
- Use large, high-quality lifestyle cycling images (mountain biking, urban cycling, group rides)
- Apply dark overlay (bg-black/30) for text readability
- Carousel: 3-5 rotating images with smooth fade transitions

**Global Cycling Images Throughout:**
- Benefits section: Action shots of cyclists in nature/urban settings
- Quotes section: Inspirational cycling moments (sunrise rides, achievement scenes)
- Background textures: Subtle bike gear patterns or tire track patterns in light gray

**Product Images:**
- Clean white background for catalog
- Multiple angles with thumbnail carousel
- Zoom functionality on click

---

## Mobile-First Enhancements

- Swipeable carousels for hero and products
- Sticky bottom bar with WhatsApp/Email (golden circular buttons, fixed bottom-4 right-4)
- Larger touch targets (min 48px)
- Simplified navigation with slide-out menu
- Stacked layout for all multi-column sections
- Reduced animation complexity on mobile for performance

---

## Premium Details

- No sharp corners anywhere (minimum rounded-xl for small elements, rounded-2xl for cards)
- Consistent glassy effect: backdrop-blur-md on all overlays
- Golden accent used sparingly: CTAs, highlights, icons, hover states
- Generous whitespace: Never cramped, always breathing room
- Smooth scrolling: scroll-behavior: smooth
- Professional photography quality for all cycling images
- Subtle parallax on hero section (optional enhancement)