import { realizarPeticionHttp } from '../../infraestructura/http/clienteApi';
import { gestorCacheSesion } from '../../infraestructura/almacenamiento/gestorCacheSesion';

export const servicioInicio = {
  async obtenerDatosInicio(forzarActualizacion = false) {
    if (!forzarActualizacion) {
      const datosEnCache = gestorCacheSesion.obtenerDatosModulo('inicio');
      if (datosEnCache) {
        return datosEnCache;
      }
    }

    const respuesta = await realizarPeticionHttp('/api/inicio');
    if (!respuesta.exito || !respuesta.datos) {
      throw new Error(respuesta.mensaje || 'Error al obtener datos del panel de inicio.');
    }

    gestorCacheSesion.guardarDatosModulo('inicio', respuesta.datos);
    return respuesta.datos;
  }
};
