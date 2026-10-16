import { useState, useEffect, useCallback } from 'react';
import { servicioMenu } from '../../dominio/servicios/servicioMenu';

export function usarControladorMenu() {
  const [datosMenu, setDatosMenu] = useState(null);
  const [platillosExpandidos, setPlatillosExpandidos] = useState({});
  const [estaCargando, setEstaCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');

  const cargarMenu = useCallback(async (forzar = false) => {
    setEstaCargando(true);
    setMensajeError('');
    try {
      const datos = await servicioMenu.obtenerDatosMenu(forzar);
      setDatosMenu(datos);
      if (datos.platillos?.length > 0) {
        setPlatillosExpandidos({ [datos.platillos[0].id]: true });
      }
    } catch (error) {
      setMensajeError(error.message || 'Error al cargar el menú y recetas.');
    } finally {
      setEstaCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarMenu();
  }, [cargarMenu]);

  const alternarAcordeon = (platilloId) => {
    setPlatillosExpandidos((prev) => ({
      ...prev,
      [platilloId]: !prev[platilloId]
    }));
  };

  return {
    datosMenu,
    platillosExpandidos,
    estaCargando,
    mensajeError,
    alternarAcordeon,
    recargar: () => cargarMenu(true)
  };
}
