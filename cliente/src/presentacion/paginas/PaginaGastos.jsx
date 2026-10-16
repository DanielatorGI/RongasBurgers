import React from 'react';
import { DollarSign, Home, Droplets, Zap, Loader2 } from 'lucide-react';
import { usarControladorGastos } from '../../aplicacion/controladores/usarControladorGastos';
import ContenedorGrafica from '../componentes/ContenedorGrafica';
import GraficaHistoricoGastos from '../componentes/GraficaHistoricoGastos';

const ICONOS_GASTOS = {
  Sueldos: DollarSign,
  Renta: Home,
  Agua: Droplets,
  Luz: Zap
};

export default function PaginaGastos() {
  const { datosGastos, estaCargando, mensajeError, recargar } = usarControladorGastos();

  if (estaCargando) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-stone-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-naranja-primario" />
        <p className="text-sm font-medium">Cargando control operativo de gastos...</p>
      </div>
    );
  }

  if (mensajeError) {
    return (
      <div className="p-8 bg-alerta-rojoFondo border border-alerta-rojoBorde rounded-3xl text-center max-w-lg mx-auto">
        <p className="text-alerta-rojo font-bold mb-2">Error al cargar gastos</p>
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

  const { gastosOperativos = [], historicoGastos = [] } = datosGastos || {};
  const formatearDinero = (v) => `$${Number(v || 0).toLocaleString('es-MX')}`;

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Resumen de Gastos</h2>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gastosOperativos.map((gasto, i) => {
          const Icono = ICONOS_GASTOS[gasto.categoriaGasto] || DollarSign;
          const esAlerta = gasto.tieneAlerta === 1;

          return (
            <article
              key={i}
              className={`rounded-3xl p-6 border shadow-sm transition-all duration-200 ${
                esAlerta
                  ? 'bg-rose-50/50 border-rose-200 shadow-rose-100'
                  : 'bg-crema-tarjeta border-crema-borde'
              }`}
            >
              <header className="flex items-start justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {gasto.categoriaGasto}
                </p>
                <div className={`p-2.5 rounded-2xl ${esAlerta ? 'bg-rose-100 text-rose-600' : 'bg-stone-100 text-stone-600'}`}>
                  <Icono className="w-5 h-5" />
                </div>
              </header>

              <div className="mt-2">
                <h3 className={`text-2xl sm:text-3xl font-extrabold ${esAlerta ? 'text-rose-600' : 'text-naranja-primario'}`}>
                  {formatearDinero(gasto.monto)}
                </h3>
                <p className={`text-xs mt-1.5 font-bold ${esAlerta ? 'text-rose-600' : 'text-stone-500'}`}>
                  {gasto.comparativaTexto}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      <ContenedorGrafica
        titulo="Histórico de Gastos"
        subtitulo="Desglose de gastos en los últimos meses de operación"
      >
        <GraficaHistoricoGastos datos={historicoGastos} />
      </ContenedorGrafica>
    </div>
  );
}
