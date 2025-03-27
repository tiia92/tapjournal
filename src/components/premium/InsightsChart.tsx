
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
  chartType: 'water' | 'sleep' | 'mood' | 'pain' | 'energy' | 'medication' | 'exercise' | 'selfcare';
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

  // Helper to get date from n days ago
  const getDateNDaysAgo = (n: number) => {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return date;
  };

  // Format date to MM/DD format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Generate dates for the last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = getDateNDaysAgo(i);
      days.push({
        date: formatDate(date),
        fullDate: date.toISOString().split('T')[0],
        value: 0 // Default value
      });
    }
    return days;
  };

  // Prepare data for the chart
  const getChartData = () => {
    // Get the last 7 days
    const last7Days = getLast7Days();
    
    // Sort entries by date
    const sortedEntries = entries ? [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ) : [];
    
    // Map data from entries to our day slots
    last7Days.forEach(day => {
      const matchingEntry = sortedEntries.find(entry => {
        const entryDate = new Date(entry.date);
        return formatDate(entryDate) === day.date;
      });
      
      if (matchingEntry) {
        switch (chartType) {
          case 'water':
            day.value = matchingEntry.waterCount || 0;
            break;
          
          case 'sleep':
            day.value = matchingEntry.sleepHours || 0;
            break;
          
          case 'mood':
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
            
            day.value = matchingEntry.mood ? (moodMap[matchingEntry.mood]?.value || 3) : 0;
            day.emoji = matchingEntry.mood ? (moodMap[matchingEntry.mood]?.emoji || '😐') : '';
            break;
          
          case 'pain':
            day.value = matchingEntry.painLevel || 0;
            break;
          
          case 'energy':
            day.value = matchingEntry.energyLevel || 0;
            break;
          
          case 'medication':
            // Calculate medication adherence percentage
            const medications = matchingEntry.medications || [];
            const total = medications.length;
            const taken = medications.filter(med => med.taken).length;
            day.value = total > 0 ? (taken / total) * 100 : 0;
            break;
            
          case 'exercise':
            // For this demo, we'll use a random value between 0-60 minutes
            // In a real app, you'd use actual exercise minutes data
            day.value = Math.floor(Math.random() * 61); // 0-60 minutes
            break;
            
          case 'selfcare':
            // For this demo, we'll use a random value between 0-45 minutes
            // In a real app, you'd use actual self-care minutes data
            day.value = Math.floor(Math.random() * 46); // 0-45 minutes
            break;
        }
      }
    });
    
    return last7Days;
  };

  const chartData = getChartData();

  // Custom formatter for tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          {chartType === 'mood' && payload[0].payload.emoji ? (
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
      case 'exercise': return 'minutes';
      case 'selfcare': return 'minutes'; 
      default: return '';
    }
  };

  // Set Y-axis domain based on chart type
  const getYAxisDomain = () => {
    switch (chartType) {
      case 'mood': return [1, 5];
      case 'pain': return [0, 10]; 
      case 'energy': return [0, 10]; 
      case 'medication': return [0, 100];
      case 'exercise': return [0, 60]; // max 60 minutes
      case 'selfcare': return [0, 45]; // max 45 minutes
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
      
      case 'exercise':
      case 'selfcare':
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
                tickFormatter={(value) => `${value} min`}
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
