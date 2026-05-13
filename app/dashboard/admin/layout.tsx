'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminHeader from '@/components/admin/layout/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'ADMINISTRADOR') {
      router.push('/login');
    }
  }, [router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <AdminHeader toggleSidebar={toggleSidebar} />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
