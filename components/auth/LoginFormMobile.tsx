'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginFormMobile() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirección basada en rol
      if (data.user.role === 'ADMINISTRADOR') {
        router.push('/dashboard/admin');
      } else if (data.user.role === 'ENCARGADO') {
        router.push('/dashboard/encargado');
      } else {
        router.push('/dashboard/cliente');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-light/10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray mb-2">Bienvenido</h2>
          <p className="text-sm text-text-secondary">Ingresa a ECOFORGE</p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error text-error text-sm px-3 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email-mobile" className="block text-sm font-medium text-gray mb-1">
              Correo electrónico
            </label>
            <input
              id="email-mobile"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-base bg-gray-50 focus:bg-white"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password-mobile" className="block text-sm font-medium text-gray mb-1">
              Contraseña
            </label>
            <input
              id="password-mobile"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-base bg-gray-50 focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
              <span className="ml-2 text-text-secondary">Recordarme</span>
            </label>
            <Link href="/recuperar-password" className="text-primary hover:text-primary-dark font-medium">
              ¿Olvidaste?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-text-secondary">
            ¿No tienes cuenta?{' '}
            <Link href="/registro" className="text-primary hover:text-primary-dark font-semibold">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
