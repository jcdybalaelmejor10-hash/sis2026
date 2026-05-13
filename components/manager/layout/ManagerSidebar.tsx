'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function ManagerSidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      href: '/dashboard/manager',
    },
    {
      title: 'Recolectores',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: '/dashboard/manager/collectors',
    },
    {
      title: 'Vehículos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      href: '/dashboard/manager/vehicles',
    },
    {
      title: 'Servicios',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      href: '/dashboard/manager/company-services',
    },
    {
      title: 'Zonas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      href: '/dashboard/manager/coverage-zones',
    },
    {
      title: 'Solicitudes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      href: '/dashboard/manager/requests',
    },
    {
      title: 'Reportes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: '/dashboard/manager/reportes',
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar} />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-screen bg-gradient-to-b from-[#1a1d1f] via-[#2F3437] to-[#1a1d1f] border-r border-[#5C8F2B]/20 transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-[#5C8F2B]/20 bg-gradient-to-r from-[#5C8F2B]/10 to-transparent">
            <Link href="/dashboard/manager" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#5C8F2B]/30 rounded-full blur-md group-hover:blur-lg transition-all"></div>
                <Image src="/images/logo.png" alt="ECOFORGE" width={40} height={40} className="w-10 h-10 relative z-10" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-[#9ACD32] transition-colors">ECOFORGE</span>
            </Link>
            <button onClick={toggleSidebar} className="text-gray-300 hover:text-[#9ACD32] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={toggleSidebar} className={`group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 relative overflow-hidden ${isActive ? 'bg-gradient-to-r from-[#5C8F2B] to-[#4A7322] text-white shadow-lg shadow-[#5C8F2B]/30' : 'text-gray-300 hover:bg-[#5C8F2B]/10 hover:text-[#9ACD32]'}`}>
                  {isActive && <div className="absolute inset-0 bg-gradient-to-r from-[#9ACD32]/20 to-transparent animate-pulse"></div>}
                  <div className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#9ACD32]'} transition-colors`}>
                    {item.icon}
                  </div>
                  <span className="font-medium relative z-10">{item.title}</span>
                  {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#9ACD32] rounded-l-full"></div>}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#5C8F2B]/20 bg-gradient-to-r from-[#5C8F2B]/10 to-transparent">
            <div className="flex items-center space-x-3 px-4 py-3 bg-[#2F3437]/50 backdrop-blur-sm rounded-lg border border-[#5C8F2B]/20 hover:border-[#5C8F2B]/40 transition-all group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-[#5C8F2B]/30 rounded-full blur-sm group-hover:blur-md transition-all"></div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#5C8F2B] to-[#4A7322] rounded-full flex items-center justify-center relative z-10 shadow-lg">
                  <span className="text-white font-bold">E</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate group-hover:text-[#9ACD32] transition-colors">Encargado</p>
                <p className="text-xs text-gray-400 truncate">encargado@ecoforge.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
