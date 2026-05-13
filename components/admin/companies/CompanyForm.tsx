'use client';

import { useState, useEffect } from 'react';

interface Company {
  id?: number;
  name: string;
  nit: string;
  email: string;
  phone: string;
  address?: string;
  contactPersonName: string;
  contactPersonWhatsapp: string;
  operativeCapacity: number;
  status: string;
}

interface CompanyFormProps {
  company?: Company | null;
  onSubmit: (company: Company) => void;
  onCancel: () => void;
}

export default function CompanyForm({ company, onSubmit, onCancel }: CompanyFormProps) {
  const [formData, setFormData] = useState<Company>({
    name: '',
    nit: '',
    email: '',
    phone: '',
    address: '',
    contactPersonName: '',
    contactPersonWhatsapp: '',
    operativeCapacity: 1,
    status: 'ACTIVO',
  });

  useEffect(() => {
    if (company) {
      setFormData(company);
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de la Empresa</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">NIT</label>
          <input
            type="text"
            value={formData.nit}
            onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Persona de Contacto</label>
          <input
            type="text"
            value={formData.contactPersonName}
            onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none"
            placeholder="Nombre completo"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Contacto</label>
          <input
            type="tel"
            value={formData.contactPersonWhatsapp}
            onChange={(e) => setFormData({ ...formData, contactPersonWhatsapp: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none"
            placeholder="Ej: +591 70000000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Capacidad Operativa</label>
          <input
            type="number"
            value={formData.operativeCapacity || ''}
            onChange={(e) => setFormData({ ...formData, operativeCapacity: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none bg-white"
          >
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-[#5C8F2B] text-white py-3 rounded-lg font-semibold hover:bg-[#4A7322] transition-colors"
        >
          {company ? 'Actualizar' : 'Crear'} Empresa
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
