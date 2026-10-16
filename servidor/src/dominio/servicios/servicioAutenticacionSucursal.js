import { crearSucursal } from '../modelos/modeloCredencialesSucursal.js';

export function obtenerSucursalesConfiguradas() {
  return [
    crearSucursal({
      id: process.env.USUARIO_CAMPESTRE_ID || 'sucursal_campestre',
      nombre: process.env.USUARIO_CAMPESTRE_NOMBRE || 'Sucursal Campestre',
      correo: process.env.USUARIO_CAMPESTRE_CORREO || 'campestre@rongasburgers.com',
      contrasena: process.env.USUARIO_CAMPESTRE_CONTRASENA || 'Campestre2026*',
      claveApi: process.env.USUARIO_CAMPESTRE_CLAVE_API || 'rb_campestre_sec_98124'
    }),
    crearSucursal({
      id: process.env.USUARIO_CENTRO_MAX_ID || 'sucursal_centromax',
      nombre: process.env.USUARIO_CENTRO_MAX_NOMBRE || 'Sucursal Centro Max',
      correo: process.env.USUARIO_CENTRO_MAX_CORREO || 'centromax@rongasburgers.com',
      contrasena: process.env.USUARIO_CENTRO_MAX_CONTRASENA || 'CentroMax2026*',
      claveApi: process.env.USUARIO_CENTRO_MAX_CLAVE_API || 'rb_centromax_sec_45182'
    }),
    crearSucursal({
      id: process.env.USUARIO_COECILLO_ID || 'sucursal_coecillo',
      nombre: process.env.USUARIO_COECILLO_NOMBRE || 'Sucursal Coecillo',
      correo: process.env.USUARIO_COECILLO_CORREO || 'coecillo@rongasburgers.com',
      contrasena: process.env.USUARIO_COECILLO_CONTRASENA || 'Coecillo2026*',
      claveApi: process.env.USUARIO_COECILLO_CLAVE_API || 'rb_coecillo_sec_73291'
    })
  ];
}

export function autenticarPorCredenciales(correo, contrasena) {
  const sucursales = obtenerSucursalesConfiguradas();
  return (
    sucursales.find(
      (sucursal) =>
        sucursal.correo.toLowerCase() === (correo || '').toLowerCase() &&
        sucursal.contrasena === contrasena
    ) || null
  );
}

export function validarClaveApiSucursal(claveApi) {
  if (!claveApi) return null;
  const sucursales = obtenerSucursalesConfiguradas();
  return sucursales.find((sucursal) => sucursal.claveApi === claveApi) || null;
}
