import { obtenerConexionBaseDatos } from '../baseDatos/conexionBaseDatos.js';

export const repositorioMenu = {
  obtenerPlatillosConInsumos(sucursalId) {
    const bd = obtenerConexionBaseDatos();
    const sentenciaPlatillos = bd.prepare(`
      SELECT id, nombre, descripcion, precioVenta, costoTotal, margenPorcentaje, imagenUrl, categoria
      FROM platillosMenu
      WHERE sucursalId = ?
      ORDER BY precioVenta DESC
    `);

    const sentenciaInsumos = bd.prepare(`
      SELECT id, platilloId, nombreInsumo, cantidadTexto, costoUnitario, ordenPresentacion
      FROM insumosReceta
      WHERE platilloId = ?
      ORDER BY ordenPresentacion ASC
    `);

    const platillos = sentenciaPlatillos.all(sucursalId);

    return platillos.map((platillo) => ({
      ...platillo,
      insumos: sentenciaInsumos.all(platillo.id)
    }));
  }
};
