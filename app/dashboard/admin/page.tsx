'use client';

import RevenueChart from '@/components/admin/dashboard/RevenueChart';
import StatsCards from '@/components/admin/dashboard/StatsCards';
import TopCompanies from '@/components/admin/dashboard/TopCompanies';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#5C8F2B] to-[#4A7322] rounded-xl p-8 text-white shadow-xl border border-[#5C8F2B]/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Panel de Administración</h2>
            <p className="text-white/90 text-lg">Gestiona todos los aspectos de ECOFORGE desde aquí</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Top Companies */}
      <TopCompanies />
    </div>
  );
}
