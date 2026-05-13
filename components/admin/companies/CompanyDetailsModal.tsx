'use client';

import Modal from '@/components/base/Modal';

interface CompanyDetailsProps {
  company: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyDetailsModal({ company, isOpen, onClose }: CompanyDetailsProps) {
  if (!company) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Detalles de ${company.name}`}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">NIT</label>
            <p className="text-gray-900">{company.nit}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              company.status === 'ACTIVO' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {company.status}
            </span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{company.email}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
            <p className="text-gray-900">{company.phone}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección</label>
            <p className="text-gray-900">{company.address || 'No especificada'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Capacidad Operativa</label>
            <p className="text-gray-900 font-semibold text-[#5C8F2B]">{company.operativeCapacity}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Persona de Contacto</label>
            <p className="text-gray-900">{company.contactPersonName}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Contacto</label>
            <p className="text-gray-900">{company.contactPersonWhatsapp}</p>
          </div>
        </div>

        {company.coverageZones && company.coverageZones.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Zonas de Cobertura</h3>
            <div className="flex flex-wrap gap-2">
              {company.coverageZones.map((zone: any) => (
                <span key={zone.id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {zone.district}
                </span>
              ))}
            </div>
          </div>
        )}

        {company.collectors && company.collectors.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recolectores ({company.collectors.length})</h3>
            <div className="space-y-2">
              {company.collectors.map((collector: any) => (
                <div key={collector.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{collector.name}</p>
                    <p className="text-sm text-gray-500">CI: {collector.carnetIdentidad}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    collector.status === 'DISPONIBLE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {collector.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {company.vehicles && company.vehicles.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehículos ({company.vehicles.length})</h3>
            <div className="space-y-2">
              {company.vehicles.map((vehicle: any) => (
                <div key={vehicle.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{vehicle.plate}</p>
                    <p className="text-sm text-gray-500">{vehicle.type} - {vehicle.capacityM3}m³</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    vehicle.status === 'DISPONIBLE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {company.offeredServices && company.offeredServices.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Servicios Ofrecidos</h3>
            <div className="space-y-2">
              {company.offeredServices.map((service: any) => (
                <div key={service.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{service.serviceType}</p>
                  {service.description && <p className="text-sm text-gray-600">{service.description}</p>}
                  {service.priceRef && <p className="text-sm text-[#5C8F2B] font-semibold">Bs {service.priceRef}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}
