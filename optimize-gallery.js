import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const optimizeGallery = async () => {
  const galleryDir = 'src/lib/assets/gallery';
  const files = await readdir(galleryDir);
  
  for (const file of files) {
    if (file.endsWith('.jpg')) {
      const inputPath = join(galleryDir, file);
      const outputPath = join(galleryDir, file.replace('.jpg', '-opt.jpg'));
      
      await sharp(inputPath)
        .resize({ width: 800, height: 600, fit: 'inside' })
        .jpeg({ quality: 75 })
        .toFile(outputPath);
      
      console.log(`Optimized: ${file}`);
    }
  }
  
  console.log('Gallery optimization completed!');
};

optimizeGallery().catch(console.error);