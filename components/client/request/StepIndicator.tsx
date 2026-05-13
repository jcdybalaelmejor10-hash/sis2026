'use client';

const STEP_LABELS = ['Ubicación', 'Mapa', 'Empresa', 'Detalles', 'Confirmar'];

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

interface StepIndicatorProps {
  step: number;
  variant?: 'compact' | 'full';
}

export default function StepIndicator({ step, variant = 'compact' }: StepIndicatorProps) {
  if (variant === 'full') {
    return (
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all ${
                i + 1 < step ? 'bg-[#5C8F2B] text-white' : i + 1 === step ? 'bg-[#5C8F2B] text-white ring-4 ring-[#5C8F2B]/20' : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1 < step ? <CheckIcon size={16} /> : i + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${i + 1 <= step ? 'text-[#5C8F2B]' : 'text-gray-400'}`}>{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && <div className={`w-12 lg:w-20 h-0.5 mx-1 mb-4 ${i + 1 < step ? 'bg-[#5C8F2B]' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1">
      {STEP_LABELS.map((_, i) => (
        <div key={i} className="flex items-center">
          <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
            i + 1 < step ? 'bg-[#5C8F2B] text-white' : i + 1 === step ? 'bg-[#5C8F2B] text-white ring-4 ring-[#5C8F2B]/20' : 'bg-gray-200 text-gray-500'
          }`}>
            {i + 1 < step ? <CheckIcon size={12} /> : i + 1}
          </div>
          {i < STEP_LABELS.length - 1 && <div className={`w-6 h-0.5 mx-0.5 ${i + 1 < step ? 'bg-[#5C8F2B]' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  );
}
