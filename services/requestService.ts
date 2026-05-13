const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ServiceRequest {
  id: number;
  userId: number;
  serviceType: string;
  description?: string;
  priority: string;
  status: string;
  address: string;
  district: string;
  province?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  estimatedM3?: number;
  confirmedByUser: boolean;
  confirmedAt?: string;
  createdAt: string;
  updatedAt: string;
  user?: { id: number; name: string; email: string; phone?: string };
  photos?: { id: number; url: string; caption?: string }[];
  assignment?: {
    id: number;
    companyId: number;
    collectorId?: number;
    vehicleId?: number;
    notes?: string;
    company?: { id: number; name: string };
    collector?: { id: number; name: string; whatsapp?: string };
    vehicle?: { id: number; plate: string; type: string; capacityM3: number };
  };
  statusLogs?: { id: number; status: string; notes?: string; changedAt: string }[];
  companyService?: { serviceType: string; description: string | null; priceRef: number } | null;
}

export interface CompanyServiceInfo {
  serviceType: string;
  description: string | null;
  priceRef: number;
}

export interface AvailableCompany {
  companyId: number;
  companyName: string;
  distance: number;
  services: CompanyServiceInfo[];
  vehicles: Array<{
    id: number;
    plate: string;
    type: string;
    capacityM3: number;
    status: string;
  }>;
}

export const requestService = {
  async getAvailableCompanies(latitude: number, longitude: number): Promise<AvailableCompany[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/requests/available-companies?latitude=${latitude}&longitude=${longitude}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener empresas disponibles');
    return response.json();
  },

  async create(data: {
    companyId?: number;
    serviceType: string;
    description?: string;
    priority: string;
    address: string;
    district: string;
    province?: string;
    region?: string;
    latitude: number;
    longitude: number;
    estimatedM3?: number;
    photos?: string[];
  }): Promise<ServiceRequest> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear solicitud');
    return response.json();
  },

  async getMyRequests(): Promise<ServiceRequest[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/requests/my-requests`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener solicitudes');
    return response.json();
  },

  async confirm(id: number): Promise<ServiceRequest> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/requests/${id}/confirm`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al confirmar solicitud');
    return response.json();
  },

  async getAll(filters?: { status?: string; district?: string }): Promise<ServiceRequest[]> {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.district) params.set('district', filters.district);
    const response = await fetch(`${API_URL}/requests?${params}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener solicitudes');
    return response.json();
  },

  async getById(id: number): Promise<ServiceRequest> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/requests/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener solicitud');
    return response.json();
  },

  async updateStatus(id: number, status: string, notes?: string): Promise<ServiceRequest> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status, notes }),
    });
    if (!response.ok) throw new Error('Error al actualizar estado');
    return response.json();
  },

  async updatePriority(id: number, priority: string): Promise<ServiceRequest> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/requests/${id}/priority`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ priority }),
    });
    if (!response.ok) throw new Error('Error al actualizar prioridad');
    return response.json();
  },

  async assign(id: number, data: { companyId: number; collectorId?: number; vehicleId: number; priority?: string; notes?: string }): Promise<ServiceRequest> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/requests/${id}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al asignar solicitud');
    return response.json();
  },

  async getCompanyResources(companyId: number): Promise<{ collectors: any[]; vehicles: any[] }> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/requests/company-resources/${companyId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener recursos');
    return response.json();
  },
};
