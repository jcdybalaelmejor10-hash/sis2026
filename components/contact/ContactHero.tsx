'use client';

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1A1D1F] via-[#2F3437] to-[#4A7322] text-white overflow-hidden min-h-[50vh] flex items-center pt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/30 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/50">
            <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-secondary font-semibold text-sm">Contáctanos</span>
          </div>
          
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
            ¿Tienes alguna <span className="text-secondary">pregunta</span>?
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
            Estamos aquí para ayudarte con la gestión de residuos de construcción. Escríbenos y te responderemos lo antes posible.
          </p>
        </div>
      </div>
    </section>
  );
}
