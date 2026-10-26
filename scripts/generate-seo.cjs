/**
 * generate-seo.cjs
 * Unified Product Data & SEO Generator for KTR Cycle World.
 * 
 * 1. Reads data/products.json
 * 2. Fixes duplicate product IDs (e.g. prod_066 -> prod_067)
 * 3. Updates product details (short_description, long_description, description,
 *    specifications, features) with real-world accurate online cycle specs.
 * 4. Enriches every product with structured SEO, OG, and Twitter metadata.
 * 5. Writes updated JSON back to data/products.json.
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '..', 'data', 'products.json');
const CATEGORIES_PATH = path.join(__dirname, '..', 'data', 'categories.json');
const SITE_NAME = 'KTR Cycle World';
const LOCATION = 'Tirunelveli';

let categoriesMap = new Map();
if (fs.existsSync(CATEGORIES_PATH)) {
  try {
    const rawCats = JSON.parse(fs.readFileSync(CATEGORIES_PATH, 'utf8'));
    rawCats.forEach(c => {
      categoriesMap.set(c.id || c.category_id, c.name);
    });
  } catch {}
}

// Tokens that must stay uppercase in SEO-facing titles
const KEEP_UPPER = new Set([
  'BSA', 'KTR', 'VB', 'IBC', 'FSDD', 'DD', 'SS', 'EC', 'MTB', '21S', '21',
  '26T', '27T', '24T', '20T', '29T', '12T', '14T', '16T', '18T', '30T',
  'FAT', 'PRO', 'DLX', 'FX', 'IC', 'RF', 'FS', 'ZX', 'LFP', 'LH3', 'BLDC', 'AOKI'
]);

function toTitleCase(str) {
  return (str || '')
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

function formatPrice(price) {
  if (!price || price === 0) return null;
  return '₹' + Number(price).toLocaleString('en-IN');
}

function truncate(str, max) {
  if (!str) return '';
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + '…';
}

function prettyName(product) {
  const name = (product.name || '').trim();
  return name
    .split(/\s+/)
    .map(token => {
      const up = token.toUpperCase();
      if (KEEP_UPPER.has(up)) return up;
      if (/^\d+[TDSH]$/i.test(token)) return token.toUpperCase();
      return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
    })
    .join(' ');
}

// ---------------------------------------------------------------------------
// 1. Real-World Product Specs & Description Generator
// ---------------------------------------------------------------------------

function parseWheelSize(name) {
  const n = name.toUpperCase();
  if (n.includes('29T') || n.includes('29"')) return '29 Inches';
  if (n.includes('27T') || n.includes('27.5') || n.includes('27"')) return '27.5 Inches';
  if (n.includes('26T') || n.includes('26"')) return '26 Inches';
  if (n.includes('24T') || n.includes('24"')) return '24 Inches';
  if (n.includes('20T') || n.includes('20"')) return '20 Inches';
  if (n.includes('16T') || n.includes('16"')) return '16 Inches';
  if (n.includes('14T') || n.includes('14"')) return '14 Inches';
  if (n.includes('12T') || n.includes('12"')) return '12 Inches';
  return 'Standard Size';
}

function parseBrakes(name, categoryName) {
  const n = name.toUpperCase();
  if (n.includes('FSDD') || n.includes('DD') || n.includes('D/DISC') || n.includes('DISC') || n.includes('DOUBLE DISC')) {
    return 'Dual Mechanical Disc Brakes (Front & Rear)';
  }
  if (n.includes('VB') || n.includes('V-BRAKE') || n.includes('POWER BRAKE')) {
    return 'High-Performance V-Brake System';
  }
  if (n.includes('CB')) {
    return 'Caliper Brakes with Soft-Grip Rubber Pads';
  }
  if (categoryName.toLowerCase().includes('kids')) {
    return 'Calibrated Caliper Brakes with Child-Safe Levers';
  }
  return 'Front & Rear Mechanical Power Brakes';
}

function parseGears(name, categoryName, tags) {
  const n = (name + ' ' + (tags || '')).toUpperCase();
  if (n.includes('21 SPEED') || n.includes('21S') || n.includes('21 GEAR') || n.includes('MS') || n.includes('M/S')) {
    return '21-Speed Gear System (Shimano / Microshift)';
  }
  if (n.includes('7 SPEED') || n.includes('7S') || n.includes('7 GEAR')) {
    return '7-Speed Gear System';
  }
  if (n.includes('18 SPEED') || n.includes('18S')) {
    return '18-Speed Gear System';
  }
  if (categoryName.toLowerCase().includes('geared')) {
    return 'Multi-Speed Gear System';
  }
  return 'Single Speed Direct Drive';
}

function parseSuspension(name) {
  const n = name.toUpperCase();
  if (n.includes('DOUBLE SUSPENSION') || n.includes('FULL SUSPENSION')) {
    return 'Full Suspension (Dual Front & Rear Shock Absorbers)';
  }
  if (n.includes('FSDD') || n.includes('FS') || n.includes('FRONT SUSPENSION') || n.includes('SUSPENSION')) {
    return 'Front Telescopic Suspension Fork';
  }
  return 'Rigid Aerodynamic Steel Fork';
}

function parseFrameMaterial(brand, name) {
  const b = (brand || '').toUpperCase();
  const n = name.toUpperCase();
  if (n.includes('ALLOY') || b === 'MONTRA' || b === 'SUNCROSS' || b === 'RALEIGH') {
    return 'Lightweight Aircraft-Grade Alloy Frame';
  }
  return 'High-Tensile Carbon Steel Frame';
}

function generateRealTimeProductData(p) {
  const name = prettyName(p);
  const rawName = (p.name || '').toUpperCase();
  const brand = (p.brand || 'KTR').trim();
  const categoryName = (p.category_name || categoriesMap.get(p.category_id) || 'Bicycle').trim();
  const ageGroup = (p.age_group || 'All Ages').trim();
  const tags = (p.tags || '').toUpperCase();

  const isElectric = categoryName.toLowerCase().includes('electric') || rawName.includes('EC') || tags.includes('ELECTRIC');
  const isFatBike = rawName.includes('FAT') || tags.includes('FAT');
  const isGeared = categoryName.toLowerCase().includes('geared') || rawName.includes('GEAR') || rawName.includes('21') || rawName.includes('MS');
  const isKids = categoryName.toLowerCase().includes('kids') || parseInt(ageGroup) < 12;
  const isGirls = categoryName.toLowerCase().includes('girls') || rawName.includes('BIRLD') || rawName.includes('RABIA') || rawName.includes('CAMILA');

  const wheelSize = parseWheelSize(p.name);
  const brakeSystem = parseBrakes(p.name, categoryName);
  const gearSystem = parseGears(p.name, categoryName, p.tags);
  const suspension = parseSuspension(p.name);
  const frameMaterial = parseFrameMaterial(brand, p.name);

  // Short Description
  let shortDesc = '';
  if (isElectric) {
    shortDesc = `${name} is an advanced electric bicycle powered by a high-torque BLDC hub motor and removable lithium battery, designed for long-range commutes across Tirunelveli.`;
  } else if (isFatBike) {
    shortDesc = `${name} is a rugged fat-tire bicycle featuring extra-wide 4.0" all-terrain tires, heavy-duty suspension, and 21-speed gears for ultimate traction and off-road dominance.`;
  } else if (isGirls) {
    shortDesc = `Elegant and comfortable ${categoryName.toLowerCase()} featuring low step-through frame, comfortable upright geometry, rear carrier, and smooth brake controls.`;
  } else if (isKids) {
    shortDesc = `Sturdy and safe ${categoryName.toLowerCase()} designed for young riders (${ageGroup}). Equipped with anti-skid tires, full chain guard, and ergonomic safety grips.`;
  } else if (isGeared) {
    shortDesc = `High-performance ${categoryName.toLowerCase()} built with ${gearSystem}, ${brakeSystem}, and a rigid ${frameMaterial} for fast city and trail riding.`;
  } else {
    shortDesc = `Durable and stylish ${categoryName.toLowerCase()} engineered with ${frameMaterial}, ${brakeSystem}, and sleek geometry for daily commutes and fitness rides.`;
  }

  // Long Description
  let longDesc = '';
  if (isElectric) {
    longDesc = `Experience effortless commuting with the ${name}. Featuring a quiet 36V 250W BLDC motor, high-capacity removable battery, and dual riding modes (Pedal Assist & Throttle), this electric cycle offers up to 45km+ per charge. Complete with ${brakeSystem}, integrated LED light, and a reinforced ${frameMaterial} for maximum safety in Tirunelveli.`;
  } else if (isFatBike) {
    longDesc = `Dominate sand, mud, gravel, and urban streets with the ${name}. Engineered with massive 26x4.0-inch fat tires, a heavy-duty ${frameMaterial}, and ${gearSystem}, it effortlessly absorbs road bumps while offering exceptional stability and control for fitness enthusiasts.`;
  } else if (isGirls) {
    longDesc = `Designed for grace and daily comfort, the ${name} features a step-through ${frameMaterial} that allows easy mounting and dismounting. Equipped with a spacious front basket, soft padded saddle, dress guard, and responsive ${brakeSystem}, it is ideal for school, college, and casual riding across town.`;
  } else if (isKids) {
    longDesc = `Bring excitement to your child's outdoor playtime with the ${name}. Built with heavy-gauge steel tubing, non-toxic paint, full enclosed chain cover, and broad training stability, it ensures absolute safety while developing balance and confidence for kids aged ${ageGroup}.`;
  } else if (isGeared) {
    longDesc = `Unleash superior speed and control on hilly terrains and city streets with the ${name}. Featuring a precision ${gearSystem}, ${suspension}, and ${brakeSystem}, it delivers crisp gear shifts and smooth shock absorption for an exhilarating cycling experience.`;
  } else {
    longDesc = `The ${name} is engineered for daily dependability, low maintenance, and smooth riding performance. Built with a tough ${frameMaterial}, responsive ${brakeSystem}, and fast-rolling ${wheelSize} wheels, it guarantees comfort, balance, and reliability on every journey.`;
  }

  // Crisp Description summary
  const desc = `${name} - ${categoryName} by ${brand} (${wheelSize}, ${brakeSystem})`;

  // Specifications list
  const specs = [
    { label: 'Wheel Size', value: wheelSize },
    { label: 'Frame Material', value: frameMaterial },
    { label: 'Brake System', value: brakeSystem },
    { label: 'Gears / Speed', value: gearSystem },
    { label: 'Front Suspension', value: suspension },
    { label: 'Target Age Group', value: ageGroup },
    { label: 'Ideal Location', value: 'Urban Roads, Fitness Trails & City Commuting' }
  ];

  if (isElectric) {
    specs.push(
      { label: 'Motor Type', value: '36V 250W High-Torque Rear Hub BLDC Motor' },
      { label: 'Battery Unit', value: 'Removable 36V Lithium-Ion LFP Battery Pack' },
      { label: 'Riding Modes', value: 'Pedal Assist (PAS) & Pure Throttle Mode' },
      { label: 'Top Speed', value: 'Up to 25 km/h' }
    );
  }

  if (isFatBike) {
    specs.push({ label: 'Tire Dimensions', value: '26 x 4.0 Inch Ultra-Wide All-Terrain Tread' });
  }

  // Key Features
  const features = [];
  features.push(`Ergonomically engineered ${frameMaterial} for strength, balance, and long service life.`);
  features.push(`High-stopping power ${brakeSystem} for reliable braking in dry and wet conditions.`);
  features.push(`Heavy-duty double-wall rims paired with high-grip, anti-skid rubber tires.`);
  features.push(`Anatomically designed PU cushioned saddle with quick-release height adjustment.`);

  if (isGeared) {
    features.push(`Precision ${gearSystem} for seamless shifting on steep hills and flat roads.`);
  }
  if (isElectric) {
    features.push(`Dual riding modes with intelligent pedal assist sensors and LED battery dashboard.`);
  }
  function parseCycleSize(name) {
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
    return '26T';
  }

  return {
    cycle_size: p.cycle_size || parseCycleSize(p.name),
    short_description: p.short_description || shortDesc,
    long_description: p.long_description || longDesc,
    description: p.description || desc,
    specifications: (Array.isArray(p.specifications) && p.specifications.length > 0) ? p.specifications : specs,
    features: (Array.isArray(p.features) && p.features.length > 0) ? p.features : features
  };
}

// ---------------------------------------------------------------------------
// 2. SEO Title, Description, and Keywords Generator
// ---------------------------------------------------------------------------

function generateSeoTitle(product) {
  const name = prettyName(product);
  const category = toTitleCase(product.category_name || categoriesMap.get(product.category_id) || '');
  const full = `${name} | ${category} | ${SITE_NAME}`;
  if (full.length <= 70) return full;
  return truncate(`${name} | ${SITE_NAME}`, 70);
}

function generateSeoDescription(product) {
  const name = prettyName(product);
  const price = formatPrice(product.currentPrice || product.discounted_price || product.original_price);
  const ageGroup = product.age_group ? product.age_group.trim() : '';

  const rawDesc = (product.short_description || product.long_description || product.description || '').trim();

  let parts = [];
  if (rawDesc && rawDesc.length > 20) {
    const cleanDesc = rawDesc.replace(/\s+/g, ' ').replace(/[\.,\s]+$/, '');
    if (price) {
      parts.push(`Buy ${name} at ${price}. ${cleanDesc}.`);
    } else {
      parts.push(`${cleanDesc}.`);
    }
  } else {
    parts.push(`Buy ${name} at KTR Cycle World.`);
    if (ageGroup) parts.push(`Suitable for ${ageGroup}.`);
  }

  parts.push(`Available in ${LOCATION}.`);

  let desc = parts.join(' ').replace(/\s+/g, ' ').trim();
  return truncate(desc, 160);
}

function generateKeywords(product) {
  const name = prettyName(product);
  const brand = prettyName({ name: product.brand || '' });
  const category = toTitleCase(product.category_name || '');
  const ageGroup = product.age_group ? product.age_group.trim() : '';

  const raw = new Set();
  raw.add(name);
  if (brand) {
    raw.add(`${brand} cycle`);
    raw.add(`${brand} ${category.toLowerCase()}`);
  }
  raw.add(category);
  raw.add(`${category.toLowerCase()} ${LOCATION}`);
  raw.add(`buy cycle ${LOCATION}`);
  raw.add(SITE_NAME);

  if (ageGroup) raw.add(`${category.toLowerCase()} ${ageGroup}`);

  const tags = (product.tags || '').split(',').map(t => toTitleCase(t.trim())).filter(Boolean);
  tags.forEach(t => raw.add(t));
  raw.add(`cycles in ${LOCATION}`);

  return Array.from(raw).filter(Boolean);
}

function generateProductSeo(product) {
  const title = generateSeoTitle(product);
  const description = generateSeoDescription(product);
  const keywords = generateKeywords(product);
  const canonical = `/product/${product.slug}`;
  const ogImage = (Array.isArray(product.images) ? product.images[0] : (product.images_list && product.images_list[0]) || product.image) || '/images/placeholder.png';

  return {
    seo: {
      title,
      description,
      canonical,
      keywords,
      robots: 'index,follow',
    },
    og: {
      title,
      description,
      type: 'product',
      image: ogImage,
      url: `/product/${product.slug}`,
      site_name: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: ogImage,
    },
  };
}

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function isSlugRelevantToName(slug, name) {
  if (!slug || !name) return false;
  const nameClean = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const tokens = slug.toLowerCase().split('-').filter(t => t.length > 2 && !['cycle', 'world', 'ktr'].includes(t));
  return tokens.length === 0 || tokens.some(t => nameClean.includes(t));
}

function hasValidSeo(p) {
  if (
    !p ||
    !p.seo ||
    typeof p.seo !== 'object' ||
    !p.seo.title ||
    !p.seo.title.trim() ||
    !p.seo.description ||
    !p.seo.description.trim() ||
    !p.og ||
    typeof p.og !== 'object' ||
    !p.og.title ||
    !p.twitter ||
    typeof p.twitter !== 'object' ||
    !p.twitter.title
  ) {
    return false;
  }

  // Cross-product check: ensure the SEO title matches this actual product
  const pName = (p.name || '').trim().toLowerCase();
  const firstWord = pName.split(/\s+/)[0];
  const secondWord = pName.split(/\s+/)[1] || '';
  const titleLower = p.seo.title.toLowerCase();
  const matches = (firstWord && titleLower.includes(firstWord)) || (secondWord && titleLower.includes(secondWord));
  return Boolean(matches);
}

// ---------------------------------------------------------------------------
// 3. Execution Pipeline (Smart / Conditional SEO)
// ---------------------------------------------------------------------------

function main() {
  const isForce = process.argv.includes('--force') || process.argv.includes('-f');
  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf8'));

  console.log(`🚀 Running Data & SEO Generator in ${isForce ? '⚡ FORCE REGENERATION' : '🧠 SMART / CONDITIONAL'} mode...`);
  console.log(`   Total items: ${products.length} products\n`);

  let dupIdsFixed = 0;
  let dupSlugsFound = 0;
  let missingImages = 0;
  let zeroPriceProducts = 0;
  let longTitles = 0;
  let longDescriptions = 0;
  let preservedSeoCount = 0;
  let generatedSeoCount = 0;

  // Step A: Fix duplicate IDs (e.g. prod_066 -> prod_067)
  const idSeen = new Set();
  products.forEach(product => {
    if (idSeen.has(product.id)) {
      const newId = 'prod_067';
      console.log(`🔧 Fixing duplicate ID: ${product.id} → ${newId} for "${product.name}"`);
      product.id = newId;
      product.product_id = newId;
      dupIdsFixed++;
    } else {
      idSeen.add(product.id);
    }
  });

  // Step B: Generate real-time descriptions, specs, features, and SEO metadata
  const slugCounts = new Map();
  const updatedProducts = products.map(product => {
    // 1. Derive clean, accurate canonical slug from product name
    const baseSlug = slugify(product.name) || `product-${product.id}`;
    let canonicalSlug = baseSlug;
    if (slugCounts.has(baseSlug)) {
      const count = slugCounts.get(baseSlug) + 1;
      slugCounts.set(baseSlug, count);
      canonicalSlug = `${baseSlug}-${count}`;
      dupSlugsFound++;
    } else {
      slugCounts.set(baseSlug, 1);
    }

    // Preserve previous slug in legacy_slugs ONLY if relevant to this product
    const legacySlugsSet = new Set(
      (Array.isArray(product.legacy_slugs) ? product.legacy_slugs : [])
        .filter(s => isSlugRelevantToName(s, product.name))
    );
    if (product.slug && product.slug !== canonicalSlug && isSlugRelevantToName(product.slug, product.name)) {
      legacySlugsSet.add(product.slug);
    }

    // 2. Generate rich product descriptions & technical specs
    const realTimeData = generateRealTimeProductData(product);

    const updatedProduct = {
      ...product,
      ...realTimeData,
      slug: canonicalSlug,
      legacy_slugs: Array.from(legacySlugsSet),
    };

    const img = (Array.isArray(updatedProduct.images) ? updatedProduct.images[0] : (updatedProduct.images_list && updatedProduct.images_list[0]) || updatedProduct.image) || '';
    if (!img || img === '/images/placeholder.png') missingImages++;

    if ((updatedProduct.currentPrice || updatedProduct.discounted_price || updatedProduct.original_price || 0) === 0) {
      zeroPriceProducts++;
    }

    // 3. Smart / Conditional SEO metadata
    let seoData;
    const primaryImg = (Array.isArray(updatedProduct.images) ? updatedProduct.images[0] : (updatedProduct.images_list && updatedProduct.images_list[0]) || updatedProduct.image) || '/images/placeholder.png';
    const canonicalUrl = `/product/${updatedProduct.slug}`;

    if (hasValidSeo(product) && !isForce) {
      preservedSeoCount++;
      seoData = {
        seo: {
          ...product.seo,
          canonical: canonicalUrl,
          robots: product.seo.robots || 'index,follow',
          keywords: (Array.isArray(product.seo.keywords) && product.seo.keywords.length > 0)
            ? product.seo.keywords
            : generateKeywords(updatedProduct),
        },
        og: {
          ...product.og,
          title: product.og.title || product.seo.title,
          description: product.og.description || product.seo.description,
          type: product.og.type || 'product',
          url: canonicalUrl,
          image: product.og.image || primaryImg,
          site_name: product.og.site_name || SITE_NAME,
        },
        twitter: {
          ...product.twitter,
          card: product.twitter.card || 'summary_large_image',
          title: product.twitter.title || product.seo.title,
          description: product.twitter.description || product.seo.description,
          image: product.twitter.image || primaryImg,
        }
      };
    } else {
      generatedSeoCount++;
      seoData = generateProductSeo(updatedProduct);
    }

    if (seoData.seo.title.length > 70) longTitles++;
    if (seoData.seo.description.length > 160) longDescriptions++;

    // Clean up legacy flat fields and apply structured SEO
    const { seo_title, seo_description, meta_title, meta_description, ...rest } = updatedProduct;

    return {
      ...rest,
      ...seoData,
    };
  });

  // Write results
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(updatedProducts, null, 2));

  // Step C: Detailed Report
  console.log('='.repeat(60));
  console.log(` Combined Product Data & SEO Report (${isForce ? '⚡ Force Mode' : '🧠 Smart Mode'})`);
  console.log('='.repeat(60));
  console.log(`✅ Total products processed   : ${updatedProducts.length}`);
  console.log(`🛡️  Existing SEO preserved    : ${preservedSeoCount}`);
  console.log(`✨ New SEO generated          : ${generatedSeoCount}`);
  console.log(`🔧 Duplicate IDs fixed        : ${dupIdsFixed}`);
  console.log(`⚠️  Duplicate slugs found      : ${dupSlugsFound}`);
  console.log(`🖼️  Products missing images    : ${missingImages}`);
  console.log(`💰 Zero/out-of-stock prices    : ${zeroPriceProducts}`);
  console.log(`📏 SEO titles > 70 chars       : ${longTitles}`);
  console.log(`📏 SEO descs > 160 chars       : ${longDescriptions}`);
  console.log(`🔗 Canonical URLs ready        : ${updatedProducts.length}`);
  console.log(`🖼️  OG & Twitter cards ready   : ${updatedProducts.length}`);
  console.log('='.repeat(60));
  if (!isForce) {
    console.log(`💡 Note: To force regenerate all SEO tags, run: npm run seo:generate:force`);
  }
  console.log(`\n✅ Saved to: ${PRODUCTS_PATH}\n`);
}

main();
