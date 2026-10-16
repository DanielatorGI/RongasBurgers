import { useState, useEffect, useCallback } from 'react';
import { servicioInicio } from '../../dominio/servicios/servicioInicio';

export function usarControladorInicio() {
  const [datosInicio, setDatosInicio] = useState(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');

  const cargarDatos = useCallback(async (forzar = false) => {
    setEstaCargando(true);
    setMensajeError('');
    try {
      const datos = await servicioInicio.obtenerDatosInicio(forzar);
      setDatosInicio(datos);
    } catch (error) {
      setMensajeError(error.message || 'Error al cargar métricas de inicio.');
    } finally {
      setEstaCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return {
    datosInicio,
    estaCargando,
    mensajeError,
    recargar: () => cargarDatos(true)
  };
}
