import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

const COLORES_CATEGORIA = ['#F59E0B', '#D97706', '#EA580C', '#C2410C', '#78350F'];

function TooltipCategoriaPersonalizado({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  const unidades = item.payload.unidadesVendidas || 0;
  return (
    <div className="bg-stone-900/95 backdrop-blur-md border border-stone-700/80 p-3 rounded-2xl shadow-xl text-left">
      <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{label}</p>
      <p className="text-white font-extrabold text-base font-mono mt-1">
        ${Number(item.value).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
      </p>
      <div className="mt-1 flex items-center gap-1.5">
        <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold">
          {Number(unidades).toLocaleString('es-MX')} unidades vendidas
        </span>
      </div>
    </div>
  );
}

export default function GraficaVentasCategoria({ datos = [] }) {
  return (
    <div className="w-full h-72 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={datos}
          margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" vertical={false} />
          <XAxis
            dataKey="categoria"
            stroke="#78716C"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={8}
            interval={0}
          />
          <YAxis
            stroke="#78716C"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dx={-5}
            tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
          />
          <Tooltip
            content={<TooltipCategoriaPersonalizado />}
            cursor={{ fill: 'rgba(245, 158, 11, 0.06)', radius: 10 }}
          />
          <Bar
            dataKey="montoVentas"
            radius={[10, 10, 0, 0]}
            maxBarSize={55}
          >
            {datos.map((entry, index) => (
              <Cell
                key={`celda-cat-${entry.categoria || index}`}
                fill={COLORES_CATEGORIA[index % COLORES_CATEGORIA.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
