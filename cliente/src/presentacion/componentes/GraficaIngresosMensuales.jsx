import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

function TooltipIngresosPersonalizado({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const valor = payload[0].value;
  return (
    <div className="bg-stone-900/95 backdrop-blur-md border border-stone-700/80 p-3 rounded-2xl shadow-xl text-left">
      <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{label}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-white font-extrabold text-base font-mono">
          ${Number(valor).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
        </span>
      </div>
      <p className="text-[10px] text-stone-400 mt-0.5">Ingresos Totales del Mes</p>
    </div>
  );
}

export default function GraficaIngresosMensuales({ datos = [] }) {
  return (
    <div className="w-full h-72 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={datos} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="degradadoIngresosRongas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.5} />
              <stop offset="60%" stopColor="#D97706" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#D97706" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" vertical={false} />
          <XAxis
            dataKey="mesNombre"
            stroke="#78716C"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            stroke="#78716C"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dx={-5}
            tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
          />
          <Tooltip content={<TooltipIngresosPersonalizado />} />
          <Area
            type="monotone"
            dataKey="montoIngresos"
            stroke="#D97706"
            strokeWidth={3.5}
            fillOpacity={1}
            fill="url(#degradadoIngresosRongas)"
            dot={{ r: 4.5, fill: '#FFFFFF', stroke: '#D97706', strokeWidth: 2 }}
            activeDot={{ r: 7, fill: '#F59E0B', stroke: '#1C1917', strokeWidth: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
