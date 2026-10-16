const MESES_HISTORICOS = [
  { anio: 2026, mesNumero: 7, mesNombre: 'Jul', mesTexto: 'Julio 2026' },
  { anio: 2026, mesNumero: 8, mesNombre: 'Ago', mesTexto: 'Agosto 2026' },
  { anio: 2026, mesNumero: 9, mesNombre: 'Sep', mesTexto: 'Septiembre 2026' },
  { anio: 2026, mesNumero: 10, mesNombre: 'Oct', mesTexto: 'Octubre 2026' }
];

const CATEGORIAS_VENTA = [
  { nombre: 'Hamburguesas', porcentaje: 0.52 },
  { nombre: 'Snacks y Papas', porcentaje: 0.22 },
  { nombre: 'Bebidas', porcentaje: 0.14 },
  { nombre: 'Postres', porcentaje: 0.08 },
  { nombre: 'Combos', porcentaje: 0.04 }
];

export function generarVentasHistoricas(bd, sucursales) {
  const stmtMensual = bd.prepare(`
    INSERT INTO ventasMensuales (id, sucursalId, anio, mesNumero, mesNombre, montoIngresos)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const stmtCategoria = bd.prepare(`
    INSERT INTO ventasPorCategoria (id, sucursalId, mesTexto, categoria, montoVentas, unidadesVendidas)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  sucursales.forEach((sucursal) => {
    const factorBase = sucursal.id === 'sucursal_centromax' ? 1.3 : sucursal.id === 'sucursal_campestre' ? 0.95 : 1.1;

    MESES_HISTORICOS.forEach((mes, indiceMes) => {
      const variacionMes = 1 + indiceMes * 0.04;
      const totalMes = Math.round(38000 * factorBase * variacionMes);

      stmtMensual.run(
        `vm_${sucursal.id}_${mes.anio}_${mes.mesNumero}`,
        sucursal.id,
        mes.anio,
        mes.mesNumero,
        mes.mesNombre,
        totalMes
      );

      CATEGORIAS_VENTA.forEach((cat) => {
        const montoCat = Math.round(totalMes * cat.porcentaje);
        const unidades = Math.round(montoCat / (cat.nombre === 'Hamburguesas' ? 180 : 70));

        stmtCategoria.run(
          `vc_${sucursal.id}_${mes.mesNumero}_${cat.nombre.replace(/\s+/g, '')}`,
          sucursal.id,
          mes.mesTexto,
          cat.nombre,
          montoCat,
          unidades
        );
      });
    });

    generarResumenesDiarios(bd, sucursal);
    generarVentasPorHora(bd, sucursal);
  });
}

function generarResumenesDiarios(bd, sucursal) {
  const stmt = bd.prepare(`
    INSERT INTO resumenesVentas (
      id, sucursalId, fecha, periodo, ventaBruta, ventaNeta, ticketPromedio,
      variacionPorcentualSemanal, mesasAtendidas, capacidadMesasEstimada,
      comensalesAtendidos, promedioComensalesPorMesa, picoMediodia, picoNoche, valleTarde
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const esCampestre = sucursal.id === 'sucursal_campestre';
  const esCentroMax = sucursal.id === 'sucursal_centromax';

  const ticketHoy = esCampestre ? 164.0 : esCentroMax ? 215.0 : 192.0;
  const ventaBrutaHoy = esCampestre ? 14820.0 : esCentroMax ? 19350.0 : 16500.0;
  const ventaNetaHoy = esCampestre ? 11256.0 : esCentroMax ? 15200.0 : 12900.0;
  const variacionSemanal = esCampestre ? 10.3 : esCentroMax ? 14.8 : -2.5;

  stmt.run(`rv_${sucursal.id}_hoy`, sucursal.id, '2026-10-16', 'hoy', ventaBrutaHoy, ventaNetaHoy, ticketHoy, variacionSemanal, 47, 50, 138, 2.9, 62, 48, 28);
  stmt.run(`rv_${sucursal.id}_semana`, sucursal.id, '2026-10-16', 'semana', ventaBrutaHoy * 6.5, ventaNetaHoy * 6.5, ticketHoy, 8.5, 310, 350, 920, 3.0, 410, 330, 180);
  stmt.run(`rv_${sucursal.id}_mes`, sucursal.id, '2026-10-16', 'mes', ventaBrutaHoy * 27, ventaNetaHoy * 27, ticketHoy, 12.0, 1280, 1500, 3850, 3.0, 1720, 1380, 750);
}

function generarVentasPorHora(bd, sucursal) {
  const stmt = bd.prepare(`
    INSERT INTO ventasPorHora (id, sucursalId, fecha, horaTexto, ordenHora, montoHoy, montoSemanaAnterior, esRush, etiquetaRush)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const horas = [
    { texto: '8am', orden: 8, hoy: 350, ant: 300, rush: 0, tag: null },
    { texto: '9am', orden: 9, hoy: 520, ant: 480, rush: 0, tag: null },
    { texto: '10am', orden: 10, hoy: 650, ant: 610, rush: 0, tag: null },
    { texto: '11am', orden: 11, hoy: 1100, ant: 980, rush: 0, tag: null },
    { texto: '12pm', orden: 12, hoy: 2400, ant: 2100, rush: 0, tag: null },
    { texto: '1pm', orden: 13, hoy: 3200, ant: 2800, rush: 1, tag: 'Rush mediodia' },
    { texto: '2pm', orden: 14, hoy: 2900, ant: 2500, rush: 0, tag: null },
    { texto: '3pm', orden: 15, hoy: 1500, ant: 1400, rush: 0, tag: null },
    { texto: '4pm', orden: 16, hoy: 900, ant: 850, rush: 0, tag: null },
    { texto: '5pm', orden: 17, hoy: 1100, ant: 1050, rush: 0, tag: null },
    { texto: '6pm', orden: 18, hoy: 1900, ant: 1750, rush: 0, tag: null },
    { texto: '7pm', orden: 19, hoy: 2450, ant: 2150, rush: 1, tag: 'Rush nocturno' },
    { texto: '8pm', orden: 20, hoy: 2100, ant: 1900, rush: 0, tag: null },
    { texto: '9pm', orden: 21, hoy: 1400, ant: 1300, rush: 0, tag: null },
    { texto: '10pm', orden: 22, hoy: 600, ant: 550, rush: 0, tag: null }
  ];

  horas.forEach((h) => {
    stmt.run(`vh_${sucursal.id}_${h.orden}`, sucursal.id, '2026-10-16', h.texto, h.orden, h.hoy, h.ant, h.rush, h.tag);
  });
}
