const fs = require('fs');
const path = require('path');
const https = require('https');

const PRODUCTS_URL = "https://script.google.com/macros/s/AKfycbyCoIkmJuiRnBwzq6wPfMOYv5cvqVUchsl-ycvcuVtI28RnzN2-YvVDxzuEndqnUCQu/exec?sheet=products";
const CATEGORIES_URL = "https://script.google.com/macros/s/AKfycbyCoIkmJuiRnBwzq6wPfMOYv5cvqVUchsl-ycvcuVtI28RnzN2-YvVDxzuEndqnUCQu/exec?sheet=categories";

const PUBLIC_IMG_DIR = path.join(__dirname, '..', 'public', 'images', 'products');
const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure directories exist
fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });
fs.mkdirSync(DATA_DIR, { recursive: true });

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJson(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    // Extract Google Drive File ID if present
    let driveIdMatch = url.match(/\/file\/d\/([^\/]+)/) || url.match(/id=([^&]+)/);
    let fetchUrl = url;
    if (driveIdMatch && driveIdMatch[1]) {
      fetchUrl = `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
    }

    const file = fs.createWriteStream(destPath);
    
    function makeRequest(reqUrl) {
      https.get(reqUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return makeRequest(res.headers.location);
        }
        if (res.statusCode !== 200) {
          file.close();
          if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
          return resolve(false);
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      }).on('error', () => {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        resolve(false);
      });
    }

    makeRequest(fetchUrl);
  });
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

async function main() {
  console.log('Fetching raw products and categories from Google Sheets...');
  const [rawProducts, rawCategories] = await Promise.all([
    fetchJson(PRODUCTS_URL),
    fetchJson(CATEGORIES_URL)
  ]);

  console.log(`Fetched ${rawProducts.length} products and ${rawCategories.length} categories.`);

  // Process categories
  const categoriesMap = new Map();
  const formattedCategories = rawCategories.map(cat => {
    const slug = slugify(cat.name || cat.category_id);
    const categoryObj = {
      id: cat.category_id,
      category_id: cat.category_id,
      name: cat.name,
      slug: slug,
      description: cat.description || `${cat.name} available at KTR Cycle World, Tirunelveli.`
    };
    categoriesMap.set(cat.category_id, categoryObj);
    return categoryObj;
  });

  // Process products & download images
  const formattedProducts = [];
  const slugCounts = new Map();

  for (let i = 0; i < rawProducts.length; i++) {
    const item = rawProducts[i];
    const productId = String(item.product_id || item.id || `prod_${i + 1}`);
    
    // Generate unique slug
    let baseSlug = slugify(item.name || `product-${productId}`);
    if (!baseSlug) baseSlug = `product-${productId}`;
    let slug = baseSlug;
    if (slugCounts.has(baseSlug)) {
      const count = slugCounts.get(baseSlug) + 1;
      slugCounts.set(baseSlug, count);
      slug = `${baseSlug}-${count}`;
    } else {
      slugCounts.set(baseSlug, 1);
    }

    // Process images
    const rawImageUrls = (item.images || item.image || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const localImagePaths = [];

    for (let imgIdx = 0; imgIdx < rawImageUrls.length; imgIdx++) {
      const rawUrl = rawImageUrls[imgIdx];
      const filename = `${productId}_${imgIdx + 1}.jpg`;
      const destPath = path.join(PUBLIC_IMG_DIR, filename);
      const publicRelativePath = `/images/products/${filename}`;

      console.log(`[${i + 1}/${rawProducts.length}] Downloading image ${imgIdx + 1}/${rawImageUrls.length} for ${productId}...`);
      const success = await downloadImage(rawUrl, destPath);
      if (success) {
        localImagePaths.push(publicRelativePath);
      } else {
        console.warn(`Failed to download ${rawUrl} for ${productId}`);
      }
    }

    // Fallback image if none downloaded
    if (localImagePaths.length === 0) {
      localImagePaths.push('/images/placeholder.png');
    }

    const categoryObj = categoriesMap.get(item.category);
    const categoryName = item.category_name || (categoryObj ? categoryObj.name : '');

    const product = {
      id: productId,
      product_id: productId,
      slug: slug,
      name: (item.name || '').trim(),
      brand: (item.brand || '').trim(),
      varient_label: (item.varient_label || '').trim(),
      category: item.category || '',
      category_id: item.category || '',
      category_name: categoryName,
      image: localImagePaths[0],
      images: localImagePaths.join(','),
      images_list: localImagePaths,
      color: item.color || '',
      original_price: Number(item.original_price || 0),
      discounted_price: Number(item.discounted_price || 0),
      discount_percent: Number(item.discount_percent || 0),
      discount: Number(item.discount_percent || 0),
      stock: Number(item.stock || 0),
      featured: Boolean(item.featured),
      location: item.location || 'Tirunelveli',
      tags: item.tags || '',
      age_group: item.age_group || '',
      short_description: item.short_description || '',
      long_description: item.long_description || '',
      description: item.long_description || item.short_description || item.name || '',
      specifications: item.specifications || '',
      features: item.features || '',
      currentPrice: Number(item.discounted_price || 0)
    };

    formattedProducts.push(product);
  }

  // Write JSON files
  const productsJsonPath = path.join(DATA_DIR, 'products.json');
  const categoriesJsonPath = path.join(DATA_DIR, 'categories.json');

  fs.writeFileSync(productsJsonPath, JSON.stringify(formattedProducts, null, 2));
  fs.writeFileSync(categoriesJsonPath, JSON.stringify(formattedCategories, null, 2));

  console.log(`\nSUCCESS:`);
  console.log(`Saved ${formattedProducts.length} products to ${productsJsonPath}`);
  console.log(`Saved ${formattedCategories.length} categories to ${categoriesJsonPath}`);
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
