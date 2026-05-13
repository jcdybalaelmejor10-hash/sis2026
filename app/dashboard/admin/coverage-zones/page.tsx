'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import { coverageZoneService, CoverageZone } from '@/services/coverageZoneService';
import { companyService } from '@/services/companyService';
import GenericTable from '@/components/base/GenericTable';
import SearchBar from '@/components/base/SearchBar';
import FilterSelect from '@/components/base/FilterSelect';
import Pagination from '@/components/base/Pagination';
import Modal from '@/components/base/Modal';
import SearchableSelect from '@/components/base/SearchableSelect';

const CoverageZoneMap = dynamic(() => import('@/components/maps/CoverageZoneMap'), { ssr: false });

export default function CoverageZonesPage() {
  const [zones, setZones] = useState<CoverageZone[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<CoverageZone | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    companyId: 0, 
    district: '', 
    province: '', 
    region: '', 
    latitude: -12.0464, 
    longitude: -77.0428, 
    coverageRadiusM: 1000 
  });

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [zonesData, companiesData] = await Promise.all([
        coverageZoneService.getAll(),
        companyService.getAll()
      ]);
      setZones(zonesData);
      setCompanies(companiesData);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los datos', confirmButtonColor: '#5C8F2B' });
    } finally {
      setLoading(false);
    }
  };

  const filteredZones = zones.filter((z) => {
    const matchSearch = z.district.toLowerCase().includes(search.toLowerCase()) || (z.province && z.province.toLowerCase().includes(search.toLowerCase()));
    const matchCompany = companyFilter === 'TODOS' || z.companyId === Number(companyFilter);
    return matchSearch && matchCompany;
  });

  const totalPages = Math.ceil(filteredZones.length / ITEMS_PER_PAGE);
  const paginatedZones = filteredZones.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCreate = () => {
    setSelectedZone(null);
    setFormData({ companyId: 0, district: '', province: '', region: '', latitude: -12.0464, longitude: -77.0428, coverageRadiusM: 1000 });
    setIsModalOpen(true);
  };

  const handleEdit = (zone: CoverageZone) => {
    setSelectedZone(zone);
    setFormData({ 
      companyId: zone.companyId, 
      district: zone.district, 
      province: zone.province || '', 
      region: zone.region || '',
      latitude: zone.latitude,
      longitude: zone.longitude,
      coverageRadiusM: zone.coverageRadiusM
    });
    setIsModalOpen(true);
  };

  const handleViewMap = (zone: CoverageZone) => {
    setSelectedZone(zone);
    setFormData({ 
      companyId: zone.companyId, 
      district: zone.district, 
      province: zone.province || '', 
      region: zone.region || '',
      latitude: zone.latitude,
      longitude: zone.longitude,
      coverageRadiusM: zone.coverageRadiusM
    });
    setIsMapModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'La zona será eliminada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5C8F2B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await coverageZoneService.delete(id);
        await loadData();
        Swal.fire({ icon: 'success', title: '¡Eliminada!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedZone) {
        await coverageZoneService.update(selectedZone.id, formData);
        Swal.fire({ icon: 'success', title: '¡Actualizada!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      } else {
        await coverageZoneService.create(formData);
        Swal.fire({ icon: 'success', title: '¡Creada!', confirmButtonColor: '#5C8F2B', timer: 2000 });
      }
      await loadData();
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C8F2B]"></div></div>;

  const columns = [
    { key: 'district', label: 'Distrito' },
    { key: 'province', label: 'Provincia', render: (v: any) => v || 'N/A' },
    { key: 'region', label: 'Región', render: (v: any) => v || 'N/A' },
    { key: 'company', label: 'Empresa', render: (v: any, item: any) => item.company?.name || 'N/A' },
    { key: 'coverageRadiusM', label: 'Radio (m)', render: (v: number) => `${v}m` },
  ];

  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#2F3437]">Zonas de Cobertura</h1>
        <button onClick={handleCreate} className="bg-[#5C8F2B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors">
          + Nueva Zona
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Buscar por distrito o provincia..." /></div>
          <FilterSelect value={companyFilter} onChange={setCompanyFilter} options={[{ value: 'TODOS', label: 'Todas las empresas' }, ...companies.map(c => ({ value: c.id.toString(), label: c.name }))]} />
        </div>

        {paginatedZones.length === 0 ? (
          <div className="text-center py-12"><p className="text-gray-500">No se encontraron zonas</p></div>
        ) : (
          <>
            <GenericTable columns={columns} data={paginatedZones} onEdit={handleEdit} onDelete={handleDelete} onViewMap={handleViewMap} />
            {totalPages > 1 && <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>}
          </>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedZone ? 'Editar Zona' : 'Nueva Zona'}>
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Distrito</label>
            <input type="text" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Provincia</label>
            <input type="text" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Región</label>
            <input type="text" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Radio de Cobertura (metros)</label>
            <input 
              type="number" 
              value={formData.coverageRadiusM} 
              onChange={(e) => setFormData({ ...formData, coverageRadiusM: Number(e.target.value) })} 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" 
              min="100"
              step="100"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ubicación (click en el mapa o arrastra el marcador)</label>
            <CoverageZoneMap 
              latitude={formData.latitude} 
              longitude={formData.longitude} 
              coverageRadiusM={formData.coverageRadiusM}
              onLocationChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
              editable
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input 
                type="number" 
                value={formData.latitude} 
                onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) })} 
                placeholder="Latitud"
                step="0.00000001"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5C8F2B] outline-none" 
                required 
              />
              <input 
                type="number" 
                value={formData.longitude} 
                onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) })} 
                placeholder="Longitud"
                step="0.00000001"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5C8F2B] outline-none" 
                required 
              />
            </div>
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-[#5C8F2B] text-white py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors">{selectedZone ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancelar</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} title="Ubicación y Zona de Cobertura">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2"><strong>Distrito:</strong> {selectedZone?.district}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Empresa:</strong> {selectedZone?.company?.name}</p>
            <p className="text-sm text-gray-600 mb-4"><strong>Radio:</strong> {formData.coverageRadiusM}m</p>
          </div>
          <CoverageZoneMap 
            latitude={formData.latitude} 
            longitude={formData.longitude} 
            coverageRadiusM={formData.coverageRadiusM}
            editable={false}
          />
        </div>
      </Modal>
    </div>
  );
}
