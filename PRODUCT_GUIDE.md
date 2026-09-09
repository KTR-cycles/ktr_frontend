# KTR Cycle World — Product & SEO Management Guide

This guide provides instructions on **how to add a new product or update an existing product**, including image formats, pixel dimensions, key data attributes, automatic SEO generation, optional custom SEO overrides, and JSON templates.

---

## 🔍 How SEO & Open Graph (OG) Works for Products

You **DO NOT need to manually write complex SEO tags, Open Graph meta tags, or JSON-LD schema strings** in your JSON file!

Next.js **automatically generates 100% compliant SEO metadata** for every single product using your standard fields (`name`, `brand`, `short_description`, `image`, `original_price`, `discounted_price`):
1. **Title Tag**: Automatically generated as `"[Product Name] | Best Price in Tirunelveli | KTR Cycle World"`.
2. **Meta Description**: Automatically uses `short_description` or `description`.
3. **Canonical URL**: Automatically created as `https://ktrcycleworld.com/product/[slug]`.
4. **Open Graph & Twitter Cards**: Automatically populates `og:title`, `og:description`, `og:image` (with 800×600 dimensions), `og:url`, and `twitter:card`.
5. **Product & Breadcrumb JSON-LD Schema**: Automatically injected into the page HTML for rich Google search result snippets.

---

## ✍️ Optional Custom SEO Overrides

If you ever want to override the default SEO title or description for a specific product, you can optionally include these fields in `data/products.json`:

- **`meta_title`** *(optional string)*: Custom SEO title tag override.
- **`meta_description`** *(optional string)*: Custom meta description override.

---

## 🖼️ 1. Image Specifications & Best Practices

