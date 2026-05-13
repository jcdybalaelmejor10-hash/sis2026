'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type FilterType = 'day' | 'week' | 'month' | 'all';

const dataByFilter = {
  day: [
    { name: '00:00', ingresos: 400 },
    { name: '04:00', ingresos: 300 },
    { name: '08:00', ingresos: 600 },
    { name: '12:00', ingresos: 800 },
    { name: '16:00', ingresos: 700 },
    { name: '20:00', ingresos: 900 },
  ],
  week: [
    { name: 'Lun', ingresos: 4000 },
    { name: 'Mar', ingresos: 3000 },
    { name: 'Mié', ingresos: 5000 },
    { name: 'Jue', ingresos: 4500 },
    { name: 'Vie', ingresos: 6000 },
    { name: 'Sáb', ingresos: 5500 },
    { name: 'Dom', ingresos: 4000 },
  ],
  month: [
    { name: 'Sem 1', ingresos: 12000 },
    { name: 'Sem 2', ingresos: 15000 },
    { name: 'Sem 3', ingresos: 18000 },
    { name: 'Sem 4', ingresos: 20000 },
  ],
  all: [
    { name: 'Ene', ingresos: 45000 },
    { name: 'Feb', ingresos: 52000 },
    { name: 'Mar', ingresos: 48000 },
    { name: 'Abr', ingresos: 61000 },
    { name: 'May', ingresos: 55000 },
    { name: 'Jun', ingresos: 67000 },
  ],
};

export default function RevenueChart() {
  const [filter, setFilter] = useState<FilterType>('month');

  const filters = [
    { value: 'day' as FilterType, label: 'Hoy' },
    { value: 'week' as FilterType, label: 'Semana' },
    { value: 'month' as FilterType, label: 'Mes' },
    { value: 'all' as FilterType, label: 'Total' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#2F3437]">Ingresos</h3>
        <div className="flex space-x-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === f.value
                  ? 'bg-[#5C8F2B] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataByFilter[filter]}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="ingresos"
            stroke="#5C8F2B"
            strokeWidth={3}
            dot={{ fill: '#5C8F2B', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
