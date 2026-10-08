const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const defaultExcelPath = path.join(__dirname, '..', 'store_inventory_template.xlsx');
const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultExcelPath;

const DATA_DIR = path.join(__dirname, '..', 'data');
const PUBLIC_IMG_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });

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

/**
 * Detect Google Drive URLs and return the direct download URL + file ID.
 * Supports:
 *   - https://drive.google.com/file/d/FILE_ID/view
 *   - https://drive.google.com/open?id=FILE_ID
 *   - https://drive.google.com/uc?id=FILE_ID
 *   - https://lh3.googleusercontent.com/d/FILE_ID
 */
function resolveGoogleDriveUrl(url) {
  if (!url) return null;

  // Match /file/d/<id>
  const fileMatch = url.match(/\/file\/d\/([^\/\?&]+)/);
  if (fileMatch && fileMatch[1]) {
    return { fileId: fileMatch[1], downloadUrl: `https://lh3.googleusercontent.com/d/${fileMatch[1]}` };
  }

  // Match ?id=<id> or &id=<id>
  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch && idMatch[1]) {
    return { fileId: idMatch[1], downloadUrl: `https://lh3.googleusercontent.com/d/${idMatch[1]}` };
  }

  // Already a googleusercontent.com/d/<id> link
  const lhMatch = url.match(/googleusercontent\.com\/d\/([^\/\?&]+)/);
  if (lhMatch && lhMatch[1]) {
    return { fileId: lhMatch[1], downloadUrl: url };
  }

  return null;
}

function isGoogleDriveUrl(url) {
  if (!url) return false;
  return (
    (url.includes('drive.google.com') || url.includes('googleusercontent.com')) &&
    resolveGoogleDriveUrl(url) !== null
  );
}

/**
 * Download an image from a URL (with redirect support) to destPath.
 * Returns true on success, false on failure.
 */
function downloadImage(url, destPath, redirectCount) {
  redirectCount = redirectCount || 0;
  return new Promise(function(resolve) {
    if (redirectCount > 10) {
      console.warn('  ⚠️  Too many redirects for: ' + url);
      return resolve(false);
    }

    var parsedUrl;
    try { parsedUrl = new URL(url); } catch(e) { return resolve(false); }
    var transport = parsedUrl.protocol === 'https:' ? https : http;

    var file = fs.createWriteStream(destPath);

    var req = transport.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KTR-Import-Bot/1.0)' }
    }, function(res) {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return downloadImage(res.headers.location, destPath, redirectCount + 1).then(resolve);
      }

      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        console.warn('  ⚠️  HTTP ' + res.statusCode + ' for: ' + url);
        return resolve(false);
      }

      res.pipe(file);
      file.on('finish', function() { file.close(); resolve(true); });
      file.on('error', function(err) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        console.warn('  ⚠️  File write error: ' + err.message);
        resolve(false);
      });
    });

    req.on('error', function(err) {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      console.warn('  ⚠️  Request error: ' + err.message);
      resolve(false);
    });
  });
}

/**
 * Process a list of image URL strings for a product.
 * Google Drive URLs are downloaded to public/images/products/ and replaced
 * with their local path. Non-Drive URLs are kept as-is.
 * Returns a Promise resolving to an array of image path strings.
 */
async function processImages(productId, imagesList) {
  var resolved = [];
  for (var imgIdx = 0; imgIdx < imagesList.length; imgIdx++) {
    var rawUrl = imagesList[imgIdx];
    if (isGoogleDriveUrl(rawUrl)) {
      var driveInfo = resolveGoogleDriveUrl(rawUrl);
      var filename = productId + '_' + (imgIdx + 1) + '.jpg';
      var destPath = path.join(PUBLIC_IMG_DIR, filename);
      var publicPath = '/images/products/' + filename;

      if (fs.existsSync(destPath)) {
        console.log('  ✅ Already exists, skipping: ' + filename);
        resolved.push(publicPath);
        continue;
      }

      console.log('  📥 Downloading Google Drive image → ' + filename);
      var success = await downloadImage(driveInfo.downloadUrl, destPath);
      if (success) {
        console.log('  ✅ Saved: ' + publicPath);
        resolved.push(publicPath);
      } else {
        console.warn('  ❌ Failed to download image for ' + productId + ' (index ' + (imgIdx + 1) + '), keeping original URL.');
        resolved.push(rawUrl);
      }
    } else {
      resolved.push(rawUrl);
    }
  }
  return resolved;
}

