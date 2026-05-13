'use client';

import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { requestService, ServiceRequest } from '@/services/requestService';
import SearchBar from '@/components/base/SearchBar';
import FilterSelect from '@/components/base/FilterSelect';
import Pagination from '@/components/base/Pagination';
import Modal from '@/components/base/Modal';

const STATUSES = [
  { value: 'REGISTRADO', label: 'Registrado', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'ASIGNADO', label: 'Asignado', color: 'bg-blue-100 text-blue-700' },
  { value: 'EN_PROCESO', label: 'En Proceso', color: 'bg-purple-100 text-purple-700' },
  { value: 'FINALIZADO', label: 'Finalizado', color: 'bg-green-100 text-green-700' },
  { value: 'CANCELADO', label: 'Cancelado', color: 'bg-red-100 text-red-700' },
];

const PRIORITIES = [
  { value: 'BAJA', label: 'Baja', color: 'bg-gray-100 text-gray-700' },
  { value: 'MEDIA', label: 'Media', color: 'bg-blue-100 text-blue-700' },
  { value: 'ALTA', label: 'Alta', color: 'bg-orange-100 text-orange-700' },
  { value: 'URGENTE', label: 'Urgente', color: 'bg-red-100 text-red-700' },
];

const badge = (value: string, list: typeof STATUSES) => {
  const opt = list.find(s => s.value === value);
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${opt?.color || 'bg-gray-100 text-gray-700'}`}>{opt?.label || value}</span>;
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [priorityFilter, setPriorityFilter] = useState('TODOS');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Asignación
  const [assignModal, setAssignModal] = useState(false);
  const [selReq, setSelReq] = useState<ServiceRequest | null>(null);
  const [resources, setResources] = useState<{ collectors: any[]; vehicles: any[] }>({ collectors: [], vehicles: [] });
  const [collectorId, setCollectorId] = useState(0);
  const [vehicleId, setVehicleId] = useState(0);
  const [priority, setPriority] = useState('');
  const [notes, setNotes] = useState('');
  const [loadingRes, setLoadingRes] = useState(false);
  const [suggestedVehicleId, setSuggestedVehicleId] = useState(0);
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
  const vehicleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (vehicleDropdownRef.current && !vehicleDropdownRef.current.contains(e.target as Node)) setVehicleDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Detalle
  const [detailModal, setDetailModal] = useState(false);
  const [detail, setDetail] = useState<ServiceRequest | null>(null);

  const PER_PAGE = 10;

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setRequests(await requestService.getAll());
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar las solicitudes', confirmButtonColor: '#5C8F2B' });
    } finally {
      setLoading(false);
    }
  };

  const filtered = requests.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = r.address.toLowerCase().includes(q) || r.user?.name?.toLowerCase().includes(q) || r.serviceType.toLowerCase().includes(q) || r.district.toLowerCase().includes(q);
    const rDate = r.createdAt?.slice(0, 10) || '';
    const matchDate = (!dateFrom || rDate >= dateFrom) && (!dateTo || rDate <= dateTo);
    return matchSearch && matchDate && (statusFilter === 'TODOS' || r.status === statusFilter) && (priorityFilter === 'TODOS' || r.priority === priorityFilter);
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  // --- Cambio de estado ---
  const handleStatusChange = async (id: number, newStatus: string) => {
    const { value: n } = await Swal.fire({
      title: `Cambiar a ${STATUSES.find(s => s.value === newStatus)?.label}`,
      input: 'textarea', inputLabel: 'Notas (opcional)',
      showCancelButton: true, confirmButtonColor: '#5C8F2B', cancelButtonText: 'Cancelar', confirmButtonText: 'Actualizar',
    });
    if (n === undefined) return;
    try {
      await requestService.updateStatus(id, newStatus, n || undefined);
      await loadData();
      Swal.fire({ icon: 'success', title: '¡Estado actualizado!', confirmButtonColor: '#5C8F2B', timer: 2000 });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
    }
  };

  // --- Cambio de prioridad ---
  const handlePriorityChange = async (req: ServiceRequest, newPriority: string) => {
    try {
      await requestService.updatePriority(req.id, newPriority);
      await loadData();
      Swal.fire({ icon: 'success', title: '¡Prioridad actualizada!', confirmButtonColor: '#5C8F2B', timer: 2000 });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
    }
  };

  // --- Obtener transiciones de estado permitidas ---
  const getAllowedStatuses = (currentStatus: string) => {
    switch (currentStatus) {
      case 'REGISTRADO': return []; // No se puede cambiar desde registrado
      case 'ASIGNADO': return ['EN_PROCESO', 'CANCELADO'];
      case 'EN_PROCESO': return ['FINALIZADO', 'CANCELADO'];
      default: return []; // FINALIZADO y CANCELADO no cambian
    }
  };

  // --- Abrir modal de asignación ---
  // --- Auto-seleccionar conductor del vehículo ---
  const handleVehicleSelect = (vId: number) => {
    setVehicleId(vId);
    setVehicleDropdownOpen(false);
    setVehicleSearch('');
    const vehicle = resources.vehicles.find((v: any) => v.id === vId);
    if (vehicle?.collector) {
      setCollectorId(vehicle.collector.id);
    } else {
      setCollectorId(0);
    }
  };

  const openAssign = async (req: ServiceRequest) => {
    setSelReq(req);
    setCollectorId(req.assignment?.collectorId || 0);
    setVehicleId(req.assignment?.vehicleId || 0);
    setPriority(req.priority);
    setNotes('');
    setSuggestedVehicleId(0);
    setResources({ collectors: [], vehicles: [] });
    setAssignModal(true);

    const companyId = req.assignment?.companyId;
    if (companyId) {
      await loadResources(companyId, Number(req.estimatedM3) || 0);
    }
  };

  const loadResources = async (companyId: number, estM3: number) => {
    try {
      setLoadingRes(true);
      const res = await requestService.getCompanyResources(companyId);
      setResources(res);

      // Sugerir el vehículo con capacidad más cercana al estimado (pero >= estimado)
      if (estM3 > 0 && res.vehicles.length > 0) {
        const suitable = res.vehicles
          .filter((v: any) => Number(v.capacityM3) >= estM3)
          .sort((a: any, b: any) => Number(a.capacityM3) - Number(b.capacityM3));
        if (suitable.length > 0) {
          setSuggestedVehicleId(suitable[0].id);
          setVehicleId(suitable[0].id);
        }
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Error al cargar recursos', confirmButtonColor: '#5C8F2B' });
    } finally {
      setLoadingRes(false);
    }
  };

  const filterBySearch = (list: any[]) => {
    if (!vehicleSearch) return list;
    const q = vehicleSearch.toLowerCase();
    return list.filter((v: any) => v.plate.toLowerCase().includes(q) || v.type.toLowerCase().includes(q) || v.collector?.name?.toLowerCase().includes(q));
  };

  const suitableVehicles = resources.vehicles.filter((v: any) =>
    !selReq?.estimatedM3 || Number(v.capacityM3) >= Number(selReq.estimatedM3)
  );
  const unsuitableVehicles = resources.vehicles.filter((v: any) =>
    selReq?.estimatedM3 && Number(v.capacityM3) < Number(selReq.estimatedM3)
  );
  const filteredSuitable = filterBySearch(suitableVehicles);
  const filteredUnsuitable = filterBySearch(unsuitableVehicles);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selReq) return;
    const companyId = selReq.assignment?.companyId;
    if (!companyId || !vehicleId) {
      Swal.fire({ icon: 'warning', title: 'Selecciona un vehículo', confirmButtonColor: '#5C8F2B' });
      return;
    }
    try {
      await requestService.assign(selReq.id, { companyId, collectorId: collectorId || undefined, vehicleId, priority, notes: notes || undefined });
      await loadData();
      setAssignModal(false);
      Swal.fire({ icon: 'success', title: '¡Solicitud asignada!', confirmButtonColor: '#5C8F2B', timer: 2000 });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error al asignar', confirmButtonColor: '#5C8F2B' });
    }
  };

  // --- Detalle ---
  const openDetail = async (id: number) => {
    try {
      setDetail(await requestService.getById(id));
      setDetailModal(true);
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', confirmButtonColor: '#5C8F2B' });
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C8F2B]"></div></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#2F3437]">Gestión de Solicitudes</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Buscar por dirección, cliente, tipo o distrito..." /></div>
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={[{ value: 'TODOS', label: 'Todos los estados' }, ...STATUSES.map(s => ({ value: s.value, label: s.label }))]} />
          <FilterSelect value={priorityFilter} onChange={setPriorityFilter} options={[{ value: 'TODOS', label: 'Todas las prioridades' }, ...PRIORITIES.map(p => ({ value: p.value, label: p.label }))]} />
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-700">Desde</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} autoComplete="off"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none text-sm" />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-700">Hasta</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} autoComplete="off"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none text-sm" />
          </div>
        </div>

        {paginated.length === 0 ? (
          <div className="text-center py-12"><p className="text-gray-500">No se encontraron solicitudes</p></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['ID', 'Cliente', 'Servicio', 'Costo', 'Dirección', 'm³', 'Empresa', 'Fecha', 'Prioridad', 'Estado', 'Vehículo', 'Acciones'].map(h => (
                      <th key={h} className="px-3 py-3 text-left text-xs font-bold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginated.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 text-sm font-mono">#{r.id}</td>
                      <td className="px-3 py-3 text-sm">{r.user?.name || 'N/A'}</td>
                      <td className="px-3 py-3 text-sm">{r.serviceType}</td>
                      <td className="px-3 py-3 text-sm">
                        {r.companyService?.priceRef ? (
                          <span className="font-bold text-[#5C8F2B]">Bs. {r.companyService.priceRef}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-sm max-w-[160px] truncate" title={r.address}>{r.district}</td>
                      <td className="px-3 py-3 text-sm">{r.estimatedM3 ? `${r.estimatedM3}` : '-'}</td>
                      <td className="px-3 py-3 text-sm">
                        {r.assignment?.company?.name ? (
                          <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">{r.assignment.company.name}</span>
                        ) : (
                          <span className="text-xs text-gray-400">Sin empresa</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 whitespace-nowrap">{r.createdAt?.slice(0, 10)}</td>
                      <td className="px-3 py-3">
                        <select value={r.priority} onChange={(e) => handlePriorityChange(r, e.target.value)} autoComplete="off" className="text-xs border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-[#5C8F2B]">
                          {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-3">
                        {getAllowedStatuses(r.status).length > 0 ? (
                          <select value={r.status} onChange={(e) => handleStatusChange(r.id, e.target.value)} autoComplete="off" className="text-xs border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-[#5C8F2B]">
                            <option value={r.status}>{STATUSES.find(s => s.value === r.status)?.label}</option>
                            {getAllowedStatuses(r.status).map(s => {
                              const st = STATUSES.find(x => x.value === s);
                              return <option key={s} value={s}>{st?.label}</option>;
                            })}
                          </select>
                        ) : (
                          badge(r.status, STATUSES)
                        )}
                      </td>
                      <td className="px-3 py-3 text-sm">
                        {r.assignment?.vehicle ? (
                          <span className="text-xs text-blue-700 font-semibold">{r.assignment.vehicle.plate} ({r.assignment.vehicle.capacityM3}m³)</span>
                        ) : (
                          <span className="text-xs text-gray-400">Sin asignar</span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center space-x-1">
                          <button onClick={() => openDetail(r.id)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg" title="Ver detalle">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          {!['EN_PROCESO', 'FINALIZADO', 'CANCELADO'].includes(r.status) && (
                            <button onClick={() => openAssign(r)} className="p-1.5 hover:bg-green-50 text-green-600 rounded-lg" title="Asignar vehículo y recolector">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h-3m3 0h2m-2 0a2 2 0 012 2m0-2V8h3l3 4v4h-2a2 2 0 01-2 2m0 0a2 2 0 01-2-2M5 17a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>}
          </>
        )}
      </div>

      {/* Modal Asignación */}
      <Modal isOpen={assignModal} onClose={() => setAssignModal(false)} title={`Asignar Solicitud #${selReq?.id}`}>
        {selReq && (
          <form onSubmit={handleAssign} className="space-y-4" autoComplete="off">
            {/* Info de la solicitud */}
            <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
              <div className="flex justify-between"><span className="text-gray-500">Cliente:</span><span className="font-semibold">{selReq.user?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Servicio:</span><span className="font-semibold">{selReq.serviceType}</span></div>
              {selReq.companyService?.priceRef && <div className="flex justify-between"><span className="text-gray-500">Costo referencial:</span><span className="font-bold text-[#5C8F2B]">Bs. {selReq.companyService.priceRef}</span></div>}
              <div className="flex justify-between"><span className="text-gray-500">Dirección:</span><span className="font-semibold truncate max-w-[60%]">{selReq.district} - {selReq.address}</span></div>
              {selReq.estimatedM3 && <div className="flex justify-between"><span className="text-gray-500">Volumen estimado:</span><span className="font-bold text-[#5C8F2B]">{String(selReq.estimatedM3)} m³</span></div>}
            </div>

            {/* Empresa pre-asignada */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
              <span className="text-green-600">Empresa seleccionada por el cliente:</span>
              <p className="font-bold text-green-800 text-base">{selReq.assignment?.company?.name || 'Sin empresa asignada'}</p>
            </div>

            {!selReq.assignment?.companyId && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                Esta solicitud no tiene empresa asignada. El cliente no seleccionó empresa al crearla.
              </div>
            )}

            {loadingRes ? (
              <div className="text-center py-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5C8F2B] mx-auto"></div></div>
            ) : selReq.assignment?.companyId ? (
              <>
                {/* Vehículo con buscador */}
                <div ref={vehicleDropdownRef} className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h-3m3 0h2m-2 0a2 2 0 012 2m0-2V8h3l3 4v4h-2a2 2 0 01-2 2m0 0a2 2 0 01-2-2M5 17a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                    Vehículo disponible
                    {selReq.estimatedM3 ? <span className="text-gray-400 font-normal"> (capacidad ≥ {String(selReq.estimatedM3)} m³)</span> : ''}
                  </label>
                  <div
                    onClick={() => setVehicleDropdownOpen(!vehicleDropdownOpen)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between bg-white hover:border-[#5C8F2B] transition-colors"
                  >
                    {vehicleId > 0 ? (
                      (() => {
                        const v = resources.vehicles.find((v: any) => v.id === vehicleId);
                        return v ? (
                          <span className="text-gray-800 text-sm">{v.plate} — {v.type} ({v.capacityM3} m³)</span>
                        ) : <span className="text-gray-400 text-sm">Buscar vehículo...</span>;
                      })()
                    ) : (
                      <span className="text-gray-400 text-sm">Buscar vehículo...</span>
                    )}
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${vehicleDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  {vehicleDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                      <div className="p-2 border-b">
                        <div className="relative">
                          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                          <input
                            type="text"
                            value={vehicleSearch}
                            onChange={(e) => setVehicleSearch(e.target.value)}
                            placeholder="Buscar por placa, tipo o conductor..."
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none"
                            autoComplete="off"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="max-h-52 overflow-y-auto">
                        {filteredSuitable.length === 0 && filteredUnsuitable.length === 0 ? (
                          <p className="p-3 text-sm text-gray-400 text-center">Sin resultados</p>
                        ) : (
                          <>
                            {filteredSuitable.length > 0 && (
                              <>
                                <div className="px-3 py-1.5 text-xs font-bold text-green-700 bg-green-50 flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                  Capacidad suficiente
                                </div>
                                {filteredSuitable.map((v: any) => (
                                  <div
                                    key={v.id}
                                    onClick={() => handleVehicleSelect(v.id)}
                                    className={`px-4 py-2.5 cursor-pointer hover:bg-green-50 transition-colors flex items-center justify-between ${vehicleId === v.id ? 'bg-green-50 border-l-4 border-[#5C8F2B]' : ''}`}
                                  >
                                    <div>
                                      <span className="font-medium text-gray-800 text-sm">{v.plate} — {v.type}</span>
                                      {v.collector && (
                                        <span className="text-xs text-gray-500 ml-2 inline-flex items-center gap-0.5">
                                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                          {v.collector.name}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-[#5C8F2B]">{v.capacityM3} m³</span>
                                      {v.id === suggestedVehicleId && (
                                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </>
                            )}
                            {filteredUnsuitable.length > 0 && (
                              <>
                                <div className="px-3 py-1.5 text-xs font-bold text-orange-700 bg-orange-50 flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                                  Capacidad insuficiente
                                </div>
                                {filteredUnsuitable.map((v: any) => (
                                  <div
                                    key={v.id}
                                    onClick={() => handleVehicleSelect(v.id)}
                                    className={`px-4 py-2.5 cursor-pointer hover:bg-orange-50 transition-colors flex items-center justify-between opacity-70 ${vehicleId === v.id ? 'bg-orange-50 border-l-4 border-orange-400' : ''}`}
                                  >
                                    <div>
                                      <span className="font-medium text-gray-800 text-sm">{v.plate} — {v.type}</span>
                                      {v.collector && (
                                        <span className="text-xs text-gray-500 ml-2 inline-flex items-center gap-0.5">
                                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                          {v.collector.name}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-xs font-bold text-orange-600">{v.capacityM3} m³</span>
                                  </div>
                                ))}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {suggestedVehicleId > 0 && !vehicleDropdownOpen && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      Se sugiere el vehículo con capacidad más ajustada al volumen estimado.
                    </p>
                  )}
                  {resources.vehicles.length === 0 && <p className="text-xs text-red-500 mt-1">No hay vehículos disponibles</p>}
                </div>

                {/* Conductor (auto-poblado del vehículo) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Conductor asignado al vehículo
                  </label>
                  {vehicleId > 0 ? (
                    (() => {
                      const v = resources.vehicles.find((v: any) => v.id === vehicleId);
                      return v?.collector ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-green-800 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          {v.collector.name}
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2.5 text-sm text-yellow-700 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                          Este vehículo no tiene conductor asignado
                        </div>
                      );
                    })()
                  ) : (
                    <p className="text-xs text-gray-400">Selecciona un vehículo primero</p>
                  )}
                </div>
              </>
            ) : null}

            {/* Prioridad */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Prioridad</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} autoComplete="off" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none bg-white">
                {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>

            {/* Notas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notas</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} autoComplete="off" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none" rows={2} placeholder="Notas opcionales..." />
            </div>

            <div className="flex space-x-3 pt-4">
              <button type="submit" disabled={!selReq.assignment?.companyId} className="flex-1 bg-[#5C8F2B] text-white py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors disabled:opacity-50">Asignar</button>
              <button type="button" onClick={() => setAssignModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancelar</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal Detalle */}
      <Modal isOpen={detailModal} onClose={() => setDetailModal(false)} title={`Detalle Solicitud #${detail?.id}`}>
        {detail && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><span className="font-semibold text-gray-600">Cliente:</span> {detail.user?.name}</div>
              <div><span className="font-semibold text-gray-600">Email:</span> {detail.user?.email}</div>
              <div><span className="font-semibold text-gray-600">Teléfono:</span> {detail.user?.phone || 'N/A'}</div>
              <div><span className="font-semibold text-gray-600">Servicio:</span> {detail.serviceType}</div>
              <div><span className="font-semibold text-gray-600">Costo:</span> {detail.companyService?.priceRef ? <span className="font-bold text-[#5C8F2B]">Bs. {detail.companyService.priceRef}</span> : 'N/A'}</div>
              <div><span className="font-semibold text-gray-600">Dirección:</span> {detail.address}</div>
              <div><span className="font-semibold text-gray-600">Distrito:</span> {detail.district}</div>
              <div><span className="font-semibold text-gray-600">Volumen:</span> {detail.estimatedM3 ? `${detail.estimatedM3} m³` : 'N/A'}</div>
              <div><span className="font-semibold text-gray-600">Fecha:</span> {new Date(detail.createdAt).toLocaleString()}</div>
              <div>{badge(detail.status, STATUSES)}</div>
              <div>{badge(detail.priority, PRIORITIES)}</div>
            </div>

            {detail.description && (
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="font-semibold text-gray-600">Descripción:</span> {detail.description}
              </div>
            )}

            {detail.assignment && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-semibold text-green-800 mb-2">Asignación</p>
                <div className="grid grid-cols-2 gap-2 text-green-700">
                  <div>Empresa: {detail.assignment.company?.name || 'N/A'}</div>
                  <div>Recolector: {detail.assignment.collector?.name || 'Pendiente'}</div>
                  <div>Vehículo: {detail.assignment.vehicle?.plate || 'Pendiente'}</div>
                  <div>Capacidad: {detail.assignment.vehicle?.capacityM3 || '-'} m³</div>
                </div>
              </div>
            )}

            {detail.statusLogs && detail.statusLogs.length > 0 && (
              <div>
                <p className="font-semibold text-gray-600 mb-2">Historial de Estados</p>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {detail.statusLogs.map((log) => (
                    <div key={log.id} className="flex justify-between text-xs bg-gray-50 rounded px-3 py-2">
                      <span>{badge(log.status, STATUSES)}</span>
                      <span className="text-gray-500">{log.notes || ''}</span>
                      <span className="text-gray-400">{new Date(log.changedAt).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detail.photos && detail.photos.length > 0 && (
              <div>
                <p className="font-semibold text-gray-600 mb-2">Fotos</p>
                <div className="flex gap-2 flex-wrap">
                  {detail.photos.map((p) => <img key={p.id} src={p.url} alt="Foto" className="w-20 h-20 object-cover rounded-lg border" />)}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