| Property | Recommended Setting | Details |
| :--- | :--- | :--- |
| **Directory** | `public/images/products/` | Place all product images inside `public/images/products/`. |
| **File Format** | `.jpg` or `.jpeg` | High-quality standard image format. `.png` and `.webp` are also supported. |
| **Pixel Dimensions** | **800 × 600 px** or **1000 × 750 px** | Standard **4:3 aspect ratio** (or 1:1 square `800×800px`). Ensures high clarity on high-resolution screens and zoom modals. |
| **File Size** | **100 KB – 250 KB** | Compress images before uploading using free tools like [TinyJPG](https://tinyjpg.com) to maintain fast page loading times. |
| **Naming Convention** | `prod_<ID>_<NUMBER>.jpg` | Example: `prod_065_1.jpg` (main image), `prod_065_2.jpg` (side view thumbnail). |

---

## 📝 2. Key Attributes for Display

When adding or editing a product in `data/products.json`, use these key attributes:

### Required Fields
- **`id`** *(string)*: Unique identifier (e.g. `"prod_065"`).
- **`product_id`** *(string)*: Same as `id` (`"prod_065"`).
- **`slug`** *(string)*: Clean URL slug (e.g. `"hercules-roadeo-hulk-26t"`). Used in page URLs: `/product/hercules-roadeo-hulk-26t`.
- **`name`** *(string)*: Full title of the cycle (e.g. `"Hercules Roadeo Hulk 26T"`).
- **`brand`** *(string)*: Brand name (e.g. `"HERCULES"`, `"TORONTO"`, `"BSA"`, `"HERO"`, `"ALPHA"`).
- **`category`** *(string)*: Category ID reference:
  - `"cat_001"` → Kids Cycle
  - `"cat_002"` → Adult Cycle
  - `"cat_003"` → Geared Cycle
  - `"cat_004"` → Girls Cycle
  - `"cat_005"` → Electric Cycle
  - `"cat_006"` → Offer Cycle
- **`category_name`** *(string)*: Display name (e.g. `"Geared Cycle"`).
- **`image`** *(string)*: Path to main image (e.g. `"/images/products/prod_065_1.jpg"`).
- **`images`** *(string)*: Same as main image path.
- **`images_list`** *(array)*: Array of image paths for multi-image zoom carousel: `["/images/products/prod_065_1.jpg", "/images/products/prod_065_2.jpg"]`.
- **`original_price`** *(number)*: MRP price (e.g. `14500`).
- **`discounted_price`** *(number)*: Final selling price (e.g. `12990`).
- **`discount_percent`** *(number)*: Discount percentage integer (e.g. `10`).
- **`stock`** *(number)*: Available quantity in showroom (e.g. `5`).
- **`featured`** *(boolean)*: Set `true` to feature on Homepage, `false` otherwise.

### Technical Specifications (Displayed on Details Page)
- **`short_description`** *(string)*: 1-sentence catalog card summary.
- **`description`** *(string)*: Full paragraph details about performance, riding age group, and comfort.
- **`frame`** *(string)*: Frame type (e.g. `"Lightweight Steel Frame"` or `"Alloy Frame"`).
- **`gears`** *(string)*: Speed setup (e.g. `"21 Speed Shimano"` or `"Single Speed"`).
- **`brakes`** *(string)*: Brake system (e.g. `"Dual Mechanical Disc Brakes"` or `"V-Brakes"`).
- **`tire_size`** *(string)*: Wheel size (e.g. `"26 inch"` or `"29 inch"`).
- **`weight`** *(string)*: Weight in KG (e.g. `"14.5 kg"`).
- **`color`** *(string)*: Color combinations (e.g. `"Matte Black / Neon Yellow"`).

### Optional Custom SEO Overrides
- **`meta_title`** *(optional string)*: Custom SEO title override.
- **`meta_description`** *(optional string)*: Custom meta description override.

---

## 📋 3. Complete JSON Template to Copy & Paste

Open `data/products.json` and append a new product entry:

```json
{
  "id": "prod_065",
  "product_id": "prod_065",
  "slug": "hercules-roadeo-hulk-26t",
  "name": "Hercules Roadeo Hulk 26T",
  "brand": "HERCULES",
  "varient_label": "Hercules Roadeo Hulk 26T Dual Disc",
  "category": "cat_003",
  "category_id": "cat_003",
  "category_name": "Geared Cycle",
  "image": "/images/products/prod_065_1.jpg",
  "images": "/images/products/prod_065_1.jpg",
  "images_list": [
    "/images/products/prod_065_1.jpg",
    "/images/products/prod_065_2.jpg"
  ],
  "original_price": 14500,
  "discounted_price": 12990,
  "discount_percent": 10,
  "discount": 10,
  "stock": 5,
  "featured": true,
  "location": "Tirunelveli",
  "tags": "Geared Cycle, Mountain Bike, Hercules",
  "age_group": "13+ years",
  "short_description": "21 speed mountain geared cycle with dual disc brakes.",
  "description": "The Hercules Roadeo Hulk 26T is built for rugged terrains and city commuting in Tirunelveli. Features precision 21-speed Shimano gears, sturdy steel frame, and dual mechanical disc brakes.",
  "frame": "Steel Frame",
  "gears": "21 Speed Shimano",
  "brakes": "Dual Disc Brakes",
  "tire_size": "26 inch",
  "weight": "15 kg",
  "color": "Matte Black / Yellow",
  "currentPrice": 12990,
  "meta_title": "Hercules Roadeo Hulk 26T | Best Geared Cycle in Tirunelveli",
  "meta_description": "Buy Hercules Roadeo Hulk 26T geared cycle at KTR Cycle World Tirunelveli. Features 21 speed Shimano gears & dual disc brakes at ₹12,990."
}
```

---

## 🔄 4. How to Update & Deploy

1. **Save Images**: Upload product photos into `public/images/products/`.
2. **Update JSON**: Add or edit product data in `data/products.json`.
3. **Build**: Run `npm run build` in your terminal to pre-render static HTML pages.
4. **Deploy**: Push changes to GitHub (`git push`), and Vercel will automatically rebuild and publish the updated catalog!
