'use client';

interface Company {
  id: number;
  name: string;
  nit: string;
  address?: string;
  email: string;
  phone: string;
  status: string;
  contactPersonName: string;
  contactPersonWhatsapp: string;
  operativeCapacity: number;
  _count?: { assignments: number };
}

interface CompaniesTableProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export default function CompaniesTable({ companies, onEdit, onDelete, onToggleStatus, onViewDetails }: CompaniesTableProps) {
  const getStatusBadge = (status: string) => {
    return status === 'ACTIVO' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Empresa</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">NIT</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Contacto</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Capacidad</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Estado</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-semibold text-[#2F3437]">{company.name}</p>
                <p className="text-sm text-gray-500">{company.address || 'Sin dirección'}</p>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{company.nit}</td>
              <td className="px-6 py-4">
                <p className="text-sm text-gray-600">{company.email}</p>
                <p className="text-sm text-gray-500">{company.phone}</p>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="font-semibold text-[#5C8F2B]">{company.operativeCapacity}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(company.status)}`}>
                  {company.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => onViewDetails(company.id)}
                    className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onEdit(company)}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onToggleStatus(company.id)}
                    className="p-2 hover:bg-yellow-50 text-yellow-600 rounded-lg transition-colors"
                    title="Cambiar estado"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(company.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
