'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { requestService, ServiceRequest } from '@/services/requestService';
import RequestCard from '@/components/client/RequestCard';

export default function RequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await requestService.getMyRequests();
      setRequests(data.filter(r => r.status !== 'FINALIZADO' && r.status !== 'CANCELADO'));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar las solicitudes',
        confirmButtonColor: '#5C8F2B',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id: number) => {
    try {
      await requestService.confirm(id);
      Swal.fire({
        icon: 'success',
        title: '¡Confirmado!',
        text: 'Has confirmado la finalización del servicio',
        confirmButtonColor: '#5C8F2B',
      });
      loadRequests();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo confirmar la solicitud',
        confirmButtonColor: '#5C8F2B',
      });
    }
  };

  const filteredRequests = filter === 'ALL' 
    ? requests 
    : requests.filter(r => r.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C8F2B]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#5C8F2B] to-[#4A7322] text-white px-4 py-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => router.back()} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Mis Solicitudes</h1>
            <div className="w-6"></div>
          </div>
          <p className="text-[#9ACD32] text-sm">{requests.length} solicitudes activas</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filtros */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {[
            { value: 'ALL', label: 'Todas' },
            { value: 'REGISTRADO', label: 'Registradas' },
            { value: 'ASIGNADO', label: 'Asignadas' },
            { value: 'EN_PROCESO', label: 'En Proceso' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                filter === f.value
                  ? 'bg-[#5C8F2B] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Lista de solicitudes */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">No tienes solicitudes activas</p>
            <button
              onClick={() => router.push('/dashboard/client/new-request')}
              className="bg-[#5C8F2B] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4A7322] transition-colors"
            >
              Crear nueva solicitud
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <RequestCard key={request.id} request={request} onConfirm={handleConfirm} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
