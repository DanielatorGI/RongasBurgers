import React from 'react';

export default function InsigniaEstado({
  tipo = 'neutral',
  texto,
  icono: IconoComponente
}) {
  const estilosPorTipo = {
    exito: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    alerta: 'bg-rose-50 text-rose-700 border-rose-200',
    advertencia: 'bg-amber-50 text-amber-800 border-amber-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    neutral: 'bg-stone-100 text-stone-700 border-stone-200'
  };

  const estiloSeleccionado = estilosPorTipo[tipo] || estilosPorTipo.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${estiloSeleccionado}`}
    >
      {IconoComponente && <IconoComponente className="w-3.5 h-3.5" />}
      <span>{texto}</span>
    </span>
  );
}
