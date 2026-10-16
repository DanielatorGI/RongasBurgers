import { obtenerConexionBaseDatos } from '../baseDatos/conexionBaseDatos.js';

export const repositorioVentas = {
  obtenerResumenPeriodo(sucursalId, periodo = 'hoy') {
    const bd = obtenerConexionBaseDatos();
    const sentencia = bd.prepare(`
      SELECT 
        ventaBruta, ventaNeta, ticketPromedio, variacionPorcentualSemanal,
        mesasAtendidas, capacidadMesasEstimada, comensalesAtendidos,
        promedioComensalesPorMesa, picoMediodia, picoNoche, valleTarde
      FROM resumenesVentas
      WHERE sucursalId = ? AND periodo = ?
      LIMIT 1
    `);
    return sentencia.get(sucursalId, periodo) || null;
  },

  obtenerVentasPorHora(sucursalId, fecha = '2026-10-16') {
    const bd = obtenerConexionBaseDatos();
    const sentencia = bd.prepare(`
      SELECT horaTexto, ordenHora, montoHoy, montoSemanaAnterior, esRush, etiquetaRush
      FROM ventasPorHora
      WHERE sucursalId = ? AND fecha = ?
      ORDER BY ordenHora ASC
    `);
    return sentencia.all(sucursalId, fecha);
  },

  obtenerTarjetasHorarias(sucursalId) {
    return [
      { titulo: 'Rush mediodia', horario: '12pm - 2pm', variacion: '+9%', esPositivo: true },
      { titulo: 'Rush nocturno', horario: '6pm - 8pm', variacion: '+15%', esPositivo: true },
      { titulo: 'Valle tarde', horario: '3pm - 5pm', accionRecomendada: 'Reforzar promo', esAlerta: true }
    ];
  }
};
