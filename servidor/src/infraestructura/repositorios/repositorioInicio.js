import { obtenerConexionBaseDatos } from '../baseDatos/conexionBaseDatos.js';

export const repositorioInicio = {
  obtenerIngresosMensuales(sucursalId) {
    const bd = obtenerConexionBaseDatos();
    const sentencia = bd.prepare(`
      SELECT anio, mesNumero, mesNombre, montoIngresos
      FROM ventasMensuales
      WHERE sucursalId = ?
      ORDER BY anio ASC, mesNumero ASC
    `);
    return sentencia.all(sucursalId);
  },

  obtenerVentasPorCategoria(sucursalId, mesTexto = 'Octubre 2026') {
    const bd = obtenerConexionBaseDatos();
    const sentencia = bd.prepare(`
      SELECT categoria, montoVentas, unidadesVendidas
      FROM ventasPorCategoria
      WHERE sucursalId = ? AND mesTexto = ?
      ORDER BY montoVentas DESC
    `);
    return sentencia.all(sucursalId, mesTexto);
  },

  obtenerPlatillosDestacados(sucursalId) {
    const bd = obtenerConexionBaseDatos();
    const sentencia = bd.prepare(`
      SELECT id, nombre, descripcion, precioVenta, imagenUrl, categoria, tipoDestacado, unidadesVendidasMes
      FROM platillosMenu
      WHERE sucursalId = ? AND esDestacado = 1
      ORDER BY tipoDestacado ASC
    `);
    return sentencia.all(sucursalId);
  }
};
