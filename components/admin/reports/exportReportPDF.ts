import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportData } from '@/services/reportService';

const STATUS_LABELS: Record<string, string> = {
  REGISTRADO: 'Registrado', ASIGNADO: 'Asignado', EN_PROCESO: 'En Proceso',
  FINALIZADO: 'Finalizado', CANCELADO: 'Cancelado',
};
const PRIORITY_LABELS: Record<string, string> = {
  BAJA: 'Baja', MEDIA: 'Media', ALTA: 'Alta', URGENTE: 'Urgente',
};

function loadLogo(): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d')!.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = '/images/logo.png';
  });
}

async function addHeader(doc: jsPDF, title: string, subtitle: string) {
  try {
    const logoData = await loadLogo();
    doc.addImage(logoData, 'PNG', 14, 8, 25, 25);
  } catch { /* logo not available, skip */ }
  doc.setFontSize(18);
  doc.setTextColor(92, 143, 43);
  doc.text(title, 45, 20);
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(subtitle, 45, 27);
  doc.text(`Generado: ${new Date().toLocaleDateString()}`, 45, 32);
  doc.setDrawColor(92, 143, 43);
  doc.setLineWidth(0.5);
  doc.line(14, 37, 196, 37);
  return 42;
}

export async function exportReportPDF(tab: string, data: ReportData) {
  const doc = new jsPDF();
  const date = new Date().toISOString().slice(0, 10);

  if (tab === 'Resumen') {
    const startY = await addHeader(doc, 'Reporte de Resumen', `Total solicitudes: ${data.total}`);

    const sections: [string, Record<string, number>, Record<string, string>?][] = [
      ['Por Estado', data.byStatus, STATUS_LABELS],
      ['Por Prioridad', data.byPriority, PRIORITY_LABELS],
      ['Por Servicio', data.byService],
      ['Por Empresa', data.byCompany],
    ];

    let y = startY;
    for (const [title, obj, labels] of sections) {
      doc.setFontSize(11);
      doc.setTextColor(50);
      doc.text(title, 14, y);
      y += 2;
      autoTable(doc, {
        startY: y,
        head: [['Categoría', 'Cantidad']],
        body: Object.entries(obj).map(([k, v]) => [labels?.[k] || k, v]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [92, 143, 43] },
        margin: { left: 14 },
      });
      const finalY = (doc as any).lastAutoTable?.finalY;

y = finalY ? finalY + 8 : y + 30;
    }
    doc.save(`resumen_ecoforge_${date}.pdf`);

  } else if (tab === 'Tabla') {
    const startY = await addHeader(doc, 'Reporte de Solicitudes', `Total: ${data.requests.length} solicitudes`);

    autoTable(doc, {
      startY,
      head: [['Servicio', 'Estado', 'Prioridad', 'Distrito', 'Fecha', 'Cliente', 'Empresa', 'Vehículo']],
      body: data.requests.map(r => [
        r.serviceType, STATUS_LABELS[r.status] || r.status,
        PRIORITY_LABELS[r.priority] || r.priority, r.district,
        r.createdAt.slice(0, 10), r.userName, r.companyName, r.vehiclePlate,
      ]),
      styles: { fontSize: 7 },
      headStyles: { fillColor: [92, 143, 43] },
    });
    doc.save(`solicitudes_ecoforge_${date}.pdf`);

  } else if (tab === 'Gráficos') {
    const startY = await addHeader(doc, 'Reporte Estadístico', 'Distribución de solicitudes');

    const sections: [string, Record<string, number>, Record<string, string>?][] = [
      ['Solicitudes por Estado', data.byStatus, STATUS_LABELS],
      ['Solicitudes por Tipo de Servicio', data.byService],
      ['Solicitudes por Empresa', data.byCompany],
      ['Tendencia Mensual', data.byMonth],
    ];

    let y = startY;
    for (const [title, obj, labels] of sections) {
      doc.setFontSize(11);
      doc.setTextColor(50);
      doc.text(title, 14, y);
      y += 2;
      autoTable(doc, {
        startY: y,
        head: [['Categoría', 'Cantidad']],
        body: Object.entries(obj).map(([k, v]) => [labels?.[k] || k, v]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [92, 143, 43] },
        margin: { left: 14 },
      });
      y = (doc as unknown as Record<string, number>).lastAutoTable?.finalY + 8 || y + 30;
    }
    doc.save(`estadisticas_ecoforge_${date}.pdf`);

  } else if (tab === 'Ingresos') {
    const completed = data.requests.filter(r => r.status === 'FINALIZADO');
    const totalEarnings = completed.reduce((sum, r) => sum + (r.priceRef || 0), 0);
    const startY = await addHeader(doc, 'Reporte de Ingresos', `Total: Bs ${totalEarnings.toFixed(2)} | Solicitudes completadas: ${completed.length}`);

    let y = startY;

    // Ingresos por servicio
    const earningsByService = data.earnings?.byService || {};
    if (Object.keys(earningsByService).length) {
      doc.setFontSize(11);
      doc.setTextColor(50);
      doc.text('Ingresos por Servicio', 14, y);
      y += 2;
      autoTable(doc, {
        startY: y,
        head: [['Servicio', 'Monto (Bs)']],
        body: Object.entries(earningsByService).map(([k, v]) => [k, `Bs ${v.toFixed(2)}`]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [16, 185, 129] },
      });
      y = (doc as unknown as Record<string, number>).lastAutoTable?.finalY + 8 || y + 30;
    }

    // Ingresos por empresa
    const earningsByCompany = data.earnings?.byCompany || {};
    if (Object.keys(earningsByCompany).length) {
      doc.setFontSize(11);
      doc.text('Ingresos por Empresa', 14, y);
      y += 2;
      autoTable(doc, {
        startY: y,
        head: [['Empresa', 'Monto (Bs)']],
        body: Object.entries(earningsByCompany).map(([k, v]) => [k, `Bs ${v.toFixed(2)}`]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [16, 185, 129] },
      });
      y = (doc as unknown as Record<string, number>).lastAutoTable?.finalY + 8 || y + 30;
    }

    // Detalle
    doc.setFontSize(11);
    doc.text('Detalle de Solicitudes Completadas', 14, y);
    y += 2;
    autoTable(doc, {
      startY: y,
      head: [['Servicio', 'Distrito', 'Fecha', 'Cliente', 'Empresa', 'Costo (Bs)']],
      body: completed.map(r => [
        r.serviceType, r.district, r.createdAt.slice(0, 10),
        r.userName, r.companyName, `Bs ${(r.priceRef || 0).toFixed(2)}`,
      ]),
      styles: { fontSize: 7 },
      headStyles: { fillColor: [16, 185, 129] },
    });
    doc.save(`ingresos_ecoforge_${date}.pdf`);
  }
}
