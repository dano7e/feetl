"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon paths for Leaflet when bundled
// @ts-expect-error Leaflet type for private method not exposed; safe to delete prototype property
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: typeof window !== 'undefined' ? '/leaflet/marker-icon-2x.png' : undefined,
  iconUrl: typeof window !== 'undefined' ? '/leaflet/marker-icon.png' : undefined,
  shadowUrl: typeof window !== 'undefined' ? '/leaflet/marker-shadow.png' : undefined,
});

interface CarMapProps {
  latitude: number;
  longitude: number;
  label?: string;
}

export default function CarMap({ latitude, longitude, label = 'Car Location' }: CarMapProps) {
  // Prevent map layout issues when container first appears
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);
  }, []);

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
