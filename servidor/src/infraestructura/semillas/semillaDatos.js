import { obtenerConexionBaseDatos } from '../baseDatos/conexionBaseDatos.js';

export function inicializarTablas() {
  const bd = obtenerConexionBaseDatos();

  bd.exec(`
    CREATE TABLE IF NOT EXISTS sucursales (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      direccion TEXT,
      telefono TEXT
    );
  `);

  console.log('[Semilla] Estructura base de tablas inicializada correctamente.');
}

if (process.argv[1]?.endsWith('semillaDatos.js')) {
  inicializarTablas();
}
