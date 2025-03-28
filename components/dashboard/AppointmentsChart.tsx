import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';

const AppointmentsChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { theme } = useTheme();
  const { appointmentsData } = useData();
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        // Destroy previous chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
        // Chart configuration
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: appointmentsData.map(item => item.day),
            datasets: [
              {
                label: 'Ραντεβού',
                data: appointmentsData.map(item => item.appointments),
                backgroundColor: theme === 'dark' 
                  ? 'rgba(0, 114, 255, 0.7)' 
                  : 'rgba(0, 114, 255, 0.8)',
                borderColor: 'rgba(0, 114, 255, 1)',
                borderWidth: 1,
                borderRadius: 4,
                barThickness: 20,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                titleColor: theme === 'dark' ? '#ffffff' : '#111827',
                bodyColor: theme === 'dark' ? '#e5e7eb' : '#4b5563',
                borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
              }
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                }
              },
              y: {
                grid: {
                  color: theme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)',
                },
                ticks: {
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                  precision: 0,
                },
                beginAtZero: true,
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
  }, [appointmentsData, theme]);
  
  return (
    <div className="card h-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Εβδομαδιαία Ραντεβού
        </h3>
      </div>
      <div className="h-64">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default AppointmentsChart;