
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Lock } from 'lucide-react';

interface InsightsChartProps {
  title: string;
  description: string;
}

const InsightsChart: React.FC<InsightsChartProps> = ({ title, description }) => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;

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

  // Placeholder for actual premium feature implementation
  return (
    <div className="tap-card">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="border rounded-md p-4 text-center bg-muted/20">
        <p className="text-muted-foreground">
          Your chart data will appear here as you track more entries.
        </p>
      </div>
    </div>
  );
};

export default InsightsChart;
