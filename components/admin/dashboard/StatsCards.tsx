'use client';

export default function StatsCards() {
  const stats = [
    {
      title: 'Total Clientes',
      value: '1,250',
      change: '+12%',
      isPositive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: 'from-[#5C8F2B]/10 to-[#5C8F2B]/5',
      iconBg: 'bg-[#5C8F2B]',
    },
    {
      title: 'Empresas Registradas',
      value: '45',
      change: '+5',
      isPositive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      bgColor: 'from-[#9ACD32]/10 to-[#9ACD32]/5',
      iconBg: 'bg-[#9ACD32]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.iconBg} p-3 rounded-lg text-white shadow-md`}>
              {stat.icon}
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-[#2F3437] text-sm font-semibold mb-2">{stat.title}</h3>
          <p className="text-4xl font-bold text-[#2F3437]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
