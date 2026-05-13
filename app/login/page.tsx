import Image from 'next/image';
import WebView from '@/components/base/WebView';
import MobileView from '@/components/base/MobileView';
import LoginFormWeb from '@/components/auth/LoginFormWeb';
import LoginFormMobile from '@/components/auth/LoginFormMobile';

export default function LoginPage() {
  return (
    <>
      <WebView>
        <div className="min-h-screen bg-gradient-to-br from-[#1a1d1f] via-[#2F3437] to-[#1a1d1f] flex items-center justify-center py-12 px-4 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-[#5C8F2B] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#9ACD32] rounded-full blur-3xl"></div>
          </div>

          <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="hidden md:flex flex-col items-center justify-center space-y-8 p-8">
              <div className="relative">
                <div className="absolute inset-0 bg-[#5C8F2B]/40 rounded-full blur-3xl animate-pulse"></div>
                <Image 
                  src="/images/logo.png" 
                  alt="ECOFORGE" 
                  width={220} 
                  height={220} 
                  className="w-64 h-64 drop-shadow-2xl relative z-10"
                />
              </div>
              <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold text-white leading-tight">
                  Bienvenido a<br /><span className="text-[#9ACD32]">ECOFORGE</span>
                </h1>
                <p className="text-xl text-gray-200 max-w-md leading-relaxed">
                  Transforma residuos en recursos y construye un futuro sostenible
                </p>
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="bg-gradient-to-br from-[#5C8F2B]/20 to-[#5C8F2B]/10 backdrop-blur-md border border-[#5C8F2B]/30 rounded-xl p-5 hover:scale-105 transition-transform">
                    <div className="text-4xl font-bold text-[#9ACD32] mb-1">1000+</div>
                    <div className="text-sm text-gray-200 font-medium">Usuarios</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#5C8F2B]/20 to-[#5C8F2B]/10 backdrop-blur-md border border-[#5C8F2B]/30 rounded-xl p-5 hover:scale-105 transition-transform">
                    <div className="text-4xl font-bold text-[#9ACD32] mb-1">50+</div>
                    <div className="text-sm text-gray-200 font-medium">Empresas</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#5C8F2B]/20 to-[#5C8F2B]/10 backdrop-blur-md border border-[#5C8F2B]/30 rounded-xl p-5 hover:scale-105 transition-transform">
                    <div className="text-4xl font-bold text-[#9ACD32] mb-1">5000kg</div>
                    <div className="text-sm text-gray-200 font-medium">Reciclados</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <LoginFormWeb />
            </div>
          </div>
        </div>
      </WebView>

      <MobileView>
        <div className="min-h-screen bg-gradient-to-br from-gray via-gray-dark to-gray flex flex-col items-center justify-center px-4 py-8">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
              <Image 
                src="/images/logo.png" 
                alt="ECOFORGE" 
                width={100} 
                height={100} 
                className="w-24 h-24 relative z-10 drop-shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              <span className="text-secondary">ECOFORGE</span>
            </h1>
            <p className="text-sm text-gray-300">
              Transforma residuos en recursos
            </p>
          </div>
          
          <LoginFormMobile />
        </div>
      </MobileView>
    </>
  );
}
