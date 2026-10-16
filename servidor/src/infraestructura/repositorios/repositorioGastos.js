import { obtenerConexionBaseDatos } from '../baseDatos/conexionBaseDatos.js';

export const repositorioGastos = {
  obtenerGastosOperativos(sucursalId, mesTexto = 'Octubre 2026') {
    const bd = obtenerConexionBaseDatos();
    const sentencia = bd.prepare(`
      SELECT categoriaGasto, monto, comparativaTexto, tieneAlerta, mensajeAlerta
      FROM gastosOperativos
      WHERE sucursalId = ? AND mesTexto = ?
      ORDER BY id ASC
    `);
    return sentencia.all(sucursalId, mesTexto);
  },

  obtenerHistoricoGastos(sucursalId) {
    const bd = obtenerConexionBaseDatos();
    const sentencia = bd.prepare(`
      SELECT anio, mesNumero, mesNombre, montoTotal, montoNomina, montoRenta, montoServicios
      FROM historicoGastos
      WHERE sucursalId = ?
      ORDER BY anio ASC, mesNumero ASC
    `);
    return sentencia.all(sucursalId);
  }
};
