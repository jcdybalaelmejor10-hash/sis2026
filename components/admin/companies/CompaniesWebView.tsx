'use client';

import SearchBar from '@/components/base/SearchBar';
import FilterSelect from '@/components/base/FilterSelect';
import Pagination from '@/components/base/Pagination';
import Modal from '@/components/base/Modal';
import CompaniesTable from './CompaniesTable';
import CompanyForm from './CompanyForm';
import CompanyDetailsModal from './CompanyDetailsModal';

interface Company {
  id: number;
  name: string;
  nit: string;
  email: string;
  phone: string;
  status: string;
  contactPersonName: string;
  contactPersonWhatsapp: string;
  operativeCapacity: number;
}

interface CompaniesWebViewProps {
  companies: Company[];
  search: string;
  statusFilter: string;
  currentPage: number;
  totalPages: number;
  isModalOpen: boolean;
  isDetailsModalOpen: boolean;
  selectedCompany: Company | null;
  filteredCompanies: Company[];
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onCreateCompany: () => void;
  onEditCompany: (company: Company) => void;
  onDeleteCompany: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onViewDetails: (id: number) => void;
  onSubmitCompany: (company: any) => void;
  onCloseModal: () => void;
  onCloseDetailsModal: () => void;
}

export default function CompaniesWebView({
  search,
  statusFilter,
  currentPage,
  totalPages,
  isModalOpen,
  isDetailsModalOpen,
  selectedCompany,
  filteredCompanies,
  onSearchChange,
  onStatusFilterChange,
  onPageChange,
  onCreateCompany,
  onEditCompany,
  onDeleteCompany,
  onToggleStatus,
  onViewDetails,
  onSubmitCompany,
  onCloseModal,
  onCloseDetailsModal,
}: CompaniesWebViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#2F3437]">Gestión de Empresas</h1>
        <button
          onClick={onCreateCompany}
          className="bg-[#5C8F2B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nueva Empresa</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <SearchBar value={search} onChange={onSearchChange} placeholder="Buscar por nombre, NIT o email..." />
          </div>
          <FilterSelect
            value={statusFilter}
            onChange={onStatusFilterChange}
            options={[
              { value: 'TODOS', label: 'Todos los estados' },
              { value: 'ACTIVO', label: 'Activos' },
              { value: 'INACTIVO', label: 'Inactivos' },
            ]}
          />
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-gray-500 text-lg">No se encontraron empresas</p>
          </div>
        ) : (
          <>
            <CompaniesTable
              companies={filteredCompanies}
              onEdit={onEditCompany}
              onDelete={onDeleteCompany}
              onToggleStatus={onToggleStatus}
              onViewDetails={onViewDetails}
            />
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
              </div>
            )}
          </>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={onCloseModal} title={selectedCompany ? 'Editar Empresa' : 'Nueva Empresa'}>
        <CompanyForm company={selectedCompany} onSubmit={onSubmitCompany} onCancel={onCloseModal} />
      </Modal>

      <CompanyDetailsModal
        company={selectedCompany}
        isOpen={isDetailsModalOpen}
        onClose={onCloseDetailsModal}
      />
    </div>
  );
}
