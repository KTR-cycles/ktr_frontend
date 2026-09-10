const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const defaultExcelPath = path.join(__dirname, '..', 'store_inventory_template.xlsx');
const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultExcelPath;

const DATA_DIR = path.join(__dirname, '..', 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start
    .replace(/-+$/, '');         // Trim - from end
}

function parseBoolean(val) {
  if (typeof val === 'boolean') return val;
  if (!val) return false;
  const str = String(val).trim().toUpperCase();
  return str === 'TRUE' || str === '1' || str === 'YES';
}

function runImport() {
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ File not found at: ${inputPath}`);
    console.error(`Please provide a valid Excel file or run 'npm run excel:template' first.`);
    process.exit(1);
  }

  console.log(`\n📖 Reading Excel file from: ${inputPath}`);
  const workbook = XLSX.readFile(inputPath);

  const productsSheetName = workbook.SheetNames.find(s => s.toLowerCase().includes('product')) || workbook.SheetNames[0];
  const categoriesSheetName = workbook.SheetNames.find(s => s.toLowerCase().includes('categor')) || workbook.SheetNames[1];

  const rawProducts = XLSX.utils.sheet_to_json(workbook.Sheets[productsSheetName] || {});
  const rawCategories = categoriesSheetName && workbook.Sheets[categoriesSheetName] 
    ? XLSX.utils.sheet_to_json(workbook.Sheets[categoriesSheetName]) 
    : [];

  console.log(`Found ${rawProducts.length} products and ${rawCategories.length} categories in Excel.`);

  // 1. Process Categories
  const categoriesMap = new Map();
  const formattedCategories = rawCategories.map((cat, idx) => {
    const catId = String(cat.category_id || cat.id || `cat_00${idx + 1}`).trim();
    const name = String(cat.name || '').trim();
    const slug = cat.slug ? slugify(cat.slug) : slugify(name || catId);

    const categoryObj = {
      id: catId,
      category_id: catId,
      name: name,
      slug: slug,
      description: String(cat.description || `${name} available at KTR Cycle World, Tirunelveli.`).trim(),
      seo_title: String(cat.seo_title || cat.meta_title || `${name} | KTR Cycle World`).trim(),
      seo_description: String(cat.seo_description || cat.meta_description || cat.description || '').trim()
    };

    categoriesMap.set(catId, categoryObj);
    categoriesMap.set(name.toLowerCase(), categoryObj);
    return categoryObj;
  });

  // 2. Process Products
  const slugCounts = new Map();
  const formattedProducts = rawProducts.map((item, i) => {
    const productId = String(item.product_id || item.id || `prod_${String(i + 1).padStart(3, '0')}`).trim();
    const name = String(item.name || '').trim();
    
    // Custom or auto-generated slug
    let baseSlug = item.slug ? slugify(item.slug) : slugify(name || `product-${productId}`);
    if (!baseSlug) baseSlug = `product-${productId}`;
    let slug = baseSlug;
    if (slugCounts.has(baseSlug)) {
      const count = slugCounts.get(baseSlug) + 1;
      slugCounts.set(baseSlug, count);
      slug = `${baseSlug}-${count}`;
    } else {
      slugCounts.set(baseSlug, 1);
    }

    // Category matching
    let categoryId = String(item.category_id || item.category || '').trim();
    let categoryName = String(item.category_name || '').trim();
    
    if (categoryId && categoriesMap.has(categoryId)) {
      categoryName = categoriesMap.get(categoryId).name;
    } else if (categoryName && categoriesMap.has(categoryName.toLowerCase())) {
      const matchedCat = categoriesMap.get(categoryName.toLowerCase());
      categoryId = matchedCat.id;
      categoryName = matchedCat.name;
    }

    // Image handling
    const rawImagesStr = String(item.images || item.image || '/images/placeholder.png').trim();
    const imagesList = rawImagesStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (imagesList.length === 0) {
      imagesList.push('/images/placeholder.png');
    }

    // Pricing calculation
    const originalPrice = Number(item.original_price || item.currentPrice || 0);
    let discountedPrice = Number(item.discounted_price || item.currentPrice || originalPrice);
    if (!discountedPrice) discountedPrice = originalPrice;

    let discountPercent = Number(item.discount_percent || item.discount || 0);
    if (!discountPercent && originalPrice > 0 && discountedPrice < originalPrice) {
      discountPercent = Number((((originalPrice - discountedPrice) / originalPrice) * 100).toFixed(2));
    }

    const shortDesc = String(item.short_description || '').trim();
    const longDesc = String(item.long_description || '').trim();
    const mainDesc = String(item.description || longDesc || shortDesc || name).trim();

    return {
      id: productId,
      product_id: productId,
      slug: slug,
      name: name,
      brand: String(item.brand || '').trim(),
      varient_label: String(item.varient_label || item.name || '').trim(),
      category: categoryId,
      category_id: categoryId,
      category_name: categoryName,
      image: imagesList[0],
      images: imagesList.join(','),
      images_list: imagesList,
      color: String(item.color || '').trim(),
      original_price: originalPrice,
      discounted_price: discountedPrice,
      discount_percent: discountPercent,
      discount: discountPercent,
      stock: Number(item.stock || 0),
      featured: parseBoolean(item.featured),
      location: String(item.location || 'Tirunelveli').trim(),
      tags: String(item.tags || '').trim(),
      age_group: String(item.age_group || '').trim(),
      short_description: shortDesc,
      long_description: longDesc,
      description: mainDesc,
      specifications: String(item.specifications || '').trim(),
      features: String(item.features || '').trim(),
      seo_title: String(item.seo_title || item.meta_title || `${name} - KTR Cycle World`).trim(),
      seo_description: String(item.seo_description || item.meta_description || shortDesc || mainDesc).trim(),
      currentPrice: discountedPrice
    };
  });

  // Write files to data/
  const productsJsonPath = path.join(DATA_DIR, 'products.json');
  const categoriesJsonPath = path.join(DATA_DIR, 'categories.json');

  fs.writeFileSync(productsJsonPath, JSON.stringify(formattedProducts, null, 2));
  if (formattedCategories.length > 0) {
    fs.writeFileSync(categoriesJsonPath, JSON.stringify(formattedCategories, null, 2));
  }

  console.log(`\n🎉 SUCCESS!`);
  console.log(`✅ Imported & updated ${formattedProducts.length} products -> ${productsJsonPath}`);
  if (formattedCategories.length > 0) {
    console.log(`✅ Imported & updated ${formattedCategories.length} categories -> ${categoriesJsonPath}\n`);
  }
}

runImport();
