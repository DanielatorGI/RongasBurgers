import { useState, useEffect, useCallback } from 'react';
import { servicioGastos } from '../../dominio/servicios/servicioGastos';

export function usarControladorGastos() {
  const [datosGastos, setDatosGastos] = useState(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');

  const cargarGastos = useCallback(async (forzar = false) => {
    setEstaCargando(true);
    setMensajeError('');
    try {
      const datos = await servicioGastos.obtenerDatosGastos(forzar);
      setDatosGastos(datos);
    } catch (error) {
      setMensajeError(error.message || 'Error al cargar gastos operativos.');
    } finally {
      setEstaCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarGastos();
  }, [cargarGastos]);

  return {
    datosGastos,
    estaCargando,
    mensajeError,
    recargar: () => cargarGastos(true)
  };
}
