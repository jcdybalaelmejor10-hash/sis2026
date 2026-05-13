'use client';

import { useState } from 'react';
import SearchBar from '@/components/base/SearchBar';
import FilterSelect from '@/components/base/FilterSelect';
import Pagination from '@/components/base/Pagination';
import Modal from '@/components/base/Modal';
import UsersTable from '@/components/admin/users/UsersTable';
import UserForm from '@/components/admin/users/UserForm';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface UsersWebViewProps {
  users: User[];
  search: string;
  roleFilter: string;
  statusFilter: string;
  currentPage: number;
  totalPages: number;
  isModalOpen: boolean;
  selectedUser: User | null;
  filteredUsers: User[];
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onCreateUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onSubmitUser: (user: User) => void;
  onCloseModal: () => void;
}

export default function UsersWebView({
  users,
  search,
  roleFilter,
  statusFilter,
  currentPage,
  totalPages,
  isModalOpen,
  selectedUser,
  filteredUsers,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
  onPageChange,
  onCreateUser,
  onEditUser,
  onDeleteUser,
  onToggleStatus,
  onSubmitUser,
  onCloseModal,
}: UsersWebViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2F3437]">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">Administra los usuarios del sistema</p>
        </div>
        <button
          onClick={onCreateUser}
          className="flex items-center space-x-2 bg-[#5C8F2B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={onSearchChange}
              placeholder="Buscar por nombre o email..."
            />
          </div>
          <div className="w-64">
            <FilterSelect
              value={roleFilter}
              onChange={onRoleFilterChange}
              options={[
                { value: 'TODOS', label: 'Todos los roles' },
                { value: 'ADMINISTRADOR', label: 'Administrador' },
                { value: 'ENCARGADO', label: 'Encargado' },
                { value: 'CLIENTE', label: 'Cliente' },
              ]}
              label="Filtrar por rol"
            />
          </div>
          <div className="w-64">
            <FilterSelect
              value={statusFilter}
              onChange={onStatusFilterChange}
              options={[
                { value: 'TODOS', label: 'Todos los estados' },
                { value: 'ACTIVO', label: 'Activo' },
                { value: 'INACTIVO', label: 'Inactivo' },
                { value: 'SUSPENDIDO', label: 'Suspendido' },
              ]}
              label="Filtrar por estado"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Usuarios</p>
          <p className="text-3xl font-bold text-[#2F3437]">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Administradores</p>
          <p className="text-3xl font-bold text-purple-600">{users.filter(u => u.role === 'ADMINISTRADOR').length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Encargados</p>
          <p className="text-3xl font-bold text-blue-600">{users.filter(u => u.role === 'ENCARGADO').length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Clientes</p>
          <p className="text-3xl font-bold text-green-600">{users.filter(u => u.role === 'CLIENTE').length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <UsersTable
          users={filteredUsers}
          onEdit={onEditUser}
          onDelete={onDeleteUser}
          onToggleStatus={onToggleStatus}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={selectedUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
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
