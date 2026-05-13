const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Collector {
  id: number;
  companyId: number;
  name: string;
  carnetIdentidad: string;
  phoneLandline?: string;
  whatsapp: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  company?: { id: number; name: string };
}

export const collectorService = {
  async getAll(companyId?: number): Promise<Collector[]> {
    const token = localStorage.getItem('token');
    const url = companyId ? `${API_URL}/collectors?companyId=${companyId}` : `${API_URL}/collectors`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener recolectores');
    return response.json();
  },

  async getById(id: number): Promise<Collector> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/collectors/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener recolector');
    return response.json();
  },

  async create(data: Omit<Collector, 'id'>): Promise<Collector> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/collectors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear recolector');
    return response.json();
  },

  async update(id: number, data: Partial<Collector>): Promise<Collector> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/collectors/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar recolector');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/collectors/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al eliminar recolector');
  },

  async updateStatus(id: number, status: string): Promise<Collector> {
    return this.update(id, { status });
  },
};
