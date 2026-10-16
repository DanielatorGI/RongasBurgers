import { Router } from 'express';
import { middlewareAutenticacionPorClaveApi } from '../middlewares/middlewareAutenticacion.js';

const enrutadorAnalitica = Router();

enrutadorAnalitica.use(middlewareAutenticacionPorClaveApi);

enrutadorAnalitica.get('/inicio', (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: `Modulo de Inicio listo para la sucursal: ${req.sucursalAutenticada.nombre}`
  });
});

enrutadorAnalitica.get('/ventas', (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: `Modulo de Ventas listo para la sucursal: ${req.sucursalAutenticada.nombre}`
  });
});

enrutadorAnalitica.get('/gastos', (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: `Modulo de Gastos listo para la sucursal: ${req.sucursalAutenticada.nombre}`
  });
});

enrutadorAnalitica.get('/menu', (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: `Modulo de Menu listo para la sucursal: ${req.sucursalAutenticada.nombre}`
  });
});

export default enrutadorAnalitica;
