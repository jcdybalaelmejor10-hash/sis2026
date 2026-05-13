const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface CompanyService {
  id: number;
  companyId: number;
  serviceType: string;
  description?: string;
  priceRef?: number;
  company?: { id: number; name: string };
}

export const companyServiceService = {
  async getAll(companyId?: number): Promise<CompanyService[]> {
    const token = localStorage.getItem('token');
    const url = companyId ? `${API_URL}/company-services?companyId=${companyId}` : `${API_URL}/company-services`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener servicios');
    return response.json();
  },

  async getById(id: number): Promise<CompanyService> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/company-services/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener servicio');
    return response.json();
  },

  async create(data: Omit<CompanyService, 'id'>): Promise<CompanyService> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/company-services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear servicio');
    return response.json();
  },

  async update(id: number, data: Partial<CompanyService>): Promise<CompanyService> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/company-services/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar servicio');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/company-services/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al eliminar servicio');
  },
};
