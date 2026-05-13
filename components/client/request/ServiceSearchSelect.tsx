'use client';

import { useState, useEffect, useRef } from 'react';
import { CompanyServiceInfo } from '@/services/requestService';

interface ServiceSearchSelectProps {
  services: CompanyServiceInfo[];
  value: string;
  onChange: (v: string) => void;
}

export default function ServiceSearchSelect({ services, value, onChange }: ServiceSearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = services.filter(s => s.serviceType.toLowerCase().includes(search.toLowerCase()));
  const selected = services.find(s => s.serviceType === value);

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de servicio</label>
      <div
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl cursor-pointer flex items-center justify-between bg-white hover:border-[#5C8F2B] transition-colors"
      >
        <span className={selected ? 'text-gray-800' : 'text-gray-400'}>
          {selected ? `${selected.serviceType} — Bs. ${selected.priceRef}` : 'Buscar servicio...'}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar servicio..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] outline-none"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-3 text-sm text-gray-400 text-center">Sin resultados</p>
            ) : (
              filtered.map((s) => (
                <div
                  key={s.serviceType}
                  onClick={() => { onChange(s.serviceType); setOpen(false); setSearch(''); }}
                  className={`px-4 py-3 cursor-pointer hover:bg-green-50 transition-colors ${value === s.serviceType ? 'bg-green-50 border-l-4 border-[#5C8F2B]' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{s.serviceType}</span>
                    <span className="text-[#5C8F2B] font-bold">Bs. {s.priceRef}</span>
                  </div>
                  {s.description && <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
