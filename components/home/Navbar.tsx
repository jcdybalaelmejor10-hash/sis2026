'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-dark/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'
    }`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png" alt="ECOFORGE" fill className="object-contain" />
            </div>
            <span className="font-heading font-bold text-2xl text-white group-hover:text-secondary transition-colors">
              ECOFORGE
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#inicio" className="text-white hover:text-secondary transition-colors font-medium">
              Inicio
            </Link>
            <Link href="#caracteristicas" className="text-white hover:text-secondary transition-colors font-medium">
              Características
            </Link>
            <Link href="#como-funciona" className="text-white hover:text-secondary transition-colors font-medium">
              Cómo Funciona
            </Link>
            <Link href="#testimonios" className="text-white hover:text-secondary transition-colors font-medium">
              Testimonios
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-white hover:text-secondary transition-colors font-medium">
              Iniciar Sesión
            </Link>
            <Link href="/registro" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105">
              Registrarse
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-white/10 pt-4">
            <Link href="#inicio" className="block text-white hover:text-secondary transition-colors">
              Inicio
            </Link>
            <Link href="#caracteristicas" className="block text-white hover:text-secondary transition-colors">
              Características
            </Link>
            <Link href="#como-funciona" className="block text-white hover:text-secondary transition-colors">
              Cómo Funciona
            </Link>
            <Link href="#testimonios" className="block text-white hover:text-secondary transition-colors">
              Testimonios
            </Link>
            <Link href="/login" className="block text-white hover:text-secondary transition-colors">
              Iniciar Sesión
            </Link>
            <Link href="/registro" className="block bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-center">
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
