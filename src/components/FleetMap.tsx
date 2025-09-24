"use client";

import React, { useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Use default icons
// @ts-expect-error Leaflet private method not typed
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: typeof window !== 'undefined' ? '/leaflet/marker-icon-2x.png' : undefined,
  iconUrl: typeof window !== 'undefined' ? '/leaflet/marker-icon.png' : undefined,
  shadowUrl: typeof window !== 'undefined' ? '/leaflet/marker-shadow.png' : undefined,
});

export interface FleetMapCar {
  id: string;
  plateNumber: string;
  driverName: string;
  latitude: number;
  longitude: number;
  status: 'online' | 'offline';
}

interface FleetMapProps {
  cars: FleetMapCar[];
}

export default function FleetMap({ cars }: FleetMapProps) {
  useEffect(() => {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
  }, []);

  const center = useMemo<[number, number]>(() => {
    if (cars.length === 0) return [25.276987, 55.296249];
    const lat = cars.reduce((s, c) => s + c.latitude, 0) / cars.length;
    const lng = cars.reduce((s, c) => s + c.longitude, 0) / cars.length;
    return [lat, lng];
  }, [cars]);

  const onlineIcon = useMemo(() => new L.Icon({
    iconUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41"><g fill="none" fill-rule="evenodd"><path d="M12.5 0C5.596 0 0 5.596 0 12.5S12.5 41 12.5 41 25 19.404 25 12.5C25 5.596 19.404 0 12.5 0z" fill="#10b981"/><path d="M12.5 19a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill="#fff"/></g></svg>`),
    iconSize: [25, 41], iconAnchor: [12, 41], shadowUrl: undefined as unknown as string
  }), []);

  const offlineIcon = useMemo(() => new L.Icon({
    iconUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41"><g fill="none" fill-rule="evenodd"><path d="M12.5 0C5.596 0 0 5.596 0 12.5S12.5 41 12.5 41 25 19.404 25 12.5C25 5.596 19.404 0 12.5 0z" fill="#ef4444"/><path d="M12.5 19a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill="#fff"/></g></svg>`),
    iconSize: [25, 41], iconAnchor: [12, 41], shadowUrl: undefined as unknown as string
  }), []);

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-lg border">
      <MapContainer center={center} zoom={6} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cars.map((car) => (
          <Marker key={car.id} position={[car.latitude, car.longitude]} icon={car.status === 'online' ? onlineIcon : offlineIcon}>
            <Popup>
              <div className="space-y-1">
                <div className="font-medium">{car.plateNumber}</div>
                <div className="text-sm text-gray-600">{car.driverName}</div>
                <a className="text-blue-600 text-sm hover:underline" href={`/admin/cars/${encodeURIComponent(car.plateNumber)}?from=map`}>View details</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
