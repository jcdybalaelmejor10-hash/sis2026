'use client';

const team = [
  {
    name: 'Celeste Aracely Bustamante',
    role: 'Gestión Estratégica',
    tasks: [
      'Definir objetivos del proyecto',
      'Planificar el crecimiento y desarrollo',
      'Tomar decisiones estratégicas',
      'Evaluar oportunidades de mejora',
    ],
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    name: 'Camila Martinez Ramos',
    role: 'Gestión Operativa',
    tasks: [
      'Coordinar actividades diarias',
      'Organizar tareas y tiempos',
      'Supervisar cumplimiento de objetivos',
      'Optimizar recursos disponibles',
    ],
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    name: 'Abigail Siles Vega',
    role: 'Marketing y Gestión Comercial',
    tasks: [
      'Diseñar estrategias de promoción',
      'Gestionar redes sociales',
      'Analizar el mercado objetivo',
      'Identificar necesidades de usuarios',
    ],
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    name: 'Cielos Cespedes Copa',
    role: 'Gestión Financiera',
    tasks: [
      'Elaborar presupuestos del proyecto',
      'Analizar costos, gastos e ingresos',
      'Evaluar viabilidad económica',
      'Gestionar fuentes de financiamiento',
    ],
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Team() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full mb-4 border border-primary/20">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-primary font-semibold">Equipo</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-dark mb-4">
            Nuestro <span className="text-primary">Equipo</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Un equipo con áreas de responsabilidad compartidas, sin jerarquías, comprometido con el desarrollo sostenible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary transform group-hover:scale-110 transition-transform duration-300">
                  {member.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-gray-dark">{member.name}</h3>
                  <p className="text-primary font-semibold">{member.role}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {member.tasks.map((task, i) => (
                  <li key={i} className="flex items-center gap-2 text-text-secondary">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
