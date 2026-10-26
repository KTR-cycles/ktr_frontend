const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const outputPath = path.join(__dirname, '..', 'store_inventory_template.xlsx');
const productsJsonPath = path.join(__dirname, '..', 'data', 'products.json');
const categoriesJsonPath = path.join(__dirname, '..', 'data', 'categories.json');
const instagramJsonPath = path.join(__dirname, '..', 'data', 'instagramReels.json');

// Default fallback sample data if JSON files don't exist
let productsData = [];
let categoriesData = [];
let instagramData = [];

function getCycleSize(name) {
  const n = (name || '').toUpperCase();
  if (n.includes('27.5T') || n.includes('27.5"') || n.includes('27.5') || n.includes('27T')) return '27.5T';
  if (n.includes('29T') || n.includes('29"') || n.includes('29 ')) return '29T';
  if (n.includes('26T') || n.includes('26"') || n.includes(' 26 ') || n.includes('26 FSDD')) return '26T';
  if (n.includes('24T') || n.includes('24"') || n.includes(' 24 ')) return '24T';
  if (n.includes('20T') || n.includes('20"') || n.includes(' 20 ')) return '20T';
  if (n.includes('16T') || n.includes('16"')) return '16T';
  if (n.includes('14T') || n.includes('14"')) return '14T';
  if (n.includes('12T') || n.includes('12"')) return '12T';
  if (n.includes('SHURVEER')) return '26T';
  if (n.includes('E-SURGE')) return '27.5T';
  if (n.includes('MAMBA') || n.includes('GOST')) return '20T';
  return '';
}

function formatSpecs(specs) {
  if (!specs) return '';
  if (Array.isArray(specs)) {
    return specs.map(s => `${s.label}: ${s.value}`).join(' | ');
  }
  return String(specs);
}

if (fs.existsSync(productsJsonPath)) {
  try {
    const rawProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
    productsData = rawProducts.map(p => ({
      product_id: p.product_id || p.id || '',
      name: p.name || '',
      brand: p.brand || '',
      category_id: p.category_id || '',
      cycle_size: p.cycle_size || getCycleSize(p.name) || '',
      original_price: p.original_price || 0,
      discounted_price: p.discounted_price || 0,
      featured: p.featured ? "TRUE" : "FALSE",
      age_group: p.age_group || '',
      description: p.short_description || p.description || p.long_description || '',
      specifications: formatSpecs(p.specifications),
      images: Array.isArray(p.images) ? p.images.join(',') : (p.images || p.image || '')
    }));
    console.log(`Loaded ${productsData.length} existing products from products.json`);
  } catch (e) {
    console.error('Could not parse products.json, using template headers only');
  }
}

if (fs.existsSync(categoriesJsonPath)) {
  try {
    const rawCategories = JSON.parse(fs.readFileSync(categoriesJsonPath, 'utf8'));
    categoriesData = rawCategories.map(c => ({
      category_id: c.category_id || c.id || '',
      name: c.name || '',
      slug: c.slug || '',
      description: c.description || ''
    }));
    console.log(`Loaded ${categoriesData.length} existing categories from categories.json`);
  } catch (e) {
    console.error('Could not parse categories.json, using template headers only');
  }
}

if (fs.existsSync(instagramJsonPath)) {
  try {
    const rawReels = JSON.parse(fs.readFileSync(instagramJsonPath, 'utf8'));
    instagramData = rawReels.map(r => ({
      reel_id: r.id || '',
      url: r.url || '',
      title: r.title || '',
      caption: r.caption || '',
      thumbnail_placeholder: r.thumbnailPlaceholder || r.thumbnail || ''
    }));
    console.log(`Loaded ${instagramData.length} existing Instagram reels from instagramReels.json`);
  } catch (e) {
    console.error('Could not parse instagramReels.json, using template headers only');
  }
}

// Fallback sample data if empty
if (productsData.length === 0) {
  productsData = [
    {
      product_id: "prod_001",
      name: "Alpha Bombay 26 VB",
      brand: "ALPHA",
      category_id: "cat_002",
      original_price: 7200,
      discounted_price: 6950,
      featured: "FALSE",
      age_group: "15+ Years",
      description: "Durable single speed adult bicycle with rigid frame, V-brakes, and smooth ride quality.",
      images: "/images/products/prod_001_1.jpg"
    }
  ];
}

if (categoriesData.length === 0) {
  categoriesData = [
    {
      category_id: "cat_001",
      name: "Kids Cycle",
      slug: "kids-cycle",
      description: "Kids Cycle available at KTR Cycle World, Tirunelveli."
    }
  ];
}

if (instagramData.length === 0) {
  instagramData = [
    {
      reel_id: "DdEB1eVIP5Y",
      url: "https://www.instagram.com/reel/DdEB1eVIP5Y/",
      title: "Extreme Trail & Shimano Precision",
      caption: "Heavy-duty off-road suspension, 21-speed Shimano index shifting & hydraulic disc brakes in action.",
      thumbnail_placeholder: "/assets/generated_images/Mountain_biking_adventure_scene_01077af1.webp"
    }
  ];
}

// Create workbook
const wb = XLSX.utils.book_new();

// Convert JSON data to sheets
const wsProducts = XLSX.utils.json_to_sheet(productsData);
const wsCategories = XLSX.utils.json_to_sheet(categoriesData);
const wsInstagram = XLSX.utils.json_to_sheet(instagramData);

// Set column widths for products sheet (12 essential columns)
wsProducts['!cols'] = [
  { wch: 14 }, // product_id
  { wch: 35 }, // name
  { wch: 16 }, // brand
  { wch: 14 }, // category_id
  { wch: 14 }, // cycle_size
  { wch: 15 }, // original_price
  { wch: 18 }, // discounted_price
  { wch: 12 }, // featured
  { wch: 16 }, // age_group
  { wch: 65 }, // description
  { wch: 80 }, // specifications
  { wch: 50 }  // images
];

// Set column widths for categories sheet (4 essential columns)
wsCategories['!cols'] = [
  { wch: 15 }, // category_id
  { wch: 22 }, // name
  { wch: 22 }, // slug
  { wch: 50 }  // description
];

// Set column widths for instagram sheet (5 essential columns)
wsInstagram['!cols'] = [
  { wch: 16 }, // reel_id
  { wch: 45 }, // url
  { wch: 35 }, // title
  { wch: 60 }, // caption
  { wch: 65 }  // thumbnail_placeholder
];

// Append sheets to workbook
XLSX.utils.book_append_sheet(wb, wsProducts, "Products");
XLSX.utils.book_append_sheet(wb, wsCategories, "Categories");
XLSX.utils.book_append_sheet(wb, wsInstagram, "Instagram");

// Write workbook to file
XLSX.writeFile(wb, outputPath);

console.log(`\n✅ Created full Excel Template with ${productsData.length} products, ${categoriesData.length} categories, and ${instagramData.length} Instagram reels at:`);
console.log(`   ${outputPath}\n`);
