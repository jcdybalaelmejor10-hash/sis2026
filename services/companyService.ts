const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Company {
  id: number;
  name: string;
  nit: string;
  email: string;
  phone: string;
  address?: string;
  contactPersonName: string;
  contactPersonWhatsapp: string;
  status: string;
  operativeCapacity: number;
  createdAt?: string;
  updatedAt?: string;
}

export const companyService = {
  async getAll(): Promise<Company[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/companies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.status === 403) throw new Error('403 Forbidden');
    if (!response.ok) throw new Error('Error al obtener empresas');
    return response.json();
  },

  async getById(id: number): Promise<Company> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/companies/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error al obtener empresa');
    return response.json();
  },

  async create(data: Omit<Company, 'id'>): Promise<Company> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear empresa');
    return response.json();
  },

  async update(id: number, data: Partial<Company>): Promise<Company> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/companies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar empresa');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/companies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error al eliminar empresa');
  },

  async updateStatus(id: number, status: string): Promise<Company> {
    return this.update(id, { status });
  },
};
