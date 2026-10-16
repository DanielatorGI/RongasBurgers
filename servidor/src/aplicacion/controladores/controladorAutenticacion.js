import {
  autenticarPorCredenciales,
  validarClaveApiSucursal
} from '../../dominio/servicios/servicioAutenticacionSucursal.js';
import { sanitizarSucursalParaCliente } from '../../dominio/modelos/modeloCredencialesSucursal.js';

export const controladorAutenticacion = {
  iniciarSesion(req, res) {
    const { correo, contrasena } = req.body || {};

    if (!correo || !contrasena) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Debe ingresar correo electronico y contrasena.'
      });
    }

    const sucursal = autenticarPorCredenciales(correo, contrasena);

    if (!sucursal) {
      return res.status(401).json({
        exito: false,
        mensaje: 'Credenciales invalidas. Solo usuarios autorizados de sucursal pueden ingresar.'
      });
    }

    const datosSucursal = sanitizarSucursalParaCliente(sucursal);

    return res.status(200).json({
      exito: true,
      mensaje: 'Autenticacion exitosa',
      sucursal: {
        ...datosSucursal,
        claveApi: sucursal.claveApi
      }
    });
  },

  verificarSesion(req, res) {
    const claveApi = req.headers['x-api-key'];
    const sucursal = validarClaveApiSucursal(claveApi);

    if (!sucursal) {
      return res.status(401).json({
        exito: false,
        mensaje: 'Sesion invalida o expirada.'
      });
    }

    return res.status(200).json({
      exito: true,
      sucursal: sanitizarSucursalParaCliente(sucursal)
    });
  }
};
