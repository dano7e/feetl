import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  valueColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function SummaryCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  valueColor = "text-gray-900",
  trend 
}: SummaryCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          {trend && (
            <span className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
