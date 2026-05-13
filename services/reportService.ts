const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ReportRequest {
  id: number;
  serviceType: string;
  status: string;
  priority: string;
  district: string;
  address: string;
  createdAt: string;
  userName: string;
  companyName: string;
  collectorName: string;
  vehiclePlate: string;
  priceRef: number;
}

export interface EarningsData {
  total: number;
  finalized: number;
  byCompany: Record<string, number>;
  byService: Record<string, number>;
  byMonth: Record<string, number>;
}

export interface ReportData {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byService: Record<string, number>;
  byCompany: Record<string, number>;
  byMonth: Record<string, number>;
  earnings: EarningsData;
  requests: ReportRequest[];
}

export interface ReportFilters {
  companies: { id: number; name: string }[];
  serviceTypes: string[];
}

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const reportService = {
  async getData(filters?: { companyId?: number; serviceType?: string; dateFrom?: string; dateTo?: string }): Promise<ReportData> {
    const params = new URLSearchParams();
    if (filters?.companyId) params.set('companyId', String(filters.companyId));
    if (filters?.serviceType) params.set('serviceType', filters.serviceType);
    if (filters?.dateFrom) params.set('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.set('dateTo', filters.dateTo);
    const res = await fetch(`${API_URL}/reports?${params}`, { headers: headers() });
    if (!res.ok) throw new Error('Error al obtener reportes');
    return res.json();
  },

  async getFilters(): Promise<ReportFilters> {
    const res = await fetch(`${API_URL}/reports/filters`, { headers: headers() });
    if (!res.ok) throw new Error('Error al obtener filtros');
    return res.json();
  },

  async getServicesByCompany(companyId: number): Promise<string[]> {
    const res = await fetch(`${API_URL}/reports/services-by-company/${companyId}`, { headers: headers() });
    if (!res.ok) throw new Error('Error al obtener servicios');
    return res.json();
  },
};
