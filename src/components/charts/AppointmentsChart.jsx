import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const AppointmentsChart = ({ data }) => {
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
          console.warn('Invalid or empty data provided to AppointmentsChart');
          setError('Μη έγκυρα δεδομένα γραφήματος');
          return;
        }

        // Create new chart
        const ctx = chartRef.current.getContext('2d');
        
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map(item => item.day),
            datasets: [{
              label: 'Αριθμός Ραντεβού',
              data: data.map(item => item.appointments),
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 2,
              tension: 0.3,
              fill: true,
              pointBackgroundColor: 'rgba(16, 185, 129, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4
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
                  text: 'Αριθμός Ραντεβού'
                },
                ticks: {
                  stepSize: 1,
                  precision: 0
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Ημέρα'
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              }
            }
          }
        });
        
        // Reset error state if all is well
        setError(null);
      }
    } catch (err) {
      console.error('Error creating appointments chart:', err);
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

export default AppointmentsChart;
