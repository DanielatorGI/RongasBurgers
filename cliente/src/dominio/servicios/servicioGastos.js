import { realizarPeticionHttp } from '../../infraestructura/http/clienteApi';
import { gestorCacheSesion } from '../../infraestructura/almacenamiento/gestorCacheSesion';

export const servicioGastos = {
  async obtenerDatosGastos(forzarActualizacion = false) {
    if (!forzarActualizacion) {
      const datosEnCache = gestorCacheSesion.obtenerDatosModulo('gastos');
      if (datosEnCache) {
        return datosEnCache;
      }
    }

    const respuesta = await realizarPeticionHttp('/api/gastos');
    if (!respuesta.exito || !respuesta.datos) {
      throw new Error(respuesta.mensaje || 'Error al obtener control de gastos operativos.');
    }

    gestorCacheSesion.guardarDatosModulo('gastos', respuesta.datos);
    return respuesta.datos;
  }
};
