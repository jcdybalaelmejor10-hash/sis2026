'use client';

import Link from 'next/link';

export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1A1D1F] via-[#2F3437] to-[#4A7322] text-white overflow-hidden min-h-[60vh] flex items-center pt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/30 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/50">
            <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-secondary font-semibold text-sm">Sobre Nosotros</span>
          </div>
          
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
            Gestión Sostenible de <span className="text-secondary">Residuos de Construcción</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
            EcoForge vincula a la ciudadanía con empresas recicladoras para optimizar la gestión de residuos de construcción en Bolivia, convirtiendo un problema ambiental en una oportunidad de economía circular.
          </p>
        </div>
      </div>
    </section>
  );
}
