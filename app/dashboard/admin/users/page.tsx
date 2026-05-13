'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WebView from '@/components/base/WebView';
import MobileView from '@/components/base/MobileView';
import UsersWebView from '@/components/admin/users/UsersWebView';
import UsersMobileView from '@/components/admin/users/UsersMobileView';
import { userService, User } from '@/services/userService';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('TODOS');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los usuarios',
        confirmButtonColor: '#5C8F2B',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                       user.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'TODOS' || user.role === roleFilter;
    const matchStatus = statusFilter === 'TODOS' || user.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredUsers.length, currentPage, totalPages]);

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5C8F2B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await userService.delete(id);
        await loadUsers();
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'El usuario ha sido eliminado correctamente',
          confirmButtonColor: '#5C8F2B',
          timer: 2000,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el usuario',
          confirmButtonColor: '#5C8F2B',
        });
      }
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const user = users.find(u => u.id === id);
      if (!user) return;
      
      const newStatus = user.status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
      await userService.updateStatus(id, newStatus);
      await loadUsers();
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: `Estado cambiado a ${newStatus}`,
        confirmButtonColor: '#5C8F2B',
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cambiar el estado del usuario',
        confirmButtonColor: '#5C8F2B',
      });
    }
  };

  const handleSubmitUser = async (userData: any) => {
    try {
      if (selectedUser) {
        await userService.update(selectedUser.id, userData);
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'Usuario actualizado correctamente',
          confirmButtonColor: '#5C8F2B',
          timer: 2000,
        });
      } else {
        await userService.create(userData);
        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'Usuario creado correctamente',
          confirmButtonColor: '#5C8F2B',
          timer: 2000,
        });
      }
      await loadUsers();
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: selectedUser ? 'No se pudo actualizar el usuario' : 'No se pudo crear el usuario',
        confirmButtonColor: '#5C8F2B',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C8F2B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  const sharedProps = {
    users,
    search,
    roleFilter,
    statusFilter,
    currentPage,
    totalPages,
    isModalOpen,
    selectedUser,
    filteredUsers: paginatedUsers,
    onSearchChange: setSearch,
    onRoleFilterChange: setRoleFilter,
    onStatusFilterChange: setStatusFilter,
    onPageChange: setCurrentPage,
    onCreateUser: handleCreateUser,
    onEditUser: handleEditUser,
    onDeleteUser: handleDeleteUser,
    onToggleStatus: handleToggleStatus,
    onSubmitUser: handleSubmitUser,
    onCloseModal: () => setIsModalOpen(false),
  };

  return (
    <>
      <WebView>
        <UsersWebView {...sharedProps} />
      </WebView>
      <MobileView>
        <UsersMobileView {...sharedProps} />
      </MobileView>
    </>
  );
}
