import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

let instanciaBaseDatos = null;

export function obtenerConexionBaseDatos() {
  if (instanciaBaseDatos) {
    return instanciaBaseDatos;
  }

  const rutaRelativa = process.env.RUTA_BASE_DATOS || './datos/rongas_burgers.sqlite';
  const rutaAbsoluta = path.resolve(process.cwd(), rutaRelativa);
  const carpetaDestino = path.dirname(rutaAbsoluta);

  if (!fs.existsSync(carpetaDestino)) {
    fs.mkdirSync(carpetaDestino, { recursive: true });
  }

  instanciaBaseDatos = new DatabaseSync(rutaAbsoluta);
  instanciaBaseDatos.exec('PRAGMA journal_mode = WAL;');

  return instanciaBaseDatos;
}

export function cerrarConexionBaseDatos() {
  if (instanciaBaseDatos) {
    instanciaBaseDatos.close();
    instanciaBaseDatos = null;
  }
}
