import React from 'react';
import { DollarSign, TrendingUp, UtensilsCrossed, CheckCircle2, Loader2 } from 'lucide-react';
import { usarControladorVentas } from '../../aplicacion/controladores/usarControladorVentas';
import TarjetaMetrica from '../componentes/TarjetaMetrica';
import TarjetaMesasAtendidas from '../componentes/TarjetaMesasAtendidas';
import TarjetaComensalesAtendidos from '../componentes/TarjetaComensalesAtendidos';
import SeccionPicosVenta from '../componentes/SeccionPicosVenta';

export default function PaginaVentas() {
  const {
    periodoSeleccionado,
    datosVentas,
    estaCargando,
    mensajeError,
    cambiarPeriodo,
    recargar
  } = usarControladorVentas();

  if (estaCargando) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-stone-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-naranja-primario" />
        <p className="text-sm font-medium">Cargando pulso operativo de ventas...</p>
      </div>
    );
  }

  if (mensajeError) {
    return (
      <div className="p-8 bg-alerta-rojoFondo border border-alerta-rojoBorde rounded-3xl text-center max-w-lg mx-auto">
        <p className="text-alerta-rojo font-bold mb-2">Error al cargar ventas</p>
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

  const { kpis, afluencia, picosVentaHora = [], tarjetasHorarias = [] } = datosVentas || {};
  const formatearDinero = (v) => `$${Number(v || 0).toLocaleString('es-MX')}`;

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Ventas</h2>
          <p className="text-xs text-stone-500 mt-0.5">Resumen de ventas y métricas operativas</p>
        </div>

        <div className="inline-flex p-1 bg-crema-suave rounded-2xl border border-crema-borde">
          {[
            { clave: 'hoy', etiqueta: 'Hoy' },
            { clave: 'semana', etiqueta: 'Esta semana' },
            { clave: 'mes', etiqueta: 'Este mes' }
          ].map((item) => (
            <button
              key={item.clave}
              type="button"
              onClick={() => cambiarPeriodo(item.clave)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                periodoSeleccionado === item.clave
                  ? 'bg-naranja-primario text-stone-950 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {item.etiqueta}
            </button>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TarjetaMetrica
          titulo="Venta Bruta"
          valorPrincipal={formatearDinero(kpis?.ventaBruta)}
          descripcion="Total cobrado hoy"
          icono={DollarSign}
        />
        <TarjetaMetrica
          titulo="Venta Neta"
          valorPrincipal={formatearDinero(kpis?.ventaNeta)}
          descripcion="Después de descuentos e insumos"
          icono={TrendingUp}
        />
        <TarjetaMetrica
          titulo="Ticket Promedio"
          valorPrincipal={formatearDinero(kpis?.ticketPromedio)}
          descripcion="Mínimo objetivo: $180"
          icono={UtensilsCrossed}
          tieneAlerta={kpis?.tieneAlertaTicket}
          textoAlerta={kpis?.mensajeAlertaTicket}
        />
        <TarjetaMetrica
          titulo="vs. Mismo día semana anterior"
          valorPrincipal={`+${kpis?.variacionPorcentualSemanal || 0}%`}
          descripcion="Por encima del martes pasado"
          icono={TrendingUp}
          insigniaVariacion={
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100/80 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hoy vendimos {kpis?.variacionPorcentualSemanal}% más</span>
            </span>
          }
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TarjetaMesasAtendidas
          mesasAtendidas={afluencia?.mesasAtendidas}
          capacidadEstimada={afluencia?.capacidadMesasEstimada}
        />
        <TarjetaComensalesAtendidos
          totalComensales={afluencia?.comensalesAtendidos}
          promedioPorMesa={afluencia?.promedioComensalesPorMesa}
          picoMediodia={afluencia?.picoMediodia}
          picoNoche={afluencia?.picoNoche}
          valleTarde={afluencia?.valleTarde}
        />
      </section>

      <SeccionPicosVenta
        picosVentaHora={picosVentaHora}
        tarjetasHorarias={tarjetasHorarias}
      />
    </div>
  );
}
