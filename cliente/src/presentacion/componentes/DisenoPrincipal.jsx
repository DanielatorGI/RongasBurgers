import React, { useState } from 'react';
import PanelLateral from './PanelLateral';
import CabeceraSuperior from './CabeceraSuperior';

const TITULOS_MODULOS = {
  inicio: 'Panel de Control',
  ventas: 'Ventas',
  gastos: 'Gastos',
  menu: 'Gestión de Menú'
};

export default function DisenoPrincipal({
  moduloActivo = 'inicio',
  alCambiarModulo,
  alCerrarSesion,
  nombreSucursal = 'Sucursal',
  children
}) {
  const [estaExpandido, setEstaExpandido] = useState(true);

  const alternarPanel = () => {
    setEstaExpandido((estadoPrevio) => !estadoPrevio);
  };

  const tituloActual = TITULOS_MODULOS[moduloActivo] || 'Panel de Control';

  return (
    <div className="min-h-screen bg-crema-fondo flex">
      <PanelLateral
        estaExpandido={estaExpandido}
        moduloActivo={moduloActivo}
        alCambiarModulo={alCambiarModulo}
        alCerrarSesion={alCerrarSesion}
        nombreSucursal={nombreSucursal}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <CabeceraSuperior
          tituloModulo={tituloActual}
          nombreSucursal={nombreSucursal}
          estaExpandido={estaExpandido}
          alAlternarPanel={alternarPanel}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
