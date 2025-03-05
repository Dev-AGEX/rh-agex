const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  
  // Converte para AVIF
  await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true })
    .avif({ quality: 80 })
    .toFile(path.join(outputDir, `${filename}.avif`));
    
  // Converte para WebP
  await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(outputDir, `${filename}.webp`));
}

async function processImages() {
  const inputDir = path.join(__dirname, '../public/images');
  const outputDir = path.join(__dirname, '../public/images/optimized');
  
  try {
    const files = await fs.readdir(inputDir);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const inputPath = path.join(inputDir, file);
        await optimizeImage(inputPath, outputDir);
        console.log(`Optimized ${file}`);
      }
    }
    
    console.log('All images optimized successfully!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

processImages();
