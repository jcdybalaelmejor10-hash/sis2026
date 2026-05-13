'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WebView from './WebView';
import MobileView from './MobileView';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Sobre Nosotros', href: '/about' },
    { label: 'Contacto', href: '/contact' },
  ];

  const getDashboardLink = () => {
    if (!userRole) return { href: '/login', label: 'Login / Registro' };
    if (userRole === 'ADMINISTRADOR') return { href: '/dashboard/admin', label: 'Dashboard' };
    if (userRole === 'ENCARGADO') return { href: '/dashboard/manager', label: 'Dashboard' };
    if (userRole === 'CLIENTE') return { href: '/dashboard/client', label: 'Mi Portal' };
    return { href: '/login', label: 'Login / Registro' };
  };

  const dashboardLink = getDashboardLink();

  return (
    <header className={`bg-primary text-text-on-primary shadow-md sticky top-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="ECOFORGE" width={48} height={48} className="w-10 h-10 md:w-12 md:h-12" />
            <span className="font-heading font-bold text-xl md:text-2xl">ECOFORGE</span>
          </Link>

          <WebView>
            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-text-on-primary hover:text-secondary transition-colors duration-200 font-medium">
                  {item.label}
                </Link>
              ))}
              <Link href={dashboardLink.href} className="bg-secondary text-primary px-6 py-2 rounded-full font-semibold hover:bg-secondary-light transition-all duration-200">
                {dashboardLink.label}
              </Link>
            </nav>
          </WebView>

          <MobileView>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-primary-light transition-colors" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </MobileView>
        </div>

        {isMenuOpen && (
          <MobileView>
            <nav className="py-4 space-y-2 border-t border-primary-light">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="block py-2 px-4 hover:bg-primary-light rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link href={dashboardLink.href} className="block py-2 px-4 bg-secondary text-primary rounded-md font-semibold text-center hover:bg-secondary-light transition-colors" onClick={() => setIsMenuOpen(false)}>
                {dashboardLink.label}
              </Link>
            </nav>
          </MobileView>
        )}
      </div>
    </header>
  );
}
