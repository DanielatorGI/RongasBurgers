import { useState, useEffect, useCallback } from 'react';
import { servicioVentas } from '../../dominio/servicios/servicioVentas';

export function usarControladorVentas() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('hoy');
  const [datosVentas, setDatosVentas] = useState(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');

  const cargarVentas = useCallback(async (periodo, forzar = false) => {
    setEstaCargando(true);
    setMensajeError('');
    try {
      const datos = await servicioVentas.obtenerDatosVentas(periodo, forzar);
      setDatosVentas(datos);
    } catch (error) {
      setMensajeError(error.message || 'Error al cargar pulso operativo de ventas.');
    } finally {
      setEstaCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarVentas(periodoSeleccionado);
  }, [periodoSeleccionado, cargarVentas]);

  const cambiarPeriodo = (nuevoPeriodo) => {
    setPeriodoSeleccionado(nuevoPeriodo);
  };

  return {
    periodoSeleccionado,
    datosVentas,
    estaCargando,
    mensajeError,
    cambiarPeriodo,
    recargar: () => cargarVentas(periodoSeleccionado, true)
  };
}
