import { Router } from 'express';
import { middlewareAutenticacionPorClaveApi } from '../middlewares/middlewareAutenticacion.js';
import { controladorInicio } from '../../aplicacion/controladores/controladorInicio.js';
import { controladorVentas } from '../../aplicacion/controladores/controladorVentas.js';
import { controladorGastos } from '../../aplicacion/controladores/controladorGastos.js';
import { controladorMenu } from '../../aplicacion/controladores/controladorMenu.js';

const enrutadorAnalitica = Router();

enrutadorAnalitica.use(middlewareAutenticacionPorClaveApi);

enrutadorAnalitica.get('/inicio', controladorInicio.obtenerInicio);
enrutadorAnalitica.get('/ventas', controladorVentas.obtenerVentas);
enrutadorAnalitica.get('/gastos', controladorGastos.obtenerGastos);
enrutadorAnalitica.get('/menu', controladorMenu.obtenerMenu);

export default enrutadorAnalitica;
