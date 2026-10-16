import { obtenerConexionBaseDatos } from '../baseDatos/conexionBaseDatos.js';
import { crearEsquemaTablas } from '../baseDatos/esquemaTablas.js';
import { obtenerSucursalesConfiguradas } from '../../dominio/servicios/servicioAutenticacionSucursal.js';
import { PLATILLOS_BASE } from './datosPlatillosBase.js';
import { generarVentasHistoricas } from './generadorVentasHistoricas.js';
import { generarGastosHistoricos } from './generadorGastosHistoricos.js';

export function ejecutarSemillaDatos() {
  const bd = obtenerConexionBaseDatos();

  console.log('[Semilla] Iniciando creacion de esquemas y poblado de base de datos...');
  crearEsquemaTablas(bd);

  const sucursales = obtenerSucursalesConfiguradas();

  bd.exec('BEGIN TRANSACTION;');
  try {
    limpiarTablas(bd);
    insertarSucursales(bd, sucursales);
    generarVentasHistoricas(bd, sucursales);
    generarGastosHistoricos(bd, sucursales);
    insertarPlatillosEInsumos(bd, sucursales);
    bd.exec('COMMIT;');
    console.log('[Semilla] Inyeccion de datos para 4 meses completada con exito.');
  } catch (error) {
    bd.exec('ROLLBACK;');
    console.error('[Semilla] Error durante la inyeccion:', error);
    throw error;
  }
}

function limpiarTablas(bd) {
  bd.exec(`
    DELETE FROM insumosReceta;
    DELETE FROM platillosMenu;
    DELETE FROM historicoGastos;
    DELETE FROM gastosOperativos;
    DELETE FROM ventasPorCategoria;
    DELETE FROM ventasMensuales;
    DELETE FROM ventasPorHora;
    DELETE FROM resumenesVentas;
    DELETE FROM sucursales;
  `);
}

function insertarSucursales(bd, sucursales) {
  const stmt = bd.prepare(`
    INSERT INTO sucursales (id, nombre, direccion, telefono, claveApi)
    VALUES (?, ?, ?, ?, ?)
  `);

  const direcciones = {
    sucursal_campestre: { dir: 'Blvd. Campestre 1205, Leon, Gto', tel: '477-123-4567' },
    sucursal_centromax: { dir: 'Blvd. Adolfo Lopez Mateos 2518, Leon, Gto', tel: '477-987-6543' },
    sucursal_coecillo: { dir: 'Calle Héroes de la Independencia 402, Leon, Gto', tel: '477-456-7890' }
  };

  sucursales.forEach((s) => {
    const meta = direcciones[s.id] || { dir: 'Leon, Gto', tel: '477-000-0000' };
    stmt.run(s.id, s.nombre, meta.dir, meta.tel, s.claveApi);
  });
}

function insertarPlatillosEInsumos(bd, sucursales) {
  const stmtPlatillo = bd.prepare(`
    INSERT INTO platillosMenu (
      id, sucursalId, nombre, descripcion, precioVenta, costoTotal,
      margenPorcentaje, imagenUrl, categoria, esDestacado, tipoDestacado, unidadesVendidasMes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const stmtInsumo = bd.prepare(`
    INSERT INTO insumosReceta (id, platilloId, nombreInsumo, cantidadTexto, costoUnitario, ordenPresentacion)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  sucursales.forEach((s) => {
    PLATILLOS_BASE.forEach((p, idxPlatillo) => {
      const platilloId = `plt_${s.id}_${idxPlatillo + 1}`;
      stmtPlatillo.run(
        platilloId,
        s.id,
        p.nombre,
        p.descripcion,
        p.precioVenta,
        p.costoTotal,
        p.margenPorcentaje,
        p.imagenUrl,
        p.categoria,
        p.esDestacado,
        p.tipoDestacado,
        p.unidadesVendidasMes
      );

      p.insumos.forEach((insumo, idxInsumo) => {
        stmtInsumo.run(
          `ins_${platilloId}_${idxInsumo + 1}`,
          platilloId,
          insumo.nombreInsumo,
          insumo.cantidadTexto,
          insumo.costoUnitario,
          idxInsumo + 1
        );
      });
    });
  });
}

if (process.argv[1]?.endsWith('semillaDatos.js')) {
  ejecutarSemillaDatos();
}
