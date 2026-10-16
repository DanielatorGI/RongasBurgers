import { repositorioMenu } from '../../infraestructura/repositorios/repositorioMenu.js';

export const servicioAnaliticaMenu = {
  obtenerDatosMenu(sucursalId) {
    if (!sucursalId) {
      throw new Error('El identificador de sucursal es obligatorio.');
    }

    const platillos = repositorioMenu.obtenerPlatillosConInsumos(sucursalId);

    return {
      totalPlatillos: platillos.length,
      platillos
    };
  }
};
