const fs = require('fs');
const path = require('path');

const PRODUCTS_JSON_PATH = path.join(__dirname, '..', 'data', 'products.json');
const PRODUCTS_IMG_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

function cleanUnusedImages(options = { dryRun: false }) {
  if (!fs.existsSync(PRODUCTS_JSON_PATH)) {
    console.error(`❌ Cannot clean images: ${PRODUCTS_JSON_PATH} does not exist.`);
    return;
  }

  if (!fs.existsSync(PRODUCTS_IMG_DIR)) {
    console.log(`📁 No image directory found at ${PRODUCTS_IMG_DIR}. Nothing to clean.`);
    return;
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8'));
  const activeImageFilenames = new Set();

  // Collect all image filenames referenced in products.json
  products.forEach(prod => {
    const list = [
      ...(prod.images_list || []),
      ...(prod.images ? prod.images.split(',') : []),
      prod.image
    ].filter(Boolean);

    list.forEach(imgStr => {
      const trimmed = imgStr.trim();
      if (!trimmed || trimmed.includes('placeholder')) return;
      // Extract basename (e.g., /images/products/prod_001_1.jpg -> prod_001_1.jpg)
      const filename = path.basename(trimmed);
      activeImageFilenames.add(filename);
    });
  });

  const diskFiles = fs.readdirSync(PRODUCTS_IMG_DIR);
  let removedCount = 0;
  let freedBytes = 0;

  console.log(`\n🔍 Checking ${diskFiles.length} disk images against ${activeImageFilenames.size} active product image references...`);

  diskFiles.forEach(file => {
    // Ignore hidden files or placeholders
    if (file.startsWith('.') || file.includes('placeholder')) return;

    if (!activeImageFilenames.has(file)) {
      const filePath = path.join(PRODUCTS_IMG_DIR, file);
      try {
        const stats = fs.statSync(filePath);
        freedBytes += stats.size;
        removedCount++;

        if (options.dryRun) {
          console.log(`[DRY RUN] Would remove unused image: ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
        } else {
          fs.unlinkSync(filePath);
          console.log(`🗑️ Removed unused image: ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
        }
      } catch (err) {
        console.warn(`⚠️ Could not remove ${file}:`, err.message);
      }
    }
  });

  if (removedCount === 0) {
    console.log(`✨ All images in ${PRODUCTS_IMG_DIR} are in use by active products. No unused images found.\n`);
  } else {
    const freedMB = (freedBytes / (1024 * 1024)).toFixed(2);
    if (options.dryRun) {
      console.log(`\n📊 DRY RUN SUMMARY: ${removedCount} unused image(s) found. Potential space saved: ${freedMB} MB\n`);
    } else {
      console.log(`\n🎉 CLEANUP COMPLETE: Removed ${removedCount} unused image(s). Total space freed: ${freedMB} MB\n`);
    }
  }
}

// Allow direct CLI execution or require as module
if (require.main === module) {
  const isDryRun = process.argv.includes('--dry-run');
  cleanUnusedImages({ dryRun: isDryRun });
}

module.exports = { cleanUnusedImages };
