
import React, { lazy, Suspense } from 'react';
import { ChevronRight } from 'lucide-react';

// Lazy load InsightsChart for better performance
const InsightsChart = lazy(() => import('@/components/premium/InsightsChart'));

interface ChartConfig {
  title: string;
  description: string;
  chartType: string;
  color: string;
}

interface ScrollableChartsProps {
  charts: ChartConfig[];
}

const ChartSkeleton = () => (
  <div className="min-w-[300px] md:min-w-[400px] bg-card rounded-xl p-6 animate-pulse">
    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-muted/70 rounded w-1/2 mb-4"></div>
    <div className="h-48 bg-muted/50 rounded"></div>
  </div>
);

const ScrollableCharts: React.FC<ScrollableChartsProps> = ({ charts }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Your Insights</h3>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
      
      <div className="chart-scroll pb-4">
        {charts.map((chart, index) => (
          <Suspense key={index} fallback={<ChartSkeleton />}>
            <div className="min-w-[300px] md:min-w-[400px]">
              <InsightsChart
                title={chart.title}
                description={chart.description}
                chartType={chart.chartType as any}
                color={chart.color}
              />
            </div>
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCharts;
