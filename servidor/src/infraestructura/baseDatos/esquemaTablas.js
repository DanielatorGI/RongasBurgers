export function crearEsquemaTablas(bd) {
  bd.exec(`
    CREATE TABLE IF NOT EXISTS sucursales (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      direccion TEXT,
      telefono TEXT,
      claveApi TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS resumenesVentas (
      id TEXT PRIMARY KEY,
      sucursalId TEXT NOT NULL,
      fecha TEXT NOT NULL,
      periodo TEXT NOT NULL,
      ventaBruta REAL NOT NULL,
      ventaNeta REAL NOT NULL,
      ticketPromedio REAL NOT NULL,
      variacionPorcentualSemanal REAL NOT NULL,
      mesasAtendidas INTEGER NOT NULL,
      capacidadMesasEstimada INTEGER NOT NULL,
      comensalesAtendidos INTEGER NOT NULL,
      promedioComensalesPorMesa REAL NOT NULL,
      picoMediodia INTEGER NOT NULL,
      picoNoche INTEGER NOT NULL,
      valleTarde INTEGER NOT NULL,
      FOREIGN KEY (sucursalId) REFERENCES sucursales(id)
    );

    CREATE TABLE IF NOT EXISTS ventasPorHora (
      id TEXT PRIMARY KEY,
      sucursalId TEXT NOT NULL,
      fecha TEXT NOT NULL,
      horaTexto TEXT NOT NULL,
      ordenHora INTEGER NOT NULL,
      montoHoy REAL NOT NULL,
      montoSemanaAnterior REAL NOT NULL,
      esRush INTEGER NOT NULL DEFAULT 0,
      etiquetaRush TEXT,
      FOREIGN KEY (sucursalId) REFERENCES sucursales(id)
    );

    CREATE TABLE IF NOT EXISTS ventasMensuales (
      id TEXT PRIMARY KEY,
      sucursalId TEXT NOT NULL,
      anio INTEGER NOT NULL,
      mesNumero INTEGER NOT NULL,
      mesNombre TEXT NOT NULL,
      montoIngresos REAL NOT NULL,
      FOREIGN KEY (sucursalId) REFERENCES sucursales(id)
    );

    CREATE TABLE IF NOT EXISTS ventasPorCategoria (
      id TEXT PRIMARY KEY,
      sucursalId TEXT NOT NULL,
      mesTexto TEXT NOT NULL,
      categoria TEXT NOT NULL,
      montoVentas REAL NOT NULL,
      unidadesVendidas INTEGER NOT NULL,
      FOREIGN KEY (sucursalId) REFERENCES sucursales(id)
    );

    CREATE TABLE IF NOT EXISTS gastosOperativos (
      id TEXT PRIMARY KEY,
      sucursalId TEXT NOT NULL,
      mesTexto TEXT NOT NULL,
      categoriaGasto TEXT NOT NULL,
      monto REAL NOT NULL,
      comparativaTexto TEXT,
      tieneAlerta INTEGER DEFAULT 0,
      mensajeAlerta TEXT,
      FOREIGN KEY (sucursalId) REFERENCES sucursales(id)
    );

    CREATE TABLE IF NOT EXISTS historicoGastos (
      id TEXT PRIMARY KEY,
      sucursalId TEXT NOT NULL,
      anio INTEGER NOT NULL,
      mesNumero INTEGER NOT NULL,
      mesNombre TEXT NOT NULL,
      montoTotal REAL NOT NULL,
      montoNomina REAL NOT NULL,
      montoRenta REAL NOT NULL,
      montoServicios REAL NOT NULL,
      FOREIGN KEY (sucursalId) REFERENCES sucursales(id)
    );

    CREATE TABLE IF NOT EXISTS platillosMenu (
      id TEXT PRIMARY KEY,
      sucursalId TEXT NOT NULL,
      nombre TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      precioVenta REAL NOT NULL,
      costoTotal REAL NOT NULL,
      margenPorcentaje REAL NOT NULL,
      imagenUrl TEXT,
      categoria TEXT NOT NULL,
      esDestacado INTEGER DEFAULT 0,
      tipoDestacado TEXT,
      unidadesVendidasMes INTEGER DEFAULT 0,
      FOREIGN KEY (sucursalId) REFERENCES sucursales(id)
    );

    CREATE TABLE IF NOT EXISTS insumosReceta (
      id TEXT PRIMARY KEY,
      platilloId TEXT NOT NULL,
      nombreInsumo TEXT NOT NULL,
      cantidadTexto TEXT NOT NULL,
      costoUnitario REAL NOT NULL,
      ordenPresentacion INTEGER NOT NULL,
      FOREIGN KEY (platilloId) REFERENCES platillosMenu(id)
    );

    CREATE INDEX IF NOT EXISTS idx_resumenes_sucursal ON resumenesVentas(sucursalId, periodo);
    CREATE INDEX IF NOT EXISTS idx_ventas_hora_sucursal ON ventasPorHora(sucursalId, fecha);
    CREATE INDEX IF NOT EXISTS idx_ventas_mensuales_sucursal ON ventasMensuales(sucursalId, anio);
    CREATE INDEX IF NOT EXISTS idx_gastos_sucursal ON gastosOperativos(sucursalId, mesTexto);
    CREATE INDEX IF NOT EXISTS idx_platillos_sucursal ON platillosMenu(sucursalId);
  `);
}
