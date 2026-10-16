export function crearSucursal({
  id,
  nombre,
  correo,
  contrasena,
  claveApi
}) {
  return {
    id,
    nombre,
    correo,
    contrasena,
    claveApi
  };
}

export function sanitizarSucursalParaCliente(sucursal) {
  if (!sucursal) return null;
  const { contrasena, ...sucursalSegura } = sucursal;
  return sucursalSegura;
}
