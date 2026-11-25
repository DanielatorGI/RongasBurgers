import { obtenerConexionBaseDatos } from './conexionBaseDatos.js';
import { ejecutarSemillaDatos } from '../semillas/semillaDatos.js';

export function asegurarBaseDatosInicializada() {
  const bd = obtenerConexionBaseDatos();

  const tablaExiste = bd
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'sucursales'")
    .get();

  if (!tablaExiste) {
    ejecutarSemillaDatos();
    return;
  }

  const conteo = bd.prepare('SELECT COUNT(*) AS total FROM sucursales').get();
  if (!conteo || conteo.total === 0) {
    ejecutarSemillaDatos();
  }
}

