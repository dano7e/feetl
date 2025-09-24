'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Car,
  Settings,
  AlertTriangle,
  DollarSign,
  Wrench,
  MapPin,
  Fuel,
  Bell,
  Users,
  TrendingUp,
  BarChart3,
  Calendar,
  FileText,
  Plus
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Car as CarType, Driver, FleetSummary, Notification, ChartData, KmData } from '@/types/fleet';

// Mock data - in a real app, this would come from an API
const fleetSummary: FleetSummary = {
  totalCars: 45,
  carsInMaintenance: 7,
  accidentsReported: 3,
  totalCostThisMonth: 125000
};

const cars: CarType[] = [
  {
    id: '1',
    plateNumber: 'ABC-123',
    owner: 'Company Fleet',
    assignedDriver: 'John Doe',
    gpsStatus: 'online',
    fuelLevel: 85,
    maintenanceStatus: 'good',
    violationsCount: 2,
    accidentsCount: 0,
    budgetSpent: 2800,
    budgetAllocated: 3000,
    lastServiceDate: '2024-08-15',
    insuranceExpiry: '2024-12-31',
    licenseExpiry: '2024-11-30',
    make: 'Toyota',
    model: 'Corolla',
    year: 2021,
    type: 'Sedan',
    latitude: 25.276987, // Dubai (example)
    longitude: 55.296249,
  },
  {
    id: '2',
    plateNumber: 'XYZ-456',
    owner: 'Company Fleet',
    assignedDriver: 'Jane Smith',
    gpsStatus: 'offline',
    fuelLevel: 25,
    maintenanceStatus: 'due',
    violationsCount: 0,
    accidentsCount: 1,
    budgetSpent: 3200,
    budgetAllocated: 3000,
    lastServiceDate: '2024-07-20',
    insuranceExpiry: '2024-10-15',
    licenseExpiry: '2024-12-15',
    make: 'Ford',
    model: 'Ranger',
    year: 2020,
    type: 'Pickup',
    latitude: 24.713552, // Riyadh
    longitude: 46.675297,
  },
  {
    id: '3',
    plateNumber: 'DEF-789',
    owner: 'Company Fleet',
    assignedDriver: 'Mike Johnson',
    gpsStatus: 'online',
    fuelLevel: 60,
    maintenanceStatus: 'overdue',
    violationsCount: 5,
    accidentsCount: 2,
    budgetSpent: 2950,
    budgetAllocated: 3000,
    lastServiceDate: '2024-06-10',
    insuranceExpiry: '2024-09-30',
    licenseExpiry: '2024-10-20',
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    type: 'Sedan',
    latitude: 30.044420, // Cairo
    longitude: 31.235712,
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

const notifications: Notification[] = [
  {
    id: '1',
    type: 'insurance',
    title: 'Insurance Expiring Soon',
    message: 'Car DEF-789 insurance expires in 5 days',
    severity: 'high',
    timestamp: '2024-09-24T10:30:00Z',
    carId: '3'
  },
  {
    id: '2',
    type: 'maintenance',
    title: 'Oil Change Due',
    message: 'Car XYZ-456 needs oil change by end of month',
    severity: 'medium',
    timestamp: '2024-09-24T09:15:00Z',
    carId: '2'
  },
  {
    id: '3',
    type: 'gps',
    title: 'GPS Offline',
    message: 'Car XYZ-456 has been offline for 2 hours',
    severity: 'high',
    timestamp: '2024-09-24T08:00:00Z',
    carId: '2'
  },
  {
    id: '4',
    type: 'fuel',
    title: 'Low Fuel Alert',
    message: 'Car XYZ-456 fuel level is below 30%',
    severity: 'medium',
    timestamp: '2024-09-24T07:45:00Z',
    carId: '2'
  }
];

const costTrends: ChartData[] = [
  { month: 'Jan', cost: 98000 },
  { month: 'Feb', cost: 105000 },
  { month: 'Mar', cost: 112000 },
  { month: 'Apr', cost: 108000 },
  { month: 'May', cost: 115000 },
  { month: 'Jun', cost: 120000 },
  { month: 'Jul', cost: 118000 },
  { month: 'Aug', cost: 122000 },
  { month: 'Sep', cost: 125000 }
];

const kmData: KmData[] = [
  { car: 'ABC-123', driven: 2800, idle: 200 },
  { car: 'XYZ-456', driven: 2200, idle: 800 },
  { car: 'DEF-789', driven: 3100, idle: 150 },
  { car: 'GHI-101', driven: 1900, idle: 600 },
  { car: 'JKL-202', driven: 2600, idle: 300 }
];

const FleetMap = dynamic(() => import('@/components/FleetMap'), { ssr: false });

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get('view') as 'overview' | 'map' | 'analysis' | 'vehicles' | 'vehicles-coupe' | 'vehicles-truck' | 'drivers' | 'all-drivers' | 'users-drivers' | 'users-finance' | 'users-maintenance' || 'overview';
  
  const [activeView, setActiveView] = React.useState<'overview' | 'map' | 'analysis' | 'vehicles' | 'vehicles-coupe' | 'vehicles-truck' | 'drivers' | 'all-drivers' | 'users-drivers' | 'users-finance' | 'users-maintenance'>(initialView);
  const [vehiclesMenuOpen, setVehiclesMenuOpen] = React.useState<boolean>(['vehicles', 'vehicles-coupe', 'vehicles-truck'].includes(initialView));
  const [driversMenuOpen, setDriversMenuOpen] = React.useState<boolean>(['drivers', 'all-drivers'].includes(initialView));
  const [usersMenuOpen, setUsersMenuOpen] = React.useState<boolean>(['users-drivers', 'users-finance', 'users-maintenance'].includes(initialView));
  const [selectedVehicleId, setSelectedVehicleId] = React.useState<string | null>(null);
  const [selectedDriverId, setSelectedDriverId] = React.useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [showAddDriverForm, setShowAddDriverForm] = React.useState<boolean>(false);
  const [showAddCoupeForm, setShowAddCoupeForm] = React.useState<boolean>(false);
  const [showAddTruckForm, setShowAddTruckForm] = React.useState<boolean>(false);
  const [showAddUserForm, setShowAddUserForm] = React.useState<boolean>(false);
  const [newDriver, setNewDriver] = React.useState({
    name: '',
    email: '',
    phone: '',
    assignedProject: '',
    manager: '',
    licenseExpiry: '',
    carId: ''
  });
  const [newCar, setNewCar] = React.useState({
    plateNumber: '',
    make: '',
    model: '',
    year: '',
    type: '',
    owner: 'Company Fleet',
    assignedDriver: '',
    latitude: '',
    longitude: '',
    gpsStatus: 'online' as 'online' | 'offline',
    fuelLevel: 100,
    maintenanceStatus: 'good' as 'good' | 'due' | 'overdue',
    violationsCount: 0,
    accidentsCount: 0,
    budgetSpent: 0,
    budgetAllocated: 3000,
    lastServiceDate: '',
    insuranceExpiry: '',
    licenseExpiry: ''
  });
  const [newUser, setNewUser] = React.useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    hireDate: '',
    salary: '',
    status: 'active' as 'active' | 'inactive'
  });

  // Mock users data
  const users = {
    drivers: [
      { id: '1', name: 'John Doe', email: 'john.doe@company.com', phone: '+1-555-0101', role: 'Driver', department: 'Fleet Operations', hireDate: '2023-01-15', salary: '45000', status: 'active' as const },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', phone: '+1-555-0102', role: 'Driver', department: 'Fleet Operations', hireDate: '2023-03-20', salary: '45000', status: 'active' as const },
      { id: '3', name: 'Mike Johnson', email: 'mike.johnson@company.com', phone: '+1-555-0103', role: 'Driver', department: 'Fleet Operations', hireDate: '2022-11-10', salary: '45000', status: 'active' as const }
    ],
    finance: [
      { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', phone: '+1-555-0201', role: 'Finance Manager', department: 'Finance', hireDate: '2022-05-01', salary: '75000', status: 'active' as const },
      { id: '5', name: 'Robert Brown', email: 'robert.brown@company.com', phone: '+1-555-0202', role: 'Accountant', department: 'Finance', hireDate: '2023-07-15', salary: '55000', status: 'active' as const }
    ],
    maintenance: [
      { id: '6', name: 'David Lee', email: 'david.lee@company.com', phone: '+1-555-0301', role: 'Maintenance Supervisor', department: 'Maintenance', hireDate: '2021-09-01', salary: '60000', status: 'active' as const },
      { id: '7', name: 'Lisa Garcia', email: 'lisa.garcia@company.com', phone: '+1-555-0302', role: 'Mechanic', department: 'Maintenance', hireDate: '2023-02-10', salary: '40000', status: 'active' as const }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status: string, type: 'gps' | 'maintenance') => {
    if (type === 'gps') {
      return (
        <Badge variant={status === 'online' ? 'default' : 'destructive'}>
          <MapPin className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      );
    }
    
    const variant = status === 'good' ? 'default' : status === 'due' ? 'secondary' : 'destructive';
    return (
      <Badge variant={variant}>
        <Wrench className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 xl:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="hidden xl:block">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Menu</CardTitle>
              <CardDescription>Select a section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant={activeView === 'overview' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('overview')}>
                Overview
              </Button>
              <Button variant={activeView === 'map' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('map')}>
                Live Vehicles Map
              </Button>
              <Button variant={activeView === 'analysis' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('analysis')}>
                Analysis
              </Button>
              <div className="pt-2">
                <Button variant={vehiclesMenuOpen ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setVehiclesMenuOpen(!vehiclesMenuOpen)}>
                  vichels
                  <span className="text-xs opacity-70">{vehiclesMenuOpen ? '▾' : '▸'}</span>
                </Button>
                {vehiclesMenuOpen && (
                  <div className="mt-2 space-y-2">
                    <Button variant={activeView === 'vehicles' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('vehicles')}>
                      All Vehicles
                    </Button>
                    <Button variant={activeView === 'vehicles-coupe' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('vehicles-coupe')}>
                      Coupe Cars
                    </Button>
                    <Button variant={activeView === 'vehicles-truck' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('vehicles-truck')}>
                      Truck Cars
                    </Button>
                  </div>
                )}
              </div>
              <div className="pt-2">
                <Button variant={driversMenuOpen ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setDriversMenuOpen(!driversMenuOpen)}>
                  drivers
                  <span className="text-xs opacity-70">{driversMenuOpen ? '▾' : '▸'}</span>
                </Button>
                {driversMenuOpen && (
                  <div className="mt-2 space-y-2">
                    <Button variant={activeView === 'all-drivers' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('all-drivers')}>
                      All Drivers
                    </Button>
                    <Button variant={activeView === 'drivers' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('drivers')}>
                      Driver Management
                    </Button>
                  </div>
                )}
              </div>
              <div className="pt-2">
                <Button variant={usersMenuOpen ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setUsersMenuOpen(!usersMenuOpen)}>
                  users managments
                  <span className="text-xs opacity-70">{usersMenuOpen ? '▾' : '▸'}</span>
                </Button>
                {usersMenuOpen && (
                  <div className="mt-2 space-y-2">
                    <Button variant={activeView === 'users-drivers' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('users-drivers')}>
                      users drivers
                    </Button>
                    <Button variant={activeView === 'users-finance' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('users-finance')}>
                      finance employer
                    </Button>
                    <Button variant={activeView === 'users-maintenance' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('users-maintenance')}>
                      Maintenance worker
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Fleet Management Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor and manage your entire fleet from one place</p>
          </div>

          {activeView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fleetSummary.totalCars}</div>
              <p className="text-xs text-muted-foreground">Active fleet vehicles</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{fleetSummary.carsInMaintenance}</div>
              <p className="text-xs text-muted-foreground">Cars currently serviced</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accidents Reported</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{fleetSummary.accidentsReported}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(fleetSummary.totalCostThisMonth)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>
        )}

        {activeView === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
          {/* Main Cars Table */}
          <div className="xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Fleet Overview
                </CardTitle>
                <CardDescription>Detailed view of all fleet vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Car ID / Plate</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>GPS Status</TableHead>
                      <TableHead>Fuel</TableHead>
                      <TableHead>Maintenance</TableHead>
                      <TableHead>Violations</TableHead>
                      <TableHead>Budget</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cars.map((car) => (
                      <TableRow key={car.id}>
                        <TableCell className="font-medium">{car.id} • {car.plateNumber}</TableCell>
                        <TableCell><a className="text-blue-600 hover:underline" href={`/admin/cars/${encodeURIComponent(car.plateNumber)}`}>{car.assignedDriver}</a></TableCell>
                        <TableCell>{getStatusBadge(car.gpsStatus, 'gps')}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Fuel className="h-4 w-4 text-blue-500" />
                            <span className={car.fuelLevel < 30 ? 'text-red-600' : 'text-green-600'}>
                              {car.fuelLevel}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(car.maintenanceStatus, 'maintenance')}</TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="text-red-600 font-semibold">{car.violationsCount}</div>
                            <div className="text-xs text-gray-500">/ {car.accidentsCount} acc</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className={car.budgetSpent > car.budgetAllocated ? 'text-red-600' : 'text-green-600'}>
                              {formatCurrency(car.budgetSpent)}
                            </div>
                            <div className="text-xs text-gray-500">
                              / {formatCurrency(car.budgetAllocated)}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Notifications Panel */}
          <div className="xl:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alerts & Notifications
                </CardTitle>
                <CardDescription>Recent system alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${getSeverityColor(notification.severity)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs mt-1 opacity-90">{notification.message}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        )}

        {activeView === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Driver Management
              </CardTitle>
              <CardDescription>Active drivers and their assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${driver.name}`} />
                        <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-gray-600">{driver.assignedProject}</p>
                        <p className="text-xs text-gray-500">Manager: {driver.manager}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={driver.totalViolations > 0 ? 'destructive' : 'default'}>
                        {driver.totalViolations} violations
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        Car: {cars.find(c => c.id === driver.carId)?.plateNumber || 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Manage fleet operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Assign New Driver
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Fleet Settings
              </Button>
            </CardContent>
          </Card>
        </div>
        )}

        {activeView === 'analysis' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Fleet Cost Trends
              </CardTitle>
              <CardDescription>Track spending patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={costTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), 'Cost']} />
                  <Legend />
                  <Line type="monotone" dataKey="cost" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                KM Driven vs Idle Time
              </CardTitle>
              <CardDescription>Vehicle utilization analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={kmData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="car" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="driven" fill="#22c55e" name="KM Driven" />
                  <Bar dataKey="idle" fill="#ef4444" name="Idle Time (hrs)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        )}

        {/* Vehicles Section - All Vehicles */}
        {activeView === 'vehicles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Fleet Overview</h2>
              <p className="text-gray-600">Detailed view of all fleet vehicles</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Fleet Overview
                </CardTitle>
                <CardDescription>Detailed view of all fleet vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Car ID / Plate</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>GPS Status</TableHead>
                      <TableHead>Fuel</TableHead>
                      <TableHead>Maintenance</TableHead>
                      <TableHead>Violations</TableHead>
                      <TableHead>Budget</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cars.map((car) => {
                      const driver = drivers.find(d => d.carId === car.id);
                      return (
                      <TableRow key={car.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedVehicleId(car.id)}>
                        <TableCell className="font-medium">
                          {car.id} • {car.plateNumber}
                        </TableCell>
                        <TableCell>
                          <Link href={`/admin/cars/${encodeURIComponent(car.plateNumber)}?from=vehicles`} className="text-blue-600 hover:underline">
                            {car.assignedDriver}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {driver?.phone || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={car.gpsStatus === 'online' ? 'default' : 'destructive'} className="flex items-center gap-1 w-fit">
                            <MapPin className="h-3 w-3" />
                            {car.gpsStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Fuel className="h-4 w-4 text-blue-500" />
                            <span className={car.fuelLevel < 30 ? 'text-red-600' : car.fuelLevel < 60 ? 'text-yellow-600' : 'text-green-600'}>
                              {car.fuelLevel}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={car.maintenanceStatus === 'good' ? 'default' : car.maintenanceStatus === 'due' ? 'secondary' : 'destructive'}
                            className="flex items-center gap-1 w-fit"
                          >
                            <Wrench className="h-3 w-3" />
                            {car.maintenanceStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-red-600 font-medium">{car.violationsCount}</div>
                          <div className="text-gray-500 text-sm">/ {car.accidentsCount} acc</div>
                        </TableCell>
                        <TableCell>
                          <div className={car.budgetSpent > car.budgetAllocated ? 'text-red-600' : 'text-green-600'}>
                            {formatCurrency(car.budgetSpent)}
                          </div>
                          <div className="text-gray-500 text-sm">/ {formatCurrency(car.budgetAllocated)}</div>
                        </TableCell>
                      </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'map' && (
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Live Vehicles Map
              </CardTitle>
              <CardDescription>Quickly track all drivers and cars</CardDescription>
            </CardHeader>
            <CardContent>
              <FleetMap cars={cars
                .filter(c => typeof c.latitude === 'number' && typeof c.longitude === 'number')
                .map(c => ({
                  id: c.id,
                  plateNumber: c.plateNumber,
                  driverName: c.assignedDriver,
                  latitude: c.latitude as number,
                  longitude: c.longitude as number,
                  status: c.gpsStatus,
                }))} />
            </CardContent>
          </Card>
        </div>
        )}

        {/* Vehicles - Coupe */}
        {activeView === 'vehicles-coupe' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>Coupe Cars</CardTitle>
                  <CardDescription>All normal passenger cars</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddCoupeForm(!showAddCoupeForm)}>
                  <Plus className="h-4 w-4 mr-1" /> add coupe car
                </Button>
              </div>
            </CardHeader>
            {showAddCoupeForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Plate Number</label>
                    <input
                      type="text"
                      value={newCar.plateNumber}
                      onChange={(e) => setNewCar({...newCar, plateNumber: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="ABC-123"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Make</label>
                    <input
                      type="text"
                      value={newCar.make}
                      onChange={(e) => setNewCar({...newCar, make: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Toyota"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Model</label>
                    <input
                      type="text"
                      value={newCar.model}
                      onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Corolla"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Year</label>
                    <input
                      type="number"
                      value={newCar.year}
                      onChange={(e) => setNewCar({...newCar, year: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Type</label>
                    <select
                      value={newCar.type}
                      onChange={(e) => setNewCar({...newCar, type: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="">Select type</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Coupe">Coupe</option>
                      <option value="SUV">SUV</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Assign Driver</label>
                    <select
                      value={newCar.assignedDriver}
                      onChange={(e) => setNewCar({...newCar, assignedDriver: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="">Select a driver</option>
                      {drivers.map(driver => (
                        <option key={driver.id} value={driver.name}>{driver.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => {
                      console.log('New coupe car:', newCar);
                      setShowAddCoupeForm(false);
                      setNewCar({plateNumber: '', make: '', model: '', year: '', type: '', owner: 'Company Fleet', assignedDriver: '', latitude: '', longitude: '', gpsStatus: 'online', fuelLevel: 100, maintenanceStatus: 'good', violationsCount: 0, accidentsCount: 0, budgetSpent: 0, budgetAllocated: 3000, lastServiceDate: '', insuranceExpiry: '', licenseExpiry: ''});
                    }}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddCoupeForm(false);
                      setNewCar({plateNumber: '', make: '', model: '', year: '', type: '', owner: 'Company Fleet', assignedDriver: '', latitude: '', longitude: '', gpsStatus: 'online', fuelLevel: 100, maintenanceStatus: 'good', violationsCount: 0, accidentsCount: 0, budgetSpent: 0, budgetAllocated: 3000, lastServiceDate: '', insuranceExpiry: '', licenseExpiry: ''});
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <CardContent className="space-y-2">
              {cars.filter(c => (c.type ?? 'Sedan') !== 'Pickup' && (c.type ?? '').toLowerCase() !== 'truck').map((c) => (
                <Button key={c.id} variant={selectedVehicleId === c.id ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setSelectedVehicleId(c.id)}>
                  <span>{c.plateNumber}</span>
                  <span className="text-xs opacity-70">{c.make} {c.model}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Vehicle & Owner</CardTitle>
              <CardDescription>Details of selected vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const v = cars.find(c => c.id === selectedVehicleId);
                const owner = drivers.find(d => d.carId === selectedVehicleId);
                if (!v) return <p className="text-sm text-gray-600">Select a car to view details.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Car Information</h3>
                      <p className="text-sm">Plate: {v.plateNumber}</p>
                      <p className="text-sm">Make/Model: {v.make} {v.model} {v.year}</p>
                      <p className="text-sm">Type: {v.type}</p>
                      <p className="text-sm">GPS: {v.gpsStatus}</p>
                      <p className="text-sm">Fuel: {v.fuelLevel}%</p>
                      <p className="text-sm">Maintenance: {v.maintenanceStatus}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Owner/Driver</h3>
                      {owner ? (
                        <>
                          <p className="text-sm">Name: {owner.name}</p>
                          <p className="text-sm">Email: {owner.email}</p>
                          <p className="text-sm">Phone: {owner.phone}</p>
                          <p className="text-sm">Project: {owner.assignedProject}</p>
                          <p className="text-sm">Manager: {owner.manager}</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-600">No owner linked.</p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
        )}

        {/* Vehicles - Truck */}
        {activeView === 'vehicles-truck' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>Truck Cars</CardTitle>
                  <CardDescription>Heavy-duty and pickup vehicles</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddTruckForm(!showAddTruckForm)}>
                  <Plus className="h-4 w-4 mr-1" /> add truck car
                </Button>
              </div>
            </CardHeader>
            {showAddTruckForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Plate Number</label>
                    <input
                      type="text"
                      value={newCar.plateNumber}
                      onChange={(e) => setNewCar({...newCar, plateNumber: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="XYZ-456"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Make</label>
                    <input
                      type="text"
                      value={newCar.make}
                      onChange={(e) => setNewCar({...newCar, make: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Ford"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Model</label>
                    <input
                      type="text"
                      value={newCar.model}
                      onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Ranger"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Year</label>
                    <input
                      type="number"
                      value={newCar.year}
                      onChange={(e) => setNewCar({...newCar, year: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Type</label>
                    <select
                      value={newCar.type}
                      onChange={(e) => setNewCar({...newCar, type: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="">Select type</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Truck">Truck</option>
                      <option value="Heavy Truck">Heavy Truck</option>
                      <option value="Delivery Truck">Delivery Truck</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Assign Driver</label>
                    <select
                      value={newCar.assignedDriver}
                      onChange={(e) => setNewCar({...newCar, assignedDriver: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="">Select a driver</option>
                      {drivers.map(driver => (
                        <option key={driver.id} value={driver.name}>{driver.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => {
                      console.log('New truck car:', newCar);
                      setShowAddTruckForm(false);
                      setNewCar({plateNumber: '', make: '', model: '', year: '', type: '', owner: 'Company Fleet', assignedDriver: '', latitude: '', longitude: '', gpsStatus: 'online', fuelLevel: 100, maintenanceStatus: 'good', violationsCount: 0, accidentsCount: 0, budgetSpent: 0, budgetAllocated: 3000, lastServiceDate: '', insuranceExpiry: '', licenseExpiry: ''});
                    }}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddTruckForm(false);
                      setNewCar({plateNumber: '', make: '', model: '', year: '', type: '', owner: 'Company Fleet', assignedDriver: '', latitude: '', longitude: '', gpsStatus: 'online', fuelLevel: 100, maintenanceStatus: 'good', violationsCount: 0, accidentsCount: 0, budgetSpent: 0, budgetAllocated: 3000, lastServiceDate: '', insuranceExpiry: '', licenseExpiry: ''});
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <CardContent className="space-y-2">
              {cars.filter(c => (c.type ?? '').toLowerCase().includes('pickup') || (c.type ?? '').toLowerCase().includes('truck')).map((c) => (
                <Button key={c.id} variant={selectedVehicleId === c.id ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setSelectedVehicleId(c.id)}>
                  <span>{c.plateNumber}</span>
                  <span className="text-xs opacity-70">{c.make} {c.model}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Vehicle & Owner</CardTitle>
              <CardDescription>Details of selected vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const v = cars.find(c => c.id === selectedVehicleId);
                const owner = drivers.find(d => d.carId === selectedVehicleId);
                if (!v) return <p className="text-sm text-gray-600">Select a truck to view details.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Truck Information</h3>
                      <p className="text-sm">Plate: {v.plateNumber}</p>
                      <p className="text-sm">Make/Model: {v.make} {v.model} {v.year}</p>
                      <p className="text-sm">Type: {v.type}</p>
                      <p className="text-sm">GPS: {v.gpsStatus}</p>
                      <p className="text-sm">Fuel: {v.fuelLevel}%</p>
                      <p className="text-sm">Maintenance: {v.maintenanceStatus}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Owner/Driver</h3>
                      {owner ? (
                        <>
                          <p className="text-sm">Name: {owner.name}</p>
                          <p className="text-sm">Email: {owner.email}</p>
                          <p className="text-sm">Phone: {owner.phone}</p>
                          <p className="text-sm">Project: {owner.assignedProject}</p>
                          <p className="text-sm">Manager: {owner.manager}</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-600">No owner linked.</p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
        )}

        {/* Drivers */}
        {/* All Drivers Section */}
        {activeView === 'all-drivers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">All Drivers</h2>
              <p className="text-gray-600">Complete overview of all drivers and their assigned vehicles</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Drivers Overview
                </CardTitle>
                <CardDescription>Detailed view of all drivers and their vehicle assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Assigned Vehicle</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>License Expiry</TableHead>
                      <TableHead>Violations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drivers.map((driver) => {
                      const assignedCar = cars.find(c => c.id === driver.carId);
                      return (
                        <TableRow key={driver.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedDriverId(driver.id)}>
                          <TableCell className="font-medium">
                            {driver.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <Link href={`/admin/cars/${encodeURIComponent(assignedCar?.plateNumber || '')}?from=all-drivers`} className="text-blue-600 hover:underline font-medium">
                                {driver.name}
                              </Link>
                            </div>
                          </TableCell>
                          <TableCell>
                            {driver.phone}
                          </TableCell>
                          <TableCell>
                            {driver.email}
                          </TableCell>
                          <TableCell>
                            {assignedCar ? (
                              <Link href={`/admin/cars/${encodeURIComponent(assignedCar.plateNumber)}`} className="text-blue-600 hover:underline">
                                {assignedCar.plateNumber}
                              </Link>
                            ) : (
                              <span className="text-gray-500">No vehicle assigned</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {driver.assignedProject}
                          </TableCell>
                          <TableCell>
                            {driver.manager}
                          </TableCell>
                          <TableCell>
                            <div className={new Date(driver.licenseExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-red-600' : 'text-green-600'}>
                              {new Date(driver.licenseExpiry).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <div className="text-red-600 font-semibold">{driver.totalViolations}</div>
                              <div className="text-xs text-gray-500">violations</div>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'drivers' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>Drivers</CardTitle>
                  <CardDescription>All drivers in the fleet</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddDriverForm(!showAddDriverForm)}>
                  <Plus className="h-4 w-4 mr-1" /> add driver
                </Button>
              </div>
            </CardHeader>
            {showAddDriverForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Name</label>
                    <input
                      type="text"
                      value={newDriver.name}
                      onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Driver name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Email</label>
                    <input
                      type="email"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="driver@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Phone</label>
                    <input
                      type="tel"
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="+1-555-0100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Project</label>
                    <input
                      type="text"
                      value={newDriver.assignedProject}
                      onChange={(e) => setNewDriver({...newDriver, assignedProject: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Project name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Manager</label>
                    <input
                      type="text"
                      value={newDriver.manager}
                      onChange={(e) => setNewDriver({...newDriver, manager: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Manager name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">License Expiry</label>
                    <input
                      type="date"
                      value={newDriver.licenseExpiry}
                      onChange={(e) => setNewDriver({...newDriver, licenseExpiry: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Assign Car</label>
                    <select
                      value={newDriver.carId}
                      onChange={(e) => setNewDriver({...newDriver, carId: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="">Select a car</option>
                      {cars.map(car => (
                        <option key={car.id} value={car.id}>{car.plateNumber} - {car.make} {car.model}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => {
                      // Here you would typically save to your backend
                      console.log('New driver:', newDriver);
                      setShowAddDriverForm(false);
                      setNewDriver({name: '', email: '', phone: '', assignedProject: '', manager: '', licenseExpiry: '', carId: ''});
                    }}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddDriverForm(false);
                      setNewDriver({name: '', email: '', phone: '', assignedProject: '', manager: '', licenseExpiry: '', carId: ''});
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <CardContent className="space-y-2">
              {drivers.map((d) => (
                <Button key={d.id} variant={selectedDriverId === d.id ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setSelectedDriverId(d.id)}>
                  <span>{d.name}</span>
                  <span className="text-xs opacity-70">{cars.find(c => c.id === d.carId)?.plateNumber || 'No car'}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Driver Details</CardTitle>
              <CardDescription>Driver and assigned vehicle info</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const driver = drivers.find(dr => dr.id === selectedDriverId);
                if (!driver) return <p className="text-sm text-gray-600">Select a driver to view details.</p>;
                const vehicle = cars.find(c => c.id === driver.carId);
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Driver Information</h3>
                      <p className="text-sm">Name: {driver.name}</p>
                      <p className="text-sm">Email: {driver.email}</p>
                      <p className="text-sm">Phone: {driver.phone}</p>
                      <p className="text-sm">Project: {driver.assignedProject}</p>
                      <p className="text-sm">Manager: {driver.manager}</p>
                      <p className="text-sm">License Expiry: {new Date(driver.licenseExpiry).toLocaleDateString()}</p>
                      <p className="text-sm">Violations: {driver.totalViolations}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Assigned Vehicle</h3>
                      {vehicle ? (
                        <>
                          <p className="text-sm">Plate: {vehicle.plateNumber}</p>
                          <p className="text-sm">Type: {vehicle.type}</p>
                          <p className="text-sm">Make/Model: {vehicle.make} {vehicle.model} {vehicle.year}</p>
                          <p className="text-sm">GPS: {vehicle.gpsStatus}</p>
                          <p className="text-sm">Fuel: {vehicle.fuelLevel}%</p>
                          <p className="text-sm">Maintenance: {vehicle.maintenanceStatus}</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-600">No vehicle assigned.</p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
        )}

        {/* Users Management - Drivers */}
        {activeView === 'users-drivers' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>Users Drivers</CardTitle>
                  <CardDescription>Manage driver employees</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddUserForm(!showAddUserForm)}>
                  <Plus className="h-4 w-4 mr-1" /> add user
                </Button>
              </div>
            </CardHeader>
            {showAddUserForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Employee name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="employee@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Phone</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="+1-555-0100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Role</label>
                    <input
                      type="text"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Driver"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Department</label>
                    <input
                      type="text"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Fleet Operations"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Hire Date</label>
                    <input
                      type="date"
                      value={newUser.hireDate}
                      onChange={(e) => setNewUser({...newUser, hireDate: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Salary</label>
                    <input
                      type="number"
                      value={newUser.salary}
                      onChange={(e) => setNewUser({...newUser, salary: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="45000"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => {
                      console.log('New user:', newUser);
                      setShowAddUserForm(false);
                      setNewUser({name: '', email: '', phone: '', role: '', department: '', hireDate: '', salary: '', status: 'active'});
                    }}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddUserForm(false);
                      setNewUser({name: '', email: '', phone: '', role: '', department: '', hireDate: '', salary: '', status: 'active'});
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <CardContent className="space-y-2">
              {users.drivers.map((user) => (
                <Button key={user.id} variant={selectedUserId === user.id ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setSelectedUserId(user.id)}>
                  <span>{user.name}</span>
                  <span className="text-xs opacity-70">{user.role}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>User Details</CardTitle>
              <CardDescription>Employee information and actions</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const user = users.drivers.find(u => u.id === selectedUserId);
                if (!user) return <p className="text-sm text-gray-600">Select a user to view details.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Personal Information</h3>
                      <p className="text-sm">Name: {user.name}</p>
                      <p className="text-sm">Email: {user.email}</p>
                      <p className="text-sm">Phone: {user.phone}</p>
                      <p className="text-sm">Role: {user.role}</p>
                      <p className="text-sm">Department: {user.department}</p>
                      <p className="text-sm">Hire Date: {new Date(user.hireDate).toLocaleDateString()}</p>
                      <p className="text-sm">Salary: {formatCurrency(parseInt(user.salary))}</p>
                      <p className="text-sm">Status: <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>{user.status}</span></p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Actions</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive">Remove</Button>
                        <Button size="sm" variant="secondary">Update Status</Button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
        )}

        {/* Users Management - Finance */}
        {activeView === 'users-finance' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>Finance Employers</CardTitle>
                  <CardDescription>Manage finance employees</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddUserForm(!showAddUserForm)}>
                  <Plus className="h-4 w-4 mr-1" /> add user
                </Button>
              </div>
            </CardHeader>
            {showAddUserForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Employee name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="employee@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Phone</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="+1-555-0100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Role</label>
                    <input
                      type="text"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Finance Manager"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Department</label>
                    <input
                      type="text"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Finance"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Hire Date</label>
                    <input
                      type="date"
                      value={newUser.hireDate}
                      onChange={(e) => setNewUser({...newUser, hireDate: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Salary</label>
                    <input
                      type="number"
                      value={newUser.salary}
                      onChange={(e) => setNewUser({...newUser, salary: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="75000"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => {
                      console.log('New user:', newUser);
                      setShowAddUserForm(false);
                      setNewUser({name: '', email: '', phone: '', role: '', department: '', hireDate: '', salary: '', status: 'active'});
                    }}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddUserForm(false);
                      setNewUser({name: '', email: '', phone: '', role: '', department: '', hireDate: '', salary: '', status: 'active'});
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <CardContent className="space-y-2">
              {users.finance.map((user) => (
                <Button key={user.id} variant={selectedUserId === user.id ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setSelectedUserId(user.id)}>
                  <span>{user.name}</span>
                  <span className="text-xs opacity-70">{user.role}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>User Details</CardTitle>
              <CardDescription>Employee information and actions</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const user = users.finance.find(u => u.id === selectedUserId);
                if (!user) return <p className="text-sm text-gray-600">Select a user to view details.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Personal Information</h3>
                      <p className="text-sm">Name: {user.name}</p>
                      <p className="text-sm">Email: {user.email}</p>
                      <p className="text-sm">Phone: {user.phone}</p>
                      <p className="text-sm">Role: {user.role}</p>
                      <p className="text-sm">Department: {user.department}</p>
                      <p className="text-sm">Hire Date: {new Date(user.hireDate).toLocaleDateString()}</p>
                      <p className="text-sm">Salary: {formatCurrency(parseInt(user.salary))}</p>
                      <p className="text-sm">Status: <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>{user.status}</span></p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Actions</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive">Remove</Button>
                        <Button size="sm" variant="secondary">Update Status</Button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
        )}

        {/* Users Management - Maintenance */}
        {activeView === 'users-maintenance' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>Maintenance Workers</CardTitle>
                  <CardDescription>Manage maintenance employees</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddUserForm(!showAddUserForm)}>
                  <Plus className="h-4 w-4 mr-1" /> add user
                </Button>
              </div>
            </CardHeader>
            {showAddUserForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Employee name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="employee@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Phone</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="+1-555-0100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Role</label>
                    <input
                      type="text"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Mechanic"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Department</label>
                    <input
                      type="text"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Maintenance"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Hire Date</label>
                    <input
                      type="date"
                      value={newUser.hireDate}
                      onChange={(e) => setNewUser({...newUser, hireDate: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Salary</label>
                    <input
                      type="number"
                      value={newUser.salary}
                      onChange={(e) => setNewUser({...newUser, salary: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="40000"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => {
                      console.log('New user:', newUser);
                      setShowAddUserForm(false);
                      setNewUser({name: '', email: '', phone: '', role: '', department: '', hireDate: '', salary: '', status: 'active'});
                    }}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddUserForm(false);
                      setNewUser({name: '', email: '', phone: '', role: '', department: '', hireDate: '', salary: '', status: 'active'});
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <CardContent className="space-y-2">
              {users.maintenance.map((user) => (
                <Button key={user.id} variant={selectedUserId === user.id ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setSelectedUserId(user.id)}>
                  <span>{user.name}</span>
                  <span className="text-xs opacity-70">{user.role}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>User Details</CardTitle>
              <CardDescription>Employee information and actions</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const user = users.maintenance.find(u => u.id === selectedUserId);
                if (!user) return <p className="text-sm text-gray-600">Select a user to view details.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Personal Information</h3>
                      <p className="text-sm">Name: {user.name}</p>
                      <p className="text-sm">Email: {user.email}</p>
                      <p className="text-sm">Phone: {user.phone}</p>
                      <p className="text-sm">Role: {user.role}</p>
                      <p className="text-sm">Department: {user.department}</p>
                      <p className="text-sm">Hire Date: {new Date(user.hireDate).toLocaleDateString()}</p>
                      <p className="text-sm">Salary: {formatCurrency(parseInt(user.salary))}</p>
                      <p className="text-sm">Status: <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>{user.status}</span></p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Actions</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive">Remove</Button>
                        <Button size="sm" variant="secondary">Update Status</Button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50/30 p-6 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    </div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
