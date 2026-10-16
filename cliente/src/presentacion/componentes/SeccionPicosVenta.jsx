import React from 'react';
import GraficaPicosHora from './GraficaPicosHora';

export default function SeccionPicosVenta({ picosVentaHora = [], tarjetasHorarias = [] }) {
  return (
    <section className="bg-crema-tarjeta border border-crema-borde rounded-3xl p-6 shadow-sm">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <span>🕒</span>
            <span>Picos de Venta por Hora</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Ventas en pesos hoy vs. mismo día semana anterior — identifica el rush para ajustar turnos
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-stone-600">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-orange-600 rounded-full" /> Hoy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-stone-300 border-b border-dashed" /> Semana anterior
          </span>
        </div>
      </header>

      <GraficaPicosHora datos={picosVentaHora} />

      <footer className="mt-6 pt-5 border-t border-crema-borde grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tarjetasHorarias.map((t, i) => (
          <div key={i} className="p-3.5 rounded-2xl bg-crema-suave/80 text-left">
            <p className="text-xs font-bold text-stone-900">{t.titulo}</p>
            <p className="text-[11px] text-stone-500">{t.horario}</p>
            <p className={`text-sm font-extrabold mt-1.5 ${t.esAlerta ? 'text-amber-800' : 'text-emerald-700'}`}>
              {t.variacion || t.accionRecomendada}
            </p>
          </div>
        ))}
      </footer>
    </section>
  );
}
