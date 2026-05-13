'use client';

import dynamic from 'next/dynamic';
import StepIndicator from './StepIndicator';
import ServiceSearchSelect from './ServiceSearchSelect';
import PhotoDropZone from './PhotoDropZone';
import { NewRequestViewProps } from './types';

const CoverageZoneMap = dynamic(() => import('@/components/maps/CoverageZoneMap'), { ssr: false });

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center text-sm text-gray-500 hover:text-[#5C8F2B] transition-colors mb-3 group">
      <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      Volver
    </button>
  );
}

function PrimaryBtn({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled} className="w-full bg-gradient-to-r from-[#5C8F2B] to-[#4A7322] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 text-sm">
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

function IconSend({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
}

function IconBuilding({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
}

function IconImage({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
}

export default function NewRequestMobileView(props: NewRequestViewProps) {
  const { step, loading, location, address, district, province, availableCompanies, selectedCompany, selectedService, selectedServiceInfo, description, estimatedM3, photos } = props;
  const { setAddress, setDistrict, setProvince, setDescription, setEstimatedM3, setSelectedService, setPhotos, setStep, getLocation, handleMarkerDrag, searchCompanies, handleCompanySelect, handleSubmit, onBack } = props;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBack} className="text-gray-600 hover:text-[#5C8F2B] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h1 className="text-base font-bold text-gray-800">Nueva Solicitud</h1>
            <span className="text-xs text-gray-400">{step}/5</span>
          </div>
          <StepIndicator step={step} variant="compact" />
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5C8F2B]/10 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconPin className="w-8 h-8 text-[#5C8F2B]" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">¿Dónde estás?</h2>
            <p className="text-gray-500 text-sm mb-5">Necesitamos tu ubicación para encontrar empresas cercanas</p>
            <PrimaryBtn onClick={getLocation} disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />Obteniendo...</span>
              ) : (
                <span className="flex items-center justify-center"><IconPin className="w-4 h-4 mr-2" />Obtener mi ubicación</span>
              )}
            </PrimaryBtn>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && location && (
          <>
            <BackBtn onClick={() => setStep(1)} />
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <h2 className="text-base font-bold text-gray-800 mb-0.5">Confirma tu ubicación</h2>
              <p className="text-[11px] text-gray-500 mb-2 flex items-center">
                <IconPin className="w-3 h-3 mr-1 text-gray-400" />
                Arrastra el marcador para ajustar
              </p>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <CoverageZoneMap latitude={location.lat} longitude={location.lng} coverageRadiusM={50} editable onLocationChange={handleMarkerDrag} />
              </div>
              <div className="mt-3 space-y-2">
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none text-sm transition-shadow" placeholder="Dirección" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none text-sm transition-shadow" placeholder="Zona/Barrio" />
                  <input type="text" value={province} onChange={(e) => setProvince(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none text-sm transition-shadow" placeholder="Ciudad" />
                </div>
              </div>
            </div>
            <PrimaryBtn onClick={searchCompanies} disabled={loading || !address || !district}>
              {loading ? 'Buscando...' : (
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Buscar empresas
                </span>
              )}
            </PrimaryBtn>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <BackBtn onClick={() => setStep(2)} />
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800">Empresas</h2>
              <span className="text-xs bg-[#5C8F2B]/10 text-[#5C8F2B] px-2.5 py-1 rounded-full font-semibold">{availableCompanies.length}</span>
            </div>
            {availableCompanies.map((c) => (
              <div key={c.companyId} onClick={() => handleCompanySelect(c)} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent active:border-[#5C8F2B]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#5C8F2B]/10 rounded-lg flex items-center justify-center mr-2.5">
                      <IconBuilding className="w-4 h-4 text-[#5C8F2B]" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-800">{c.companyName}</h3>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{c.distance.toFixed(1)} km</span>
                </div>
                <div className="pl-[42px]">
                  {c.services.map((s) => (
                    <div key={s.serviceType} className="flex justify-between text-xs py-0.5">
                      <span className="text-gray-600">{s.serviceType}</span>
                      <span className="font-bold text-[#5C8F2B]">Bs. {s.priceRef}</span>
                    </div>
                  ))}
                  <div className="flex items-center text-[10px] text-gray-400 mt-2">
                    <IconTruck className="w-3.5 h-3.5 mr-1" />
                    {c.vehicles.length} vehículo{c.vehicles.length > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Step 4 */}
        {step === 4 && selectedCompany && (
          <>
            <BackBtn onClick={() => setStep(3)} />
            <div className="bg-white rounded-2xl p-4 shadow-lg space-y-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-800">Detalles</h2>
                <span className="text-[10px] bg-green-100 text-[#5C8F2B] px-2 py-0.5 rounded-full font-semibold flex items-center">
                  <IconBuilding className="w-3 h-3 mr-1" />
                  {selectedCompany.companyName}
                </span>
              </div>

              <ServiceSearchSelect services={selectedCompany.services} value={selectedService} onChange={setSelectedService} />

              {selectedServiceInfo && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500">Costo ref.</p>
                    <p className="text-lg font-bold text-[#5C8F2B]">Bs. {selectedServiceInfo.priceRef}</p>
                  </div>
                  {selectedServiceInfo.description && <p className="text-[10px] text-gray-500 max-w-[50%] text-right">{selectedServiceInfo.description}</p>}
                </div>
              )}

              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none text-sm transition-shadow" rows={2} placeholder="Descripción (opcional)" />

              <input type="number" value={estimatedM3 || ''} onChange={(e) => setEstimatedM3(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8F2B] focus:border-transparent outline-none text-sm transition-shadow" placeholder="Volumen estimado (m³)" step="0.1" min="0" />

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center">
                  <IconImage className="w-3.5 h-3.5 mr-1 text-gray-500" />
                  Fotos de referencia
                </label>
                <div className="flex space-x-2">
                  <PhotoDropZone label="Fachada" value={photos[0]} onChange={(v) => setPhotos([v, photos[1], photos[2]])} required size="sm" />
                  <PhotoDropZone label="Material" value={photos[1]} onChange={(v) => setPhotos([photos[0], v, photos[2]])} required size="sm" />
                  <PhotoDropZone label="Calle" value={photos[2]} onChange={(v) => setPhotos([photos[0], photos[1], v])} size="sm" />
                </div>
              </div>
            </div>
            <PrimaryBtn onClick={() => setStep(5)} disabled={!selectedService || !photos[0] || !photos[1]}>
              <span className="flex items-center justify-center">Revisar solicitud<svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
            </PrimaryBtn>
          </>
        )}

        {/* Step 5 */}
        {step === 5 && selectedCompany && location && (
          <>
            <BackBtn onClick={() => setStep(4)} />
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <h2 className="text-base font-bold text-gray-800 mb-3">Resumen</h2>
              <div className="space-y-2 text-sm">
                {[
                  ['Empresa', selectedCompany.companyName],
                  ['Servicio', selectedService],
                  ['Dirección', address],
                  ['Zona', district],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-semibold text-gray-800 text-right max-w-[60%] truncate">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Costo ref.</span>
                  <span className="font-bold text-[#5C8F2B] text-base">Bs. {selectedServiceInfo?.priceRef || 0}</span>
                </div>
                {estimatedM3 > 0 && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Volumen</span>
                    <span className="font-semibold text-gray-800">{estimatedM3} m³</span>
                  </div>
                )}
                {description && (
                  <div className="py-1.5 border-b border-gray-100">
                    <span className="text-gray-500 text-xs">Descripción</span>
                    <p className="text-gray-800 text-xs mt-0.5">{description}</p>
                  </div>
                )}
                <div className="py-1.5">
                  <span className="text-gray-500 text-xs flex items-center mb-1.5"><IconImage className="w-3 h-3 mr-1" />Fotos</span>
                  <div className="flex space-x-2">
                    {photos.filter(p => p).map((p, i) => (
                      <img key={i} src={p} alt={`Foto ${i + 1}`} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <PrimaryBtn onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />Creando...</span>
              ) : (
                <span className="flex items-center justify-center"><IconSend className="w-4 h-4 mr-2" />Confirmar solicitud</span>
              )}
            </PrimaryBtn>
          </>
        )}
      </div>
    </div>
  );
}
