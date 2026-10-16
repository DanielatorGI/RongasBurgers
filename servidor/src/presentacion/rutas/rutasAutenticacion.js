import { Router } from 'express';
import { controladorAutenticacion } from '../../aplicacion/controladores/controladorAutenticacion.js';

const enrutadorAutenticacion = Router();

enrutadorAutenticacion.post(
  '/iniciar-sesion',
  controladorAutenticacion.iniciarSesion
);

enrutadorAutenticacion.get(
  '/verificar-sesion',
  controladorAutenticacion.verificarSesion
);

export default enrutadorAutenticacion;
