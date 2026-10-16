import { repositorioInicio } from '../../infraestructura/repositorios/repositorioInicio.js';

export const servicioAnaliticaInicio = {
  obtenerDatosInicio(sucursalId) {
    if (!sucursalId) {
      throw new Error('El identificador de sucursal es obligatorio.');
    }

    const ingresosMensuales = repositorioInicio.obtenerIngresosMensuales(sucursalId);
    const ventasPorCategoria = repositorioInicio.obtenerVentasPorCategoria(sucursalId);
    const platillosDestacados = repositorioInicio.obtenerPlatillosDestacados(sucursalId);

    return {
      ingresosMensuales,
      ventasPorCategoria,
      platillosDestacados
    };
  }
};
