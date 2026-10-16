import React, { useState } from 'react';
import PaginaBienvenida from './presentacion/paginas/PaginaBienvenida';

export default function App() {
  const [vistaActual, setVistaActual] = useState('bienvenida');

  return (
    <div className="min-h-screen bg-crema-fondo text-carbon-texto">
      {vistaActual === 'bienvenida' && (
        <PaginaBienvenida onIniciarSesion={() => setVistaActual('login')} />
      )}
      {vistaActual === 'login' && (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-carbon-texto">Inicio de Sesión</h2>
          <p className="mt-2 text-stone-600">Módulo en construcción para la Fase 3.</p>
          <button
            onClick={() => setVistaActual('bienvenida')}
            className="mt-4 px-4 py-2 bg-naranja-primario text-white font-semibold rounded-lg hover:bg-naranja-oscuro transition"
          >
            Volver a Bienvenida
          </button>
        </div>
      )}
    </div>
  );
}
