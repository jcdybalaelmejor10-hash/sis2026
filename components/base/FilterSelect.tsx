'use client';

import { useState, useRef, useEffect } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  label?: string;
}

export default function FilterSelect({ value, onChange, options, label }: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);
  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setSearch('');
    setOpen(false);
  };

  return (
    <div className="flex flex-col space-y-1" ref={ref}>
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => { setOpen(!open); setSearch(''); }}
          className="w-full min-w-[180px] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none transition-all bg-white text-left text-sm flex items-center justify-between"
        >
          <span className={selected?.value ? 'text-gray-900' : 'text-gray-500'}>
            {selected?.label || 'Seleccionar'}
          </span>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b">
              <input
                autoFocus
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-[#5C8F2B] outline-none"
              />
            </div>
            <div className="overflow-y-auto max-h-44">
              {filtered.length === 0 ? (
                <p className="px-4 py-2 text-sm text-gray-400">Sin resultados</p>
              ) : (
                filtered.map(o => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => handleSelect(o.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#5C8F2B]/10 transition ${o.value === value ? 'bg-[#5C8F2B]/10 text-[#5C8F2B] font-semibold' : 'text-gray-700'}`}
                  >
                    {o.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
