import { servicioAnaliticaVentas } from '../../dominio/servicios/servicioAnaliticaVentas.js';

export const controladorVentas = {
  obtenerVentas(req, res) {
    try {
      const sucursalId = req.sucursalAutenticada?.id;
      const { periodo = 'hoy' } = req.query;
      const datos = servicioAnaliticaVentas.obtenerDatosVentas(sucursalId, periodo);

      if (!datos) {
        return res.status(404).json({
          exito: false,
          mensaje: `No se encontraron registros de ventas para el periodo "${periodo}".`
        });
      }

      return res.status(200).json({
        exito: true,
        sucursal: req.sucursalAutenticada.nombre,
        datos
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: 'Error al consultar el pulso operativo de ventas.',
        detalle: error.message
      });
    }
  }
};
