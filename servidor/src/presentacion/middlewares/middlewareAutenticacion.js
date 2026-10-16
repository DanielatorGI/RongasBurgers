import { validarClaveApiSucursal } from '../../dominio/servicios/servicioAutenticacionSucursal.js';

export function middlewareAutenticacionPorClaveApi(req, res, next) {
  const claveApi = req.headers['x-api-key'];

  if (!claveApi) {
    return res.status(401).json({
      exito: false,
      mensaje: 'Acceso no autorizado: Se requiere el encabezado x-api-key.'
    });
  }

  const sucursal = validarClaveApiSucursal(claveApi);

  if (!sucursal) {
    return res.status(403).json({
      exito: false,
      mensaje: 'Acceso denegado: Clave API no valida o no asignada a una sucursal autorizada.'
    });
  }

  req.sucursalAutenticada = {
    id: sucursal.id,
    nombre: sucursal.nombre,
    correo: sucursal.correo
  };

  next();
}
