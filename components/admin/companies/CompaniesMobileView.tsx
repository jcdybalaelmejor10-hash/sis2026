'use client';

import SearchBar from '@/components/base/SearchBar';
import FilterSelect from '@/components/base/FilterSelect';
import Pagination from '@/components/base/Pagination';
import Modal from '@/components/base/Modal';
import CompanyCard from './CompanyCard';
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

interface CompaniesMobileViewProps {
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

export default function CompaniesMobileView({
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
}: CompaniesMobileViewProps) {
  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2F3437]">Empresas</h1>
        <button
          onClick={onCreateCompany}
          className="bg-[#5C8F2B] text-white p-3 rounded-lg hover:bg-[#4A7322] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <SearchBar value={search} onChange={onSearchChange} placeholder="Buscar empresas..." />
      
      <FilterSelect
        value={statusFilter}
        onChange={onStatusFilterChange}
        options={[
          { value: 'TODOS', label: 'Todos los estados' },
          { value: 'ACTIVO', label: 'Activos' },
          { value: 'INACTIVO', label: 'Inactivos' },
        ]}
      />

      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-gray-500">No se encontraron empresas</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onEdit={onEditCompany}
                onDelete={onDeleteCompany}
                onToggleStatus={onToggleStatus}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          )}
        </>
      )}

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
