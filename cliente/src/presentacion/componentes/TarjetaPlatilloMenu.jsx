import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { obtenerImagenPlatillo, RUTAS_IMAGENES } from '../../configuracion/rutasImagenes';

export default function TarjetaPlatilloMenu({ platillo, estaExpandido, alAlternar }) {
  if (!platillo) return null;

  const formatearDinero = (v) => `$${Number(v || 0).toFixed(2)}`;
  const insumos = platillo.insumos || [];
  const rutaImagen = obtenerImagenPlatillo(platillo.nombre, platillo.imagenUrl);

  return (
    <article className="bg-crema-tarjeta border border-crema-borde rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="w-full sm:w-36 h-32 rounded-2xl overflow-hidden bg-stone-900 flex-shrink-0">
          <img
            src={rutaImagen}
            alt={platillo.nombre}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = RUTAS_IMAGENES.banners.bienvenidaHero;
            }}
          />
        </div>

        <div className="flex-1 min-w-0 w-full">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-stone-900">{platillo.nombre}</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {platillo.descripcion}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-2xl font-extrabold text-stone-900">
                ${Math.round(platillo.precioVenta)}
              </span>
              <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Precio de Venta
              </p>
            </div>
          </header>

          <div className="mt-4">
            <button
              type="button"
              onClick={alAlternar}
              className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                estaExpandido
                  ? 'bg-amber-500/10 border-amber-300'
                  : 'bg-crema-suave/80 border-crema-borde hover:bg-crema-suave'
              }`}
            >
              <span className="font-semibold text-stone-800">Desglose de Costos (Receta)</span>
              <div className="flex items-center gap-3">
                <span>
                  Costo Total:{' '}
                  <strong className="text-rose-600 font-bold">${Math.round(platillo.costoTotal)}</strong>
                </span>
                <span>
                  Margen:{' '}
                  <strong className="text-amber-700 font-bold">{platillo.margenPorcentaje}%</strong>
                </span>
                {estaExpandido ? (
                  <ChevronUp className="w-4 h-4 text-stone-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-600" />
                )}
              </div>
            </button>

            {estaExpandido && (
              <div className="mt-3 p-4 bg-crema-suave/40 rounded-2xl border border-stone-200/80 space-y-2 text-xs">
                {insumos.map((insumo) => (
                  <div key={insumo.id} className="flex items-center justify-between text-stone-600">
                    <span>{insumo.nombreInsumo}</span>
                    <span className="font-mono font-semibold text-stone-800">
                      {formatearDinero(insumo.costoUnitario)}
                    </span>
                  </div>
                ))}

                <div className="pt-2.5 mt-2 border-t border-stone-200 flex items-center justify-between font-bold text-stone-900">
                  <span>Costo Total por Unidad</span>
                  <span className="text-rose-600 font-mono text-sm">
                    {formatearDinero(platillo.costoTotal)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
