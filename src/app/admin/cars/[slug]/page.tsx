'use client';

import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Car as CarIcon, Fuel, MapPin, Wrench, AlertTriangle, FileText } from 'lucide-react';
import { BackButton } from '@/components/BackButton';
import CarMap from '@/components/CarMap';
import { Car as CarType, Driver } from '@/types/fleet';

// Reuse mock data locally for the slug page for now. In real app, fetch from API.
const cars: CarType[] = [
  {
    id: '1',
    plateNumber: 'ABC-123',
    owner: 'Company Fleet',
    assignedDriver: 'John Doe',
    make: 'Toyota',
    model: 'Corolla',
    year: 2021,
    type: 'Sedan',
    latitude: 25.276987,
    longitude: 55.296249,
    gpsStatus: 'online',
    fuelLevel: 85,
    maintenanceStatus: 'good',
    violationsCount: 2,
    accidentsCount: 0,
    budgetSpent: 2800,
    budgetAllocated: 3000,
    lastServiceDate: '2024-08-15',
    insuranceExpiry: '2024-12-31',
    licenseExpiry: '2024-11-30'
  },
  {
    id: '2',
    plateNumber: 'XYZ-456',
    owner: 'Company Fleet',
    assignedDriver: 'Jane Smith',
    make: 'Ford',
    model: 'Ranger',
    year: 2020,
    type: 'Pickup',
    latitude: 24.713552,
    longitude: 46.675297,
    gpsStatus: 'offline',
    fuelLevel: 25,
    maintenanceStatus: 'due',
    violationsCount: 0,
    accidentsCount: 1,
    budgetSpent: 3200,
    budgetAllocated: 3000,
    lastServiceDate: '2024-07-20',
    insuranceExpiry: '2024-10-15',
    licenseExpiry: '2024-12-15'
  },
  {
    id: '3',
    plateNumber: 'DEF-789',
    owner: 'Company Fleet',
    assignedDriver: 'Mike Johnson',
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    type: 'Sedan',
    latitude: 30.044420,
    longitude: 31.235712,
    gpsStatus: 'online',
    fuelLevel: 60,
    maintenanceStatus: 'overdue',
    violationsCount: 5,
    accidentsCount: 2,
    budgetSpent: 2950,
    budgetAllocated: 3000,
    lastServiceDate: '2024-06-10',
    insuranceExpiry: '2024-09-30',
    licenseExpiry: '2024-10-20'
  }
];

const drivers: Driver[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1-555-0101',
    carId: '1',
    assignedProject: 'Project Alpha',
    manager: 'Sarah Wilson',
    licenseExpiry: '2025-03-15',
    totalViolations: 2
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1-555-0102',
    carId: '2',
    assignedProject: 'Project Beta',
    manager: 'Robert Brown',
    licenseExpiry: '2024-11-20',
    totalViolations: 0
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    phone: '+1-555-0103',
    carId: '3',
    assignedProject: 'Project Gamma',
    manager: 'Sarah Wilson',
    licenseExpiry: '2024-10-05',
    totalViolations: 5
  }
];

function CarDetailsPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  
  // Determine the correct fallback URL based on where the user came from
  const getFallbackUrl = () => {
    switch (from) {
      case 'vehicles':
        return '/admin?view=vehicles';
      case 'all-drivers':
        return '/admin?view=all-drivers';
      case 'map':
        return '/admin?view=map';
      default:
        return '/admin'; // Default fallback
    }
  };
  
  const [car, setCar] = React.useState<CarType | undefined>(undefined);
  const [driver, setDriver] = React.useState<Driver | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const loadData = async () => {
      const { slug: rawSlug } = await params;
      const slug = decodeURIComponent(rawSlug);
      const foundCar = cars.find(c => c.plateNumber === slug);
      if (!foundCar) {
        notFound();
        return;
      }
      const foundDriver = drivers.find(d => d.carId === foundCar.id);
      setCar(foundCar);
      setDriver(foundDriver);
      setLoading(false);
    };
    loadData();
  }, [params]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!car) {
    return notFound();
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const statusBadge = (label: string, variant: 'default' | 'destructive' | 'secondary' = 'default') => (
    <Badge variant={variant}>{label}</Badge>
  );

  return (
    <div className="min-h-screen bg-gray-50/30 p-3 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CarIcon className="h-4 w-4 sm:h-5 sm:w-5" /> Car • {car.plateNumber}
          </h1>
          <BackButton fallbackHref={getFallbackUrl()} label="Go Back" />
        </div>
        <p className="text-sm sm:text-base text-gray-600">{car.make} {car.model} {car.year} • {car.type}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Driver Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
            </CardHeader>
            <CardContent>
              {driver ? (
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="text-xs">No image</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <p className="font-medium text-sm sm:text-base">{driver.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{driver.email}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{driver.phone}</p>
                    <p className="text-xs text-gray-500">Project: {driver.assignedProject}</p>
                    <p className="text-xs text-gray-500">Manager: {driver.manager}</p>
                    <p className="text-xs text-gray-500">License Expiry: {new Date(driver.licenseExpiry).toLocaleDateString()}</p>
                    <Badge variant={driver.totalViolations > 0 ? 'destructive' : 'default'} className="text-xs">
                      {driver.totalViolations} violations
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No driver assigned.</p>
              )}
              <Button className="w-full mt-4 sm:mt-6" variant="outline" size="sm">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2" /> 
                <span className="text-xs sm:text-sm">Report Incident</span>
              </Button>
            </CardContent>
          </Card>

          {/* Car Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Car Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {typeof car.latitude === 'number' && typeof car.longitude === 'number' && (
                <div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-2">GPS Tracking</div>
                  <CarMap latitude={car.latitude!} longitude={car.longitude!} label={`Plate ${car.plateNumber}`} />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"><MapPin className="h-3 w-3 sm:h-4 sm:w-4" /> GPS</div>
                  <div className="mt-1">{statusBadge(car.gpsStatus, car.gpsStatus === 'online' ? 'default' : 'destructive')}</div>
                </div>
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"><Fuel className="h-3 w-3 sm:h-4 sm:w-4" /> Fuel</div>
                  <div className={`mt-1 text-sm sm:text-base ${car.fuelLevel < 30 ? 'text-red-600' : 'text-green-600'}`}>{car.fuelLevel}%</div>
                </div>
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"><Wrench className="h-3 w-3 sm:h-4 sm:w-4" /> Maintenance</div>
                  <div className="mt-1">{statusBadge(car.maintenanceStatus, car.maintenanceStatus === 'overdue' ? 'destructive' : car.maintenanceStatus === 'due' ? 'secondary' : 'default')}</div>
                </div>
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"><AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" /> Violations / Accidents</div>
                  <div className="mt-1 text-xs sm:text-sm"><span className="text-red-600 font-semibold">{car.violationsCount}</span> / {car.accidentsCount} accidents</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600">Budget Spent</div>
                  <div className={`${car.budgetSpent > car.budgetAllocated ? 'text-red-600' : 'text-green-600'} font-medium text-sm sm:text-base`}>{formatCurrency(car.budgetSpent)}</div>
                </div>
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600">Budget Allocated</div>
                  <div className="text-gray-800 font-medium text-sm sm:text-base">{formatCurrency(car.budgetAllocated)}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600">Last Service Date</div>
                  <div className="text-gray-800 font-medium text-sm sm:text-base">{new Date(car.lastServiceDate).toLocaleDateString()}</div>
                </div>
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600">Insurance Expiry</div>
                  <div className="text-gray-800 font-medium text-sm sm:text-base">{new Date(car.insuranceExpiry).toLocaleDateString()}</div>
                </div>
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600">License Expiry</div>
                  <div className="text-gray-800 font-medium text-sm sm:text-base">{new Date(car.licenseExpiry).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CarDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50/30 p-6 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading car details...</p>
      </div>
    </div>}>
      <CarDetailsPageContent params={params} />
    </Suspense>
  );
}
