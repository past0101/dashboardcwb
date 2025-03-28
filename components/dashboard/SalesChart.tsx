import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';

const SalesChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { theme } = useTheme();
  const { salesData } = useData();
  
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
          type: 'line',
          data: {
            labels: salesData.map(item => item.month),
            datasets: [
              {
                label: 'Πωλήσεις (€)',
                data: salesData.map(item => item.sales),
                backgroundColor: 'rgba(0, 114, 255, 0.1)',
                borderColor: 'rgba(0, 114, 255, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgba(0, 114, 255, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgba(0, 114, 255, 1)',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
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
                callbacks: {
                  label: function(context) {
                    return `${context.parsed.y.toLocaleString()} €`;
                  }
                }
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
                  callback: function(value) {
                    return value + ' €';
                  }
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
  }, [salesData, theme]);
  
  return (
    <div className="card h-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Μηνιαίες Πωλήσεις
        </h3>
      </div>
      <div className="h-64">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default SalesChart;