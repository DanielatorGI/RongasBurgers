export const LIMITE_TICKET_PROMEDIO_ALERTA = 180;

export function evaluarAlertaTicketPromedio(montoTicket) {
  const montoNumerico = Number(montoTicket) || 0;
  const tieneAlerta = montoNumerico < LIMITE_TICKET_PROMEDIO_ALERTA;

  return {
    tieneAlerta,
    monto: montoNumerico,
    mensaje: tieneAlerta
      ? 'Ticket bajo $180 — empujar papas y refrescos'
      : 'Ticket promedio en rango saludable'
  };
}

export function calcularVariacionPorcentual(valorActual, valorAnterior) {
  const actual = Number(valorActual) || 0;
  const anterior = Number(valorAnterior) || 0;

  if (anterior === 0) {
    return {
      porcentaje: 0,
      esIncremento: actual >= 0,
      textoFormateado: '+0.0%'
    };
  }

  const variacion = ((actual - anterior) / anterior) * 100;
  const esIncremento = variacion >= 0;
  const signo = esIncremento ? '+' : '';

  return {
    porcentaje: Number(variacion.toFixed(1)),
    esIncremento,
    textoFormateado: `${signo}${variacion.toFixed(1)}%`
  };
}
