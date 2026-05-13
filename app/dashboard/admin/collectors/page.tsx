'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { collectorService, Collector } from '@/services/collectorService';
import { companyService } from '@/services/companyService';
import { vehicleService, Vehicle } from '@/services/vehicleService';
import GenericTable from '@/components/base/GenericTable';
import SearchBar from '@/components/base/SearchBar';
import FilterSelect from '@/components/base/FilterSelect';
import Pagination from '@/components/base/Pagination';
import Modal from '@/components/base/Modal';
import SearchableSelect from '@/components/base/SearchableSelect';

export default function CollectorsPage() {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('TODOS');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ companyId: 0, name: '', carnetIdentidad: '', phoneLandline: '', whatsapp: '', status: 'DISPONIBLE' });

  // Vincular recolector a vehículo
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkCollector, setLinkCollector] = useState<Collector | null>(null);
  const [linkVehicleId, setLinkVehicleId] = useState(0);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [collectorsData, companiesData, vehiclesData] = await Promise.all([
        collectorService.getAll(),
        companyService.getAll(),
        vehicleService.getAll()
      ]);
      setCollectors(collectorsData);
      setCompanies(companiesData);
      setVehicles(vehiclesData);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los datos', confirmButtonColor: '#5C8F2B' });
    } finally {
      setLoading(false);
    }
  };

  const filteredCollectors = collectors.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.carnetIdentidad.includes(search);
    const matchCompany = companyFilter === 'TODOS' || c.companyId === Number(companyFilter);
    const matchStatus = statusFilter === 'TODOS' || c.status === statusFilter;
    return matchSearch && matchCompany && matchStatus;
  });

  const totalPages = Math.ceil(filteredCollectors.length / ITEMS_PER_PAGE);
  const paginatedCollectors = filteredCollectors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCreate = () => {
    setSelectedCollector(null);
    setFormData({ companyId: 0, name: '', carnetIdentidad: '', phoneLandline: '', whatsapp: '', status: 'DISPONIBLE' });
    setIsModalOpen(true);
  };

  const handleEdit = (collector: Collector) => {
    setSelectedCollector(collector);
    setFormData({ companyId: collector.companyId, name: collector.name, carnetIdentidad: collector.carnetIdentidad, phoneLandline: collector.phoneLandline || '', whatsapp: collector.whatsapp, status: collector.status });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'El recolector será desactivado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5C8F2B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await collectorService.delete(id);
        await loadData();
        Swal.fire({ icon: 'success', title: '¡Desactivado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
      }
    }
  };

  const handleLinkVehicle = (collector: Collector) => {
    setLinkCollector(collector);
    setLinkVehicleId(0);
    setLinkModalOpen(true);
  };

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkCollector || !linkVehicleId) return;
    try {
      await vehicleService.update(linkVehicleId, { collectorId: linkCollector.id });
      await loadData();
      setLinkModalOpen(false);
      Swal.fire({ icon: 'success', title: '¡Recolector vinculado al vehículo!', confirmButtonColor: '#5C8F2B', timer: 2000 });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error al vincular', confirmButtonColor: '#5C8F2B' });
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const collector = collectors.find(c => c.id === id);
      if (!collector) return;
      const newStatus = collector.status === 'DISPONIBLE' ? 'INACTIVO' : 'DISPONIBLE';
      await collectorService.updateStatus(id, newStatus);
      await loadData();
      Swal.fire({ icon: 'success', title: '¡Actualizado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedCollector) {
        await collectorService.update(selectedCollector.id, formData);
        Swal.fire({ icon: 'success', title: '¡Actualizado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      } else {
        await collectorService.create(formData);
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
    { key: 'name', label: 'Nombre' },
    { key: 'carnetIdentidad', label: 'Carnet de Identidad' },
    { key: 'phoneLandline', label: 'Teléfono Fijo', render: (v: any) => v || 'N/A' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'company', label: 'Empresa', render: (v: any, item: any) => item.company?.name || 'N/A' },
    { key: 'status', label: 'Estado', render: (v: string) => <span className={`px-3 py-1 rounded-full text-xs font-bold ${v === 'DISPONIBLE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{v}</span> },
    { key: 'vehicle', label: 'Vehículo', render: (_v: any, item: any) => {
      const v = vehicles.find(vh => vh.collectorId === item.id);
      return v ? <span className="text-xs text-blue-700">{v.plate}</span> : <span className="text-xs text-gray-400">Sin vehículo</span>;
    }},
  ];

  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#2F3437]">Gestión de Recolectores</h1>
        <button onClick={handleCreate} className="bg-[#5C8F2B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors">
          + Nuevo Recolector
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Buscar por nombre o CI..." /></div>
          <FilterSelect value={companyFilter} onChange={setCompanyFilter} options={[{ value: 'TODOS', label: 'Todas las empresas' }, ...companies.map(c => ({ value: c.id.toString(), label: c.name }))]} />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={[{ value: 'TODOS', label: 'Todos los estados' }, { value: 'DISPONIBLE', label: 'Disponible' }, { value: 'OCUPADO', label: 'Ocupado' }, { value: 'INACTIVO', label: 'Inactivo' }]} />
        </div>

        {paginatedCollectors.length === 0 ? (
          <div className="text-center py-12"><p className="text-gray-500">No se encontraron recolectores</p></div>
        ) : (
          <>
            <GenericTable columns={columns} data={paginatedCollectors} onEdit={handleEdit} onDelete={handleDelete} onToggleStatus={handleToggleStatus} onViewMap={handleLinkVehicle} />
            {totalPages > 1 && <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>}
          </>
        )}
      </div>

      {/* Modal vincular recolector a vehículo */}
      <Modal isOpen={linkModalOpen} onClose={() => setLinkModalOpen(false)} title={`Vincular ${linkCollector?.name || ''} a Vehículo`}>
        <form onSubmit={handleLinkSubmit} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
            Recolector: <strong>{linkCollector?.name}</strong> — Empresa: <strong>{companies.find(c => c.id === linkCollector?.companyId)?.name || 'N/A'}</strong>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vehículo (misma empresa)</label>
            <select value={linkVehicleId} onChange={(e) => setLinkVehicleId(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none bg-white" required>
              <option value={0}>Seleccionar vehículo</option>
              {vehicles.filter(v => v.companyId === linkCollector?.companyId && !v.collectorId).map(v => (
                <option key={v.id} value={v.id}>{v.plate} - {v.type} ({v.capacityM3} m³)</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-[#5C8F2B] text-white py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors">Vincular</button>
            <button type="button" onClick={() => setLinkModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancelar</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedCollector ? 'Editar Recolector' : 'Nuevo Recolector'}>
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Carnet de Identidad</label>
            <input type="text" value={formData.carnetIdentidad} onChange={(e) => setFormData({ ...formData, carnetIdentidad: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono Fijo</label>
            <input type="tel" value={formData.phoneLandline} onChange={(e) => setFormData({ ...formData, phoneLandline: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
            <input type="tel" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none bg-white">
              <option value="DISPONIBLE">Disponible</option>
              <option value="OCUPADO">Ocupado</option>
              <option value="INACTIVO">Inactivo</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-[#5C8F2B] text-white py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors">{selectedCollector ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
