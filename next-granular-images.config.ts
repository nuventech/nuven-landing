import { GranularImagesConfig } from 'next-granular-images';

const config: GranularImagesConfig = {
  qualities: {
    avif: 60,
    webp: 85,
  },
  effort: {
    avif: 9,
    webp: 6,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  deviceSizes: [400, 500, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  concurrency: 4,
  minSizeToOptimize: 0,
  blurSize: 10,
  blurQuality: 100,
  paths: {
    input: 'src/assets',
    output: 'public/next-granular-images',
    types: 'src/generated/next-granular-images',
  },
  exclusions: ['.ico', '.xml', '.webmanifest', '.svg', '.webp', '.avif'],
};

export default config;
