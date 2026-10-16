export function crearUsuario({
  id,
  nombreSucursal,
  correo,
  claveApi,
  fechaInicioSesion = new Date().toISOString()
}) {
  return {
    id,
    nombreSucursal,
    correo,
    claveApi,
    fechaInicioSesion
  };
}

export function validarEstructuraUsuario(usuario) {
  if (!usuario || typeof usuario !== 'object') {
    return false;
  }
  const { id, nombreSucursal, correo, claveApi } = usuario;
  return Boolean(id && nombreSucursal && correo && claveApi);
}
