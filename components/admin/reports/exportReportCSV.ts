import { ReportData } from '@/services/reportService';

const STATUS_LABELS: Record<string, string> = {
  REGISTRADO: 'Registrado', ASIGNADO: 'Asignado', EN_PROCESO: 'En Proceso',
  FINALIZADO: 'Finalizado', CANCELADO: 'Cancelado',
};
const PRIORITY_LABELS: Record<string, string> = {
  BAJA: 'Baja', MEDIA: 'Media', ALTA: 'Alta', URGENTE: 'Urgente',
};

function download(content: string, filename: string) {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

export function exportReportCSV(tab: string, data: ReportData) {
  const date = new Date().toISOString().slice(0, 10);

  if (tab === 'Resumen') {
    let csv = 'Categoría,Valor\n';
    csv += `Total Solicitudes,${data.total}\n\n`;
    csv += 'Estado,Cantidad\n';
    Object.entries(data.byStatus).forEach(([k, v]) => { csv += `${STATUS_LABELS[k] || k},${v}\n`; });
    csv += '\nPrioridad,Cantidad\n';
    Object.entries(data.byPriority).forEach(([k, v]) => { csv += `${PRIORITY_LABELS[k] || k},${v}\n`; });
    csv += '\nServicio,Cantidad\n';
    Object.entries(data.byService).forEach(([k, v]) => { csv += `${k},${v}\n`; });
    csv += '\nEmpresa,Cantidad\n';
    Object.entries(data.byCompany).forEach(([k, v]) => { csv += `${k},${v}\n`; });
    download(csv, `resumen_ecoforge_${date}.csv`);

  } else if (tab === 'Tabla') {
    let csv = 'Servicio,Estado,Prioridad,Distrito,Dirección,Fecha,Cliente,Empresa,Recolector,Vehículo\n';
    csv += data.requests.map(r =>
      [r.serviceType, STATUS_LABELS[r.status] || r.status, PRIORITY_LABELS[r.priority] || r.priority,
        r.district, `"${r.address}"`, r.createdAt.slice(0, 10), r.userName, r.companyName, r.collectorName, r.vehiclePlate].join(',')
    ).join('\n');
    download(csv, `solicitudes_ecoforge_${date}.csv`);

  } else if (tab === 'Gráficos') {
    let csv = 'Estado,Cantidad\n';
    Object.entries(data.byStatus).forEach(([k, v]) => { csv += `${STATUS_LABELS[k] || k},${v}\n`; });
    csv += '\nServicio,Cantidad\n';
    Object.entries(data.byService).forEach(([k, v]) => { csv += `${k},${v}\n`; });
    csv += '\nEmpresa,Cantidad\n';
    Object.entries(data.byCompany).forEach(([k, v]) => { csv += `${k},${v}\n`; });
    csv += '\nMes,Cantidad\n';
    Object.entries(data.byMonth).forEach(([k, v]) => { csv += `${k},${v}\n`; });
    download(csv, `estadisticas_ecoforge_${date}.csv`);

  } else if (tab === 'Ingresos') {
    const completed = data.requests.filter(r => r.status === 'FINALIZADO');
    const totalEarnings = completed.reduce((sum, r) => sum + (r.priceRef || 0), 0);
    let csv = `Ingresos Totales,Bs ${totalEarnings.toFixed(2)}\nSolicitudes Completadas,${completed.length}\n\n`;

    const earningsByService = data.earnings?.byService || {};
    csv += 'Servicio,Monto (Bs)\n';
    Object.entries(earningsByService).forEach(([k, v]) => { csv += `${k},${v.toFixed(2)}\n`; });

    const earningsByCompany = data.earnings?.byCompany || {};
    csv += '\nEmpresa,Monto (Bs)\n';
    Object.entries(earningsByCompany).forEach(([k, v]) => { csv += `${k},${v.toFixed(2)}\n`; });

    csv += '\nServicio,Distrito,Fecha,Cliente,Empresa,Costo (Bs)\n';
    csv += completed.map(r =>
      [r.serviceType, r.district, r.createdAt.slice(0, 10), r.userName, r.companyName, (r.priceRef || 0).toFixed(2)].join(',')
    ).join('\n');
    download(csv, `ingresos_ecoforge_${date}.csv`);
  }
}
