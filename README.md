# KTR Cycle World

A premium cycling showroom website built with React, TypeScript, and Express, featuring a beautiful golden-accented design, Google Sheets integration for content management, and a responsive mobile-first interface.

## Features

- **Premium Design**: Golden yellow accents (#FFBF00), glassy backdrop effects, smooth animations
- **Google Sheets CMS**: Products and categories managed through Google Sheets
- **Advanced Filtering**: Filter products by category, brand, and price range
- **Product Catalog**: Beautiful grid layout with image carousels
- **Detailed Product Pages**: Multiple images, specifications, features, and reviews
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Client-Side Routing**: Fast navigation with Wouter
- **State Management**: Redux with encrypted local storage persistence
- **Smooth Animations**: Framer Motion for fluid transitions

## Prerequisites

- **Node.js**: v20.x or higher
- **npm**: v9.x or higher

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ktr-cycle-world
```

### 2. Remove Replit Dependencies (Important for Local Setup)

**Update `package.json`:**

Remove these lines from `devDependencies`:
```json
"@replit/vite-plugin-cartographer": "^0.3.1",
"@replit/vite-plugin-dev-banner": "^0.1.1",
"@replit/vite-plugin-runtime-error-modal": "^0.0.3",
```

**Update `vite.config.ts`:**

Replace the file content with:
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
```

### 3. Install Dependencies

```bash
npm install
```

## Configuration

### Google Sheets API Setup

The application fetches product data from Google Sheets. To set up your own:

1. **Create a Google Sheet** with two sheets:
   - **products**: Product information
   - **categories**: Category information

2. **Products Sheet Columns**:
   - `id` (string): Unique product identifier
   - `name` (string): Product name
   - `brand` (string): Manufacturer brand
   - `category_name` (string): Category name
   - `type` (string): Product type/subcategory
   - `original_price` (number): Original price
   - `discount` (number): Discount percentage
   - `discounted_price` (number): Final selling price
   - `description` (string): Product description
   - `specifications` (string): Technical specs (line-separated)
   - `features` (string): Key features (line-separated)
   - `images` (string): Comma-separated image URLs
   - `stock` (string): Stock status

3. **Categories Sheet Columns**:
   - `id` (string): Unique category identifier
   - `name` (string): Category name
   - `description` (string): Category description

4. **Deploy as Web App**:
   - Go to Extensions > Apps Script
   - Create a script that returns JSON data
   - Deploy as Web App with "Anyone" access
   - Copy the Web App URL

5. **Update API Endpoint**:

Edit `client/src/lib/api.ts` and update:
```typescript
const PRODUCTS_API = 'YOUR_GOOGLE_SHEETS_API_URL';
```

### Image URLs

Images must be publicly accessible URLs starting with `http://` or `https://`. For multiple images, separate URLs with commas:

```
https://example.com/image1.jpg, https://example.com/image2.jpg
```

### Environment Variables

Copy the template file and configure your environment:

```bash
cp .env.template .env
```

Edit `.env` and update the values:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Session Secret (generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
SESSION_SECRET=your-generated-secret-key

# Google Sheets API URL (optional - can be configured in code)
VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

**Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

## Running Locally

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at:
- **Frontend & Backend**: http://localhost:5000

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
ktr-cycle-world/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── lib/           # Utilities and API functions
│   │   ├── hooks/         # Custom React hooks
│   │   └── App.tsx        # Main application component
│   └── index.html         # HTML entry point
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── vite.ts           # Vite development server setup
├── shared/               # Shared types and schemas
│   └── schema.ts         # Data models and Zod schemas
├── attached_assets/      # Static assets
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Component library with Radix UI primitives
- **Framer Motion** - Animation library
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence with encryption
- **React Query** - Server state management
- **Wouter** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Express** - Web server framework
- **TypeScript** - Type safety

### Data Management
- **Google Sheets API** - Content management system
- **Zod** - Schema validation
- **CryptoJS** - State encryption

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes (Drizzle)

## Key Features Explained

### Category Filtering
Products can be filtered by category name, brand, and price range. The filter sidebar shows all available options dynamically based on the loaded products.

### Image Handling
- Supports multiple images per product (comma-separated URLs)
- Automatic fallback with icon if image fails to load
- Image carousel on product detail pages
- Zoom functionality on product images

### State Persistence
Redux state (categories) is persisted to localStorage with AES encryption for security. A version system prevents decryption errors when the encryption key changes.

### Responsive Design
- Mobile-first approach
- Breakpoints: mobile (default), tablet (768px), desktop (1024px)
- Touch-friendly interactions
- Optimized image loading

### Performance Optimizations
- Code splitting by route
- Image lazy loading
- React Query caching with 5-minute TTL
- Redux persist for faster category loading
- Memoized filter calculations

## Customization

### Colors and Theming

Edit `client/src/index.css` to customize the color palette:

```css
:root {
  --primary: 45 100% 50%;        /* Golden Yellow */
  --background: 0 0% 100%;       /* White */
  /* ... other color variables */
}
```

### Design System

The design emphasizes:
- **Rounded corners**: Minimum 8px border radius throughout
- **Glassy effects**: Backdrop blur with subtle transparency
- **Golden accents**: Primary color used sparingly for emphasis
- **Smooth animations**: 200-600ms transition durations
- **Elevation shadows**: Multi-level shadow system

### Google Map Integration

Update the embedded map in `client/src/components/GoogleMap.tsx`:

```typescript
const embedUrl = "YOUR_GOOGLE_MAPS_EMBED_URL";
```

## Troubleshooting

### Images Not Loading

1. Check that image URLs in Google Sheets start with `http://` or `https://`
2. Verify images are publicly accessible
3. Open browser console (F12) to see error messages
4. Check the API response format in browser console

### Build Errors

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Make sure Node.js version is 20.x or higher

### Port Already in Use

Change the port in your `.env` file or run:
```bash
PORT=3000 npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the code comments in key files
3. Open an issue on GitHub with detailed information

---

**Built with ❤️ for cycling enthusiasts**
