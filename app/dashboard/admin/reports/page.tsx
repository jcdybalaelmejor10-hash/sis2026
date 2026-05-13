'use client';

import { useState, useEffect, useCallback } from 'react';
import { reportService, ReportData, ReportFilters } from '@/services/reportService';
import FilterSelect from '@/components/base/FilterSelect';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { exportReportPDF } from '@/components/admin/reports/exportReportPDF';
import { exportReportCSV } from '@/components/admin/reports/exportReportCSV';

const TABS = ['Resumen', 'Tabla', 'Gráficos', 'Ingresos'] as const;
type Tab = typeof TABS[number];

const STATUS_LABELS: Record<string, string> = {
  REGISTRADO: 'Registrado', ASIGNADO: 'Asignado', EN_PROCESO: 'En Proceso',
  FINALIZADO: 'Finalizado', CANCELADO: 'Cancelado',
};
const PRIORITY_LABELS: Record<string, string> = {
  BAJA: 'Baja', MEDIA: 'Media', ALTA: 'Alta', URGENTE: 'Urgente',
};
const COLORS = ['#5C8F2B', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

const toChartArray = (obj: Record<string, number>, labelMap?: Record<string, string>) =>
  Object.entries(obj).map(([name, value]) => ({ name: labelMap?.[name] || name, value }));

export default function ReportsPage() {
  const [tab, setTab] = useState<Tab>('Resumen');
  const [data, setData] = useState<ReportData | null>(null);
  const [filters, setFilters] = useState<ReportFilters>({ companies: [], serviceTypes: [] });
  const [companyId, setCompanyId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const d = await reportService.getData({
        companyId: companyId ? Number(companyId) : undefined,
        serviceType: serviceType || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      });
      setData(d);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [companyId, serviceType, dateFrom, dateTo]);

  useEffect(() => { reportService.getFilters().then(setFilters).catch(() => {}); }, []);
  useEffect(() => { load(); }, [load]);

  const exportPDF = () => { if (data) exportReportPDF(tab, data); };
  const exportCSV = () => { if (data) exportReportCSV(tab, data); };

  const statCards = data ? [
    { label: 'Total', value: data.total, color: 'from-[#5C8F2B] to-[#4A7322]' },
    { label: 'Finalizados', value: data.byStatus['FINALIZADO'] || 0, color: 'from-green-500 to-green-600' },
    { label: 'En Proceso', value: data.byStatus['EN_PROCESO'] || 0, color: 'from-purple-500 to-purple-600' },
    { label: 'Cancelados', value: data.byStatus['CANCELADO'] || 0, color: 'from-red-500 to-red-600' },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5C8F2B] to-[#4A7322] rounded-xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Reportes</h2>
        <p className="text-white/90">Análisis y exportación de datos de solicitudes</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-wrap gap-4 items-end">
        <FilterSelect label="Empresa" value={companyId} onChange={setCompanyId}
          options={[{ value: '', label: 'Todas' }, ...filters.companies.map(c => ({ value: String(c.id), label: c.name }))]} />
        <FilterSelect label="Servicio" value={serviceType} onChange={setServiceType}
          options={[{ value: '', label: 'Todos' }, ...filters.serviceTypes.map(s => ({ value: s, label: s }))]} />
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-gray-700">Desde</label>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-gray-700">Hasta</label>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" />
        </div>
        <div className="flex gap-2">
          <button onClick={exportPDF} className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm">PDF</button>
          <button onClick={exportCSV} className="px-4 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-semibold text-sm">CSV</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow">
        <div className="flex border-b">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-3 font-semibold text-sm transition-colors ${tab === t ? 'border-b-2 border-[#5C8F2B] text-[#5C8F2B]' : 'text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C8F2B]" />
            </div>
          ) : !data ? (
            <p className="text-center text-gray-500 py-10">No se pudieron cargar los datos</p>
          ) : tab === 'Resumen' ? (
            <SummaryTab data={data} statCards={statCards} />
          ) : tab === 'Tabla' ? (
            <TableTab data={data} />
          ) : tab === 'Gráficos' ? (
            <ChartsTab data={data} />
          ) : (
            <EarningsTab data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Resumen ───
function SummaryTab({ data, statCards }: { data: ReportData; statCards: { label: string; value: number; color: string }[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(c => (
          <div key={c.label} className={`bg-gradient-to-br ${c.color} rounded-xl p-5 text-white shadow-lg`}>
            <p className="text-sm text-white/80">{c.label}</p>
            <p className="text-3xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <MiniTable title="Por Estado" data={data.byStatus} labels={STATUS_LABELS} />
        <MiniTable title="Por Prioridad" data={data.byPriority} labels={PRIORITY_LABELS} />
        <MiniTable title="Por Servicio" data={data.byService} />
        <MiniTable title="Por Empresa" data={data.byCompany} />
      </div>
    </div>
  );
}

function MiniTable({ title, data, labels }: { title: string; data: Record<string, number>; labels?: Record<string, string> }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 font-semibold text-sm text-gray-700">{title}</div>
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(data).map(([k, v]) => (
            <tr key={k} className="border-t">
              <td className="px-4 py-2">{labels?.[k] || k}</td>
              <td className="px-4 py-2 text-right font-bold">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tabla ───
function TableTab({ data }: { data: ReportData }) {
  const [page, setPage] = useState(1);
  const PER = 15;
  const total = Math.ceil(data.requests.length / PER);
  const rows = data.requests.slice((page - 1) * PER, page * PER);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">{data.requests.length} solicitudes</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Servicio', 'Estado', 'Prioridad', 'Distrito', 'Fecha', 'Cliente', 'Empresa', 'Vehículo'].map(h => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{r.serviceType}</td>
                <td className="px-3 py-2"><StatusBadge value={r.status} /></td>
                <td className="px-3 py-2">{PRIORITY_LABELS[r.priority] || r.priority}</td>
                <td className="px-3 py-2">{r.district}</td>
                <td className="px-3 py-2">{r.createdAt.slice(0, 10)}</td>
                <td className="px-3 py-2">{r.userName}</td>
                <td className="px-3 py-2">{r.companyName}</td>
                <td className="px-3 py-2">{r.vehiclePlate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {total > 1 && (
        <div className="flex justify-center gap-2 pt-2">
          {Array.from({ length: total }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded text-sm ${page === i + 1 ? 'bg-[#5C8F2B] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const colors: Record<string, string> = {
    REGISTRADO: 'bg-yellow-100 text-yellow-700', ASIGNADO: 'bg-blue-100 text-blue-700',
    EN_PROCESO: 'bg-purple-100 text-purple-700', FINALIZADO: 'bg-green-100 text-green-700',
    CANCELADO: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${colors[value] || 'bg-gray-100'}`}>{STATUS_LABELS[value] || value}</span>;
}

// ─── Gráficos ───
function ChartsTab({ data }: { data: ReportData }) {
  const statusData = toChartArray(data.byStatus, STATUS_LABELS);
  const serviceData = toChartArray(data.byService);
  const companyData = toChartArray(data.byCompany);
  const monthData = toChartArray(data.byMonth).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Pie: por estado */}
      <ChartCard title="Solicitudes por Estado">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip /><Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Bar: por servicio */}
      <ChartCard title="Solicitudes por Tipo de Servicio">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={serviceData}>
            <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis />
            <Tooltip /><Bar dataKey="value" fill="#5C8F2B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Bar: por empresa */}
      <ChartCard title="Solicitudes por Empresa">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={companyData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} />
            <Tooltip /><Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Line: tendencia mensual */}
      <ChartCard title="Tendencia Mensual">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthData}>
            <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis />
            <Tooltip /><Line type="monotone" dataKey="value" stroke="#5C8F2B" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-xl p-4">
      <h4 className="font-semibold text-gray-700 mb-3">{title}</h4>
      {children}
    </div>
  );
}

// ─── Ingresos ───
function EarningsTab({ data }: { data: ReportData }) {
  const [page, setPage] = useState(1);
  const PER = 15;
  const completed = data.requests.filter(r => r.status === 'FINALIZADO');
  const totalEarnings = completed.reduce((sum, r) => sum + (r.priceRef || 0), 0);
  const total = Math.ceil(completed.length / PER);
  const rows = completed.slice((page - 1) * PER, page * PER);

  const earningsByService = data.earnings?.byService || {};
  const earningsByCompany = data.earnings?.byCompany || {};
  const earningsByMonth = data.earnings?.byMonth || {};
  const monthData = toChartArray(earningsByMonth).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
          <p className="text-sm text-white/80">Ingresos Totales</p>
          <p className="text-3xl font-bold">Bs {totalEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-[#5C8F2B] to-[#4A7322] rounded-xl p-5 text-white shadow-lg">
          <p className="text-sm text-white/80">Solicitudes Completadas</p>
          <p className="text-3xl font-bold">{completed.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <p className="text-sm text-white/80">Promedio por Solicitud</p>
          <p className="text-3xl font-bold">Bs {completed.length ? (totalEarnings / completed.length).toFixed(2) : '0.00'}</p>
        </div>
      </div>

      {/* Desglose + Gráfico */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm text-gray-700">Ingresos por Servicio</div>
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(earningsByService).map(([k, v]) => (
                <tr key={k} className="border-t">
                  <td className="px-4 py-2">{k}</td>
                  <td className="px-4 py-2 text-right font-bold text-emerald-600">Bs {v.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm text-gray-700">Ingresos por Empresa</div>
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(earningsByCompany).map(([k, v]) => (
                <tr key={k} className="border-t">
                  <td className="px-4 py-2">{k}</td>
                  <td className="px-4 py-2 text-right font-bold text-emerald-600">Bs {v.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tendencia mensual de ingresos */}
      {monthData.length > 0 && (
        <ChartCard title="Tendencia Mensual de Ingresos">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip formatter={(v: number) => `Bs ${v.toFixed(2)}`} />
              <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* Tabla detalle */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-700">Detalle de Solicitudes Completadas</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Servicio', 'Distrito', 'Fecha', 'Cliente', 'Empresa', 'Costo'].map(h => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2">{r.serviceType}</td>
                  <td className="px-3 py-2">{r.district}</td>
                  <td className="px-3 py-2">{r.createdAt.slice(0, 10)}</td>
                  <td className="px-3 py-2">{r.userName}</td>
                  <td className="px-3 py-2">{r.companyName}</td>
                  <td className="px-3 py-2 font-bold text-emerald-600">Bs {(r.priceRef || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total > 1 && (
          <div className="flex justify-center gap-2 pt-2">
            {Array.from({ length: total }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded text-sm ${page === i + 1 ? 'bg-[#5C8F2B] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
