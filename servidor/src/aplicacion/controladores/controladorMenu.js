import { servicioAnaliticaMenu } from '../../dominio/servicios/servicioAnaliticaMenu.js';

export const controladorMenu = {
  obtenerMenu(req, res) {
    try {
      const sucursalId = req.sucursalAutenticada?.id;
      const datos = servicioAnaliticaMenu.obtenerDatosMenu(sucursalId);

      return res.status(200).json({
        exito: true,
        sucursal: req.sucursalAutenticada.nombre,
        datos
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: 'Error al consultar el desglose de menu e ingenieria de costos.',
        detalle: error.message
      });
    }
  }
};
