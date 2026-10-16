import { repositorioVentas } from '../../infraestructura/repositorios/repositorioVentas.js';

const LIMITE_TICKET_ALERTA = 180.0;

export const servicioAnaliticaVentas = {
  obtenerDatosVentas(sucursalId, periodo = 'hoy') {
    if (!sucursalId) {
      throw new Error('El identificador de sucursal es obligatorio.');
    }

    const periodoNormalizado = ['hoy', 'semana', 'mes'].includes(periodo) ? periodo : 'hoy';
    const resumen = repositorioVentas.obtenerResumenPeriodo(sucursalId, periodoNormalizado);

    if (!resumen) {
      return null;
    }

    const tieneAlertaTicket = resumen.ticketPromedio < LIMITE_TICKET_ALERTA;
    const picosVentaHora = repositorioVentas.obtenerVentasPorHora(sucursalId);
    const tarjetasHorarias = repositorioVentas.obtenerTarjetasHorarias(sucursalId);

    return {
      periodo: periodoNormalizado,
      kpis: {
        ventaBruta: resumen.ventaBruta,
        ventaNeta: resumen.ventaNeta,
        ticketPromedio: resumen.ticketPromedio,
        tieneAlertaTicket,
        mensajeAlertaTicket: tieneAlertaTicket
          ? 'Ticket bajo $180 — empujar papas y refrescos'
          : null,
        variacionPorcentualSemanal: resumen.variacionPorcentualSemanal
      },
      afluencia: {
        mesasAtendidas: resumen.mesasAtendidas,
        capacidadMesasEstimada: resumen.capacidadMesasEstimada,
        comensalesAtendidos: resumen.comensalesAtendidos,
        promedioComensalesPorMesa: resumen.promedioComensalesPorMesa,
        picoMediodia: resumen.picoMediodia,
        picoNoche: resumen.picoNoche,
        valleTarde: resumen.valleTarde
      },
      picosVentaHora,
      tarjetasHorarias
    };
  }
};
