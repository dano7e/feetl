export interface Car {
  id: string;
  plateNumber: string;
  owner: string;
  assignedDriver: string;
  make?: string;
  model?: string;
  year?: number;
  type?: string;
  latitude?: number;
  longitude?: number;
  gpsStatus: 'online' | 'offline';
  fuelLevel: number;
  maintenanceStatus: 'good' | 'due' | 'overdue';
  violationsCount: number;
  accidentsCount: number;
  budgetSpent: number;
  budgetAllocated: number;
  lastServiceDate: string;
  insuranceExpiry: string;
  licenseExpiry: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  carId: string | null;
  assignedProject: string;
  manager: string;
  licenseExpiry: string;
  totalViolations: number;
}

export interface FleetSummary {
  totalCars: number;
  carsInMaintenance: number;
  accidentsReported: number;
  totalCostThisMonth: number;
}

export interface Notification {
  id: string;
  type: 'insurance' | 'license' | 'maintenance' | 'gps' | 'fuel';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  carId?: string;
  driverId?: string;
}

export interface ChartData {
  month: string;
  cost: number;
}

export interface KmData {
  car: string;
  driven: number;
  idle: number;
}
