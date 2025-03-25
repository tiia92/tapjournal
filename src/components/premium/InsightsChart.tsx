
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Lock } from 'lucide-react';
import { useJournal } from '@/context/JournalContext';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface InsightsChartProps {
  title: string;
  description: string;
  chartType: 'water' | 'sleep' | 'mood' | 'pain' | 'energy' | 'medication';
  color?: string;
}

const InsightsChart: React.FC<InsightsChartProps> = ({ 
  title, 
  description, 
  chartType, 
  color = '#8884d8'
}) => {
  const { user } = useAuth();
  const { entries } = useJournal();
  const isPremium = user?.isPremium || false;

  // Prepare data for the chart
  const getChartData = () => {
    // Sort entries by date
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Take last 7 days maximum (changed from 14)
    const recentEntries = sortedEntries.slice(-7);
    
    switch (chartType) {
      case 'water':
        return recentEntries.map(entry => ({
          date: formatDate(entry.date),
          value: entry.waterCount
        }));
      
      case 'sleep':
        return recentEntries.map(entry => ({
          date: formatDate(entry.date),
          value: entry.sleepHours
        }));
      
      case 'mood':
        return recentEntries.map(entry => {
          // Convert mood emoji to numeric value for the chart
          const moodMap: Record<string, { value: number, emoji: string }> = {
            'happy': { value: 5, emoji: '😊' },
            'good': { value: 4, emoji: '🙂' },
            'neutral': { value: 3, emoji: '😐' },
            'sad': { value: 2, emoji: '😔' },
            'angry': { value: 1, emoji: '😠' },
            'anxious': { value: 1.5, emoji: '😰' },
            'tired': { value: 2.5, emoji: '😴' },
            'sick': { value: 1.8, emoji: '🤒' },
            'grateful': { value: 4.5, emoji: '🙏' },
            'loved': { value: 4.8, emoji: '❤️' },
          };
          
          return {
            date: formatDate(entry.date),
            value: entry.mood ? (moodMap[entry.mood]?.value || 3) : 0,
            emoji: entry.mood ? (moodMap[entry.mood]?.emoji || '😐') : ''
          };
        });
      
      case 'pain':
        return recentEntries.map(entry => ({
          date: formatDate(entry.date),
          value: entry.painLevel
        }));
      
      case 'energy':
        return recentEntries.map(entry => ({
          date: formatDate(entry.date),
          value: entry.energyLevel
        }));
      
      case 'medication':
        return recentEntries.map(entry => {
          // Calculate medication adherence percentage
          const total = entry.medications.length;
          const taken = entry.medications.filter(med => med.taken).length;
          const percentage = total > 0 ? (taken / total) * 100 : 0;
          
          return {
            date: formatDate(entry.date),
            value: percentage
          };
        });
      
      default:
        return [];
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = getChartData();

  // Custom formatter for tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          {chartType === 'mood' ? (
            <div className="flex items-center">
              <span className="text-xl mr-2">{payload[0].payload.emoji || '😐'}</span>
              <span>Level: {payload[0].value.toFixed(1)}</span>
            </div>
          ) : chartType === 'medication' ? (
            <p>{payload[0].value.toFixed(0)}% taken</p>
          ) : (
            <p>{payload[0].value} {getValueUnit()}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom Y-axis tick formatter for mood chart
  const renderMoodTick = (value: number) => {
    const emojiMap: Record<number, string> = {
      1: '😠',
      2: '😔',
      3: '😐',
      4: '🙂',
      5: '😊'
    };
    return emojiMap[value] || '';
  };

  // Get appropriate unit for Y-axis
  const getValueUnit = () => {
    switch (chartType) {
      case 'water': return 'glasses';
      case 'sleep': return 'hours';
      case 'medication': return '%';
      default: return '';
    }
  };

  // Set Y-axis domain based on chart type
  const getYAxisDomain = () => {
    switch (chartType) {
      case 'mood': return [1, 5];
      case 'pain': return [0, 10]; // Changed from default
      case 'energy': return [0, 10]; // Changed from default
      case 'medication': return [0, 100];
      default: 
        // For other types, find the max value or use a sensible default
        const maxValue = Math.max(...chartData.map(d => d.value || 0));
        return [0, Math.max(maxValue * 1.1, 10)]; // Add 10% padding
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'mood':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tickLine={false} />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                domain={getYAxisDomain()}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={renderMoodTick}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 1, r: 4 }}
                activeDot={{ r: 6, fill: color }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'medication':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tickLine={false} />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                domain={getYAxisDomain()}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill={color} 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pain':
      case 'energy':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tickLine={false} />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                domain={getYAxisDomain()}
                ticks={[0, 2, 4, 6, 8, 10]} // Show ticks at these points
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 1, r: 4 }}
                activeDot={{ r: 6, fill: color }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tickLine={false} />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                domain={getYAxisDomain()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                fill={color} 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
    }
  };

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

  if (entries.length === 0) {
    return (
      <div className="tap-card">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
        <div className="text-center p-8 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground mb-4">No data available yet</p>
          <Button 
            onClick={() => window.location.href = '/dashboard'}
            variant="outline"
          >
            Add an Entry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="tap-card">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="w-full h-[200px]">
        {renderChart()}
      </div>
    </div>
  );
};

export default InsightsChart;
