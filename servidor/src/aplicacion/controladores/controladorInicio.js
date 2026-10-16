import { servicioAnaliticaInicio } from '../../dominio/servicios/servicioAnaliticaInicio.js';

export const controladorInicio = {
  obtenerInicio(req, res) {
    try {
      const sucursalId = req.sucursalAutenticada?.id;
      const datos = servicioAnaliticaInicio.obtenerDatosInicio(sucursalId);

      return res.status(200).json({
        exito: true,
        sucursal: req.sucursalAutenticada.nombre,
        datos
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: 'Error al consultar las metricas del panel de inicio.',
        detalle: error.message
      });
    }
  }
};
