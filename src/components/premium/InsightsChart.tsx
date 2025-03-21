
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Lock } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface InsightsChartProps {
  title: string;
  description: string;
  data?: any[];
  dataKey?: string;
  color?: string;
}

const InsightsChart: React.FC<InsightsChartProps> = ({ 
  title, 
  description, 
  data = [], 
  dataKey = 'value',
  color = '#8884d8'
}) => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;

  // Generate sample data if none provided
  const sampleData = data.length > 0 ? data : [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 3 },
    { name: 'Wed', value: 7 },
    { name: 'Thu', value: 5 },
    { name: 'Fri', value: 6 },
    { name: 'Sat', value: 8 },
    { name: 'Sun', value: 5 },
  ];

  if (!isPremium) {
    return (
      <div className="tap-card flex flex-col items-center justify-center py-8 bg-muted/30">
        <Lock className="w-10 h-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground text-center mt-1 max-w-sm">
          {description}
        </p>
        <div className="text-primary text-sm mt-4">
          Premium Feature
        </div>
      </div>
    );
  }

  return (
    <div className="tap-card">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={sampleData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" tickLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              fill={color} 
              fillOpacity={0.2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InsightsChart;
