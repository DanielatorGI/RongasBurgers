import React from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { obtenerImagenSucursal } from '../../configuracion/rutasImagenes';

export default function CabeceraSuperior({
  tituloModulo = 'Panel de Control',
  nombreSucursal = 'Sucursal',
  estaExpandido = true,
  alAlternarPanel
}) {
  const imagenSucursal = obtenerImagenSucursal(nombreSucursal);

  return (
    <header className="h-16 px-6 bg-crema-tarjeta border-b border-crema-borde flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={alAlternarPanel}
          title={estaExpandido ? 'Colapsar panel lateral' : 'Expandir panel lateral'}
          className="p-2 rounded-xl text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition focus:outline-none"
        >
          {estaExpandido ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </button>

        <h1 className="text-xl font-bold text-stone-900 tracking-tight">
          {tituloModulo}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100/90 border border-stone-200/80 text-stone-700 text-xs font-semibold">
          <img
            src={imagenSucursal}
            alt={nombreSucursal}
            className="w-5 h-5 rounded-full object-cover border border-amber-500/40"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span>{nombreSucursal}</span>
        </div>
      </div>
    </header>
  );
}
