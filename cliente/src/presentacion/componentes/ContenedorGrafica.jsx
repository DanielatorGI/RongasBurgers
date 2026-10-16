import React from 'react';

export default function ContenedorGrafica({
  titulo,
  subtitulo,
  accionesSuperiores = null,
  children
}) {
  return (
    <section className="bg-crema-tarjeta border border-crema-borde rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-bold text-stone-900">{titulo}</h3>
          {subtitulo && <p className="text-xs text-stone-500 mt-0.5">{subtitulo}</p>}
        </div>
        {accionesSuperiores && <div>{accionesSuperiores}</div>}
      </header>

      <div className="w-full flex-1 min-h-[260px] flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}
