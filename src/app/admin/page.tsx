'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Plus,
  Search,
  Menu,
  X
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Car as CarType, Driver, FleetSummary, Notification, ChartData, KmData } from '@/types/fleet';

// Mock data - in a real app, this would come from an API
const vichelsSummary: FleetSummary = {
  totalCars: 45,
  carsInMaintenance: 7,
  accidentsReported: 3,
  totalCostThisMonth: 125000
};

const cars: CarType[] = [
  {
    id: '1',
    plateNumber: 'ABC-123',
    owner: 'Company Vichels',
    assignedDriver: 'أحمد محمد العلي',
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
    owner: 'Company Vichels',
    assignedDriver: 'فاطمة علي الحسن',
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
    owner: 'Company Vichels',
    assignedDriver: 'محمد عبدالله السعد',
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
    name: 'أحمد محمد العلي',
    email: 'ahmed.mohamed@company.com',
    phone: '+966-50-123-4567',
    carId: '1',
    assignedProject: 'مشروع ألفا',
    manager: 'سارة أحمد',
    licenseExpiry: '2025-03-15',
    totalViolations: 2
  },
  {
    id: '2',
    name: 'فاطمة علي الحسن',
    email: 'fatima.ali@company.com',
    phone: '+966-50-234-5678',
    carId: '2',
    assignedProject: 'مشروع بيتا',
    manager: 'عبدالرحمن خالد',
    licenseExpiry: '2024-11-20',
    totalViolations: 0
  },
  {
    id: '3',
    name: 'محمد عبدالله السعد',
    email: 'mohamed.abdullah@company.com',
    phone: '+966-50-345-6789',
    carId: '3',
    assignedProject: 'مشروع جاما',
    manager: 'سارة أحمد',
    licenseExpiry: '2024-10-05',
    totalViolations: 5
  }
];

