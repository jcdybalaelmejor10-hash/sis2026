'use client';

import dynamic from 'next/dynamic';
import StepIndicator from './StepIndicator';
import ServiceSearchSelect from './ServiceSearchSelect';
import PhotoDropZone from './PhotoDropZone';
import { NewRequestViewProps } from './types';

const CoverageZoneMap = dynamic(() => import('@/components/maps/CoverageZoneMap'), { ssr: false });

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center text-sm text-gray-500 hover:text-[#5C8F2B] transition-colors group">
      <svg className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      Volver al paso anterior
    </button>
  );
}

function PrimaryBtn({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled} className="w-full bg-gradient-to-r from-[#5C8F2B] to-[#4A7322] text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:hover:shadow-none disabled:hover:brightness-100">
      {children}
    </button>
  );
}

function IconPin({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}

function IconTruck({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h-3m3 0h2m-2 0a2 2 0 012 2m0-2V8h3l3 4v4h-2a2 2 0 01-2 2m0 0a2 2 0 01-2-2" /></svg>;
}

function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>;
}

function IconClipboard({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
}

function IconSend({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
}

function IconSearch({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
}

function IconImage({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
}

function IconBuilding({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
}

function SummarySidebar({ step, location, address, district, selectedCompany, selectedService, selectedServiceInfo, estimatedM3, photos }: Partial<NewRequestViewProps> & { step: number }) {
  if (step < 2) return null;
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24 overflow-hidden">
      <div className="bg-gradient-to-r from-[#5C8F2B] to-[#4A7322] px-5 py-3">
        <h3 className="text-sm font-bold text-white flex items-center">
          <IconClipboard className="w-4 h-4 mr-2" />
          Resumen
        </h3>
      </div>
      <div className="p-5 space-y-3 text-sm">
        {location && (
          <div className="flex items-center justify-between">
            <span className="text-gray-500 flex items-center"><IconPin className="w-3.5 h-3.5 mr-1.5 text-[#5C8F2B]" />Ubicación</span>
            <IconCheck className="w-4 h-4 text-[#5C8F2B]" />
          </div>
        )}
        {address && (
          <div>
            <span className="text-gray-400 text-xs">Dirección</span>
            <p className="text-gray-800 text-xs font-medium truncate">{address}</p>
          </div>
        )}
        {district && (
          <div className="flex justify-between">
            <span className="text-gray-400 text-xs">Zona</span>
            <span className="text-gray-800 text-xs font-medium">{district}</span>
          </div>
        )}
        {selectedCompany && (
          <div className="pt-2 border-t border-gray-100">
            <span className="text-gray-400 text-xs flex items-center"><IconBuilding className="w-3 h-3 mr-1" />Empresa</span>
            <p className="text-gray-800 text-xs font-semibold">{selectedCompany.companyName}</p>
          </div>
        )}
        {selectedService && (
          <div className="flex justify-between">
            <span className="text-gray-400 text-xs">Servicio</span>
            <span className="text-gray-800 text-xs font-medium">{selectedService}</span>
          </div>
        )}
        {selectedServiceInfo && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 text-center mt-2 border border-green-100">
            <p className="text-[10px] text-gray-500">Costo referencial</p>
            <p className="text-xl font-bold text-[#5C8F2B]">Bs. {selectedServiceInfo.priceRef}</p>
          </div>
        )}
        {estimatedM3 && estimatedM3 > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400 text-xs">Volumen</span>
            <span className="text-gray-800 text-xs font-medium">{estimatedM3} m³</span>
          </div>
        )}
        {photos && photos.filter(p => p).length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <span className="text-gray-400 text-xs flex items-center mb-1.5"><IconImage className="w-3 h-3 mr-1" />Fotos ({photos.filter(p => p).length}/3)</span>
            <div className="flex space-x-1.5">
              {photos.filter(p => p).map((p, i) => (
                <img key={i} src={p} alt="" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NewRequestWebView(props: NewRequestViewProps) {
  const { step, loading, location, address, district, province, availableCompanies, selectedCompany, selectedService, selectedServiceInfo, description, estimatedM3, photos } = props;
  const { setAddress, setDistrict, setProvince, setDescription, setEstimatedM3, setSelectedService, setPhotos, setStep, getLocation, handleMarkerDrag, searchCompanies, handleCompanySelect, handleSubmit, onBack } = props;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onBack} className="flex items-center text-gray-600 hover:text-[#5C8F2B] transition-colors group">
              <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              <span className="text-sm">Volver al panel</span>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Nueva Solicitud de Recojo</h1>
            <span className="text-sm text-gray-400">Paso {step} de 5</span>
          </div>
          <StepIndicator step={step} variant="full" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Main content */}
          <div className="col-span-2 space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-10 shadow-lg text-center max-w-xl mx-auto border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-[#5C8F2B]/10 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconPin className="w-12 h-12 text-[#5C8F2B]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Dónde necesitas el servicio?</h2>
                <p className="text-gray-500 mb-8">Obtendremos tu ubicación para encontrar las empresas recolectoras más cercanas a ti</p>
                <button onClick={getLocation} disabled={loading} className="bg-gradient-to-r from-[#5C8F2B] to-[#4A7322] text-white px-10 py-4 rounded-xl font-semibold hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 text-lg inline-flex items-center">
                  {loading ? (
                    <><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />Obteniendo ubicación...</>
                  ) : (
                    <><IconPin className="w-5 h-5 mr-2" />Obtener mi ubicación</>
                  )}
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && location && (
              <>
                <BackBtn onClick={() => setStep(1)} />
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-1">Confirma tu ubicación</h2>
                  <p className="text-sm text-gray-500 mb-4 flex items-center">
                    <IconPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    Arrastra el marcador o haz clic en el mapa para ajustar tu posición exacta
                  </p>
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    <CoverageZoneMap latitude={location.lat} longitude={location.lng} coverageRadiusM={50} editable onLocationChange={handleMarkerDrag} />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección</label>
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none transition-shadow" placeholder="Tu dirección completa" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Zona / Barrio</label>
                      <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none transition-shadow" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
                      <input type="text" value={province} onChange={(e) => setProvince(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none transition-shadow" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <PrimaryBtn onClick={searchCompanies} disabled={loading || !address || !district}>
                      {loading ? (
                        <span className="flex items-center justify-center"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />Buscando empresas...</span>
                      ) : (
                        <span className="flex items-center justify-center"><IconSearch className="w-5 h-5 mr-2" />Buscar empresas disponibles</span>
                      )}
                    </PrimaryBtn>
                  </div>
                </div>
              </>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <>
                <BackBtn onClick={() => setStep(2)} />
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800">Empresas disponibles en tu zona</h2>
                  <span className="text-sm bg-[#5C8F2B]/10 text-[#5C8F2B] px-3 py-1 rounded-full font-semibold">{availableCompanies.length} encontrada{availableCompanies.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {availableCompanies.map((c) => (
                    <div key={c.companyId} onClick={() => handleCompanySelect(c)} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#5C8F2B] group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-9 h-9 bg-[#5C8F2B]/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#5C8F2B]/20 transition-colors">
                            <IconBuilding className="w-5 h-5 text-[#5C8F2B]" />
                          </div>
                          <h3 className="font-bold text-gray-800 group-hover:text-[#5C8F2B] transition-colors">{c.companyName}</h3>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{c.distance.toFixed(1)} km</span>
                      </div>
                      <div className="space-y-1.5 mb-3 pl-12">
                        {c.services.map((s) => (
                          <div key={s.serviceType} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{s.serviceType}</span>
                            <span className="font-bold text-[#5C8F2B]">Bs. {s.priceRef}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center text-xs text-gray-400 pl-12">
                        <IconTruck className="w-3.5 h-3.5 mr-1.5" />
                        {c.vehicles.length} vehículo{c.vehicles.length > 1 ? 's' : ''} disponible{c.vehicles.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 4 */}
            {step === 4 && selectedCompany && (
              <>
                <BackBtn onClick={() => setStep(3)} />
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-800">Detalles del servicio</h2>
                    <span className="text-xs bg-green-100 text-[#5C8F2B] px-3 py-1.5 rounded-full font-semibold flex items-center">
                      <IconBuilding className="w-3.5 h-3.5 mr-1.5" />
                      {selectedCompany.companyName}
                    </span>
                  </div>

                  <div className="space-y-5">
                    <ServiceSearchSelect services={selectedCompany.services} value={selectedService} onChange={setSelectedService} />

                    {selectedServiceInfo && (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Costo referencial del servicio</p>
                          <p className="text-2xl font-bold text-[#5C8F2B]">Bs. {selectedServiceInfo.priceRef}</p>
                        </div>
                        {selectedServiceInfo.description && <p className="text-sm text-gray-500 max-w-[50%] text-right">{selectedServiceInfo.description}</p>}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none transition-shadow" rows={3} placeholder="Describe los residuos a recoger..." />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Volumen estimado (m³)</label>
                        <input type="number" value={estimatedM3 || ''} onChange={(e) => setEstimatedM3(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none transition-shadow" placeholder="0" step="0.1" min="0" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <IconImage className="w-4 h-4 mr-1.5 text-gray-500" />
                        Fotos de referencia
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <PhotoDropZone label="Fachada / Casa" value={photos[0]} onChange={(v) => setPhotos([v, photos[1], photos[2]])} required size="lg" />
                        <PhotoDropZone label="Material a recoger" value={photos[1]} onChange={(v) => setPhotos([photos[0], v, photos[2]])} required size="lg" />
                        <PhotoDropZone label="Calle (opcional)" value={photos[2]} onChange={(v) => setPhotos([photos[0], photos[1], v])} size="lg" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <PrimaryBtn onClick={() => setStep(5)} disabled={!selectedService || !photos[0] || !photos[1]}>
                      <span className="flex items-center justify-center">Revisar solicitud<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
                    </PrimaryBtn>
                  </div>
                </div>
              </>
            )}

            {/* Step 5 */}
            {step === 5 && selectedCompany && location && (
              <>
                <BackBtn onClick={() => setStep(4)} />
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center">
                    <IconClipboard className="w-5 h-5 mr-2 text-[#5C8F2B]" />
                    Confirma tu solicitud
                  </h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    {[
                      ['Empresa', selectedCompany.companyName],
                      ['Servicio', selectedService],
                      ['Dirección', address],
                      ['Zona', district],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">{k}</span>
                        <span className="font-semibold text-gray-800 text-right max-w-[65%] truncate">{v}</span>
                      </div>
                    ))}
                    {estimatedM3 > 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Volumen</span>
                        <span className="font-semibold text-gray-800">{estimatedM3} m³</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Costo referencial</span>
                      <span className="font-bold text-[#5C8F2B] text-lg">Bs. {selectedServiceInfo?.priceRef || 0}</span>
                    </div>
                  </div>
                  {description && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500">Descripción</span>
                      <p className="text-sm text-gray-800 mt-0.5">{description}</p>
                    </div>
                  )}
                  <div className="mt-4">
                    <span className="text-sm text-gray-500 flex items-center mb-2"><IconImage className="w-4 h-4 mr-1.5" />Fotos adjuntas</span>
                    <div className="flex space-x-3">
                      {photos.filter(p => p).map((p, i) => (
                        <img key={i} src={p} alt={`Foto ${i + 1}`} className="w-28 h-28 object-cover rounded-xl border border-gray-200 shadow-sm" />
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <PrimaryBtn onClick={handleSubmit} disabled={loading}>
                      {loading ? (
                        <span className="flex items-center justify-center"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />Creando solicitud...</span>
                      ) : (
                        <span className="flex items-center justify-center"><IconSend className="w-5 h-5 mr-2" />Confirmar y enviar solicitud</span>
                      )}
                    </PrimaryBtn>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <SummarySidebar
              step={step}
              location={location}
              address={address}
              district={district}
              selectedCompany={selectedCompany}
              selectedService={selectedService}
              selectedServiceInfo={selectedServiceInfo}
              estimatedM3={estimatedM3}
              photos={photos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
