const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Vehicle {
  id: number;
  companyId: number;
  collectorId?: number;
  plate: string;
  type: string;
  capacityM3: number;
  photoUrl?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  company?: { id: number; name: string };
  collector?: { id: number; name: string };
}

export const vehicleService = {
  async getAll(companyId?: number): Promise<Vehicle[]> {
    const token = localStorage.getItem('token');
    const url = companyId ? `${API_URL}/vehicles?companyId=${companyId}` : `${API_URL}/vehicles`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener vehículos');
    return response.json();
  },

  async getById(id: number): Promise<Vehicle> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/vehicles/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al obtener vehículo');
    return response.json();
  },

  async create(data: Omit<Vehicle, 'id'>): Promise<Vehicle> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear vehículo');
    return response.json();
  },

  async update(id: number, data: Partial<Vehicle>): Promise<Vehicle> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/vehicles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar vehículo');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/vehicles/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error al eliminar vehículo');
  },

  async updateStatus(id: number, status: string): Promise<Vehicle> {
    return this.update(id, { status });
  },
};
