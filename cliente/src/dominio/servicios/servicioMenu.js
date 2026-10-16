import { realizarPeticionHttp } from '../../infraestructura/http/clienteApi';
import { gestorCacheSesion } from '../../infraestructura/almacenamiento/gestorCacheSesion';

export const servicioMenu = {
  async obtenerDatosMenu(forzarActualizacion = false) {
    if (!forzarActualizacion) {
      const datosEnCache = gestorCacheSesion.obtenerDatosModulo('menu');
      if (datosEnCache) {
        return datosEnCache;
      }
    }

    const respuesta = await realizarPeticionHttp('/api/menu');
    if (!respuesta.exito || !respuesta.datos) {
      throw new Error(respuesta.mensaje || 'Error al obtener la estructura del menú.');
    }

    gestorCacheSesion.guardarDatosModulo('menu', respuesta.datos);
    return respuesta.datos;
  },

  calcularMargenPlatillo(precioVenta, costoTotal) {
    const precio = Number(precioVenta) || 0;
    const costo = Number(costoTotal) || 0;

    if (precio <= 0) return 0;
    const margen = ((precio - costo) / precio) * 100;
    return Math.round(margen);
  }
};
