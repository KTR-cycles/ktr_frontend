# KTR Cycle World — Product Inventory & Excel Guide

This guide explains how to manage products using the **Excel Inventory Template** (`store_inventory_template.xlsx`) or directly in `data/products.json`.

---

## 📊 1. Managing Inventory via Excel (Recommended)

Managing products via Excel is the fastest and cleanest way to update the catalog.

### Available Commands

| Command | Action |
| :--- | :--- |
| `npm run excel:template` | Exports current inventory from `data/products.json` into `store_inventory_template.xlsx`. |
| `npm run excel:import` | Imports `store_inventory_template.xlsx` into `data/products.json`, cleans unused images, and auto-generates SEO metadata. |

---

### Excel Columns in `store_inventory_template.xlsx`

The **Products** sheet includes only the **11 essential columns**:

| Column Name | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| **`product_id`** | Text | `prod_001` | Unique SKU / product identifier. |
| **`name`** | Text | `91 ALPHA BOMBAY 26T VB` | Full display name of the cycle. |
| **`brand`** | Text | `ALPHA` | Manufacturer brand name. |
| **`category_id`** | Text | `cat_002` | Foreign key reference (`cat_001` to `cat_006`). |
| **`cycle_size`** | Text | `26T`, `27.5T`, `29T` | Wheel / frame size for catalog filtering. |
| **`original_price`** | Number | `7500` | MRP price. |
| **`discounted_price`** | Number | `6700` | Offer selling price. |
| **`featured`** | Text | `TRUE` / `FALSE` | Display on Homepage featured section. |
| **`age_group`** | Text | `15+ Years` | Target rider age bracket. |
| **`description`** | Text | `Durable single speed adult bicycle...` | Overview text (PDP summary). |
| **`images`** | Text | `/images/products/prod_001_1.jpg` | Comma-separated image paths or Google Drive links. |

> [!NOTE]
> All technical specifications, key features, URL slugs, and SEO/OpenGraph tags are **automatically generated** when running `npm run excel:import`.

---

### Categories Sheet Columns

The **Categories** sheet has **4 clean columns**:

| Column Name | Example | Description |
| :--- | :--- | :--- |
| **`category_id`** | `cat_001` | Category identifier. |
| **`name`** | `Kids Cycle` | Category name. |
| **`slug`** | `kids-cycle` | URL slug for `/category/[slug]`. |
| **`description`** | `Kids Cycle available at KTR Cycle World...` | Category header description. |

---

## 🖼️ 2. Image Specifications

| Property | Recommended Setting |
| :--- | :--- |
| **Directory** | `public/images/products/` |
| **File Format** | `.jpg`, `.jpeg`, `.webp`, or `.png` |
| **Pixel Dimensions** | **800 × 600 px** (4:3 ratio) |
| **File Size** | **100 KB – 250 KB** |
| **Google Drive** | Direct Drive links in Excel are automatically downloaded into `public/images/products/`. |

---

## 📋 3. Streamlined JSON Schema (`data/products.json`)

```json
{
  "id": "prod_065",
  "product_id": "prod_065",
  "slug": "hercules-roadeo-hulk-26t",
  "name": "Hercules Roadeo Hulk 26T",
  "brand": "HERCULES",
  "category_id": "cat_003",
  "images": [
    "/images/products/prod_065_1.jpg",
    "/images/products/prod_065_2.jpg"
  ],
  "original_price": 14500,
  "discounted_price": 12990,
  "featured": true,
  "age_group": "13+ Years",
  "description": "21 speed mountain geared cycle with dual disc brakes.",
  "short_description": "21 speed mountain geared cycle with dual disc brakes.",
  "specifications": [
    { "label": "Wheel Size", "value": "26 Inches" },
    { "label": "Brake System", "value": "Dual Mechanical Disc Brakes" }
  ],
  "features": [
    "Ergonomically engineered High-Tensile Carbon Steel Frame.",
    "Precision 21-Speed Gear System for seamless shifting."
  ],
  "seo": {
    "title": "Hercules Roadeo Hulk 26T | Geared Cycle | KTR Cycle World",
    "description": "Buy Hercules Roadeo Hulk 26T at ₹12,990. 21 speed mountain geared cycle with dual disc brakes."
  }
}
```

---

## 🔄 4. Update & Deployment Workflow

1. Run `npm run excel:template` to generate the updated Excel spreadsheet.
2. Edit product information in `store_inventory_template.xlsx`.
3. Run `npm run excel:import` to sync changes into JSON, clean obsolete images, and regenerate SEO.
4. Run `npm run check` or `npm run build` to verify builds.
5. Push changes to GitHub (`git push`).
