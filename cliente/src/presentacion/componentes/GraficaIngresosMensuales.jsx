import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function GraficaIngresosMensuales({ datos = [] }) {
  const formatearMoneda = (valor) => `$${Number(valor).toLocaleString('es-MX')}`;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={datos} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="degradadoNaranja" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="mesNombre"
            stroke="#A8A29E"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#A8A29E"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip
            formatter={(valor) => [formatearMoneda(valor), 'Ingresos']}
            contentStyle={{
              backgroundColor: '#1C1917',
              borderRadius: '12px',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
            }}
          />
          <Area
            type="monotone"
            dataKey="montoIngresos"
            stroke="#D97706"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#degradadoNaranja)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
