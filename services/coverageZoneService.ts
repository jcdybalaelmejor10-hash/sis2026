const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface CoverageZone {
  id: number;
  companyId: number;
  district: string;
  province?: string;
  region?: string;
  latitude: number;
  longitude: number;
  coverageRadiusM: number;
  company?: { id: number; name: string };
}

export const coverageZoneService = {
  async getAll(companyId?: number): Promise<CoverageZone[]> {
    const token = localStorage.getItem('token');
    const url = companyId ? `${API_URL}/coverage-zones?companyId=${companyId}` : `${API_URL}/coverage-zones`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener zonas');
    return response.json();
  },

  async getById(id: number): Promise<CoverageZone> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/coverage-zones/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener zona');
    return response.json();
  },

  async create(data: Omit<CoverageZone, 'id'>): Promise<CoverageZone> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/coverage-zones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear zona');
    return response.json();
  },

  async update(id: number, data: Partial<CoverageZone>): Promise<CoverageZone> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/coverage-zones/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar zona');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/coverage-zones/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al eliminar zona');
  },
};
