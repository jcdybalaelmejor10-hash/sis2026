'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1A1D1F] via-[#2F3437] to-[#4A7322] text-white overflow-hidden min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/30 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/50 hover:scale-105 transition-transform">
              <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-secondary font-semibold text-sm">Gestión de Residuos de Construcción</span>
            </div>
            
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
              Transforma <span className="text-secondary animate-pulse">Escombros</span> en{' '}
              <span className="text-primary-light">Oportunidades</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              Conectamos a la ciudadanía con empresas recicladoras para transformar los residuos de construcción en materiales reutilizables, impulsando ciudades más limpias en Bolivia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/registro"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Comenzar Ahora
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
              >
                Conocer Más
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">1000+</div>
                <div className="text-sm text-gray-200">Usuarios</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-gray-200">Empresas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">5000kg</div>
                <div className="text-sm text-gray-200">Reciclados</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image 
                src="/images/logo.png" 
                alt="ECOFORGE" 
                width={400} 
                height={400} 
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#caracteristicas">
          <svg className="w-8 h-8 text-white/50 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
