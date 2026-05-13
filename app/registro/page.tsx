import Image from 'next/image';
import WebView from '@/components/base/WebView';
import MobileView from '@/components/base/MobileView';
import RegisterFormWeb from '@/components/auth/RegisterFormWeb';
import RegisterFormMobile from '@/components/auth/RegisterFormMobile';

export default function RegisterPage() {
  return (
    <>
      <WebView>
        <div className="min-h-screen bg-gradient-to-br from-[#1a1d1f] via-[#2F3437] to-[#1a1d1f] flex items-center justify-center py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-[#5C8F2B] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#9ACD32] rounded-full blur-3xl"></div>
          </div>

          <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex items-center justify-center">
              <RegisterFormWeb />
            </div>

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
                  Comienza tu viaje<br /><span className="text-[#9ACD32]">sostenible</span>
                </h1>
                <p className="text-xl text-gray-200 max-w-md leading-relaxed">
                  Forma parte de la revolución del reciclaje y contribuye a un planeta más verde
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-3 bg-gradient-to-br from-[#5C8F2B]/20 to-[#5C8F2B]/10 backdrop-blur-md border border-[#5C8F2B]/30 rounded-xl p-4 hover:scale-105 transition-transform">
                    <div className="w-10 h-10 bg-[#5C8F2B] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Gestión fácil de reciclables</p>
                  </div>
                  <div className="flex items-center space-x-3 bg-gradient-to-br from-[#5C8F2B]/20 to-[#5C8F2B]/10 backdrop-blur-md border border-[#5C8F2B]/30 rounded-xl p-4 hover:scale-105 transition-transform">
                    <div className="w-10 h-10 bg-[#9ACD32] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Conecta con empresas</p>
                  </div>
                  <div className="flex items-center space-x-3 bg-gradient-to-br from-[#5C8F2B]/20 to-[#5C8F2B]/10 backdrop-blur-md border border-[#5C8F2B]/30 rounded-xl p-4 hover:scale-105 transition-transform">
                    <div className="w-10 h-10 bg-[#5C8F2B] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Impacto ambiental medible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WebView>

      <MobileView>
        <div className="min-h-screen bg-gradient-to-br from-[#1a1d1f] via-[#2F3437] to-[#1a1d1f] flex flex-col items-center justify-center px-4 py-8">
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-[#5C8F2B]/40 rounded-full blur-xl animate-pulse"></div>
              <Image 
                src="/images/logo.png" 
                alt="ECOFORGE" 
                width={80} 
                height={80} 
                className="w-20 h-20 relative z-10 drop-shadow-lg"
              />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">
              Únete a <span className="text-[#9ACD32]">ECOFORGE</span>
            </h1>
            <p className="text-xs text-gray-200">
              Tu viaje sostenible comienza aquí
            </p>
          </div>
          
          <RegisterFormMobile />
        </div>
      </MobileView>
    </>
  );
}
