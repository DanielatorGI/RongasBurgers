import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function pluginServidorImagenesRaiz() {
  return {
    name: 'servidor-imagenes-raiz',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/imagenes/')) {
          return next();
        }

        const rutaRelativa = decodeURIComponent(req.url.replace(/^\/imagenes\//, ''));
        const rutaEnPublic = path.resolve(__dirname, 'public/imagenes', rutaRelativa);

        if (fs.existsSync(rutaEnPublic) && fs.statSync(rutaEnPublic).isFile()) {
          return next();
        }

        const rutaEnRaiz = path.resolve(__dirname, '../imagenes', rutaRelativa);
        if (fs.existsSync(rutaEnRaiz) && fs.statSync(rutaEnRaiz).isFile()) {
          const extension = path.extname(rutaEnRaiz).toLowerCase();
          const tiposMime = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.gif': 'image/gif',
            '.ico': 'image/x-icon'
          };
          res.setHeader('Content-Type', tiposMime[extension] || 'application/octet-stream');
          return fs.createReadStream(rutaEnRaiz).pipe(res);
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), pluginServidorImagenesRaiz()],
  server: {
    port: 5173,
    open: false
  }
});
