import { obtenerConexionBaseDatos } from '../baseDatos/conexionBaseDatos.js';

export const repositorioSucursales = {
  obtenerTodas() {
    try {
      const bd = obtenerConexionBaseDatos();
      const sentencia = bd.prepare('SELECT id, nombre, direccion, telefono FROM sucursales');
      return sentencia.all();
    } catch {
      return [];
    }
  },

  obtenerPorId(idSucursal) {
    try {
      const bd = obtenerConexionBaseDatos();
      const sentencia = bd.prepare('SELECT id, nombre, direccion, telefono FROM sucursales WHERE id = ?');
      return sentencia.get(idSucursal) || null;
    } catch {
      return null;
    }
  }
};
