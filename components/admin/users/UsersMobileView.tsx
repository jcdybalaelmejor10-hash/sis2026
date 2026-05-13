'use client';

import Modal from '@/components/base/Modal';
import UserForm from '@/components/admin/users/UserForm';
import UserCard from '@/components/admin/users/UserCard';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface UsersMobileViewProps {
  users: User[];
  search: string;
  roleFilter: string;
  statusFilter: string;
  isModalOpen: boolean;
  selectedUser: User | null;
  filteredUsers: User[];
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onCreateUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onSubmitUser: (user: User) => void;
  onCloseModal: () => void;
}

export default function UsersMobileView({
  users,
  search,
  roleFilter,
  statusFilter,
  isModalOpen,
  selectedUser,
  filteredUsers,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
  onCreateUser,
  onEditUser,
  onDeleteUser,
  onToggleStatus,
  onSubmitUser,
  onCloseModal,
}: UsersMobileViewProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5C8F2B] to-[#4A7322] rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Usuarios</h1>
        <p className="text-white/90 text-sm">Total: {users.length}</p>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3">
        <select
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
          className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none bg-white text-sm"
        >
          <option value="TODOS">Todos</option>
          <option value="ADMINISTRADOR">Admin</option>
          <option value="ENCARGADO">Encargado</option>
          <option value="CLIENTE">Cliente</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none bg-white text-sm"
        >
          <option value="TODOS">Todos</option>
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
          <option value="SUSPENDIDO">Suspendido</option>
        </select>
      </div>

      {/* User Cards */}
      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEditUser}
            onDelete={onDeleteUser}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={onCreateUser}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#5C8F2B] text-white rounded-full shadow-2xl hover:bg-[#4A7322] transition-all hover:scale-110 z-40"
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
      >
        <UserForm
          user={selectedUser}
          onSubmit={onSubmitUser}
          onCancel={onCloseModal}
        />
      </Modal>
    </div>
  );
}
