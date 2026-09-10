const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const outputPath = path.join(__dirname, '..', 'store_inventory_template.xlsx');
const productsJsonPath = path.join(__dirname, '..', 'data', 'products.json');
const categoriesJsonPath = path.join(__dirname, '..', 'data', 'categories.json');

// Default fallback sample data if JSON files don't exist
let productsData = [];
let categoriesData = [];

if (fs.existsSync(productsJsonPath)) {
  try {
    const rawProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
    productsData = rawProducts.map(p => ({
      product_id: p.product_id || p.id || '',
      name: p.name || '',
      slug: p.slug || '',
      brand: p.brand || '',
      category_id: p.category_id || p.category || '',
      category_name: p.category_name || '',
      varient_label: p.varient_label || p.name || '',
      original_price: p.original_price || 0,
      discounted_price: p.discounted_price || p.currentPrice || 0,
      discount_percent: p.discount_percent || p.discount || 0,
      stock: p.stock || 0,
      featured: p.featured ? "TRUE" : "FALSE",
      location: p.location || 'Tirunelveli',
      color: p.color || '',
      age_group: p.age_group || '',
      tags: p.tags || '',
      short_description: p.short_description || '',
      long_description: p.long_description || '',
      description: p.description || p.long_description || p.short_description || '',
      specifications: p.specifications || '',
      features: p.features || '',
      seo_title: p.seo_title || p.meta_title || `${p.name || ''} - KTR Cycle World`,
      seo_description: p.seo_description || p.meta_description || p.short_description || p.description || '',
      images: p.images || (Array.isArray(p.images_list) ? p.images_list.join(',') : p.image || '')
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
      description: c.description || '',
      seo_title: c.seo_title || c.meta_title || `${c.name || ''} | KTR Cycle World`,
      seo_description: c.seo_description || c.meta_description || c.description || ''
    }));
    console.log(`Loaded ${categoriesData.length} existing categories from categories.json`);
  } catch (e) {
    console.error('Could not parse categories.json, using template headers only');
  }
}

// Fallback if empty
if (productsData.length === 0) {
  productsData = [
    {
      product_id: "prod_001",
      name: "Alpha Bombay 26 VB",
      slug: "alpha-bombay-26-vb",
      brand: "ALPHA",
      category_id: "cat_002",
      category_name: "Adult Cycle",
      varient_label: "Alpha Bombay 26 VB",
      original_price: 7200,
      discounted_price: 6950,
      discount_percent: 3.47,
      stock: 5,
      featured: "FALSE",
      location: "Tirunelveli",
      color: "Black / Red",
      age_group: "15+ Years",
      tags: "adult cycle, single speed",
      short_description: "Durable single speed adult bicycle",
      long_description: "Premium single speed cycle with rigid frame, V-brakes, and smooth ride quality.",
      description: "Premium single speed cycle with rigid frame, V-brakes, and smooth ride quality.",
      specifications: "Frame: Steel | Brake: V-Brake | Speed: Single Speed | Wheel Size: 26 inch",
      features: "Sturdy Frame | Ergonomic Saddle | High Grip Tyres",
      seo_title: "Alpha Bombay 26 VB - KTR Cycle World",
      seo_description: "Buy Alpha Bombay 26 VB single speed adult bicycle at best price in Tirunelveli.",
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
      description: "Kids Cycle available at KTR Cycle World, Tirunelveli.",
      seo_title: "Kids Cycles | KTR Cycle World Tirunelveli",
      seo_description: "Explore the best collection of kids cycles at KTR Cycle World, Tirunelveli."
    }
  ];
}

// Create workbook
const wb = XLSX.utils.book_new();

// Convert JSON data to sheets
const wsProducts = XLSX.utils.json_to_sheet(productsData);
const wsCategories = XLSX.utils.json_to_sheet(categoriesData);

// Set column widths for products sheet
wsProducts['!cols'] = [
  { wch: 12 }, // product_id
  { wch: 30 }, // name
  { wch: 25 }, // slug
  { wch: 15 }, // brand
  { wch: 14 }, // category_id
  { wch: 18 }, // category_name
  { wch: 25 }, // varient_label
  { wch: 14 }, // original_price
  { wch: 16 }, // discounted_price
  { wch: 16 }, // discount_percent
  { wch: 8 },  // stock
  { wch: 10 }, // featured
  { wch: 14 }, // location
  { wch: 15 }, // color
  { wch: 15 }, // age_group
  { wch: 20 }, // tags
  { wch: 35 }, // short_description
  { wch: 45 }, // long_description
  { wch: 45 }, // description
  { wch: 45 }, // specifications
  { wch: 45 }, // features
  { wch: 35 }, // seo_title
  { wch: 45 }, // seo_description
  { wch: 35 }  // images
];

wsCategories['!cols'] = [
  { wch: 15 }, // category_id
  { wch: 20 }, // name
  { wch: 20 }, // slug
  { wch: 45 }, // description
  { wch: 35 }, // seo_title
  { wch: 45 }  // seo_description
];

// Append sheets to workbook
XLSX.utils.book_append_sheet(wb, wsProducts, "Products");
XLSX.utils.book_append_sheet(wb, wsCategories, "Categories");

// Write workbook to file
XLSX.writeFile(wb, outputPath);

console.log(`\n✅ Created full Excel Template with ${productsData.length} products and ${categoriesData.length} categories at:`);
console.log(`   ${outputPath}\n`);
