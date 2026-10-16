import React from 'react';
import { obtenerImagenDestacada, RUTAS_IMAGENES } from '../../configuracion/rutasImagenes';

export default function TarjetaPlatilloDestacado({ platillo }) {
  if (!platillo) return null;

  const esEstrella = platillo.tipoDestacado === 'estrella';
  const rutaImagen = obtenerImagenDestacada(platillo.tipoDestacado, platillo.imagenUrl);

  return (
    <article className="bg-crema-tarjeta border border-crema-borde rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-44 bg-stone-900 overflow-hidden">
        <img
          src={rutaImagen}
          alt={platillo.nombre}
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = RUTAS_IMAGENES.banners.bienvenidaHero;
          }}
        />

        <div className="absolute top-3.5 left-3.5">
          {esEstrella ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-md">
              <span>⭐</span>
              <span>Plato Estrella</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-amber-200 text-xs font-bold shadow-md">
              <span>🐶</span>
              <span>Plato Perro</span>
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h4 className="text-base font-bold text-stone-900">{platillo.nombre}</h4>
        <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
          {platillo.descripcion}
        </p>

        <div className="mt-4 pt-3 border-t border-crema-borde flex items-center justify-between text-xs">
          <span className="text-stone-500 font-medium">Ventas este mes:</span>
          <span className="font-extrabold text-naranja-oscuro text-sm">
            {Number(platillo.unidadesVendidasMes).toLocaleString('es-MX')} unidades
          </span>
        </div>
      </div>
    </article>
  );
}