async function runImport() {
  if (!fs.existsSync(inputPath)) {
    console.error('❌ File not found at: ' + inputPath);
    console.error("Please provide a valid Excel file or run 'npm run excel:template' first.");
    process.exit(1);
  }

  console.log('\n📖 Reading Excel file from: ' + inputPath);
  const workbook = XLSX.readFile(inputPath);

  const productsSheetName = workbook.SheetNames.find(s => s.toLowerCase().includes('product')) || workbook.SheetNames[0];
  const categoriesSheetName = workbook.SheetNames.find(s => s.toLowerCase().includes('categor')) || workbook.SheetNames[1];

  const rawProducts = XLSX.utils.sheet_to_json(workbook.Sheets[productsSheetName] || {});
  const rawCategories = categoriesSheetName && workbook.Sheets[categoriesSheetName]
    ? XLSX.utils.sheet_to_json(workbook.Sheets[categoriesSheetName])
    : [];

  console.log('Found ' + rawProducts.length + ' products and ' + rawCategories.length + ' categories in Excel.');

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

  // 2. Process Products (async to support image downloads)
  const slugCounts = new Map();
  const formattedProducts = [];

  for (let i = 0; i < rawProducts.length; i++) {
    const item = rawProducts[i];

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

    // Image handling — parse comma-separated list then download Drive images
    const rawImagesStr = String(item.images || item.image || '/images/placeholder.png').trim();
    let imagesList = rawImagesStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (imagesList.length === 0) {
      imagesList.push('/images/placeholder.png');
    }

    const hasDriveImages = imagesList.some(u => isGoogleDriveUrl(u));
    if (hasDriveImages) {
      console.log(`\n[${i + 1}/${rawProducts.length}] 🖼️  Processing images for: ${name} (${productId})`);
    }

    // Download Google Drive images, replace with local paths
    imagesList = await processImages(productId, imagesList);

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

    // Parse JSON or complex fields safely
    let specifications = item.specifications;
    if (typeof specifications === 'string' && specifications.trim()) {
      const trimmed = specifications.trim();
      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        try { specifications = JSON.parse(trimmed); } catch {}
      } else if (trimmed.includes('|') || trimmed.includes(':')) {
        specifications = trimmed.split('|').map(part => {
          const kv = part.split(':');
          if (kv.length >= 2) {
            return { label: kv[0].trim(), value: kv.slice(1).join(':').trim() };
          }
          return { label: 'Specification', value: part.trim() };
        });
      }
    }

    let variants = item.variants;
    if (typeof variants === 'string' && variants.trim()) {
      const trimmed = variants.trim();
      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        try { variants = JSON.parse(trimmed); } catch {}
      }
    }

    let features = item.features;
    if (typeof features === 'string' && features.trim()) {
      const trimmed = features.trim();
      if (trimmed.startsWith('[')) {
        try { features = JSON.parse(trimmed); } catch {}
      }
    }

    formattedProducts.push({
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
      frame_size: String(item.frame_size || item.tire_size || '').trim(),
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
      specifications: specifications || '',
      variants: variants || undefined,
      features: features || '',
      seo_title: String(item.seo_title || item.meta_title || `${name} - KTR Cycle World`).trim(),
      seo_description: String(item.seo_description || item.meta_description || shortDesc || mainDesc).trim(),
      currentPrice: discountedPrice
    });
  }

  // Write files to data/
  const productsJsonPath = path.join(DATA_DIR, 'products.json');
  const categoriesJsonPath = path.join(DATA_DIR, 'categories.json');

  fs.writeFileSync(productsJsonPath, JSON.stringify(formattedProducts, null, 2));
  if (formattedCategories.length > 0) {
    fs.writeFileSync(categoriesJsonPath, JSON.stringify(formattedCategories, null, 2));
  }

  console.log('\n🎉 SUCCESS!');
  console.log('✅ Imported & updated ' + formattedProducts.length + ' products -> ' + productsJsonPath);
  if (formattedCategories.length > 0) {
    console.log('✅ Imported & updated ' + formattedCategories.length + ' categories -> ' + categoriesJsonPath + '\n');
  }

  // Cleanup orphaned images no longer referenced in products.json
  try {
    const { cleanUnusedImages } = require('./cleanup-unused-images.cjs');
    cleanUnusedImages();
  } catch (err) {
    console.warn('⚠️ Warning: Image cleanup failed:', err.message);
  }
}

runImport().catch(function(err) {
  console.error('❌ Import failed:', err);
  process.exit(1);
});

