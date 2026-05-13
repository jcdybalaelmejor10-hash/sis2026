'use client';

export default function Mission() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 space-y-16">
        {/* Misión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-primary font-semibold text-sm">Misión</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-dark">
              Nuestra <span className="text-primary">Misión</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Conectar a la ciudadanía con empresas recicladoras para transformar los residuos de construcción en materiales reutilizables, contribuyendo a la creación de ciudades más limpias y promoviendo una cultura ambiental activa mediante una plataforma digital accesible e inclusiva.
            </p>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-primary font-semibold text-sm">Visión</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-dark">
              Nuestra <span className="text-primary">Visión</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Transformar la gestión de residuos de construcción en Bolivia, impulsando un modelo sostenible en el que cada material descartado pueda tener un nuevo uso, cada ciudadano participe activamente en el cuidado del medio ambiente y las ciudades avancen hacia un desarrollo más limpio, responsable y consciente de su impacto ambiental.
            </p>
          </div>
        </div>

        {/* Servicio */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-primary font-semibold text-sm">Nuestro Servicio</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-dark mb-4">
            ¿Qué es <span className="text-primary">EcoForge</span>?
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            EcoForge es una plataforma digital que vincula a la ciudadanía con empresas recicladoras para optimizar la gestión de residuos de construcción. A través de la plataforma, los usuarios pueden reportar escombros abandonados, permitiendo que las empresas los recojan y reutilicen, convirtiendo un problema ambiental en una oportunidad de economía circular.
          </p>
        </div>
      </div>
    </section>
  );
}
