import { useState, useEffect } from 'react';
import { servicioAutenticacion } from '../../dominio/servicios/servicioAutenticacion';

export function usarControladorLogin() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [estaCargando, setEstaCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const correoGuardado = servicioAutenticacion.obtenerCorreoRecordado();
    if (correoGuardado) {
      setCorreo(correoGuardado);
      setRecordarme(true);
    }
  }, []);

  const alternarVisibilidadContrasena = () => {
    setMostrarContrasena((estadoPrevio) => !estadoPrevio);
  };

  const seleccionarCredencialDemo = (sucursalKey) => {
    setMensajeError('');
    if (sucursalKey === 'campestre') {
      setCorreo('campestre@rongasburgers.com');
      setContrasena('Campestre2026*');
    } else if (sucursalKey === 'centromax') {
      setCorreo('centromax@rongasburgers.com');
      setContrasena('CentroMax2026*');
    } else if (sucursalKey === 'coecillo') {
      setCorreo('coecillo@rongasburgers.com');
      setContrasena('Coecillo2026*');
    }
  };

  const procesarInicioSesion = async (evento, onExito) => {
    if (evento) evento.preventDefault();
    setMensajeError('');

    if (!correo.trim() || !contrasena) {
      setMensajeError('Por favor ingresa tu correo electronico y contrasena.');
      return;
    }

    setEstaCargando(true);
    try {
      const sucursal = await servicioAutenticacion.iniciarSesion(correo.trim(), contrasena);
      servicioAutenticacion.guardarSesion(sucursal, recordarme);
      if (typeof onExito === 'function') {
        onExito(sucursal);
      }
    } catch (error) {
      setMensajeError(error.message || 'Error al conectar con el servidor.');
    } finally {
      setEstaCargando(false);
    }
  };

  return {
    correo,
    setCorreo,
    contrasena,
    setContrasena,
    recordarme,
    setRecordarme,
    mostrarContrasena,
    alternarVisibilidadContrasena,
    estaCargando,
    mensajeError,
    procesarInicioSesion,
    seleccionarCredencialDemo
  };
}
