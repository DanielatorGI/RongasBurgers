import React from 'react';
import { Loader2 } from 'lucide-react';
import { usarControladorMenu } from '../../aplicacion/controladores/usarControladorMenu';
import TarjetaPlatilloMenu from '../componentes/TarjetaPlatilloMenu';

export default function PaginaMenu() {
  const {
    datosMenu,
    platillosExpandidos,
    estaCargando,
    mensajeError,
    alternarAcordeon,
    recargar
  } = usarControladorMenu();

  if (estaCargando) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-stone-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-naranja-primario" />
        <p className="text-sm font-medium">Cargando desglose de menú y recetas...</p>
      </div>
    );
  }

  if (mensajeError) {
    return (
      <div className="p-8 bg-alerta-rojoFondo border border-alerta-rojoBorde rounded-3xl text-center max-w-lg mx-auto">
        <p className="text-alerta-rojo font-bold mb-2">Error al cargar menú</p>
        <p className="text-stone-600 text-sm mb-4">{mensajeError}</p>
        <button
          type="button"
          onClick={recargar}
          className="px-4 py-2 bg-alerta-rojo text-white rounded-xl text-xs font-bold"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const platillos = datosMenu?.platillos || [];

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Gestión de Menú</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Análisis de costos e ingredientes por platillo
          </p>
        </div>
      </header>

      <section className="space-y-4">
        {platillos.map((platillo) => (
          <TarjetaPlatilloMenu
            key={platillo.id}
            platillo={platillo}
            estaExpandido={Boolean(platillosExpandidos[platillo.id])}
            alAlternar={() => alternarAcordeon(platillo.id)}
          />
        ))}
      </section>
    </div>
  );
}
