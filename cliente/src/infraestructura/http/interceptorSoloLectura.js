const RUTAS_SOLO_LECTURA = [
  '/api/inicio',
  '/api/ventas',
  '/api/gastos',
  '/api/menu'
];

export function verificarPermisoSoloLectura(ruta, metodoHttp = 'GET') {
  const metodoNormalizado = metodoHttp.toUpperCase();
  const esRutaProtegida = RUTAS_SOLO_LECTURA.some((rutaPermitida) =>
    ruta.startsWith(rutaPermitida)
  );

  if (esRutaProtegida && metodoNormalizado !== 'GET') {
    throw new Error(
      `Operacion bloqueada: el metodo ${metodoNormalizado} no esta permitido en la ruta ${ruta}. La aplicacion opera en modo solo lectura.`
    );
  }

  return true;
}
