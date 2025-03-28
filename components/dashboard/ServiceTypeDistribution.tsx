import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';

const ServiceTypeDistribution: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { theme } = useTheme();
  const { services } = useData();
  
  // Calculate service distribution by category
  const calculateDistribution = () => {
    const distribution = {
      AUTO: 0,
      MOTO: 0,
      YACHT: 0,
      AVIATION: 0
    };
    
    services.forEach(service => {
      if (service.category in distribution) {
        distribution[service.category as keyof typeof distribution] += 1;
      }
    });
    
    return distribution;
  };
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        // Destroy previous chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
        const distribution = calculateDistribution();
        
        // Chart colors
        const colors = {
          AUTO: '#3b82f6',       // blue
          MOTO: '#8b5cf6',       // purple
          YACHT: '#14b8a6',      // teal
          AVIATION: '#f59e0b'    // amber
        };
        
        // Chart configuration
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: [
              'Αυτοκίνητα', 
              'Μοτοσυκλέτες', 
              'Σκάφη', 
              'Αεροσκάφη'
            ],
            datasets: [
              {
                data: [
                  distribution.AUTO,
                  distribution.MOTO,
                  distribution.YACHT,
                  distribution.AVIATION
                ],
                backgroundColor: [
                  colors.AUTO,
                  colors.MOTO,
                  colors.YACHT,
                  colors.AVIATION
                ],
                borderColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderWidth: 2,
                hoverOffset: 4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  padding: 15,
                  color: theme === 'dark' ? '#e5e7eb' : '#4b5563'
                }
              },
              tooltip: {
                backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                titleColor: theme === 'dark' ? '#ffffff' : '#111827',
                bodyColor: theme === 'dark' ? '#e5e7eb' : '#4b5563',
                borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const total = (context.dataset.data as number[]).reduce((acc: number, data: number) => acc + data, 0);
                    const percentage = Math.round((value as number) / total * 100);
                    return `${label}: ${percentage}% (${value})`;
                  }
                }
              }
            }
          }
        });
      }
    }
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [services, theme]);
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Κατανομή Υπηρεσιών
        </h3>
      </div>
      <div className="h-64">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default ServiceTypeDistribution;