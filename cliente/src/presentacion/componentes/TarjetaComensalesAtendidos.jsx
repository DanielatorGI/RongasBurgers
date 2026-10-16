import React from 'react';
import { Utensils } from 'lucide-react';

export default function TarjetaComensalesAtendidos({
  totalComensales = 138,
  promedioPorMesa = 2.9,
  picoMediodia = 62,
  picoNoche = 48,
  valleTarde = 28
}) {
  return (
    <article className="bg-crema-tarjeta border border-crema-borde rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <header className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Comensales atendidos
          </p>
          <h3 className="text-3xl font-extrabold text-stone-900 mt-1">
            {totalComensales}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Promedio {promedioPorMesa} personas por mesa
          </p>
        </div>
        <div className="p-2.5 rounded-2xl bg-amber-500/10 text-naranja-primario">
          <Utensils className="w-5 h-5" />
        </div>
      </header>

      <footer className="mt-5 grid grid-cols-3 gap-2">
        <div className="bg-crema-suave/80 p-2.5 rounded-2xl text-center">
          <p className="text-base font-extrabold text-stone-900">{picoMediodia}</p>
          <p className="text-[10px] text-stone-500 font-semibold uppercase mt-0.5">Pico mediodía</p>
        </div>

        <div className="bg-crema-suave/80 p-2.5 rounded-2xl text-center">
          <p className="text-base font-extrabold text-stone-900">{picoNoche}</p>
          <p className="text-[10px] text-stone-500 font-semibold uppercase mt-0.5">Pico noche</p>
        </div>

        <div className="bg-crema-suave/80 p-2.5 rounded-2xl text-center">
          <p className="text-base font-extrabold text-stone-900">{valleTarde}</p>
          <p className="text-[10px] text-stone-500 font-semibold uppercase mt-0.5">Valle tarde</p>
        </div>
      </footer>
    </article>
  );
}
