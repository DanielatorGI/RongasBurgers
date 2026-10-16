import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  UtensilsCrossed,
  LogOut,
  Store
} from 'lucide-react';
import LogoRongas from './LogoRongas';

const ELEMENTOS_NAVEGACION = [
  { clave: 'inicio', etiqueta: 'Inicio', icono: LayoutDashboard },
  { clave: 'ventas', etiqueta: 'Ventas', icono: TrendingUp },
  { clave: 'gastos', etiqueta: 'Gastos', icono: Receipt },
  { clave: 'menu', etiqueta: 'Menú', icono: UtensilsCrossed }
];

export default function PanelLateral({
  estaExpandido = true,
  moduloActivo = 'inicio',
  alCambiarModulo,
  alCerrarSesion,
  nombreSucursal = 'Sucursal'
}) {
  return (
    <aside
      className={`h-screen bg-crema-tarjeta border-r border-crema-borde flex flex-col justify-between transition-all duration-300 z-30 sticky top-0 ${
        estaExpandido ? 'w-64' : 'w-20'
      }`}
    >
      <div>
        <header className="p-5 border-b border-crema-borde flex items-center justify-between overflow-hidden">
          {estaExpandido ? (
            <LogoRongas tamano="normal" mostrarEslogan={false} />
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-naranja-primario mx-auto">
              <Store className="w-5 h-5" />
            </div>
          )}
        </header>

        <nav className="p-3 space-y-1 mt-4">
          {ELEMENTOS_NAVEGACION.map((item) => {
            const esActivo = moduloActivo === item.clave;
            const Icono = item.icono;

            return (
              <button
                key={item.clave}
                type="button"
                onClick={() => alCambiarModulo(item.clave)}
                title={!estaExpandido ? item.etiqueta : undefined}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                  esActivo
                    ? 'bg-amber-100/70 text-amber-950 shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100/70 hover:text-stone-900'
                } ${!estaExpandido ? 'justify-center' : ''}`}
              >
                <Icono className={`w-5 h-5 flex-shrink-0 ${esActivo ? 'text-naranja-oscuro' : 'text-stone-500'}`} />
                {estaExpandido && <span className="truncate">{item.etiqueta}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <footer className="p-3 border-t border-crema-borde">
        {estaExpandido && (
          <div className="px-3.5 py-2.5 mb-2 bg-stone-100/80 rounded-xl text-left">
            <p className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Sucursal Activa</p>
            <p className="text-xs font-bold text-stone-900 truncate">{nombreSucursal}</p>
          </div>
        )}

        <button
          type="button"
          onClick={alCerrarSesion}
          title={!estaExpandido ? 'Cerrar sesión' : undefined}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-600 hover:bg-rose-50 hover:text-rose-700 transition text-sm font-semibold ${
            !estaExpandido ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {estaExpandido && <span>Cerrar sesión</span>}
        </button>
      </footer>
    </aside>
  );
}
