import React from 'react';
import { Users } from 'lucide-react';

export default function TarjetaMesasAtendidas({ mesasAtendidas = 47, capacidadEstimada = 50 }) {
  const totalSegmentos = 10;
  const proporcion = Math.min(mesasAtendidas / (capacidadEstimada || 50), 1);
  const segmentosLlenos = Math.round(proporcion * totalSegmentos);

  return (
    <article className="bg-crema-tarjeta border border-crema-borde rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <header className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Mesas atendidas
          </p>
          <h3 className="text-3xl font-extrabold text-stone-900 mt-1">
            {mesasAtendidas}
          </h3>
          <p className="text-xs text-stone-500 mt-1">Turnos completados hoy</p>
        </div>
        <div className="p-2.5 rounded-2xl bg-amber-500/10 text-naranja-primario">
          <Users className="w-5 h-5" />
        </div>
      </header>

      <footer className="mt-6">
        <div className="flex gap-1.5 h-2.5 w-full">
          {Array.from({ length: totalSegmentos }).map((_, indice) => (
            <div
              key={indice}
              className={`flex-1 rounded-full transition-all duration-300 ${
                indice < segmentosLlenos ? 'bg-naranja-primario' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>
        <p className="text-[11px] text-stone-500 font-medium mt-2">
          Capacidad estimada: ~{capacidadEstimada} mesas/día
        </p>
      </footer>
    </article>
  );
}
