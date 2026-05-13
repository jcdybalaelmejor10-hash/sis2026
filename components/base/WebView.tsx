'use client';

import { ReactNode } from 'react';

interface WebViewProps {
  children: ReactNode;
  className?: string;
}

export default function WebView({ children, className = '' }: WebViewProps) {
  return (
    <div className={`hidden md:block ${className}`}>
      {children}
    </div>
  );
}
