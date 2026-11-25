import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sea from 'node:sea';
import path from 'path';
import { exec } from 'child_process';
import enrutadorAutenticacion from './presentacion/rutas/rutasAutenticacion.js';
import enrutadorAnalitica from './presentacion/rutas/rutasAnalitica.js';
import { registrarFrontendEstatico } from './presentacion/rutas/rutasEstaticas.js';
import { asegurarBaseDatosInicializada } from './infraestructura/baseDatos/inicializadorBaseDatos.js';

let esEjecutableSea = false;
try {
  esEjecutableSea = sea.isSea();
} catch {
  esEjecutableSea = false;
}

if (esEjecutableSea) {
  dotenv.config({ path: path.join(path.dirname(process.execPath), '.env') });
} else {
  dotenv.config();
}

asegurarBaseDatosInicializada();

const aplicacion = express();
const PUERTO = Number(process.env.PUERTO) || 3001;

aplicacion.use(cors());
aplicacion.use(express.json());

aplicacion.get('/api/salud', (req, res) => {
  res.status(200).json({
    exito: true,
    servicio: process.env.NOMBRE_APLICACION || 'Rongas Burgers Analytics API',
    estado: 'operativo',
    fechaServidor: new Date().toISOString()
  });
});

aplicacion.use('/api/autenticacion', enrutadorAutenticacion);
aplicacion.use('/api', enrutadorAnalitica);

registrarFrontendEstatico(aplicacion);

aplicacion.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
});

export const servidorActivo = aplicacion.listen(PUERTO, () => {
  const urlLocal = `http://localhost:${PUERTO}`;
  console.log(`[Servidor] Rongas Burgers ejecutandose en ${urlLocal}`);
  if (esEjecutableSea && process.platform === 'win32' && process.env.NO_ABRIR_NAVEGADOR !== '1') {
    exec(`start "" "${urlLocal}"`);
  }
});

export default aplicacion;
