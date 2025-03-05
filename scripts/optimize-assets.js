const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function optimizeImages() {
  // Encontra todas as imagens
  const images = glob.sync('public/**/*.{jpg,jpeg,png}', {
    nodir: true,
    absolute: true,
  });

  for (const imagePath of images) {
    const ext = path.extname(imagePath);
    const dir = path.dirname(imagePath);
    const name = path.basename(imagePath, ext);
    
    try {
      // Carrega a imagem
      const image = sharp(imagePath);
      const metadata = await image.metadata();
      
      // Redimensiona se for muito grande
      if (metadata.width > 1920) {
        image.resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      }

      // Otimiza JPEG/PNG
      if (ext === '.jpg' || ext === '.jpeg') {
        await image
          .jpeg({
            quality: 80,
            progressive: true,
            mozjpeg: true,
          })
          .toFile(path.join(dir, `${name}.optimized${ext}`));
      } else if (ext === '.png') {
        await image
          .png({
            quality: 80,
            progressive: true,
            palette: true,
          })
          .toFile(path.join(dir, `${name}.optimized${ext}`));
      }

      // Gera WebP
      await image
        .webp({
          quality: 80,
          effort: 6,
        })
        .toFile(path.join(dir, `${name}.webp`));

      // Gera AVIF
      await image
        .avif({
          quality: 75,
          effort: 9,
        })
        .toFile(path.join(dir, `${name}.avif`));

      // Substitui o original pelo otimizado
      fs.renameSync(
        path.join(dir, `${name}.optimized${ext}`),
        imagePath
      );

      console.log(`✓ Otimizado: ${imagePath}`);
    } catch (err) {
      console.error(`✗ Erro ao otimizar ${imagePath}:`, err);
    }
  }
}

// Função para analisar e otimizar chunks JS
async function analyzeChunks() {
  const buildDir = path.join(process.cwd(), '.next/static');
  if (!fs.existsSync(buildDir)) {
    console.log('Diretório de build não encontrado. Execute next build primeiro.');
    return;
  }

  const chunks = glob.sync(path.join(buildDir, 'chunks/**/*.js'));
  let totalSize = 0;
  const largeChunks = [];

  for (const chunk of chunks) {
    const stats = fs.statSync(chunk);
    const sizeKB = stats.size / 1024;
    totalSize += sizeKB;

    if (sizeKB > 50) {
      largeChunks.push({
        path: chunk,
        size: sizeKB.toFixed(2),
      });
    }
  }

  console.log('\nAnálise de Chunks:');
  console.log(`Total de chunks: ${chunks.length}`);
  console.log(`Tamanho total: ${(totalSize / 1024).toFixed(2)} MB`);
  
  if (largeChunks.length > 0) {
    console.log('\nChunks grandes que podem precisar de otimização:');
    largeChunks.forEach(chunk => {
      console.log(`- ${chunk.path}: ${chunk.size}KB`);
    });
    console.log('\nSugestões de otimização:');
    console.log('1. Use dynamic imports para código não crítico');
    console.log('2. Verifique dependências duplicadas');
    console.log('3. Considere lazy loading para componentes grandes');
  }
}

async function main() {
  console.log('🎯 Iniciando otimização de assets...\n');
  
  console.log('📸 Otimizando imagens...');
  await optimizeImages();
  
  console.log('\n📊 Analisando chunks...');
  await analyzeChunks();
  
  console.log('\n✨ Otimização concluída!');
}

main().catch(console.error);
