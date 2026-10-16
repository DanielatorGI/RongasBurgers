import { gestorAlmacenamientoLocal } from './gestorAlmacenamientoLocal';

const CLAVE_CACHE_PREFIJO = 'cache_modulo_';

export const gestorCacheSesion = {
  guardarDatosModulo(nombreModulo, datos) {
    return gestorAlmacenamientoLocal.guardarItem(
      `${CLAVE_CACHE_PREFIJO}${nombreModulo}`,
      {
        datos,
        fechaGuardado: Date.now()
      }
    );
  },

  obtenerDatosModulo(nombreModulo) {
    const registro = gestorAlmacenamientoLocal.obtenerItem(
      `${CLAVE_CACHE_PREFIJO}${nombreModulo}`
    );
    if (!registro) return null;
    return registro.datos;
  },

  invalidarModulo(nombreModulo) {
    return gestorAlmacenamientoLocal.eliminarItem(
      `${CLAVE_CACHE_PREFIJO}${nombreModulo}`
    );
  }
};
