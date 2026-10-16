import { servicioAnaliticaGastos } from '../../dominio/servicios/servicioAnaliticaGastos.js';

export const controladorGastos = {
  obtenerGastos(req, res) {
    try {
      const sucursalId = req.sucursalAutenticada?.id;
      const datos = servicioAnaliticaGastos.obtenerDatosGastos(sucursalId);

      return res.status(200).json({
        exito: true,
        sucursal: req.sucursalAutenticada.nombre,
        datos
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: 'Error al consultar el control operativo de gastos.',
        detalle: error.message
      });
    }
  }
};
