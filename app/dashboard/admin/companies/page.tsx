'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import WebView from '@/components/base/WebView';
import MobileView from '@/components/base/MobileView';
import CompaniesWebView from '@/components/admin/companies/CompaniesWebView';
import CompaniesMobileView from '@/components/admin/companies/CompaniesMobileView';
import { companyService, Company } from '@/services/companyService';

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (error: any) {
      console.error('Error al cargar empresas:', error);
      
      if (error.message.includes('403') || error.message.includes('Forbidden')) {
        Swal.fire({
          icon: 'warning',
          title: 'Acceso Denegado',
          text: 'No cuentas con los permisos necesarios',
          confirmButtonColor: '#5C8F2B',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las empresas',
          confirmButtonColor: '#5C8F2B',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchSearch = company.name.toLowerCase().includes(search.toLowerCase()) || 
                       company.nit.includes(search) ||
                       company.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'TODOS' || company.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredCompanies.length, currentPage, totalPages]);

  const handleCreateCompany = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleDeleteCompany = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'La empresa será desactivada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5C8F2B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await companyService.delete(id);
        await loadCompanies();
        Swal.fire({
          icon: 'success',
          title: '¡Desactivada!',
          text: 'La empresa ha sido desactivada correctamente',
          confirmButtonColor: '#5C8F2B',
          timer: 2000,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo desactivar la empresa',
          confirmButtonColor: '#5C8F2B',
        });
      }
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const company = companies.find(c => c.id === id);
      if (!company) return;
      
      const newStatus = company.status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
      await companyService.updateStatus(id, newStatus);
      await loadCompanies();
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
        text: 'No se pudo cambiar el estado de la empresa',
        confirmButtonColor: '#5C8F2B',
      });
    }
  };

  const handleViewDetails = async (id: number) => {
    try {
      const company = await companyService.getById(id);
      setSelectedCompany(company);
      setIsDetailsModalOpen(true);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los detalles',
        confirmButtonColor: '#5C8F2B',
      });
    }
  };

  const handleSubmitCompany = async (companyData: any) => {
    try {
      if (selectedCompany) {
        await companyService.update(selectedCompany.id, companyData);
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'Empresa actualizada correctamente',
          confirmButtonColor: '#5C8F2B',
          timer: 2000,
        });
      } else {
        await companyService.create(companyData);
        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'Empresa creada correctamente',
          confirmButtonColor: '#5C8F2B',
          timer: 2000,
        });
      }
      await loadCompanies();
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: selectedCompany ? 'No se pudo actualizar la empresa' : 'No se pudo crear la empresa',
        confirmButtonColor: '#5C8F2B',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C8F2B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando empresas...</p>
        </div>
      </div>
    );
  }

  const sharedProps = {
    companies,
    search,
    statusFilter,
    currentPage,
    totalPages,
    isModalOpen,
    isDetailsModalOpen,
    selectedCompany,
    filteredCompanies: paginatedCompanies,
    onSearchChange: setSearch,
    onStatusFilterChange: setStatusFilter,
    onPageChange: setCurrentPage,
    onCreateCompany: handleCreateCompany,
    onEditCompany: handleEditCompany,
    onDeleteCompany: handleDeleteCompany,
    onToggleStatus: handleToggleStatus,
    onViewDetails: handleViewDetails,
    onSubmitCompany: handleSubmitCompany,
    onCloseModal: () => setIsModalOpen(false),
    onCloseDetailsModal: () => setIsDetailsModalOpen(false),
  };

  return (
    <>
      <WebView>
        <CompaniesWebView {...sharedProps} />
      </WebView>
      <MobileView>
        <CompaniesMobileView {...sharedProps} />
      </MobileView>
    </>
  );
}
