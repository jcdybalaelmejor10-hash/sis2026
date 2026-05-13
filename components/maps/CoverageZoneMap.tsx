'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CoverageZoneMapProps {
  latitude: number;
  longitude: number;
  coverageRadiusM: number;
  onLocationChange?: (lat: number, lng: number) => void;
  editable?: boolean;
}

export default function CoverageZoneMap({ latitude, longitude, coverageRadiusM, onLocationChange, editable = false }: CoverageZoneMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userDragging = useRef(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([latitude, longitude], 15);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    const marker = L.marker([latitude, longitude], { icon, draggable: editable }).addTo(map);
    markerRef.current = marker;

    const circle = L.circle([latitude, longitude], {
      radius: coverageRadiusM,
      color: '#5C8F2B',
      fillColor: '#5C8F2B',
      fillOpacity: 0.2
    }).addTo(map);
    circleRef.current = circle;

    if (editable && onLocationChange) {
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        circle.setLatLng(pos);
        userDragging.current = true;
        onLocationChange(pos.lat, pos.lng);
        setTimeout(() => { userDragging.current = false; }, 500);
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        circle.setLatLng(e.latlng);
        userDragging.current = true;
        onLocationChange(e.latlng.lat, e.latlng.lng);
        setTimeout(() => { userDragging.current = false; }, 500);
      });
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!markerRef.current || !circleRef.current || !mapRef.current || userDragging.current) return;
    const newLatLng = L.latLng(latitude, longitude);
    markerRef.current.setLatLng(newLatLng);
    circleRef.current.setLatLng(newLatLng);
    circleRef.current.setRadius(coverageRadiusM);
    mapRef.current.setView(newLatLng, mapRef.current.getZoom());
  }, [latitude, longitude, coverageRadiusM]);

  return <div ref={containerRef} className="w-full h-[400px] rounded-xl border border-gray-200 shadow-inner" />;
}
