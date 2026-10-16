import React from 'react';
import { Loader2, RefreshCw, TrendingUp, BarChart3 } from 'lucide-react';
import { usarControladorInicio } from '../../aplicacion/controladores/usarControladorInicio';
import ContenedorGrafica from '../componentes/ContenedorGrafica';
import GraficaIngresosMensuales from '../componentes/GraficaIngresosMensuales';
import GraficaVentasCategoria from '../componentes/GraficaVentasCategoria';
import TarjetaPlatilloDestacado from '../componentes/TarjetaPlatilloDestacado';

export default function PaginaInicio() {
  const { datosInicio, estaCargando, mensajeError, recargar } = usarControladorInicio();

  if (estaCargando) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-stone-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-naranja-primario" />
        <p className="text-sm font-medium">Cargando métricas de la sucursal...</p>
      </div>
    );
  }

  if (mensajeError) {
    return (
      <div className="p-8 bg-alerta-rojoFondo border border-alerta-rojoBorde rounded-3xl text-center max-w-lg mx-auto">
        <p className="text-alerta-rojo font-bold text-base mb-2">Error al consultar datos</p>
        <p className="text-stone-600 text-sm mb-5">{mensajeError}</p>
        <button
          type="button"
          onClick={recargar}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-alerta-rojo text-white rounded-xl font-bold text-xs hover:bg-rose-700 transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reintentar</span>
        </button>
      </div>
    );
  }

  const { ingresosMensuales = [], ventasPorCategoria = [], platillosDestacados = [] } = datosInicio || {};

  const totalIngresos = ingresosMensuales.reduce((acc, m) => acc + (Number(m.montoIngresos) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ContenedorGrafica
            titulo="Ingresos Mensuales"
            subtitulo="Evolución y tendencia de facturación durante el periodo"
            accionesSuperiores={
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-naranja-primario" />
                <span>Total: ${Math.round(totalIngresos).toLocaleString('es-MX')}</span>
              </div>
            }
          >
            <GraficaIngresosMensuales datos={ingresosMensuales} />
          </ContenedorGrafica>

          <ContenedorGrafica
            titulo="Ventas por Categoría"
            subtitulo="Distribución de ingresos generados por tipo de producto"
            accionesSuperiores={
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
                <BarChart3 className="w-3.5 h-3.5 text-stone-500" />
                <span>{ventasPorCategoria.length} Categorías</span>
              </div>
            }
          >
            <GraficaVentasCategoria datos={ventasPorCategoria} />
          </ContenedorGrafica>
        </div>

        <aside className="space-y-4">
          <header className="px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500">
              Matriz de Menú Destacada
            </h3>
          </header>

          <div className="space-y-4">
            {platillosDestacados.map((platillo) => (
              <TarjetaPlatilloDestacado key={platillo.id} platillo={platillo} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
