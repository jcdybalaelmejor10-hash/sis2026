'use client';

import Image from 'next/image';

export default function Apoyo() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full mb-4 border border-primary/20">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-primary font-semibold">Nuestro Apoyo</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-dark mb-4">
            Respaldados por quienes <span className="text-primary">creen en el cambio</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Contamos con el apoyo de instituciones y organizaciones comprometidas con el desarrollo sostenible en Bolivia.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-6xl w-full">
            <Image
              src="/images/apoyo.jpeg"
              alt="Instituciones y organizaciones que apoyan a EcoForge"
              width={1400}
              height={1000}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
