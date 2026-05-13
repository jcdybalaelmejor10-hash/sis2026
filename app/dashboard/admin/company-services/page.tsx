'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { companyServiceService, CompanyService } from '@/services/companyServiceService';
import { companyService } from '@/services/companyService';
import GenericTable from '@/components/base/GenericTable';
import SearchBar from '@/components/base/SearchBar';
import FilterSelect from '@/components/base/FilterSelect';
import Pagination from '@/components/base/Pagination';
import Modal from '@/components/base/Modal';
import SearchableSelect from '@/components/base/SearchableSelect';

export default function CompanyServicesPage() {
  const [services, setServices] = useState<CompanyService[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<CompanyService | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ companyId: 0, serviceType: '', description: '', priceRef: 0 });

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [servicesData, companiesData] = await Promise.all([
        companyServiceService.getAll(),
        companyService.getAll()
      ]);
      setServices(servicesData);
      setCompanies(companiesData);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los datos', confirmButtonColor: '#5C8F2B' });
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((s) => {
    const matchSearch = s.serviceType.toLowerCase().includes(search.toLowerCase()) || (s.description && s.description.toLowerCase().includes(search.toLowerCase()));
    const matchCompany = companyFilter === 'TODOS' || s.companyId === Number(companyFilter);
    return matchSearch && matchCompany;
  });

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = filteredServices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCreate = () => {
    setSelectedService(null);
    setFormData({ companyId: 0, serviceType: '', description: '', priceRef: 0 });
    setIsModalOpen(true);
  };

  const handleEdit = (service: CompanyService) => {
    setSelectedService(service);
    setFormData({ companyId: service.companyId, serviceType: service.serviceType, description: service.description || '', priceRef: Number(service.priceRef) || 0 });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'El servicio será eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5C8F2B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await companyServiceService.delete(id);
        await loadData();
        Swal.fire({ icon: 'success', title: '¡Eliminado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedService) {
        await companyServiceService.update(selectedService.id, formData);
        Swal.fire({ icon: 'success', title: '¡Actualizado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      } else {
        await companyServiceService.create(formData);
        Swal.fire({ icon: 'success', title: '¡Creado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      }
      await loadData();
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C8F2B]"></div></div>;

  const columns = [
    { key: 'serviceType', label: 'Tipo de Servicio' },
    { key: 'description', label: 'Descripción', render: (v: any) => v || 'N/A' },
    { key: 'priceRef', label: 'Precio Referencial', render: (v: any) => v ? `Bs ${v}` : 'N/A' },
    { key: 'company', label: 'Empresa', render: (v: any, item: any) => item.company?.name || 'N/A' },
  ];

  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#2F3437]">Gestión de Servicios</h1>
        <button onClick={handleCreate} className="bg-[#5C8F2B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors">
          + Nuevo Servicio
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Buscar por tipo o descripción..." /></div>
          <FilterSelect value={companyFilter} onChange={setCompanyFilter} options={[{ value: 'TODOS', label: 'Todas las empresas' }, ...companies.map(c => ({ value: c.id.toString(), label: c.name }))]} />
        </div>

        {paginatedServices.length === 0 ? (
          <div className="text-center py-12"><p className="text-gray-500">No se encontraron servicios</p></div>
        ) : (
          <>
            <GenericTable columns={columns} data={paginatedServices} onEdit={handleEdit} onDelete={handleDelete} />
            {totalPages > 1 && <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>}
          </>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedService ? 'Editar Servicio' : 'Nuevo Servicio'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SearchableSelect
            label="Empresa"
            options={companyOptions}
            value={formData.companyId}
            onChange={(value) => setFormData({ ...formData, companyId: Number(value) })}
            placeholder="Seleccionar empresa"
            required
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Servicio</label>
            <input type="text" value={formData.serviceType} onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" required placeholder="Ej: Desmonte, Escombros pesados" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" rows={3} placeholder="Descripción del servicio" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Precio Referencial (Bs)</label>
            <input type="number" step="0.01" value={formData.priceRef} onChange={(e) => setFormData({ ...formData, priceRef: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" min="0" placeholder="0.00" />
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-[#5C8F2B] text-white py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors">{selectedService ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
