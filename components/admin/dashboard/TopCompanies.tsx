'use client';

export default function TopCompanies() {
  const companies = [
    { name: 'EcoRecicla S.A.', requests: 245, change: '+15%', logo: '🏢' },
    { name: 'GreenCycle Corp', requests: 198, change: '+8%', logo: '♻️' },
    { name: 'Reciclados del Norte', requests: 176, change: '+12%', logo: '🌱' },
    { name: 'Materiales Verdes', requests: 154, change: '+5%', logo: '🏭' },
    { name: 'Eco Solutions', requests: 132, change: '+10%', logo: '🌿' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#2F3437]">Empresas Más Solicitadas</h3>
        <span className="text-sm text-[#5C8F2B] font-semibold cursor-pointer hover:text-[#4A7322]">Ver todas</span>
      </div>
      <div className="space-y-4">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-[#5C8F2B]/5 rounded-lg transition-all group"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#5C8F2B] to-[#4A7322] rounded-lg flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                  {company.logo}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#9ACD32] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#2F3437] group-hover:text-[#5C8F2B] transition-colors">
                  {company.name}
                </p>
                <p className="text-xs text-gray-500">{company.requests} solicitudes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
                {company.change}
              </span>
              <svg className="w-5 h-5 text-[#5C8F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
