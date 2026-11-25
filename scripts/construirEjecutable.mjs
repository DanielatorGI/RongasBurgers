import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const directorioScript = path.dirname(fileURLToPath(import.meta.url));
const raizProyecto = path.resolve(directorioScript, '..');
const rutaCliente = path.join(raizProyecto, 'cliente');
const rutaServidor = path.join(raizProyecto, 'servidor');
const rutaSalida = path.join(raizProyecto, 'dist-exe');
const rutaTemporal = path.join(rutaSalida, 'temporal');

function recopilarAssets(carpetaBase, carpetaActual = carpetaBase, mapa = {}) {
  const entradas = fs.readdirSync(carpetaActual, { withFileTypes: true });
  for (const entrada of entradas) {
    const rutaCompleta = path.join(carpetaActual, entrada.name);
    if (entrada.isDirectory()) {
      recopilarAssets(carpetaBase, rutaCompleta, mapa);
    } else {
      const rutaRelativa = path.relative(carpetaBase, rutaCompleta).replace(/\\/g, '/');
      mapa[`/${rutaRelativa}`] = rutaCompleta;
    }
  }
  return mapa;
}

async function construirEjecutable() {
  console.log('[1/5] Compilando frontend (Vite)...');
  execSync('npm run build', { cwd: rutaCliente, stdio: 'inherit' });

  fs.mkdirSync(rutaTemporal, { recursive: true });

  console.log('[2/5] Empaquetando backend (esbuild)...');
  const rutaBundleServidor = path.join(rutaTemporal, 'servidor.cjs');
  await esbuild.build({
    entryPoints: [path.join(rutaServidor, 'src', 'servidor.js')],
    bundle: true,
    platform: 'node',
    target: 'node22',
    format: 'cjs',
    outfile: rutaBundleServidor,
    minify: true
  });

  console.log('[3/5] Generando configuracion y blob SEA...');
  const rutaDistCliente = path.join(rutaCliente, 'dist');
  const assetsFrontend = recopilarAssets(rutaDistCliente);
  const rutaBlob = path.join(rutaTemporal, 'sea-prep.blob');
  const rutaConfigSea = path.join(rutaTemporal, 'sea-config.json');

  fs.writeFileSync(
    rutaConfigSea,
    JSON.stringify(
      {
        main: rutaBundleServidor,
        output: rutaBlob,
        disableExperimentalSEAWarning: true,
        assets: assetsFrontend
      },
      null,
      2
    )
  );

  execSync(`"${process.execPath}" --experimental-sea-config "${rutaConfigSea}"`, {
    cwd: raizProyecto,
    stdio: 'inherit'
  });

  console.log('[4/5] Creando copia del binario de Node e inyectando aplicacion...');
  const extension = process.platform === 'win32' ? '.exe' : '';
  const rutaEjecutable = path.join(rutaSalida, `RongasBurgers${extension}`);
  fs.copyFileSync(process.execPath, rutaEjecutable);

  const rutaPostject = path.join(raizProyecto, 'node_modules', '.bin', 'postject');
  execSync(
    `"${rutaPostject}" "${rutaEjecutable}" NODE_SEA_BLOB "${rutaBlob}" --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`,
    { cwd: raizProyecto, stdio: 'inherit' }
  );

  console.log('[5/5] Limpiando archivos temporales...');
  fs.rmSync(rutaTemporal, { recursive: true, force: true });

  console.log(`\nEjecutable generado con exito en: ${rutaEjecutable}`);
}

construirEjecutable().catch((error) => {
  console.error('Error al construir el ejecutable:', error);
  process.exit(1);
});

