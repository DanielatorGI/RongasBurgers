import React, { useState, useEffect } from 'react';
import PaginaBienvenida from './presentacion/paginas/PaginaBienvenida';
import PaginaLogin from './presentacion/paginas/PaginaLogin';
import PaginaInicio from './presentacion/paginas/PaginaInicio';
import PaginaVentas from './presentacion/paginas/PaginaVentas';
import PaginaGastos from './presentacion/paginas/PaginaGastos';
import PaginaMenu from './presentacion/paginas/PaginaMenu';
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
      {moduloActivo === 'inicio' && <PaginaInicio />}
      {moduloActivo === 'ventas' && <PaginaVentas />}
      {moduloActivo === 'gastos' && <PaginaGastos />}
      {moduloActivo === 'menu' && <PaginaMenu />}
    </DisenoPrincipal>
  );
}
