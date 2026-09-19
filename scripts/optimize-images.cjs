const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PRODUCTS_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

async function optimizeImages() {
  if (!fs.existsSync(PRODUCTS_DIR)) {
    console.error(`Directory not found: ${PRODUCTS_DIR}`);
    return;
  }

  const files = fs.readdirSync(PRODUCTS_DIR);
  console.log(`🔍 Found ${files.length} files in ${PRODUCTS_DIR}\n`);

  let optimizedCount = 0;
  let totalSavedBytes = 0;

  for (const file of files) {
    const filePath = path.join(PRODUCTS_DIR, file);
    const ext = path.extname(file).toLowerCase();

    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      continue;
    }

    try {
      const stats = fs.statSync(filePath);
      const originalSize = stats.size;

      // Temporary optimized output path
      const tmpPath = path.join(PRODUCTS_DIR, `temp_${file}`);

      // Read image metadata
      const image = sharp(filePath);
      const metadata = await image.metadata();

      // Only resize if image width/height exceeds 1200px or size > 300KB
      let pipeline = sharp(filePath);

      if (metadata.width > 1200 || metadata.height > 1200) {
        pipeline = pipeline.resize(1200, 1200, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      if (ext === '.png') {
        pipeline = pipeline.png({ compressionLevel: 8 });
      } else if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: 82 });
      } else {
        pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
      }

      await pipeline.toFile(tmpPath);
      const newStats = fs.statSync(tmpPath);

      // Overwrite if smaller or resized
      if (newStats.size < originalSize || metadata.width > 1200 || metadata.height > 1200) {
        fs.renameSync(tmpPath, filePath);
        const saved = originalSize - newStats.size;
        if (saved > 0) totalSavedBytes += saved;
        optimizedCount++;
        console.log(`✅ Optimized ${file}: ${(originalSize / 1024).toFixed(1)}KB ➔ ${(newStats.size / 1024).toFixed(1)}KB`);
      } else {
        fs.unlinkSync(tmpPath);
      }
    } catch (err) {
      console.warn(`⚠️ Skipped ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Completed! Optimized ${optimizedCount} images. Total saved: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB`);
}

optimizeImages();
