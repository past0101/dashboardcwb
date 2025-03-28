import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ServiceTypeDistribution: React.FC = () => {
  // Example data for service type distribution
  const chartData = {
    labels: ['Αυτοκίνητα', 'Μοτοσυκλέτες', 'Σκάφη', 'Αεροσκάφη'],
    datasets: [
      {
        label: 'Ποσοστό Εσόδων',
        data: [65, 15, 15, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)', // Primary
          'rgba(59, 130, 246, 0.7)', // Blue
          'rgba(16, 185, 129, 0.7)', // Green
          'rgba(245, 158, 11, 0.7)'  // Yellow
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }
    ]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          padding: 15,
          font: {
            size: 10
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        bodyFont: {
          size: 12
        },
        titleFont: {
          size: 13,
          weight: 'bold'
        },
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const percentage = Math.round((value * 100) / total);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default ServiceTypeDistribution;