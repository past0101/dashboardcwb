import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (chartRef.current) {
        // Destroy previous chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Check if data is valid
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.warn('Invalid or empty data provided to SalesChart');
          setError('Μη έγκυρα δεδομένα γραφήματος');
          return;
        }

        // Create new chart
        const ctx = chartRef.current.getContext('2d');
        
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(item => item.month),
            datasets: [{
              label: 'Πωλήσεις (€)',
              data: data.map(item => item.sales),
              backgroundColor: 'rgba(59, 130, 246, 0.7)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Ποσό (€)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Μήνας'
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.dataset.label}: ${context.raw.toFixed(2)}€`;
                  }
                }
              }
            }
          }
        });
        
        // Reset error state if all is well
        setError(null);
      }
    } catch (err) {
      console.error('Error creating sales chart:', err);
      setError('Σφάλμα δημιουργίας γραφήματος');
    }

    // Cleanup function
    return () => {
      try {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      } catch (err) {
        console.error('Error destroying chart:', err);
      }
    };
  }, [data]);

  return (
    <div style={{ height: '300px' }}>
      {error ? (
        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg p-4">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <canvas ref={chartRef}></canvas>
      )}
    </div>
  );
};

export default SalesChart;
