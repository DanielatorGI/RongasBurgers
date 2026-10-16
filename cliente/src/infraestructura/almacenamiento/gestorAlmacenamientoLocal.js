const PREFIJO_ALMACENAMIENTO = 'rongas_analytics_';

export const gestorAlmacenamientoLocal = {
  guardarItem(clave, valor) {
    try {
      const serializado = JSON.stringify(valor);
      const encriptado = btoa(unescape(encodeURIComponent(serializado)));
      localStorage.setItem(`${PREFIJO_ALMACENAMIENTO}${clave}`, encriptado);
      return true;
    } catch {
      return false;
    }
  },

  obtenerItem(clave) {
    try {
      const encriptado = localStorage.getItem(`${PREFIJO_ALMACENAMIENTO}${clave}`);
      if (!encriptado) return null;
      const serializado = decodeURIComponent(escape(atob(encriptado)));
      return JSON.parse(serializado);
    } catch {
      return null;
    }
  },

  eliminarItem(clave) {
    try {
      localStorage.removeItem(`${PREFIJO_ALMACENAMIENTO}${clave}`);
      return true;
    } catch {
      return false;
    }
  },

  limpiarTodo() {
    try {
      Object.keys(localStorage)
        .filter((clave) => clave.startsWith(PREFIJO_ALMACENAMIENTO))
        .forEach((clave) => localStorage.removeItem(clave));
      return true;
    } catch {
      return false;
    }
  }
};
