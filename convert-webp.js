import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const convertToWebP = async () => {
  // 메인 이미지들 WebP 변환 (80% 품질)
  await sharp('src/lib/assets/cover-original.jpg')
    .resize({ width: 1600 })
    .webp({ quality: 80 })
    .toFile('src/lib/assets/cover.webp');
  
  await sharp('src/lib/assets/letter-bottom-original.jpg')
    .resize({ width: 1200 })
    .webp({ quality: 80 })
    .toFile('src/lib/assets/letter-bottom.webp');
  
  console.log('Main images converted to WebP');
  
  // 갤러리 이미지들 WebP 변환 (75% 품질)
  const galleryDir = 'src/lib/assets/gallery';
  const files = await readdir(galleryDir);
  
  for (const file of files) {
    if (file.endsWith('-original.jpg')) {
      const webpName = file.replace('-original.jpg', '.webp');
      const inputPath = join(galleryDir, file);
      const outputPath = join(galleryDir, webpName);
      
      await sharp(inputPath)
        .resize({ width: 1200, height: 900, fit: 'inside' })
        .webp({ quality: 75 })
        .toFile(outputPath);
      
      console.log(`Converted to WebP: ${webpName}`);
    }
  }
  
  console.log('All images converted to WebP format!');
};

convertToWebP().catch(console.error);