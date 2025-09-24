"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

interface CarMapProps {
  latitude: number;
  longitude: number;
  label?: string;
}

function CarMapComponent({ latitude, longitude, label = 'Car Location' }: CarMapProps) {
  const [MapComponents, setMapComponents] = useState<typeof import('react-leaflet') | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import react-leaflet components only on client side
    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-leaflet'),
        import('leaflet')
      ]).then(([reactLeaflet, L]) => {
        // Fix default icon paths for Leaflet when bundled
        // @ts-expect-error Leaflet type for private method not exposed; safe to delete prototype property
        delete L.default.Icon.Default.prototype._getIconUrl;
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet/marker-icon-2x.png',
          iconUrl: '/leaflet/marker-icon.png',
          shadowUrl: '/leaflet/marker-shadow.png',
        });

        setMapComponents(reactLeaflet);
      });
    }
  }, []);

  // Prevent map layout issues when container first appears
  useEffect(() => {
    if (isClient) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 50);
    }
  }, [isClient]);

  if (!isClient || !MapComponents) {
    return (
      <div className="h-72 w-full overflow-hidden rounded-lg border flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;
  const position: [number, number] = [latitude, longitude];

  return (
    <div className="h-72 w-full overflow-hidden rounded-lg border">
      <MapContainer center={position} zoom={13} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{label}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

// Export the component wrapped with dynamic import
export default dynamic(() => Promise.resolve(CarMapComponent), { ssr: false });
