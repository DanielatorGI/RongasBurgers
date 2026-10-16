import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts';

export default function GraficaPicosHora({ datos = [] }) {
  const formatearMoneda = (v) => `$${Number(v).toLocaleString('es-MX')}`;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={datos} margin={{ top: 25, right: 15, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="horaTexto"
            stroke="#A8A29E"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#A8A29E"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-crema-tarjeta border border-crema-borde p-3 rounded-2xl shadow-xl text-xs">
                    <p className="font-extrabold text-stone-900 mb-2">{label}</p>
                    <div className="space-y-1">
                      <p className="text-stone-500 flex items-center justify-between gap-4">
                        <span>Semana anterior:</span>
                        <strong className="text-stone-800">{formatearMoneda(payload[1]?.value)}</strong>
                      </p>
                      <p className="text-naranja-oscuro font-bold flex items-center justify-between gap-4">
                        <span>Hoy:</span>
                        <strong>{formatearMoneda(payload[0]?.value)}</strong>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine
            x="1pm"
            stroke="#E11D48"
            strokeDasharray="3 3"
            label={{ value: 'Rush 🔥', position: 'insideTopLeft', fill: '#E11D48', fontSize: 11, fontWeight: 'bold' }}
          />
          <ReferenceLine
            x="7pm"
            stroke="#E11D48"
            strokeDasharray="3 3"
            label={{ value: 'Rush 🔥', position: 'insideTopLeft', fill: '#E11D48', fontSize: 11, fontWeight: 'bold' }}
          />
          <Line
            type="monotone"
            dataKey="montoHoy"
            stroke="#EA580C"
            strokeWidth={3}
            dot={{ r: 3, fill: '#EA580C' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="montoSemanaAnterior"
            stroke="#D6D3D1"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
