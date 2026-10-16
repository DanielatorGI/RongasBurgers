import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function GraficaHistoricoGastos({ datos = [] }) {
  const formatearMoneda = (v) => `$${Number(v || 0).toLocaleString('es-MX')}`;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={datos} margin={{ top: 15, right: 10, left: 0, bottom: 0 }}>
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
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const registro = payload[0].payload;
                return (
                  <div className="bg-stone-900 border border-stone-800 p-3 rounded-2xl shadow-xl text-xs text-white">
                    <p className="font-extrabold text-amber-400 mb-2">{label} {registro.anio}</p>
                    <div className="space-y-1 text-stone-300">
                      <p className="flex justify-between gap-4">
                        <span>Nómina:</span>
                        <strong className="text-white">{formatearMoneda(registro.montoNomina)}</strong>
                      </p>
                      <p className="flex justify-between gap-4">
                        <span>Renta:</span>
                        <strong className="text-white">{formatearMoneda(registro.montoRenta)}</strong>
                      </p>
                      <p className="flex justify-between gap-4">
                        <span>Servicios:</span>
                        <strong className="text-white">{formatearMoneda(registro.montoServicios)}</strong>
                      </p>
                      <p className="flex justify-between gap-4 pt-1.5 border-t border-stone-800 text-naranja-primario font-bold">
                        <span>Total Gasto:</span>
                        <span>{formatearMoneda(registro.montoTotal)}</span>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="montoTotal"
            fill="#231811"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
