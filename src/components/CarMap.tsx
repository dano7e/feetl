"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

interface CarMapProps {
  latitude: number;
  longitude: number;
  label?: string;
}

function CarMapComponent({ latitude, longitude, label = 'Car Location' }: CarMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Initialize Leaflet icons only on client side
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        // Fix default icon paths for Leaflet when bundled
        // @ts-expect-error Leaflet type for private method not exposed; safe to delete prototype property
        delete L.default.Icon.Default.prototype._getIconUrl;
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet/marker-icon-2x.png',
          iconUrl: '/leaflet/marker-icon.png',
          shadowUrl: '/leaflet/marker-shadow.png',
        });

        // Import Leaflet CSS
        import('leaflet/dist/leaflet.css');
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

  if (!isClient) {
    return (
      <div className="h-72 w-full overflow-hidden rounded-lg border flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

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
