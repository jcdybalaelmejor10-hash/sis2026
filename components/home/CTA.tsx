'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full border border-primary/20 mb-4">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-primary font-semibold">Únete a la Revolución Verde</span>
          </div>
          
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-gray-dark leading-tight">
            ¿Listo para hacer la <span className="text-primary">diferencia</span>?
          </h2>
          
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Reporta escombros abandonados, conecta con empresas recicladoras y contribuye a construir ciudades más limpias en Bolivia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Link
              href="/registro"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Registrarse Gratis
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-10 py-5 rounded-lg font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactar Ventas
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
              <svg className="w-8 h-8 text-primary mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="text-gray-dark font-semibold">100% Gratis</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
              <svg className="w-8 h-8 text-primary mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div className="text-gray-dark font-semibold">Datos Seguros</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
              <svg className="w-8 h-8 text-primary mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="text-gray-dark font-semibold">Configuración Rápida</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
              <svg className="w-8 h-8 text-primary mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-gray-dark font-semibold">Impacto Global</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
