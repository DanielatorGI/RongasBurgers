import { verificarPermisoSoloLectura } from './interceptorSoloLectura';
import { gestorAlmacenamientoLocal } from '../almacenamiento/gestorAlmacenamientoLocal';

const URL_BASE = import.meta.env.VITE_URL_API_SERVIDOR || 'http://localhost:3001';

export async function realizarPeticionHttp(ruta, opciones = {}) {
  const metodo = (opciones.method || 'GET').toUpperCase();

  verificarPermisoSoloLectura(ruta, metodo);

  const sesionGuardada = gestorAlmacenamientoLocal.obtenerItem('sesion_activa');
  const claveApiSesion = sesionGuardada?.claveApi;

  const urlCompleta = `${URL_BASE}${ruta.startsWith('/') ? ruta : `/${ruta}`}`;
  const encabezados = {
    'Content-Type': 'application/json',
    ...(claveApiSesion ? { 'x-api-key': claveApiSesion } : {}),
    ...(opciones.headers || {})
  };

  const respuesta = await fetch(urlCompleta, {
    ...opciones,
    method: metodo,
    headers: encabezados
  });

  if (!respuesta.ok) {
    const errorDetalle = await respuesta.json().catch(() => ({}));
    throw new Error(errorDetalle.mensaje || `Error en la peticion HTTP: ${respuesta.status}`);
  }

  return respuesta.json();
}
