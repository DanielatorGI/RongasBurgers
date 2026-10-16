import React, { useState, useEffect } from 'react';
import PaginaBienvenida from './presentacion/paginas/PaginaBienvenida';
import PaginaLogin from './presentacion/paginas/PaginaLogin';
import DisenoPrincipal from './presentacion/componentes/DisenoPrincipal';
import { servicioAutenticacion } from './dominio/servicios/servicioAutenticacion';

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [vistaActual, setVistaActual] = useState('bienvenida');
  const [moduloActivo, setModuloActivo] = useState('inicio');

  useEffect(() => {
    const sesionActiva = servicioAutenticacion.obtenerSesionActiva();
    if (sesionActiva) {
      setUsuarioAutenticado(sesionActiva);
    }
  }, []);

  const manejarAutenticacionExitosa = (sucursal) => {
    setUsuarioAutenticado(sucursal);
    setModuloActivo('inicio');
  };

  const manejarCerrarSesion = () => {
    servicioAutenticacion.cerrarSesion();
    setUsuarioAutenticado(null);
    setVistaActual('bienvenida');
  };

  if (!usuarioAutenticado) {
    if (vistaActual === 'login') {
      return (
        <PaginaLogin
          onAutenticacionExitosa={manejarAutenticacionExitosa}
          onVolverBienvenida={() => setVistaActual('bienvenida')}
        />
      );
    }
    return <PaginaBienvenida onIniciarSesion={() => setVistaActual('login')} />;
  }

  return (
    <DisenoPrincipal
      moduloActivo={moduloActivo}
      alCambiarModulo={setModuloActivo}
      alCerrarSesion={manejarCerrarSesion}
      nombreSucursal={usuarioAutenticado.nombre}
    >
      <div className="bg-crema-tarjeta border border-crema-borde rounded-3xl p-8 shadow-sm text-center">
        <div className="inline-block px-3 py-1 bg-amber-500/10 text-naranja-oscuro font-bold rounded-full text-xs uppercase mb-3">
          Módulo: {moduloActivo.toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-stone-900">
          Bienvenido a la sucursal {usuarioAutenticado.nombre}
        </h2>
        <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
          El panel lateral colapsable y la cabecera superior se encuentran integrados y listos para los módulos analíticos.
        </p>
      </div>
    </DisenoPrincipal>
  );
}
