import { realizarPeticionHttp } from '../../infraestructura/http/clienteApi';
import { gestorAlmacenamientoLocal } from '../../infraestructura/almacenamiento/gestorAlmacenamientoLocal';
import { gestorCacheSesion } from '../../infraestructura/almacenamiento/gestorCacheSesion';

const CLAVE_SESION_ACTIVA = 'sesion_activa';
const CLAVE_CORREO_RECORDADO = 'correo_recordado';

export const servicioAutenticacion = {
  async iniciarSesion(correo, contrasena) {
    if (!correo || !contrasena) {
      throw new Error('Debe proporcionar correo y contrasena.');
    }

    const respuesta = await realizarPeticionHttp('/api/autenticacion/iniciar-sesion', {
      method: 'POST',
      body: JSON.stringify({ correo, contrasena })
    });

    if (!respuesta.exito || !respuesta.sucursal) {
      throw new Error(respuesta.mensaje || 'Error al autenticar las credenciales de sucursal.');
    }

    return respuesta.sucursal;
  },

  guardarSesion(sucursal, recordarme = false) {
    gestorAlmacenamientoLocal.guardarItem(CLAVE_SESION_ACTIVA, sucursal);

    if (recordarme) {
      gestorAlmacenamientoLocal.guardarItem(CLAVE_CORREO_RECORDADO, sucursal.correo);
    } else {
      gestorAlmacenamientoLocal.eliminarItem(CLAVE_CORREO_RECORDADO);
    }
  },

  obtenerSesionActiva() {
    return gestorAlmacenamientoLocal.obtenerItem(CLAVE_SESION_ACTIVA);
  },

  obtenerCorreoRecordado() {
    return gestorAlmacenamientoLocal.obtenerItem(CLAVE_CORREO_RECORDADO) || '';
  },

  cerrarSesion() {
    gestorAlmacenamientoLocal.eliminarItem(CLAVE_SESION_ACTIVA);
    gestorCacheSesion.invalidarModulo('inicio');
    gestorCacheSesion.invalidarModulo('ventas');
    gestorCacheSesion.invalidarModulo('gastos');
    gestorCacheSesion.invalidarModulo('menu');
  }
};
