const API_URL = 'http://localhost:5000/api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

export interface UpdateUserData {
  name: string;
  email: string;
  password?: string;
  role: string;
  status: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return response.json();
  },

  async create(data: CreateUserData): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear usuario');
    return response.json();
  },

  async update(id: number, data: UpdateUserData): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar usuario');
    return response.json();
  },

  async updateStatus(id: number, status: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Error al actualizar estado');
    const result = await response.json();
    return result.user;
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al eliminar usuario');
  },
};
