import { repositorioGastos } from '../../infraestructura/repositorios/repositorioGastos.js';

export const servicioAnaliticaGastos = {
  obtenerDatosGastos(sucursalId) {
    if (!sucursalId) {
      throw new Error('El identificador de sucursal es obligatorio.');
    }

    const gastosOperativos = repositorioGastos.obtenerGastosOperativos(sucursalId);
    const historicoGastos = repositorioGastos.obtenerHistoricoGastos(sucursalId);

    return {
      gastosOperativos,
      historicoGastos
    };
  }
};
