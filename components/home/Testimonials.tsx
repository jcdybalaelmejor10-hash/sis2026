'use client';

const testimonials = [
  {
    name: 'María González',
    role: 'Cliente',
    image: '👩‍💼',
    rating: 5,
    text: 'ECOFORGE ha transformado la manera en que manejo mis residuos. El proceso es súper fácil y rápido. ¡Recomendado al 100%!',
  },
  {
    name: 'Carlos Mendoza',
    role: 'Empresa de Reciclaje',
    image: '👨‍💼',
    rating: 5,
    text: 'Como empresa, esta plataforma nos ha permitido optimizar nuestras rutas y atender más clientes. Excelente herramienta.',
  },
  {
    name: 'Ana Rodríguez',
    role: 'Recolectora',
    image: '👩‍🔧',
    rating: 5,
    text: 'La app es muy intuitiva y me permite gestionar mis servicios de forma eficiente. El sistema de notificaciones es perfecto.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-16 md:py-24 bg-gradient-to-br from-gray-dark via-gray to-gray-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/20 px-6 py-2 rounded-full mb-4 border border-secondary/30">
            <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className="text-white font-semibold">Testimonios</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Lo que dicen nuestros <span className="text-secondary">usuarios</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Miles de usuarios confían en ECOFORGE para gestionar sus necesidades de reciclaje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-gray-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-200 leading-relaxed italic">&quot;{testimonial.text}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
