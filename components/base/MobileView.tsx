'use client';

import { ReactNode } from 'react';

interface MobileViewProps {
  children: ReactNode;
  className?: string;
}

export default function MobileView({ children, className = '' }: MobileViewProps) {
  return (
    <div className={`block md:hidden ${className}`}>
      {children}
    </div>
  );
}
