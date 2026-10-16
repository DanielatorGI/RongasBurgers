import React, { useState, useEffect } from 'react';
import PaginaBienvenida from './presentacion/paginas/PaginaBienvenida';
import PaginaLogin from './presentacion/paginas/PaginaLogin';
import { servicioAutenticacion } from './dominio/servicios/servicioAutenticacion';

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [vistaActual, setVistaActual] = useState('bienvenida');

  useEffect(() => {
    const sesionActiva = servicioAutenticacion.obtenerSesionActiva();
    if (sesionActiva) {
      setUsuarioAutenticado(sesionActiva);
      setVistaActual('inicio');
    }
  }, []);

  const manejarAutenticacionExitosa = (sucursal) => {
    setUsuarioAutenticado(sucursal);
    setVistaActual('inicio');
  };

  const manejarCerrarSesion = () => {
    servicioAutenticacion.cerrarSesion();
    setUsuarioAutenticado(null);
    setVistaActual('bienvenida');
  };

  return (
    <div className="min-h-screen bg-crema-fondo text-carbon-texto">
      {!usuarioAutenticado && vistaActual === 'bienvenida' && (
        <PaginaBienvenida onIniciarSesion={() => setVistaActual('login')} />
      )}

      {!usuarioAutenticado && vistaActual === 'login' && (
        <PaginaLogin
          onAutenticacionExitosa={manejarAutenticacionExitosa}
          onVolverBienvenida={() => setVistaActual('bienvenida')}
        />
      )}

      {usuarioAutenticado && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl max-w-md w-full">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase mb-3">
              Sesión Activa
            </div>
            <h2 className="text-2xl font-bold text-stone-900">{usuarioAutenticado.nombre}</h2>
            <p className="text-sm text-stone-500 mt-1">{usuarioAutenticado.correo}</p>
            <div className="mt-4 p-3 bg-stone-50 rounded-xl text-xs text-stone-600 font-mono break-all text-left">
              <strong>Clave API Activa:</strong> {usuarioAutenticado.claveApi}
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <p className="text-xs text-stone-400">
                Módulo de autenticación completado. Listo para Layout global (Fase 4).
              </p>
              <button
                type="button"
                onClick={manejarCerrarSesion}
                className="mt-3 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-xl transition"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
