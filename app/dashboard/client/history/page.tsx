'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { requestService, ServiceRequest } from '@/services/requestService';
import RequestCard from '@/components/client/RequestCard';

export default function HistoryPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await requestService.getMyRequests();
      setRequests(data.filter(r => r.status === 'FINALIZADO' || r.status === 'CANCELADO'));
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C8F2B]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => router.back()} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Historial</h1>
            <div className="w-6"></div>
          </div>
          <p className="text-purple-200 text-sm">{requests.length} servicios completados</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600">No tienes servicios completados</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
