import { useState } from 'react';

export function usarControladorLogin() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [estaCargando, setEstaCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const alternarVisibilidadContrasena = () => {
    setMostrarContrasena((estadoPrevio) => !estadoPrevio);
  };

  const limpiarFormulario = () => {
    setCorreo('');
    setContrasena('');
    setMensajeError('');
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
    setEstaCargando,
    mensajeError,
    setMensajeError,
    limpiarFormulario
  };
}
