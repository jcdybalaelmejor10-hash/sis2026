'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClientHeader from '@/components/client/layout/ClientHeader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'CLIENTE') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />
      <main className="pb-20">
        {children}
      </main>
    </div>
  );
}
