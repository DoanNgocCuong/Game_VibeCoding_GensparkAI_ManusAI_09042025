import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true,
        sourcemap: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true
            }
        }
    },
    server: {
        port: 3000,
        open: true,
        cors: true,
        strictPort: true,
        host: true
    },
    optimizeDeps: {
        exclude: ['phaser']
    }
}); 