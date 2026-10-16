import { realizarPeticionHttp } from '../../infraestructura/http/clienteApi';
import { gestorCacheSesion } from '../../infraestructura/almacenamiento/gestorCacheSesion';

export const servicioVentas = {
  async obtenerDatosVentas(periodo = 'hoy', forzarActualizacion = false) {
    const claveCache = `ventas_${periodo}`;

    if (!forzarActualizacion) {
      const datosEnCache = gestorCacheSesion.obtenerDatosModulo(claveCache);
      if (datosEnCache) {
        return datosEnCache;
      }
    }

    const respuesta = await realizarPeticionHttp(`/api/ventas?periodo=${periodo}`);
    if (!respuesta.exito || !respuesta.datos) {
      throw new Error(respuesta.mensaje || 'Error al obtener métricas de ventas.');
    }

    gestorCacheSesion.guardarDatosModulo(claveCache, respuesta.datos);
    return respuesta.datos;
  }
};