const notifications: Notification[] = [
  {
    id: '1',
    type: 'insurance',
    title: 'انتهاء صلاحية التأمين قريباً',
    message: 'تأمين المركبة DEF-789 ينتهي خلال 5 أيام',
    severity: 'high',
    timestamp: '2024-09-24T10:30:00Z',
    carId: '3'
  },
  {
    id: '2',
    type: 'maintenance',
    title: 'موعد تغيير الزيت',
    message: 'المركبة XYZ-456 تحتاج تغيير زيت قبل نهاية الشهر',
    severity: 'medium',
    timestamp: '2024-09-24T09:15:00Z',
    carId: '2'
  },
  {
    id: '3',
    type: 'gps',
    title: 'GPS غير متصل',
    message: 'المركبة XYZ-456 غير متصلة منذ ساعتين',
    severity: 'high',
    timestamp: '2024-09-24T08:00:00Z',
    carId: '2'
  },
  {
    id: '4',
    type: 'fuel',
    title: 'تنبيه وقود منخفض',
    message: 'مستوى وقود المركبة XYZ-456 أقل من 30%',
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
  const [vehiclesSearchTerm, setVehiclesSearchTerm] = React.useState<string>('');
  const [driversSearchTerm, setDriversSearchTerm] = React.useState<string>('');
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
    owner: 'Company Vichels',
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
      { id: '1', name: 'علي محمد الأحمد', email: 'ali.mohamed@company.com', phone: '+966-50-111-2222', role: 'سائق', department: 'عمليات المركبات', hireDate: '2023-01-15', salary: '45000', status: 'active' as const },
      { id: '2', name: 'فاطمة عبدالرحمن السعيد', email: 'fatima.abdulrahman@company.com', phone: '+966-50-333-4444', role: 'سائق', department: 'عمليات المركبات', hireDate: '2023-03-20', salary: '45000', status: 'active' as const },
      { id: '3', name: 'محمد خالد العتيبي', email: 'mohamed.khaled@company.com', phone: '+966-50-555-6666', role: 'سائق', department: 'عمليات المركبات', hireDate: '2022-11-10', salary: '45000', status: 'active' as const }
    ],
    finance: [
      { id: '4', name: 'نورا أحمد الخالدي', email: 'nora.ahmed@company.com', phone: '+966-50-777-8888', role: 'مدير المالية', department: 'المالية', hireDate: '2022-05-01', salary: '75000', status: 'active' as const },
      { id: '5', name: 'خالد عبدالله القحطاني', email: 'khaled.abdullah@company.com', phone: '+966-50-999-0000', role: 'محاسب', department: 'المالية', hireDate: '2023-07-15', salary: '55000', status: 'active' as const }
    ],
    maintenance: [
      { id: '6', name: 'أحمد سعد الشمري', email: 'ahmed.saad@company.com', phone: '+966-50-111-3333', role: 'مشرف الصيانة', department: 'الصيانة', hireDate: '2021-09-01', salary: '60000', status: 'active' as const },
      { id: '7', name: 'مريم علي الزهراني', email: 'mariam.ali@company.com', phone: '+966-50-222-4444', role: 'ميكانيكي', department: 'الصيانة', hireDate: '2023-02-10', salary: '40000', status: 'active' as const }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Filter cars based on search term (ID or plate number)
  const filteredCars = React.useMemo(() => {
    if (!vehiclesSearchTerm.trim()) {
      return cars;
    }
    
    const searchTerm = vehiclesSearchTerm.toLowerCase().trim();
    return cars.filter(car => 
      car.id.toLowerCase().includes(searchTerm) || 
      car.plateNumber.toLowerCase().includes(searchTerm)
    );
  }, [vehiclesSearchTerm]);

  // Filter drivers based on search term (ID, name, email, or phone)
  const filteredDrivers = React.useMemo(() => {
    if (!driversSearchTerm.trim()) {
      return drivers;
    }
    
    const searchTerm = driversSearchTerm.toLowerCase().trim();
    return drivers.filter(driver => 
      driver.id.toLowerCase().includes(searchTerm) || 
      driver.name.toLowerCase().includes(searchTerm) ||
      driver.email.toLowerCase().includes(searchTerm) ||
      driver.phone.toLowerCase().includes(searchTerm)
    );
  }, [driversSearchTerm]);

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

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50/30 p-3 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Mobile Sidebar Overlay - Transparent */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-[9998] xl:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[9999] xl:hidden ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">القائمة</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(false)}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Button variant={activeView === 'overview' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('overview'); setSidebarOpen(false);}}>
                نظرة عامة
              </Button>
              <Button variant={activeView === 'map' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('map'); setSidebarOpen(false);}}>
                خريطة المركبات المباشرة
              </Button>
              <Button variant={activeView === 'analysis' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('analysis'); setSidebarOpen(false);}}>
                التحليل
              </Button>
              <div className="pt-2">
                <Button variant={vehiclesMenuOpen ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setVehiclesMenuOpen(!vehiclesMenuOpen)}>
                  المركبات
                  <span className="text-xs opacity-70">{vehiclesMenuOpen ? '▾' : '▸'}</span>
                </Button>
                {vehiclesMenuOpen && (
                  <div className="mt-2 space-y-2">
                    <Button variant={activeView === 'vehicles' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('vehicles'); setSidebarOpen(false);}}>
                      جميع المركبات
                    </Button>
                    <Button variant={activeView === 'vehicles-coupe' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('vehicles-coupe'); setSidebarOpen(false);}}>
                      مركبات السيدان
                    </Button>
                    <Button variant={activeView === 'vehicles-truck' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('vehicles-truck'); setSidebarOpen(false);}}>
                      مركبات الشحن
                    </Button>
                  </div>
                )}
              </div>
              <div className="pt-2">
                <Button variant={driversMenuOpen ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setDriversMenuOpen(!driversMenuOpen)}>
                  السائقين
                  <span className="text-xs opacity-70">{driversMenuOpen ? '▾' : '▸'}</span>
                </Button>
                {driversMenuOpen && (
                  <div className="mt-2 space-y-2">
                    <Button variant={activeView === 'all-drivers' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('all-drivers'); setSidebarOpen(false);}}>
                      جميع السائقين
                    </Button>
                    <Button variant={activeView === 'drivers' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('drivers'); setSidebarOpen(false);}}>
                      إدارة السائقين
                    </Button>
                  </div>
                )}
              </div>
              <div className="pt-2">
                <Button variant={usersMenuOpen ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setUsersMenuOpen(!usersMenuOpen)}>
                  إدارة المستخدمين
                  <span className="text-xs opacity-70">{usersMenuOpen ? '▾' : '▸'}</span>
                </Button>
                {usersMenuOpen && (
                  <div className="mt-2 space-y-2">
                    <Button variant={activeView === 'users-drivers' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('users-drivers'); setSidebarOpen(false);}}>
                      مستخدمي السائقين
                    </Button>
                    <Button variant={activeView === 'users-finance' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('users-finance'); setSidebarOpen(false);}}>
                      موظف المالية
                    </Button>
                    <Button variant={activeView === 'users-maintenance' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => {setActiveView('users-maintenance'); setSidebarOpen(false);}}>
                      عامل الصيانة
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr] gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden xl:block">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>القائمة</CardTitle>
                <CardDescription>اختر قسم</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant={activeView === 'overview' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('overview')}>
                  نظرة عامة
                </Button>
                <Button variant={activeView === 'map' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('map')}>
                  خريطة المركبات المباشرة
                </Button>
                <Button variant={activeView === 'analysis' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('analysis')}>
                  التحليل
                </Button>
                <div className="pt-2">
                  <Button variant={vehiclesMenuOpen ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setVehiclesMenuOpen(!vehiclesMenuOpen)}>
                    المركبات
                    <span className="text-xs opacity-70">{vehiclesMenuOpen ? '▾' : '▸'}</span>
                  </Button>
                  {vehiclesMenuOpen && (
                    <div className="mt-2 space-y-2">
                      <Button variant={activeView === 'vehicles' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('vehicles')}>
                        جميع المركبات
                      </Button>
                      <Button variant={activeView === 'vehicles-coupe' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('vehicles-coupe')}>
                        مركبات السيدان
                      </Button>
                      <Button variant={activeView === 'vehicles-truck' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('vehicles-truck')}>
                        مركبات الشحن
                      </Button>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <Button variant={driversMenuOpen ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setDriversMenuOpen(!driversMenuOpen)}>
                    السائقين
                    <span className="text-xs opacity-70">{driversMenuOpen ? '▾' : '▸'}</span>
                  </Button>
                  {driversMenuOpen && (
                    <div className="mt-2 space-y-2">
                      <Button variant={activeView === 'all-drivers' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('all-drivers')}>
                        جميع السائقين
                      </Button>
                      <Button variant={activeView === 'drivers' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('drivers')}>
                        إدارة السائقين
                      </Button>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <Button variant={usersMenuOpen ? 'default' : 'outline'} className="w-full justify-between" onClick={() => setUsersMenuOpen(!usersMenuOpen)}>
                    إدارة المستخدمين
                    <span className="text-xs opacity-70">{usersMenuOpen ? '▾' : '▸'}</span>
                  </Button>
                  {usersMenuOpen && (
                    <div className="mt-2 space-y-2">
                      <Button variant={activeView === 'users-drivers' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('users-drivers')}>
                        مستخدمي السائقين
                      </Button>
                      <Button variant={activeView === 'users-finance' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('users-finance')}>
                        موظف المالية
                      </Button>
                      <Button variant={activeView === 'users-maintenance' ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActiveView('users-maintenance')}>
                        عامل الصيانة
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
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSidebarOpen(true)}
                className="xl:hidden flex items-center gap-2"
              >
                <Menu className="h-4 w-4" />
                <span>القائمة</span>
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">لوحة تحكم إدارة المركبات</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2">راقب وأدر مركباتك بالكامل من مكان واحد</p>
              </div>
            </div>
          </div>

          {activeView === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المركبات</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vichelsSummary.totalCars}</div>
              <p className="text-xs text-muted-foreground">مركبات نشطة</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">في الصيانة</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{vichelsSummary.carsInMaintenance}</div>
              <p className="text-xs text-muted-foreground">مركبات قيد الخدمة حالياً</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">حوادث تم الإبلاغ عنها</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{vichelsSummary.accidentsReported}</div>
              <p className="text-xs text-muted-foreground">هذا الشهر</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التكلفة الإجمالية</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(vichelsSummary.totalCostThisMonth)}</div>
              <p className="text-xs text-muted-foreground">هذا الشهر</p>
            </CardContent>
          </Card>
        </div>
        )}

        {activeView === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Main Cars Table */}
          <div className="xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Car className="h-4 w-4 sm:h-5 sm:w-5" />
                  نظرة عامة على المركبات
                </CardTitle>
                <CardDescription className="text-sm">عرض مفصل لجميع مركبات الشركة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">رقم المركبة / اللوحة</TableHead>
                        <TableHead className="text-xs sm:text-sm">السائق</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden sm:table-cell">حالة GPS</TableHead>
                        <TableHead className="text-xs sm:text-sm">الوقود</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden md:table-cell">الصيانة</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden lg:table-cell">المخالفات</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden lg:table-cell">الميزانية</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cars.map((car) => (
                        <TableRow key={car.id}>
                          <TableCell className="font-medium text-xs sm:text-sm">{car.id} • {car.plateNumber}</TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            <a className="text-blue-600 hover:underline" href={`/admin/cars/${encodeURIComponent(car.plateNumber)}`}>
                              {car.assignedDriver}
                            </a>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{getStatusBadge(car.gpsStatus, 'gps')}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Fuel className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                              <span className={`text-xs sm:text-sm ${car.fuelLevel < 30 ? 'text-red-600' : 'text-green-600'}`}>
                                {car.fuelLevel}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{getStatusBadge(car.maintenanceStatus, 'maintenance')}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="text-center">
                              <div className="text-red-600 font-semibold text-xs sm:text-sm">{car.violationsCount}</div>
                              <div className="text-xs text-gray-500">/ {car.accidentsCount} acc</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="text-xs sm:text-sm">
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications Panel */}
          <div className="xl:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  التنبيهات والإشعارات
                </CardTitle>
                <CardDescription className="text-sm">تنبيهات النظام الأخيرة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-64 sm:max-h-96 overflow-y-auto space-y-3 pr-2">
                  {notifications && notifications.length > 0 ? notifications.map((notification) => {
                    try {
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border ${getSeverityColor(notification.severity || 'low')}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{notification.title || 'No title'}</h4>
                              <p className="text-xs mt-1 opacity-90">{notification.message || 'No message'}</p>
                              <p className="text-xs mt-2 opacity-70">
                                {notification.timestamp ? new Date(notification.timestamp).toLocaleDateString() : 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    } catch (error) {
                      console.error('Error rendering notification:', error, notification);
                      return (
                        <div key={notification.id} className="p-4 rounded-lg border bg-gray-50">
                          <p className="text-sm text-gray-600">Error loading notification</p>
                        </div>
                      );
                    }
                  }) : (
                    <div className="text-center py-8 text-gray-500">
                      لا توجد إشعارات متاحة
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        )}

        {activeView === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                إدارة السائقين
              </CardTitle>
              <CardDescription className="text-sm">السائقون النشطون وتخصيصاتهم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {drivers.map((driver) => (
                  <div key={driver.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${driver.name}`} />
                        <AvatarFallback className="text-xs">{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base truncate">{driver.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{driver.assignedProject}</p>
                        <p className="text-xs text-gray-500 truncate">المدير: {driver.manager}</p>
                      </div>
                    </div>
                    <div className="text-right sm:text-right">
                      <Badge variant={driver.totalViolations > 0 ? 'destructive' : 'default'} className="text-xs">
                        {driver.totalViolations} مخالفات
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        المركبة: {cars.find(c => c.id === driver.carId)?.plateNumber || 'غير متاح'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                إجراءات سريعة
              </CardTitle>
              <CardDescription className="text-sm">إدارة عمليات المركبات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span className="text-xs sm:text-sm">جدولة الصيانة</span>
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span className="text-xs sm:text-sm">تعيين سائق جديد</span>
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span className="text-xs sm:text-sm">الإبلاغ عن حادث</span>
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span className="text-xs sm:text-sm">إعدادات المركبات</span>
              </Button>
            </CardContent>
          </Card>
        </div>
        )}

        {activeView === 'analysis' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                اتجاهات التكلفة الشهرية للمركبات
              </CardTitle>
              <CardDescription className="text-sm">تتبع أنماط الإنفاق عبر الوقت</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={costTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} fontSize={12} />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), 'Cost']} />
                  <Legend />
                  <Line type="monotone" dataKey="cost" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                الكيلومترات المقطوعة مقابل وقت التوقف
              </CardTitle>
              <CardDescription className="text-sm">تحليل استغلال المركبات</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={kmData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="car" fontSize={12} />
                  <YAxis fontSize={12} />
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
              <h2 className="text-2xl font-bold text-gray-900">نظرة عامة على المركبات</h2>
              <p className="text-gray-600">عرض مفصل لجميع مركبات الشركة</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  نظرة عامة على المركبات
                </CardTitle>
                <CardDescription>عرض مفصل لجميع مركبات الشركة</CardDescription>
              </CardHeader>
              <div className="px-6 pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="البحث برقم المركبة أو رقم اللوحة..."
                    value={vehiclesSearchTerm}
                    onChange={(e) => setVehiclesSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {vehiclesSearchTerm && (
                  <p className="text-sm text-gray-600 mt-2">
                    عرض {filteredCars.length} من أصل {cars.length} مركبة
                  </p>
                )}
              </div>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم المركبة / اللوحة</TableHead>
                      <TableHead>السائق</TableHead>
                      <TableHead>الهاتف</TableHead>
                      <TableHead>حالة GPS</TableHead>
                      <TableHead>الوقود</TableHead>
                      <TableHead>الصيانة</TableHead>
                      <TableHead>المخالفات</TableHead>
                      <TableHead>الميزانية</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCars.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          {vehiclesSearchTerm ? `لم يتم العثور على مركبات تطابق "${vehiclesSearchTerm}"` : 'لا توجد مركبات متاحة'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCars.map((car) => {
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
                      })
                    )}
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
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" /> خريطة المركبات المباشرة
              </CardTitle>
              <CardDescription className="text-sm">تتبع جميع السائقين والمركبات بسرعة</CardDescription>
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>مركبات السيدان</CardTitle>
                  <CardDescription>جميع مركبات الركاب العادية</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddCoupeForm(!showAddCoupeForm)}>
                  <Plus className="h-4 w-4 mr-1" /> إضافة مركبة سيدان
                </Button>
              </div>
            </CardHeader>
            {showAddCoupeForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">رقم اللوحة</label>
                    <input
                      type="text"
                      value={newCar.plateNumber}
                      onChange={(e) => setNewCar({...newCar, plateNumber: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="ABC-123"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الماركة</label>
                    <input
                      type="text"
                      value={newCar.make}
                      onChange={(e) => setNewCar({...newCar, make: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Toyota"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الموديل</label>
                    <input
                      type="text"
                      value={newCar.model}
                      onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Corolla"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">السنة</label>
                    <input
                      type="number"
                      value={newCar.year}
                      onChange={(e) => setNewCar({...newCar, year: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">النوع</label>
                    <select
                      value={newCar.type}
                      onChange={(e) => setNewCar({...newCar, type: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="">اختر النوع</option>
                      <option value="Sedan">سيدان</option>
                      <option value="Hatchback">هاتشباك</option>
                      <option value="Coupe">كوبيه</option>
                      <option value="SUV">دفع رباعي</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">تعيين سائق</label>
                    <select
                      value={newCar.assignedDriver}
                      onChange={(e) => setNewCar({...newCar, assignedDriver: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="">اختر سائقاً</option>
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
                      حفظ
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddCoupeForm(false);
                      setNewCar({plateNumber: '', make: '', model: '', year: '', type: '', owner: 'Company Fleet', assignedDriver: '', latitude: '', longitude: '', gpsStatus: 'online', fuelLevel: 100, maintenanceStatus: 'good', violationsCount: 0, accidentsCount: 0, budgetSpent: 0, budgetAllocated: 3000, lastServiceDate: '', insuranceExpiry: '', licenseExpiry: ''});
                    }}>
                      إلغاء
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
              <CardTitle>المركبة والمالك</CardTitle>
              <CardDescription>تفاصيل المركبة المحددة</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const v = cars.find(c => c.id === selectedVehicleId);
                const owner = drivers.find(d => d.carId === selectedVehicleId);
                if (!v) return <p className="text-sm text-gray-600">اختر مركبة لعرض التفاصيل.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Car Information</h3>
                      <p className="text-sm">اللوحة: {v.plateNumber}</p>
                      <p className="text-sm">الماركة/الموديل: {v.make} {v.model} {v.year}</p>
                      <p className="text-sm">النوع: {v.type}</p>
                      <p className="text-sm">GPS: {v.gpsStatus}</p>
                      <p className="text-sm">الوقود: {v.fuelLevel}%</p>
                      <p className="text-sm">الصيانة: {v.maintenanceStatus}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">المالك/السائق</h3>
                      {owner ? (
                        <>
                          <p className="text-sm">الاسم: {owner.name}</p>
                          <p className="text-sm">البريد الإلكتروني: {owner.email}</p>
                          <p className="text-sm">الهاتف: {owner.phone}</p>
                          <p className="text-sm">المشروع: {owner.assignedProject}</p>
                          <p className="text-sm">المدير: {owner.manager}</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-600">لا يوجد مالك مرتبط.</p>
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>مركبات الشحن</CardTitle>
                  <CardDescription>مركبات ثقيلة ومركبات البيك أب</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddTruckForm(!showAddTruckForm)}>
                  <Plus className="h-4 w-4 mr-1" /> إضافة مركبة شحن
                </Button>
              </div>
            </CardHeader>
            {showAddTruckForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">رقم اللوحة</label>
                    <input
                      type="text"
                      value={newCar.plateNumber}
                      onChange={(e) => setNewCar({...newCar, plateNumber: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="XYZ-456"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الماركة</label>
                    <input
                      type="text"
                      value={newCar.make}
                      onChange={(e) => setNewCar({...newCar, make: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Ford"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الموديل</label>
                    <input
                      type="text"
                      value={newCar.model}
                      onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Ranger"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">السنة</label>
                    <input
                      type="number"
                      value={newCar.year}
                      onChange={(e) => setNewCar({...newCar, year: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">النوع</label>
                    <select
                      value={newCar.type}
                      onChange={(e) => setNewCar({...newCar, type: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="">اختر النوع</option>
                      <option value="Pickup">بيك أب</option>
                      <option value="Truck">شاحنة</option>
                      <option value="Heavy Truck">شاحنة ثقيلة</option>
                      <option value="Delivery Truck">شاحنة توصيل</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">تعيين سائق</label>
                    <select
                      value={newCar.assignedDriver}
                      onChange={(e) => setNewCar({...newCar, assignedDriver: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="">اختر سائقاً</option>
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
                      حفظ
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddTruckForm(false);
                      setNewCar({plateNumber: '', make: '', model: '', year: '', type: '', owner: 'Company Fleet', assignedDriver: '', latitude: '', longitude: '', gpsStatus: 'online', fuelLevel: 100, maintenanceStatus: 'good', violationsCount: 0, accidentsCount: 0, budgetSpent: 0, budgetAllocated: 3000, lastServiceDate: '', insuranceExpiry: '', licenseExpiry: ''});
                    }}>
                      إلغاء
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
              <CardTitle>المركبة والمالك</CardTitle>
              <CardDescription>تفاصيل المركبة المحددة</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const v = cars.find(c => c.id === selectedVehicleId);
                const owner = drivers.find(d => d.carId === selectedVehicleId);
                if (!v) return <p className="text-sm text-gray-600">اختر مركبة شحن لعرض التفاصيل.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">معلومات المركبة</h3>
                      <p className="text-sm">اللوحة: {v.plateNumber}</p>
                      <p className="text-sm">الماركة/الموديل: {v.make} {v.model} {v.year}</p>
                      <p className="text-sm">النوع: {v.type}</p>
                      <p className="text-sm">GPS: {v.gpsStatus}</p>
                      <p className="text-sm">الوقود: {v.fuelLevel}%</p>
                      <p className="text-sm">الصيانة: {v.maintenanceStatus}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">المالك/السائق</h3>
                      {owner ? (
                        <>
                          <p className="text-sm">الاسم: {owner.name}</p>
                          <p className="text-sm">البريد الإلكتروني: {owner.email}</p>
                          <p className="text-sm">الهاتف: {owner.phone}</p>
                          <p className="text-sm">المشروع: {owner.assignedProject}</p>
                          <p className="text-sm">المدير: {owner.manager}</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-600">لا يوجد مالك مرتبط.</p>
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
              <h2 className="text-2xl font-bold text-gray-900">جميع السائقين</h2>
              <p className="text-gray-600">نظرة شاملة لجميع السائقين والمركبات المخصصة لهم</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  نظرة عامة على السائقين
                </CardTitle>
                <CardDescription>عرض مفصل لجميع السائقين وتخصيصات المركبات</CardDescription>
              </CardHeader>
              <div className="px-6 pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="البحث برقم السائق، الاسم، البريد الإلكتروني، أو الهاتف..."
                    value={driversSearchTerm}
                    onChange={(e) => setDriversSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {driversSearchTerm && (
                  <p className="text-sm text-gray-600 mt-2">
                    عرض {filteredDrivers.length} من أصل {drivers.length} سائق
                  </p>
                )}
              </div>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">الرقم</TableHead>
                        <TableHead className="w-32">الاسم</TableHead>
                        <TableHead className="w-28">الهاتف</TableHead>
                        <TableHead className="w-40">البريد الإلكتروني</TableHead>
                        <TableHead className="w-24">المركبة</TableHead>
                        <TableHead className="w-28 text-center">المدير</TableHead>
                        <TableHead className="w-20">انتهاء الصلاحية</TableHead>
                        <TableHead className="w-16">المخالفات</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {filteredDrivers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          {driversSearchTerm ? `لم يتم العثور على سائقين يطابقون "${driversSearchTerm}"` : 'لا توجد سائقين متاحين'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDrivers.map((driver) => {
                        const assignedCar = cars.find(c => c.id === driver.carId);
                        return (
                          <TableRow key={driver.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedDriverId(driver.id)}>
                            <TableCell className="font-medium text-xs">
                              {driver.id}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-xs">{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <Link href={`/admin/cars/${encodeURIComponent(assignedCar?.plateNumber || '')}?from=all-drivers`} className="text-blue-600 hover:underline text-xs">
                                  {driver.name}
                                </Link>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs">
                              {driver.phone}
                            </TableCell>
                            <TableCell className="text-xs truncate">
                              {driver.email}
                            </TableCell>
                            <TableCell>
                              {assignedCar ? (
                                <Link href={`/admin/cars/${encodeURIComponent(assignedCar.plateNumber)}`} className="text-blue-600 hover:underline text-xs">
                                  {assignedCar.plateNumber}
                                </Link>
                              ) : (
                                <span className="text-gray-500 text-xs">لا توجد مركبة</span>
                              )}
                            </TableCell>
                            <TableCell className="text-xs text-center">
                              {driver.manager}
                            </TableCell>
                            <TableCell>
                              <div className={`text-xs ${new Date(driver.licenseExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-red-600' : 'text-green-600'}`}>
                                {new Date(driver.licenseExpiry).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-center">
                                <div className="text-red-600 font-semibold text-xs">{driver.totalViolations}</div>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'drivers' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>السائقون</CardTitle>
                  <CardDescription>جميع السائقين في المركبات</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddDriverForm(!showAddDriverForm)}>
                  <Plus className="h-4 w-4 mr-1" /> إضافة سائق
                </Button>
              </div>
            </CardHeader>
            {showAddDriverForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">الاسم</label>
                    <input
                      type="text"
                      value={newDriver.name}
                      onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Driver name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="driver@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الهاتف</label>
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
                      حفظ
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddDriverForm(false);
                      setNewDriver({name: '', email: '', phone: '', assignedProject: '', manager: '', licenseExpiry: '', carId: ''});
                    }}>
                      إلغاء
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
              <CardTitle>تفاصيل السائق</CardTitle>
              <CardDescription>معلومات السائق والمركبة المخصصة</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const driver = drivers.find(dr => dr.id === selectedDriverId);
                if (!driver) return <p className="text-sm text-gray-600">اختر سائقاً لعرض التفاصيل.</p>;
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
                          <p className="text-sm">اللوحة: {vehicle.plateNumber}</p>
                          <p className="text-sm">النوع: {vehicle.type}</p>
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>مستخدمي السائقين</CardTitle>
                  <CardDescription>إدارة موظفي السائقين</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddUserForm(!showAddUserForm)}>
                  <Plus className="h-4 w-4 mr-1" /> إضافة مستخدم
                </Button>
              </div>
            </CardHeader>
            {showAddUserForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">الاسم</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="اسم الموظف"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="موظف@الشركة.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الهاتف</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="+1-555-0100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الدور</label>
                    <input
                      type="text"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="سائق"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">القسم</label>
                    <input
                      type="text"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="عمليات المركبات"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">تاريخ التوظيف</label>
                    <input
                      type="date"
                      value={newUser.hireDate}
                      onChange={(e) => setNewUser({...newUser, hireDate: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الراتب</label>
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
                      حفظ
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddUserForm(false);
                      setNewUser({name: '', email: '', phone: '', role: '', department: '', hireDate: '', salary: '', status: 'active'});
                    }}>
                      إلغاء
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
              <CardTitle>تفاصيل المستخدم</CardTitle>
              <CardDescription>معلومات الموظف والإجراءات</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const user = users.drivers.find(u => u.id === selectedUserId);
                if (!user) return <p className="text-sm text-gray-600">اختر مستخدماً لعرض التفاصيل.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">المعلومات الشخصية</h3>
                      <p className="text-sm">الاسم: {user.name}</p>
                      <p className="text-sm">البريد الإلكتروني: {user.email}</p>
                      <p className="text-sm">الهاتف: {user.phone}</p>
                      <p className="text-sm">الدور: {user.role}</p>
                      <p className="text-sm">القسم: {user.department}</p>
                      <p className="text-sm">تاريخ التوظيف: {new Date(user.hireDate).toLocaleDateString()}</p>
                      <p className="text-sm">الراتب: {formatCurrency(parseInt(user.salary))}</p>
                      <p className="text-sm">الحالة: <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>{user.status === 'active' ? 'نشط' : 'غير نشط'}</span></p>
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>موظفو المالية</CardTitle>
                  <CardDescription>إدارة موظفي المالية</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddUserForm(!showAddUserForm)}>
                  <Plus className="h-4 w-4 mr-1" /> إضافة مستخدم
                </Button>
              </div>
            </CardHeader>
            {showAddUserForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">الاسم</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="اسم الموظف"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="موظف@الشركة.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الهاتف</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="+1-555-0100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الدور</label>
                    <input
                      type="text"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Finance Manager"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">القسم</label>
                    <input
                      type="text"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="المالية"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">تاريخ التوظيف</label>
                    <input
                      type="date"
                      value={newUser.hireDate}
                      onChange={(e) => setNewUser({...newUser, hireDate: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الراتب</label>
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
                      حفظ
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddUserForm(false);
                      setNewUser({name: '', email: '', phone: '', role: '', department: '', hireDate: '', salary: '', status: 'active'});
                    }}>
                      إلغاء
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
              <CardTitle>تفاصيل المستخدم</CardTitle>
              <CardDescription>معلومات الموظف والإجراءات</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const user = users.finance.find(u => u.id === selectedUserId);
                if (!user) return <p className="text-sm text-gray-600">اختر مستخدماً لعرض التفاصيل.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">المعلومات الشخصية</h3>
                      <p className="text-sm">الاسم: {user.name}</p>
                      <p className="text-sm">البريد الإلكتروني: {user.email}</p>
                      <p className="text-sm">الهاتف: {user.phone}</p>
                      <p className="text-sm">الدور: {user.role}</p>
                      <p className="text-sm">القسم: {user.department}</p>
                      <p className="text-sm">تاريخ التوظيف: {new Date(user.hireDate).toLocaleDateString()}</p>
                      <p className="text-sm">الراتب: {formatCurrency(parseInt(user.salary))}</p>
                      <p className="text-sm">الحالة: <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>{user.status === 'active' ? 'نشط' : 'غير نشط'}</span></p>
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>عاملو الصيانة</CardTitle>
                  <CardDescription>إدارة عمال الصيانة</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddUserForm(!showAddUserForm)}>
                  <Plus className="h-4 w-4 mr-1" /> إضافة مستخدم
                </Button>
              </div>
            </CardHeader>
            {showAddUserForm && (
              <div className="px-6 pb-4 border-b">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">الاسم</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="اسم الموظف"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="موظف@الشركة.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الهاتف</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="+1-555-0100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الدور</label>
                    <input
                      type="text"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Mechanic"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">القسم</label>
                    <input
                      type="text"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="الصيانة"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">تاريخ التوظيف</label>
                    <input
                      type="date"
                      value={newUser.hireDate}
                      onChange={(e) => setNewUser({...newUser, hireDate: e.target.value})}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">الراتب</label>
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
                      حفظ
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setShowAddUserForm(false);
                      setNewUser({name: '', email: '', phone: '', role: '', department: '', hireDate: '', salary: '', status: 'active'});
                    }}>
                      إلغاء
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
              <CardTitle>تفاصيل المستخدم</CardTitle>
              <CardDescription>معلومات الموظف والإجراءات</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const user = users.maintenance.find(u => u.id === selectedUserId);
                if (!user) return <p className="text-sm text-gray-600">اختر مستخدماً لعرض التفاصيل.</p>;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">المعلومات الشخصية</h3>
                      <p className="text-sm">الاسم: {user.name}</p>
                      <p className="text-sm">البريد الإلكتروني: {user.email}</p>
                      <p className="text-sm">الهاتف: {user.phone}</p>
                      <p className="text-sm">الدور: {user.role}</p>
                      <p className="text-sm">القسم: {user.department}</p>
                      <p className="text-sm">تاريخ التوظيف: {new Date(user.hireDate).toLocaleDateString()}</p>
                      <p className="text-sm">الراتب: {formatCurrency(parseInt(user.salary))}</p>
                      <p className="text-sm">الحالة: <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>{user.status === 'active' ? 'نشط' : 'غير نشط'}</span></p>
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
