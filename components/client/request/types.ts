import { AvailableCompany, CompanyServiceInfo } from '@/services/requestService';

export interface NewRequestViewProps {
  step: number;
  loading: boolean;
  location: { lat: number; lng: number } | null;
  address: string;
  district: string;
  province: string;
  region: string;
  availableCompanies: AvailableCompany[];
  selectedCompany: AvailableCompany | null;
  selectedService: string;
  selectedServiceInfo: CompanyServiceInfo | undefined;
  description: string;
  estimatedM3: number;
  photos: [string, string, string];
  setAddress: (v: string) => void;
  setDistrict: (v: string) => void;
  setProvince: (v: string) => void;
  setDescription: (v: string) => void;
  setEstimatedM3: (v: number) => void;
  setSelectedService: (v: string) => void;
  setPhotos: (v: [string, string, string]) => void;
  setStep: (v: number) => void;
  getLocation: () => void;
  handleMarkerDrag: (lat: number, lng: number) => void;
  searchCompanies: () => void;
  handleCompanySelect: (company: AvailableCompany) => void;
  handleSubmit: () => void;
  onBack: () => void;
}
