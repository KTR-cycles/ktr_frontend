/**
 * Pre-build script — fetches dynamic home page content and generates homeContentDynamic.ts
 *
 * Run automatically : npm run dev  |  npm run build
 * Run manually      : node scripts/fetch-home-data.mjs
 *
 * On any failure the existing homeContentDynamic.ts is left untouched,
 * so the build always succeeds using the committed fallback data.
 *
 * ─── What is fetched ──────────────────────────────────────────────────────────
 *
 *  1. Carousel slides  →  sheet: home_screen   (AppScript endpoint)
 *  2. Popular products →  sheet: products      (existing endpoint, featured=TRUE rows only)
 *
 *  Motivation quotes, cycling benefits, and services are intentionally
 *  hardcoded in homeContent.ts and are NOT fetched here.
 *
 * ─── Google Sheet: home_screen ────────────────────────────────────────────────
 *
 *  Columns (names must match exactly):
 *
 *  order  |  image_url                          |  quote            |  enabled
 *  -------|-------------------------------------|-------------------|----------
 *  1      |  https://drive.google.com/file/d/…  |  (optional text)  |  TRUE
 *  2      |  https://drive.google.com/file/d/…  |                   |  TRUE   ← image-only slide
 *  3      |  https://drive.google.com/file/d/…  |  Go faster…       |  FALSE  ← hidden
 *
 *  Rules:
 *  - image_url  : required — Google Drive share link or any direct image URL
 *  - quote      : optional — leave blank for an image-only slide (no text overlay)
 *  - enabled    : optional — defaults to TRUE; set FALSE to hide a slide
 *  - order      : sort order (ascending); use 1, 2, 3 …
 *
 * ─── Google Sheet: products (existing) ────────────────────────────────────────
 *
 *  No changes needed to the products sheet.
 *  Rows where  featured = TRUE  are used as the "Most Popular Cycles" section.
 *  Ensure the featured column value is exactly TRUE (not "true" or 1).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = join(__dirname, '../client/src/data/homeContentDynamic.ts');

// ─── AppScript URLs ───────────────────────────────────────────────────────────
const BASE_APPSCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyCoIkmJuiRnBwzq6wPfMOYv5cvqVUchsl-ycvcuVtI28RnzN2-YvVDxzuEndqnUCQu/exec';

const HOME_SCREEN_URL =
  process.env.VITE_HOME_SCREEN_URL || `${BASE_APPSCRIPT_URL}?sheet=home_screen`;

const PRODUCTS_URL =
  process.env.VITE_PRODUCTS_URL || `${BASE_APPSCRIPT_URL}?sheet=products`;
// ─────────────────────────────────────────────────────────────────────────────

// ─── Google Drive URL converter (mirrors client/src/utils/imageUtils.ts) ──────
function convertGoogleDriveUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const regexes = [
    /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)/,
    /^https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9-_]+)/,
    /^https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9-_]+)/,
  ];
  for (const re of regexes) {
    const m = url.match(re);
    if (m) return `https://drive.usercontent.google.com/download?id=${m[1]}&export=view`;
  }
  return url;
}
// ─────────────────────────────────────────────────────────────────────────────

async function safeFetch(url, label) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${label}: HTTP ${res.status} ${res.statusText}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error(`${label}: expected array, got ${typeof data}`);
  return data;
}

function toInt(val) {
  const n = parseInt(val, 10);
  return isNaN(n) ? 0 : n;
}

function isEnabled(val) {
  if (val === undefined || val === null || val === '') return true;
  return String(val).trim().toUpperCase() !== 'FALSE';
}

// ─── Parse home_screen rows → carousel slides ─────────────────────────────────
function parseCarouselSlides(rows) {
  return rows
    .filter((r) => isEnabled(r.enabled))
    .sort((a, b) => toInt(a.order) - toInt(b.order))
    .map((r) => {
      const slide = { image: convertGoogleDriveUrl(String(r.image_url || '').trim()) };
      const quote = String(r.quote || '').trim();
      if (quote) slide.quote = quote;
      return slide;
    })
    .filter((r) => r.image); // image is required
}

// ─── Parse products rows → Product objects (featured only) ───────────────────
function parseProducts(rows) {
  return rows
    .filter((item) => {
      const f = String(item.featured || '').trim().toUpperCase();
      return f === 'TRUE' || f === '1' || f === 'YES';
    })
    .map((item, index) => {
      const productId = String(item.product_id || item.id || `product-${index + 1}`);
      return {
        id: productId,
        product_id: productId,
        name: String(item.name || ''),
        brand: String(item.brand || ''),
        image: item.images ? convertGoogleDriveUrl(item.images.split(',')[0].trim()) : '',
        images: String(item.images || ''),
        category: String(item.category || ''),
        category_id: String(item.category || ''),
        category_name: String(item.category_name || ''),
        age_group: item.age_group ? String(item.age_group).trim() : '',
        color: String(item.color || ''),
        original_price: Number(item.original_price || 0),
        discounted_price: Number(item.discounted_price || 0),
        discount_percent: Number(item.discount_percent || 0),
        discount: Number(item.discount_percent || 0),
        stock: Number(item.stock || 0),
        featured: true,
        location: String(item.location || ''),
        short_description: String(item.short_description || ''),
        long_description: String(item.long_description || ''),
        description: String(item.long_description || item.short_description || ''),
        tags: String(item.tags || ''),
        varient_label: String(item.varient_label || ''),
        specifications: String(item.specifications || ''),
        features: String(item.features || ''),
        currentPrice: Number(item.discounted_price || 0),
        rating: Number(item.rating || 0),
        reviews: Number(item.reviews || 0),
      };
    });
}

// ─── Generate homeContentDynamic.ts ──────────────────────────────────────────
function generateTypeScript(heroSlides, popularProducts) {
  const timestamp = new Date().toISOString();
  return `/**
 * AUTO-GENERATED by scripts/fetch-home-data.mjs
 * Last updated: ${timestamp}
 *
 * DO NOT edit manually.
 * To regenerate : node scripts/fetch-home-data.mjs
 * To restore    : git checkout client/src/data/homeContentDynamic.ts
 */

import type { HeroSlide, Product } from '../types';

export const heroSlides: HeroSlide[] = ${JSON.stringify(heroSlides, null, 2)};

export const popularProducts: Product[] = ${JSON.stringify(popularProducts, null, 2)};
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  try {
    console.log('[fetch-home-data] Fetching home_screen (carousel)...');
    const homeScreenRows = await safeFetch(HOME_SCREEN_URL, 'home_screen');
    const heroSlides = parseCarouselSlides(homeScreenRows);

    console.log('[fetch-home-data] Fetching products (featured=TRUE)...');
    const productRows = await safeFetch(PRODUCTS_URL, 'products');
    const popularProducts = parseProducts(productRows);

    if (heroSlides.length === 0 && popularProducts.length === 0) {
      console.warn(
        '[fetch-home-data] Warning: both sheets returned no usable rows. ' +
          'Keeping existing homeContentDynamic.ts unchanged.'
      );
      return;
    }

    writeFileSync(OUTPUT_FILE, generateTypeScript(heroSlides, popularProducts), 'utf-8');

    console.log(
      `[fetch-home-data] ✓ homeContentDynamic.ts generated — ` +
        `${heroSlides.length} carousel slides, ` +
        `${popularProducts.length} popular products`
    );
  } catch (err) {
    console.warn(
      `[fetch-home-data] Warning: fetch failed (${err.message}). ` +
        'Keeping existing homeContentDynamic.ts. Build will use fallback data.'
    );
    process.exit(0);
  }
}

main();
