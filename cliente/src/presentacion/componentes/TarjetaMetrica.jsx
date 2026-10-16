import React from 'react';

export default function TarjetaMetrica({
  titulo,
  valorPrincipal,
  descripcion,
  icono: IconoComponente,
  tieneAlerta = false,
  textoAlerta = null,
  insigniaVariacion = null
}) {
  return (
    <article
      className={`rounded-2xl p-5 border transition-all duration-200 ${
        tieneAlerta
          ? 'bg-alerta-rojoFondo/40 border-alerta-rojoBorde shadow-sm'
          : 'bg-crema-tarjeta border-crema-borde shadow-sm hover:shadow-md'
      }`}
    >
      <header className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            {titulo}
          </p>
          <h3 className={`text-2xl font-bold mt-1 ${tieneAlerta ? 'text-alerta-rojo' : 'text-stone-900'}`}>
            {valorPrincipal}
          </h3>
        </div>
        {IconoComponente && (
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-naranja-primario">
            <IconoComponente className="w-5 h-5" />
          </div>
        )}
      </header>

      {descripcion && (
        <p className="text-xs text-stone-500 mt-2">
          {descripcion}
        </p>
      )}

      {insigniaVariacion && (
        <div className="mt-3">
          {insigniaVariacion}
        </div>
      )}

      {tieneAlerta && textoAlerta && (
        <footer className="mt-3 py-1.5 px-3 rounded-lg bg-alerta-rojo text-white text-xs font-medium flex items-center gap-1.5">
          <span>{textoAlerta}</span>
        </footer>
      )}
    </article>
  );
}
