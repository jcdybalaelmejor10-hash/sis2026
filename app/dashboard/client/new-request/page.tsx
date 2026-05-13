'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { requestService, AvailableCompany } from '@/services/requestService';
import WebView from '@/components/base/WebView';
import MobileView from '@/components/base/MobileView';
import NewRequestWebView from '@/components/client/request/NewRequestWebView';
import NewRequestMobileView from '@/components/client/request/NewRequestMobileView';

export default function NewRequestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [region, setRegion] = useState('');
  const [availableCompanies, setAvailableCompanies] = useState<AvailableCompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<AvailableCompany | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedM3, setEstimatedM3] = useState<number>(0);
  const [photos, setPhotos] = useState<[string, string, string]>(['', '', '']);

  const selectedServiceInfo = selectedCompany?.services.find(s => s.serviceType === selectedService);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await res.json();
      setAddress(data.display_name || '');
      setDistrict(data.address?.suburb || data.address?.city_district || '');
      setProvince(data.address?.county || data.address?.city || '');
      setRegion(data.address?.state || '');
    } catch {}
  };

  const getLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setLocation({ lat, lng });
        await reverseGeocode(lat, lng);
        setLoading(false);
        setStep(2);
      },
      () => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo obtener tu ubicación. Activa el GPS.', confirmButtonColor: '#5C8F2B' });
        setLoading(false);
      }
    );
  };

  const handleMarkerDrag = async (lat: number, lng: number) => {
    setLocation({ lat, lng });
    await reverseGeocode(lat, lng);
  };

  const searchCompanies = async () => {
    if (!location) return;
    setLoading(true);
    try {
      const companies = await requestService.getAvailableCompanies(location.lat, location.lng);
      setAvailableCompanies(companies);
      if (companies.length === 0) {
        Swal.fire({ icon: 'info', title: 'Sin cobertura', text: 'No hay empresas disponibles en tu zona. Intenta mover el marcador.', confirmButtonColor: '#5C8F2B' });
      } else {
        setStep(3);
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar las empresas.', confirmButtonColor: '#5C8F2B' });
    } finally {
      setLoading(false);
    }
  };

  const handleCompanySelect = (company: AvailableCompany) => {
    setSelectedCompany(company);
    setSelectedService('');
    setStep(4);
  };

  const handleSubmit = async () => {
    if (!location || !selectedService || !selectedCompany) return;
    setLoading(true);
    try {
      const photoUrls = photos.filter(p => p);
      await requestService.create({
        companyId: selectedCompany.companyId,
        serviceType: selectedService,
        description,
        priority: 'MEDIA',
        address,
        district,
        province,
        region,
        latitude: location.lat,
        longitude: location.lng,
        estimatedM3: estimatedM3 || undefined,
        photos: photoUrls.length > 0 ? photoUrls : undefined,
      });
      Swal.fire({ icon: 'success', title: '¡Solicitud creada!', text: 'Tu solicitud ha sido registrada.', confirmButtonColor: '#5C8F2B' }).then(() => {
        router.push('/dashboard/client/requests');
      });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo crear la solicitud.', confirmButtonColor: '#5C8F2B' });
    } finally {
      setLoading(false);
    }
  };

  const viewProps = {
    step, loading, location, address, district, province, region,
    availableCompanies, selectedCompany, selectedService, selectedServiceInfo,
    description, estimatedM3, photos,
    setAddress, setDistrict, setProvince, setDescription, setEstimatedM3,
    setSelectedService, setPhotos, setStep,
    getLocation, handleMarkerDrag, searchCompanies, handleCompanySelect, handleSubmit,
    onBack: () => router.back(),
  };

  return (
    <>
      <WebView>
        <NewRequestWebView {...viewProps} />
      </WebView>
      <MobileView>
        <NewRequestMobileView {...viewProps} />
      </MobileView>
    </>
  );
}
