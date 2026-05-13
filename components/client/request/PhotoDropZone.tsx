'use client';

import { useState, useRef, useCallback } from 'react';

interface PhotoDropZoneProps {
  label: string;
  value: string;
  onChange: (b64: string) => void;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PhotoDropZone({ label, value, onChange, required, size = 'sm' }: PhotoDropZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  }, [processFile]);

  const heights = { sm: 'h-28', md: 'h-36', lg: 'h-44' };

  return (
    <div className="flex-1 min-w-0">
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-2 text-center cursor-pointer transition-all ${heights[size]} flex items-center justify-center ${
          dragActive ? 'border-[#5C8F2B] bg-green-50' : 'border-gray-300 hover:border-[#5C8F2B]'
        }`}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} />
        {value ? (
          <div className="relative w-full h-full">
            <img src={value} alt={label} className="w-full h-full object-cover rounded-lg" />
            <button type="button" onClick={(e) => { e.stopPropagation(); onChange(''); }} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 shadow">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <p className="text-[10px]">Arrastra o clic</p>
          </div>
        )}
      </div>
    </div>
  );
}
