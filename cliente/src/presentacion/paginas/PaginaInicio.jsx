import React from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContenedorGrafica
              titulo="Ingresos Mensuales"
              subtitulo="Evolución de ingresos durante el año"
            >
              <GraficaIngresosMensuales datos={ingresosMensuales} />
            </ContenedorGrafica>

            <ContenedorGrafica
              titulo="Ventas por Categoría"
              subtitulo="Comparativa de ventas por categoría"
            >
              <GraficaVentasCategoria datos={ventasPorCategoria} />
            </ContenedorGrafica>
          </div>
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
