import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function GraficaVentasCategoria({ datos = [] }) {
  const formatearMoneda = (valor) => `$${Number(valor).toLocaleString('es-MX')}`;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={datos} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <XAxis
            dataKey="categoria"
            stroke="#A8A29E"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            interval={0}
            tickFormatter={(cat) => (cat.length > 9 ? `${cat.substring(0, 8)}...` : cat)}
          />
          <YAxis
            stroke="#A8A29E"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip
            formatter={(valor, nombre, item) => [
              `${formatearMoneda(valor)} (${item.payload.unidadesVendidas} uds)`,
              'Ventas'
            ]}
            contentStyle={{
              backgroundColor: '#1C1917',
              borderRadius: '12px',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
            }}
          />
          <Bar
            dataKey="montoVentas"
            fill="#E6953B"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
