'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Swal from 'sweetalert2';
import { vehicleService, Vehicle } from '@/services/vehicleService';
import { companyService, Company } from '@/services/companyService';
import { collectorService, Collector } from '@/services/collectorService';
import GenericTable from '@/components/base/GenericTable';
import SearchBar from '@/components/base/SearchBar';
import FilterSelect from '@/components/base/FilterSelect';
import Pagination from '@/components/base/Pagination';
import Modal from '@/components/base/Modal';
import SearchableSelect from '@/components/base/SearchableSelect';

function ImageDropZone({ value, onChange }: { value: string; onChange: (base64: string) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  }, [processFile]);

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Foto del Vehículo</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-[#5C8F2B] bg-green-50' : 'border-gray-300 hover:border-[#5C8F2B]'
        }`}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} />
        {value ? (
          <div className="relative">
            <img src={value} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
            <button type="button" onClick={(e) => { e.stopPropagation(); onChange(''); }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600">✕</button>
          </div>
        ) : (
          <div className="py-4 text-gray-500">
            <p className="text-2xl mb-1">📷</p>
            <p className="text-sm">Arrastra una imagen aquí o haz clic para seleccionar</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [filteredCollectors, setFilteredCollectors] = useState<Collector[]>([]);
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('TODOS');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ companyId: 0, collectorId: 0, plate: '', type: '', capacityM3: 0, photoUrl: '', status: 'DISPONIBLE' });

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [vehiclesData, companiesData, collectorsData] = await Promise.all([
        vehicleService.getAll(),
        companyService.getAll(),
        collectorService.getAll()
      ]);
      setVehicles(vehiclesData);
      setCompanies(companiesData);
      setCollectors(collectorsData);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los datos', confirmButtonColor: '#5C8F2B' });
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchSearch = v.plate.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase());
    const matchCompany = companyFilter === 'TODOS' || v.companyId === Number(companyFilter);
    const matchStatus = statusFilter === 'TODOS' || v.status === statusFilter;
    return matchSearch && matchCompany && matchStatus;
  });

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = filteredVehicles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCreate = () => {
    setSelectedVehicle(null);
    setFormData({ companyId: 0, collectorId: 0, plate: '', type: '', capacityM3: 0, photoUrl: '', status: 'DISPONIBLE' });
    setFilteredCollectors([]);
    setIsModalOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({ companyId: vehicle.companyId, collectorId: vehicle.collectorId || 0, plate: vehicle.plate, type: vehicle.type, capacityM3: Number(vehicle.capacityM3), photoUrl: vehicle.photoUrl || '', status: vehicle.status });
    setFilteredCollectors(collectors.filter(c => c.companyId === vehicle.companyId));
    setIsModalOpen(true);
  };

  const handleCompanyChange = (companyId: number) => {
    setFormData({ ...formData, companyId, collectorId: 0 });
    setFilteredCollectors(collectors.filter(c => c.companyId === companyId));
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'El vehículo será desactivado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5C8F2B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await vehicleService.delete(id);
        await loadData();
        Swal.fire({ icon: 'success', title: '¡Desactivado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
      }
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const vehicle = vehicles.find(v => v.id === id);
      if (!vehicle) return;
      const newStatus = vehicle.status === 'DISPONIBLE' ? 'INACTIVO' : 'DISPONIBLE';
      await vehicleService.updateStatus(id, newStatus);
      await loadData();
      Swal.fire({ icon: 'success', title: '¡Actualizado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedVehicle) {
        await vehicleService.update(selectedVehicle.id, formData);
        Swal.fire({ icon: 'success', title: '¡Actualizado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      } else {
        await vehicleService.create(formData);
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
    { key: 'plate', label: 'Placa' },
    { key: 'type', label: 'Tipo' },
    { key: 'capacityM3', label: 'Capacidad', render: (v: number) => `${v} m³` },
    { key: 'company', label: 'Empresa', render: (_v: Vehicle['company'], item: Vehicle) => item.company?.name || 'N/A' },
    { key: 'collector', label: 'Recolector', render: (_v: Vehicle['collector'], item: Vehicle) => item.collector?.name || 'Sin asignar' },
    { key: 'photoUrl', label: 'Foto', render: (v: string) => v ? <img src={v} alt="Vehículo" className="w-10 h-10 object-cover rounded" /> : 'No' },
    { key: 'status', label: 'Estado', render: (v: string) => <span className={`px-3 py-1 rounded-full text-xs font-bold ${v === 'DISPONIBLE' ? 'bg-green-100 text-green-700' : v === 'EN_SERVICIO' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{v}</span> },
  ];

  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));
  const collectorOptions = filteredCollectors.map(c => ({ value: c.id, label: `${c.name} - ${c.carnetIdentidad}` }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#2F3437]">Gestión de Vehículos</h1>
        <button onClick={handleCreate} className="bg-[#5C8F2B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors">
          + Nuevo Vehículo
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Buscar por placa o tipo..." /></div>
          <FilterSelect value={companyFilter} onChange={setCompanyFilter} options={[{ value: 'TODOS', label: 'Todas las empresas' }, ...companies.map(c => ({ value: c.id.toString(), label: c.name }))]} />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={[{ value: 'TODOS', label: 'Todos los estados' }, { value: 'DISPONIBLE', label: 'Disponible' }, { value: 'EN_SERVICIO', label: 'En Servicio' }, { value: 'MANTENIMIENTO', label: 'Mantenimiento' }, { value: 'INACTIVO', label: 'Inactivo' }]} />
        </div>

        {paginatedVehicles.length === 0 ? (
          <div className="text-center py-12"><p className="text-gray-500">No se encontraron vehículos</p></div>
        ) : (
          <>
            <GenericTable columns={columns} data={paginatedVehicles} onEdit={handleEdit} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
            {totalPages > 1 && <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>}
          </>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SearchableSelect
            label="Empresa"
            options={companyOptions}
            value={formData.companyId}
            onChange={(value) => handleCompanyChange(Number(value))}
            placeholder="Seleccionar empresa"
            required
          />
          <SearchableSelect
            label="Recolector (Opcional)"
            options={collectorOptions}
            value={formData.collectorId}
            onChange={(value) => setFormData({ ...formData, collectorId: Number(value) })}
            placeholder="Seleccionar recolector"
            disabled={!formData.companyId || filteredCollectors.length === 0}
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Placa</label>
            <input type="text" value={formData.plate} onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
            <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" required placeholder="Ej: Volquete, Camión" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Capacidad (m³)</label>
            <input type="number" step="0.01" value={formData.capacityM3 || ''} onChange={(e) => setFormData({ ...formData, capacityM3: Number(e.target.value) || 0 })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" required min="0" />
          </div>
          <ImageDropZone value={formData.photoUrl} onChange={(base64) => setFormData({ ...formData, photoUrl: base64 })} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none bg-white">
              <option value="DISPONIBLE">Disponible</option>
              <option value="EN_SERVICIO">En Servicio</option>
              <option value="MANTENIMIENTO">Mantenimiento</option>
              <option value="INACTIVO">Inactivo</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-[#5C8F2B] text-white py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors">{selectedVehicle ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
