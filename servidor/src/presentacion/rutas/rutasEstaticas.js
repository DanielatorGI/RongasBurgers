import express from 'express';
import sea from 'node:sea';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const TIPOS_MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function obtenerTipoMime(rutaArchivo) {
  const extension = path.extname(rutaArchivo).toLowerCase();
  return TIPOS_MIME[extension] || 'application/octet-stream';
}

function registrarRutasDesdeSea(aplicacion) {
  const clavesDisponibles = new Set(sea.getAssetKeys());

  aplicacion.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) {
      return next();
    }

    const rutaSolicitada = req.path === '/' ? '/index.html' : req.path;
    const claveAsset = clavesDisponibles.has(rutaSolicitada)
      ? rutaSolicitada
      : clavesDisponibles.has('/index.html')
        ? '/index.html'
        : null;

    if (!claveAsset) {
      return next();
    }

    const contenido = Buffer.from(sea.getRawAsset(claveAsset));
    res.setHeader('Content-Type', obtenerTipoMime(claveAsset));
    return res.status(200).send(contenido);
  });
}

function registrarRutasDesdeDisco(aplicacion) {
  if (typeof import.meta === 'undefined' || !import.meta.url) {
    return;
  }

  const directorioActual = path.dirname(fileURLToPath(import.meta.url));
  const rutaDistCliente = path.resolve(directorioActual, '../../../../cliente/dist');

  if (!fs.existsSync(rutaDistCliente)) {
    return;
  }

  aplicacion.use(express.static(rutaDistCliente));
  aplicacion.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    return res.sendFile(path.join(rutaDistCliente, 'index.html'));
  });
}

export function registrarFrontendEstatico(aplicacion) {
  try {
    if (sea.isSea()) {
      registrarRutasDesdeSea(aplicacion);
      return;
    }
  } catch {
    // Continuar con modo disco fuera de SEA
  }

  registrarRutasDesdeDisco(aplicacion);
}

