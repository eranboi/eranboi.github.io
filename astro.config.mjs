// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://eranboi.github.io',
  output: 'static',
  // Astro 7 defaults to JSX-style whitespace, which would drop spaces between inline elements.
  compressHTML: true,
  build: {
    assets: 'assets'
  }
});
