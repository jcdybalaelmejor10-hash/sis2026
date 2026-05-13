'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { requestService } from '@/services/requestService';

export default function ClientDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ active: 0, completed: 0 });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const requests = await requestService.getMyRequests();
      setStats({
        active: requests.filter(r => r.status !== 'FINALIZADO' && r.status !== 'CANCELADO').length,
        completed: requests.filter(r => r.status === 'FINALIZADO').length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const menuItems = [
    {
      title: 'Nueva Solicitud',
      description: 'Solicita recojo de residuos',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      href: '/dashboard/client/new-request',
      color: 'from-[#5C8F2B] to-[#4A7322]',
      textColor: 'text-white',
    },
    {
      title: 'Mis Solicitudes',
      description: 'Ver estado de solicitudes',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      href: '/dashboard/client/requests',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-white',
    },
    {
      title: 'Historial',
      description: 'Servicios completados',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/dashboard/client/history',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-white',
    },
    {
      title: 'Mi Perfil',
      description: 'Configuración de cuenta',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: '/dashboard/client/profile',
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#5C8F2B] via-[#4A7322] to-[#5C8F2B] text-white px-4 py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">¡Hola, {user?.name?.split(' ')[0] || 'Cliente'}!</h2>
          <p className="text-[#9ACD32] text-sm md:text-base">¿Qué deseas hacer hoy?</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-[#5C8F2B]">
            <p className="text-gray-600 text-xs mb-1">Solicitudes Activas</p>
            <p className="text-2xl font-bold text-[#2F3437]">{stats.active}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
            <p className="text-gray-600 text-xs mb-1">Completadas</p>
            <p className="text-2xl font-bold text-[#2F3437]">{stats.completed}</p>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`bg-gradient-to-br ${item.color} rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95`}
            >
              <div className="flex items-start space-x-4">
                <div className={`${item.textColor} bg-white/20 p-3 rounded-xl backdrop-blur-sm`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`${item.textColor} font-bold text-lg mb-1`}>{item.title}</h3>
                  <p className={`${item.textColor} opacity-90 text-sm`}>{item.description}</p>
                </div>
                <svg className={`${item.textColor} w-6 h-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-[#9ACD32]/20 to-[#5C8F2B]/20 rounded-2xl p-6 border border-[#5C8F2B]/30">
          <div className="flex items-start space-x-3">
            <div className="bg-[#5C8F2B] p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#2F3437] mb-1">¿Cómo funciona?</h4>
              <p className="text-gray-600 text-sm">
                1. Crea una solicitud con tu ubicación<br />
                2. Selecciona el servicio y empresa<br />
                3. Confirma y espera la recolección<br />
                4. Califica el servicio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
