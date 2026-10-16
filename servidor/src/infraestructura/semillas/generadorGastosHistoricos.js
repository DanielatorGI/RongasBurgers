const MESES_HISTORICOS_GASTOS = [
  { anio: 2026, mesNumero: 7, mesNombre: 'Jul' },
  { anio: 2026, mesNumero: 8, mesNombre: 'Ago' },
  { anio: 2026, mesNumero: 9, mesNombre: 'Sep' },
  { anio: 2026, mesNumero: 10, mesNombre: 'Oct' }
];

export function generarGastosHistoricos(bd, sucursales) {
  const stmtHistorico = bd.prepare(`
    INSERT INTO historicoGastos (id, sucursalId, anio, mesNumero, mesNombre, montoTotal, montoNomina, montoRenta, montoServicios)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const stmtOperativo = bd.prepare(`
    INSERT INTO gastosOperativos (id, sucursalId, mesTexto, categoriaGasto, monto, comparativaTexto, tieneAlerta, mensajeAlerta)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  sucursales.forEach((sucursal) => {
    const esCoecillo = sucursal.id === 'sucursal_coecillo';
    const esCentroMax = sucursal.id === 'sucursal_centromax';

    const baseNomina = esCoecillo ? 21500 : esCentroMax ? 19000 : 17000;
    const baseRenta = esCoecillo ? 7500 : esCentroMax ? 9500 : 8000;
    const baseServicios = esCoecillo ? 3700 : esCentroMax ? 3500 : 3000;

    MESES_HISTORICOS_GASTOS.forEach((m, indice) => {
      const incremento = 1 + indice * (esCoecillo ? 0.05 : 0.02);
      const nominaMes = Math.round(baseNomina * incremento);
      const serviciosMes = Math.round(baseServicios * incremento);
      const totalMes = nominaMes + baseRenta + serviciosMes;

      stmtHistorico.run(
        `hg_${sucursal.id}_${m.anio}_${m.mesNumero}`,
        sucursal.id,
        m.anio,
        m.mesNumero,
        m.mesNombre,
        totalMes,
        nominaMes,
        baseRenta,
        serviciosMes
      );
    });

    generarGastosOperativosMes(stmtOperativo, sucursal, esCoecillo, baseNomina, baseRenta);
  });
}

function generarGastosOperativosMes(stmt, sucursal, esCoecillo, nomina, renta) {
  const mesActual = 'Octubre 2026';

  stmt.run(
    `go_${sucursal.id}_sueldos`,
    sucursal.id,
    mesActual,
    'Sueldos',
    nomina,
    esCoecillo ? '+18% vs mes anterior' : '+3% vs mes anterior',
    esCoecillo ? 1 : 0,
    esCoecillo ? 'Alerta de sobrecosto en nomina' : null
  );

  stmt.run(
    `go_${sucursal.id}_renta`,
    sucursal.id,
    mesActual,
    'Renta',
    renta,
    'Fijo mensual',
    0,
    null
  );

  stmt.run(
    `go_${sucursal.id}_agua`,
    sucursal.id,
    mesActual,
    'Agua',
    esCoecillo ? 1100 : 1200,
    '-2% vs mes anterior',
    0,
    null
  );

  stmt.run(
    `go_${sucursal.id}_luz`,
    sucursal.id,
    mesActual,
    'Luz',
    esCoecillo ? 2600 : 1800,
    esCoecillo ? '+15% (Alerta de consumo)' : '+2% vs mes anterior',
    esCoecillo ? 1 : 0,
    esCoecillo ? '+15% (Alerta de consumo)' : null
  );
}
