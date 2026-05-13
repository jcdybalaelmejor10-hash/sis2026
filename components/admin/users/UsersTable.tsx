'use client';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export default function UsersTable({ users, onEdit, onDelete, onToggleStatus }: UsersTableProps) {
  const getRoleBadge = (role: string) => {
    const colors = {
      ADMINISTRADOR: 'bg-purple-100 text-purple-700',
      ENCARGADO: 'bg-blue-100 text-blue-700',
      CLIENTE: 'bg-green-100 text-green-700',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      ACTIVO: 'bg-green-100 text-green-700',
      INACTIVO: 'bg-gray-100 text-gray-700',
      SUSPENDIDO: 'bg-red-100 text-red-700',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Usuario</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Rol</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Estado</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Fecha Registro</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-[#2F3437]">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleBadge(user.role)}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(user.status)}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onToggleStatus(user.id)}
                    className="p-2 hover:bg-yellow-50 text-yellow-600 rounded-lg transition-colors"
                    title="Cambiar estado"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
