import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import enrutadorAutenticacion from './presentacion/rutas/rutasAutenticacion.js';
import enrutadorAnalitica from './presentacion/rutas/rutasAnalitica.js';

dotenv.config();

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

aplicacion.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
});

export const servidorActivo = aplicacion.listen(PUERTO, () => {
  console.log(`[Servidor] API de Rongas Burgers ejecutandose en el puerto ${PUERTO}`);
});

export default aplicacion;
