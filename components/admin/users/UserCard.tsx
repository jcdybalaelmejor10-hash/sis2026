'use client';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export default function UserCard({ user, onEdit, onDelete, onToggleStatus }: UserCardProps) {
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
    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-[#2F3437] mb-1">{user.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{user.email}</p>
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRoleBadge(user.role)}`}>
              {user.role}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusBadge(user.status)}`}>
              {user.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="text-xs text-gray-500">{user.createdAt}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(user)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onToggleStatus(user.id)}
            className="p-2 hover:bg-yellow-50 text-yellow-600 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
