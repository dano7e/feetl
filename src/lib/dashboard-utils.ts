import { Car, Notification } from '@/types/fleet';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

export const calculateDaysUntilExpiry = (expiryDate: string): number => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getMaintenanceStatusColor = (status: string): string => {
  switch (status) {
    case 'good': return 'text-green-600';
    case 'due': return 'text-yellow-600';
    case 'overdue': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export const getFuelLevelColor = (level: number): string => {
  if (level >= 50) return 'text-green-600';
  if (level >= 30) return 'text-yellow-600';
  return 'text-red-600';
};

export const sortCarsByPriority = (cars: Car[]): Car[] => {
  return [...cars].sort((a, b) => {
    // Prioritize cars with issues
    const aScore = (a.gpsStatus === 'offline' ? 10 : 0) + 
                  (a.maintenanceStatus === 'overdue' ? 8 : 0) +
                  (a.maintenanceStatus === 'due' ? 4 : 0) +
                  (a.fuelLevel < 30 ? 6 : 0) +
                  (a.budgetSpent > a.budgetAllocated ? 5 : 0);
    
    const bScore = (b.gpsStatus === 'offline' ? 10 : 0) + 
                  (b.maintenanceStatus === 'overdue' ? 8 : 0) +
                  (b.maintenanceStatus === 'due' ? 4 : 0) +
                  (b.fuelLevel < 30 ? 6 : 0) +
                  (b.budgetSpent > b.budgetAllocated ? 5 : 0);
    
    return bScore - aScore; // Higher score first (more urgent)
  });
};

export const getNotificationsByPriority = (notifications: Notification[]): Notification[] => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return [...notifications].sort((a, b) => {
    const aPriority = priorityOrder[a.severity] || 0;
    const bPriority = priorityOrder[b.severity] || 0;
    return bPriority - aPriority;
  });
};

export const generateInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('');
};

export const getBudgetStatus = (spent: number, allocated: number): {
  percentage: number;
  status: 'good' | 'warning' | 'exceeded';
  color: string;
} => {
  const percentage = (spent / allocated) * 100;
  
  if (percentage > 100) {
    return { percentage, status: 'exceeded', color: 'text-red-600' };
  } else if (percentage > 80) {
    return { percentage, status: 'warning', color: 'text-yellow-600' };
  } else {
    return { percentage, status: 'good', color: 'text-green-600' };
  }
};
