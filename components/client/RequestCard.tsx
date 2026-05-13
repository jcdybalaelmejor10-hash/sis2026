'use client';

import { ServiceRequest } from '@/services/requestService';

interface RequestCardProps {
  request: ServiceRequest;
  onConfirm?: (id: number) => void;
}

export default function RequestCard({ request, onConfirm }: RequestCardProps) {
  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    REGISTRADO: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Registrado' },
    ASIGNADO: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Asignado' },
    EN_PROCESO: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'En Proceso' },
    FINALIZADO: { bg: 'bg-green-100', text: 'text-green-700', label: 'Finalizado' },
    CANCELADO: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelado' },
  };

  const status = statusColors[request.status] || statusColors.REGISTRADO;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border-l-4 border-[#5C8F2B]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{request.serviceType}</h3>
          <p className="text-sm text-gray-600">{request.district}</p>
        </div>
        <span className={`${status.bg} ${status.text} px-3 py-1 rounded-full text-xs font-bold`}>
          {status.label}
        </span>
      </div>

      {request.description && (
        <p className="text-sm text-gray-600 mb-3">{request.description}</p>
      )}

      {request.companyService && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-3 flex items-center justify-between border border-green-100">
          <span className="text-sm text-gray-600">Costo referencial</span>
          <span className="text-lg font-bold text-[#5C8F2B]">Bs. {request.companyService.priceRef}</span>
        </div>
      )}

      {request.assignment && (
        <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-1">
          {request.assignment.company && (
            <div className="flex items-center space-x-2 text-sm">
              <svg className="w-4 h-4 text-[#5C8F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-gray-700 font-medium">{request.assignment.company.name}</span>
            </div>
          )}
          {request.assignment.collector && (
            <div className="flex items-center space-x-2 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-600">{request.assignment.collector.name}</span>
            </div>
          )}
          {request.assignment.vehicle && (
            <div className="flex items-center space-x-2 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <span className="text-gray-600">{request.assignment.vehicle.plate}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{new Date(request.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        {request.status === 'FINALIZADO' && !request.confirmedByUser && onConfirm && (
          <button
            onClick={() => onConfirm(request.id)}
            className="bg-[#5C8F2B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4A7322] transition-colors"
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
}
