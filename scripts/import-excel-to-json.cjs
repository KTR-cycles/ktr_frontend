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

function isSlugRelevantToName(slug, name) {
  if (!slug || !name) return false;
  const nameClean = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const tokens = slug.toLowerCase().split('-').filter(t => t.length > 2 && !['cycle', 'world', 'ktr'].includes(t));
  return tokens.length === 0 || tokens.some(t => nameClean.includes(t));
}

function inferCycleSize(name) {
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

function inferAgeGroup(cycleSize, categoryName) {
  const size = (cycleSize || '').toUpperCase();
  const cat = (categoryName || '').toLowerCase();
  if (size === '12T' || size === '14T') return '2-5 Years';
  if (size === '16T') return '4-7 Years';
  if (size === '20T') return '8-12 Years';
  if (size === '24T') return '10-14 Years';
  if (size === '26T' || size === '27.5T' || size === '27T' || size === '29T') return '15+ Years';
  if (cat.includes('kid')) return '5-12 Years';
  return '15+ Years';
}

function inferCategoryId(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('electric') || n.includes('e-bike') || n.includes('e-surge') || n.includes('ec ')) return 'cat_005';
  if (n.includes('lady') || n.includes('women') || n.includes('girl') || n.includes('hazel') || n.includes('diva') || n.includes('camila')) return 'cat_004';
  if (n.includes('12t') || n.includes('14t') || n.includes('16t') || n.includes('20t') || n.includes('kid') || n.includes('junior') || n.includes('champ')) return 'cat_001';
  if (n.includes('gear') || n.includes('speed') || n.includes('fsdd') || n.includes('shimano') || n.includes('dd 21s')) return 'cat_003';
  return 'cat_002'; // Adult Cycle default
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
      var filename = productId + '_' + (imgIdx + 1) + '_' + driveInfo.fileId + '.jpg';
      var destPath = path.join(PUBLIC_IMG_DIR, filename);
      var publicPath = '/images/products/' + filename;

      if (fs.existsSync(destPath)) {
        console.log('  ✅ Already exists, skipping: ' + filename);
        resolved.push(publicPath);
        continue;
      }

      // Check if file already exists with same Drive fileId under another prefix
      var diskFiles = fs.readdirSync(PUBLIC_IMG_DIR);
      var existingMatch = diskFiles.find(function(f) { return f.includes(driveInfo.fileId); });
      if (existingMatch) {
        console.log('  ✅ Found existing image on disk for file ID ' + driveInfo.fileId + ' (' + existingMatch + '), reusing.');
        resolved.push('/images/products/' + existingMatch);
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
  const instagramSheetName = workbook.SheetNames.find(s => {
    const l = s.toLowerCase();
    return l.includes('insta') || l.includes('reel');
  });

  const rawProducts = XLSX.utils.sheet_to_json(workbook.Sheets[productsSheetName] || {});
  const rawCategories = categoriesSheetName && workbook.Sheets[categoriesSheetName]
    ? XLSX.utils.sheet_to_json(workbook.Sheets[categoriesSheetName])
    : [];
  const rawInstagram = instagramSheetName && workbook.Sheets[instagramSheetName]
    ? XLSX.utils.sheet_to_json(workbook.Sheets[instagramSheetName])
    : [];

  console.log(`Found ${rawProducts.length} products, ${rawCategories.length} categories, and ${rawInstagram.length} Instagram reels in Excel.`);

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

  // Load existing products keyed STRICTLY by lowercase product name to prevent row-shift mismatch
  const productsJsonPath = path.join(DATA_DIR, 'products.json');
  const existingByName = new Map();
  let maxIdNum = 0;

  if (fs.existsSync(productsJsonPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
      existing.forEach(p => {
        if (p.name) existingByName.set(p.name.trim().toLowerCase(), p);
        const m = (p.id || p.product_id || '').match(/prod_(\d+)/);
        if (m) {
          const num = parseInt(m[1], 10);
          if (num > maxIdNum) maxIdNum = num;
        }
      });
    } catch {}
  }

  // 2. Process Products (async to support image downloads)
  const slugCounts = new Map();
  const formattedProducts = [];

  for (let i = 0; i < rawProducts.length; i++) {
    const item = rawProducts[i];
    const name = String(item.name || '').trim();

    if (!name) {
      console.warn(`  ⚠️ Skipping row ${i + 1}: Missing product name`);
      continue;
    }

    // Match existing product strictly by name!
    const existingProd = existingByName.get(name.toLowerCase());

    // Generate or preserve product ID
    let productId = String(item.product_id || item.id || '').trim();
    if (!productId) {
      if (existingProd && (existingProd.product_id || existingProd.id)) {
        productId = existingProd.product_id || existingProd.id;
      } else {
        maxIdNum++;
        productId = `prod_${String(maxIdNum).padStart(3, '0')}`;
      }
    }

    // Derive clean canonical slug directly from product name
    const nameDerivedSlug = slugify(name);
    let baseSlug = '';

    if (item.slug && String(item.slug).trim()) {
      const customSlug = slugify(item.slug);
      baseSlug = isSlugRelevantToName(customSlug, name) ? customSlug : nameDerivedSlug;
    } else if (existingProd && existingProd.slug && isSlugRelevantToName(existingProd.slug, name)) {
      baseSlug = existingProd.slug;
    } else {
      baseSlug = nameDerivedSlug || `product-${productId}`;
    }

    let slug = baseSlug;
    if (slugCounts.has(baseSlug)) {
      const count = slugCounts.get(baseSlug) + 1;
      slugCounts.set(baseSlug, count);
      slug = `${baseSlug}-${count}`;
    } else {
      slugCounts.set(baseSlug, 1);
    }

    // Preserve previous slug in legacy_slugs ONLY if relevant to this product
    const legacySlugsSet = new Set(Array.isArray(existingProd?.legacy_slugs) ? existingProd.legacy_slugs : []);
    if (existingProd?.slug && existingProd.slug !== slug && isSlugRelevantToName(existingProd.slug, name)) {
      legacySlugsSet.add(existingProd.slug);
    }

    // Category matching with automatic fallback inference
    let categoryId = String(item.category_id || item.category || '').trim();
    let categoryName = String(item.category_name || '').trim();

    if (categoryId && categoriesMap.has(categoryId)) {
      categoryName = categoriesMap.get(categoryId).name;
    } else if (categoryName && categoriesMap.has(categoryName.toLowerCase())) {
      const matchedCat = categoriesMap.get(categoryName.toLowerCase());
      categoryId = matchedCat.id;
      categoryName = matchedCat.name;
    } else {
      categoryId = inferCategoryId(name);
      categoryName = categoriesMap.get(categoryId)?.name || 'Adult Cycle';
    }

    // Cycle size & age group auto-inference if omitted in Excel
    let cycleSize = String(item.cycle_size || item.size || existingProd?.cycle_size || '').trim();
    if (!cycleSize) {
      cycleSize = inferCycleSize(name);
    }

    let ageGroup = String(item.age_group || existingProd?.age_group || '').trim();
    if (!ageGroup) {
      ageGroup = inferAgeGroup(cycleSize, categoryName);
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

    const mainDesc = String(item.description || item.short_description || item.long_description || name).trim();
    const shortDesc = String(item.short_description || mainDesc).trim();
    const longDesc = String(item.long_description || mainDesc).trim();

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

    const prodObj = {
      id: productId,
      product_id: productId,
      slug: slug,
      legacy_slugs: Array.from(legacySlugsSet),
      name: name,
      brand: String(item.brand || existingProd?.brand || '').trim(),
      category_id: categoryId,
      images: imagesList,
      color: String(item.color || existingProd?.color || '').trim(),
      frame_size: String(item.frame_size || item.tire_size || existingProd?.frame_size || '').trim(),
      cycle_size: cycleSize,
      original_price: originalPrice,
      discounted_price: discountedPrice,
      featured: parseBoolean(item.featured),
      age_group: ageGroup,
      short_description: shortDesc,
      long_description: longDesc,
      description: mainDesc,
      specifications: specifications || existingProd?.specifications || '',
      features: features || existingProd?.features || '',
      seo_title: String(item.seo_title || item.meta_title || existingProd?.seo_title || `${name} - KTR Cycle World`).trim(),
      seo_description: String(item.seo_description || item.meta_description || existingProd?.seo_description || shortDesc || mainDesc).trim()
    };

    if (existingProd?.seo) prodObj.seo = existingProd.seo;
    if (existingProd?.og) prodObj.og = existingProd.og;
    if (existingProd?.twitter) prodObj.twitter = existingProd.twitter;

    formattedProducts.push(prodObj);
  }

  // Write files to data/
  const categoriesJsonPath = path.join(DATA_DIR, 'categories.json');
  const instagramJsonPath = path.join(DATA_DIR, 'instagramReels.json');

  fs.writeFileSync(productsJsonPath, JSON.stringify(formattedProducts, null, 2));
  if (formattedCategories.length > 0) {
    fs.writeFileSync(categoriesJsonPath, JSON.stringify(formattedCategories, null, 2));
  }

  // 3. Process & Write Instagram Reels if present in Excel
  if (rawInstagram.length > 0) {
    const formattedInstagram = rawInstagram.map((row, idx) => {
      const rawUrl = String(row.url || row.instagram_url || row.reel_url || row.link || '').trim();
      const match = rawUrl.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
      const reelId = String(row.reel_id || row.id || (match ? match[1] : `reel_${idx + 1}`)).trim();

      let embedUrl = String(row.embed_url || row.embedUrl || '').trim();
      if (!embedUrl && rawUrl) {
        if (rawUrl.includes('/p/')) {
          embedUrl = `https://www.instagram.com/p/${reelId}/embed/`;
        } else {
          embedUrl = `https://www.instagram.com/reel/${reelId}/embed/`;
        }
      }

      return {
        id: reelId,
        url: rawUrl || `https://www.instagram.com/reel/${reelId}/`,
        embedUrl: embedUrl || (rawUrl ? `${rawUrl.replace(/\/?$/, '')}/embed/` : ''),
        title: String(row.title || `KTR Cycle World Reel #${idx + 1}`).trim(),
        caption: String(row.caption || '').trim(),
        aspectRatio: String(row.aspect_ratio || row.aspectRatio || '9/16').trim(),
        thumbnailPlaceholder: String(row.thumbnail_placeholder || row.thumbnailPlaceholder || row.thumbnail || row.image || '').trim() || undefined
      };
    }).filter(r => r.url || r.id);

    if (formattedInstagram.length > 0) {
      fs.writeFileSync(instagramJsonPath, JSON.stringify(formattedInstagram, null, 2));
      console.log('✅ Imported & updated ' + formattedInstagram.length + ' Instagram reels -> ' + instagramJsonPath);
    }
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

