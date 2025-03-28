import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import Chart from 'chart.js/auto';

const Statistics = () => {
  const { services, appointments, sales, customers, staff } = useData();
  const [timeRange, setTimeRange] = useState('month'); // month, quarter, year
  const topServicesChartRef = useRef(null);
  const employeePerformanceChartRef = useRef(null);
  const customerRetentionChartRef = useRef(null);
  const salesByWeekdayChartRef = useRef(null);
  
  const chartInstances = useRef({});

  // Calculate service usage statistics
  const getServiceUsageStats = () => {
    // Count service usage in appointments
    const serviceUsage = {};
    appointments.forEach(appointment => {
      if (!serviceUsage[appointment.serviceId]) {
        serviceUsage[appointment.serviceId] = 0;
      }
      serviceUsage[appointment.serviceId]++;
    });
    
    // Sort by usage and get the top 5
    const topServices = Object.entries(serviceUsage)
      .map(([serviceId, count]) => ({
        service: services.find(s => s.id === serviceId) || { name: 'Unknown', price: 0 },
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return topServices;
  };

  // Calculate employee performance
  const getEmployeePerformanceStats = () => {
    // Count sales by employee
    const salesByEmployee = {};
    sales.forEach(sale => {
      if (!salesByEmployee[sale.staffId]) {
        salesByEmployee[sale.staffId] = 0;
      }
      salesByEmployee[sale.staffId] += sale.total;
    });
    
    // Get staff members and their sales
    const employeePerformance = Object.entries(salesByEmployee)
      .map(([staffId, amount]) => ({
        staff: staff.find(s => s.id === staffId) || { name: 'Unknown' },
        amount
      }))
      .sort((a, b) => b.amount - a.amount);
    
    return employeePerformance;
  };

  // Calculate customer retention stats
  const getCustomerRetentionStats = () => {
    // Count appointments per customer
    const appointmentsPerCustomer = {};
    appointments.forEach(appointment => {
      if (!appointmentsPerCustomer[appointment.customerId]) {
        appointmentsPerCustomer[appointment.customerId] = 0;
      }
      appointmentsPerCustomer[appointment.customerId]++;
    });
    
    // Group customers by visit frequency
    const frequencyGroups = {
      '1': 0,   // One-time customers
      '2-3': 0, // 2-3 visits
      '4-6': 0, // 4-6 visits
      '7+': 0   // 7+ visits
    };
    
    Object.values(appointmentsPerCustomer).forEach(count => {
      if (count === 1) {
        frequencyGroups['1']++;
      } else if (count >= 2 && count <= 3) {
        frequencyGroups['2-3']++;
      } else if (count >= 4 && count <= 6) {
        frequencyGroups['4-6']++;
      } else {
        frequencyGroups['7+']++;
      }
    });
    
    return frequencyGroups;
  };

  // Calculate sales by weekday
  const getSalesByWeekday = () => {
    const weekdays = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'];
    const salesByDay = Array(7).fill(0);
    
    sales.forEach(sale => {
      const date = new Date(sale.date);
      const dayOfWeek = date.getDay(); // 0-6
      salesByDay[dayOfWeek] += sale.total;
    });
    
    return {
      labels: weekdays,
      values: salesByDay
    };
  };

  // Render charts
  useEffect(() => {
    // Clean up existing charts
    Object.values(chartInstances.current).forEach(chart => {
      if (chart) chart.destroy();
    });
    
    // Top services chart
    if (topServicesChartRef.current) {
      const topServices = getServiceUsageStats();
      const ctx = topServicesChartRef.current.getContext('2d');
      
      chartInstances.current.topServices = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: topServices.map(item => item.service.name),
          datasets: [{
            label: 'Αριθμός Ραντεβού',
            data: topServices.map(item => item.count),
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'TOP Υπηρεσίες'
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          }
        }
      });
    }
    
    // Employee performance chart
    if (employeePerformanceChartRef.current) {
      const employeePerformance = getEmployeePerformanceStats();
      const ctx = employeePerformanceChartRef.current.getContext('2d');
      
      chartInstances.current.employeePerformance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: employeePerformance.map(item => item.staff.name),
          datasets: [{
            label: 'Πωλήσεις (€)',
            data: employeePerformance.map(item => item.amount),
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Πωλήσεις ανά Υπάλληλο'
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    
    // Customer retention chart
    if (customerRetentionChartRef.current) {
      const retentionStats = getCustomerRetentionStats();
      const ctx = customerRetentionChartRef.current.getContext('2d');
      
      chartInstances.current.customerRetention = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Μια επίσκεψη', '2-3 επισκέψεις', '4-6 επισκέψεις', '7+ επισκέψεις'],
          datasets: [{
            data: [
              retentionStats['1'],
              retentionStats['2-3'],
              retentionStats['4-6'],
              retentionStats['7+']
            ],
            backgroundColor: [
              'rgba(239, 68, 68, 0.7)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(59, 130, 246, 0.7)'
            ],
            borderColor: [
              'rgba(239, 68, 68, 1)',
              'rgba(245, 158, 11, 1)',
              'rgba(16, 185, 129, 1)',
              'rgba(59, 130, 246, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Επαναλαμβανόμενοι Πελάτες'
            }
          }
        }
      });
    }
    
    // Sales by weekday chart
    if (salesByWeekdayChartRef.current) {
      const salesByWeekday = getSalesByWeekday();
      const ctx = salesByWeekdayChartRef.current.getContext('2d');
      
      chartInstances.current.salesByWeekday = new Chart(ctx, {
        type: 'line',
        data: {
          labels: salesByWeekday.labels,
          datasets: [{
            label: 'Πωλήσεις (€)',
            data: salesByWeekday.values,
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Πωλήσεις ανά Ημέρα'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    
    // Cleanup function
    return () => {
      Object.values(chartInstances.current).forEach(chart => {
        if (chart) chart.destroy();
      });
    };
  }, [services, appointments, sales, staff, timeRange]);

  // Calculate summary statistics
  const getTotalRevenue = () => {
    return sales.reduce((sum, sale) => sum + sale.total, 0);
  };

  const getTotalAppointments = () => {
    return appointments.length;
  };

  const getAverageAppointmentValue = () => {
    if (sales.length === 0) return 0;
    const total = getTotalRevenue();
    return total / sales.length;
  };

  return (
    <div className="statistics-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Στατιστικά</h1>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setTimeRange('month')}
          >
            Μήνας
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              timeRange === 'quarter' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setTimeRange('quarter')}
          >
            Τρίμηνο
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              timeRange === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setTimeRange('year')}
          >
            Έτος
          </button>
        </div>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-blue-100 text-blue-500 mr-4">
              <i className="fas fa-euro-sign text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Συνολικά Έσοδα</h3>
              <p className="text-2xl font-bold">{getTotalRevenue().toFixed(2)}€</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-green-100 text-green-500 mr-4">
              <i className="fas fa-calendar-check text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ραντεβού</h3>
              <p className="text-2xl font-bold">{getTotalAppointments()}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-yellow-100 text-yellow-500 mr-4">
              <i className="fas fa-receipt text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Μέση Αξία</h3>
              <p className="text-2xl font-bold">{getAverageAppointmentValue().toFixed(2)}€</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="card p-4">
          <div style={{ height: '300px' }}>
            <canvas ref={topServicesChartRef}></canvas>
          </div>
        </div>
        
        <div className="card p-4">
          <div style={{ height: '300px' }}>
            <canvas ref={employeePerformanceChartRef}></canvas>
          </div>
        </div>
        
        <div className="card p-4">
          <div style={{ height: '300px' }}>
            <canvas ref={customerRetentionChartRef}></canvas>
          </div>
        </div>
        
        <div className="card p-4">
          <div style={{ height: '300px' }}>
            <canvas ref={salesByWeekdayChartRef}></canvas>
          </div>
        </div>
      </div>
      
      {/* Additional stats */}
      <div className="card p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Επιπλέον Στατιστικά</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-r pr-4">
            <h4 className="text-sm font-medium text-gray-500">Συνολικοί Πελάτες</h4>
            <p className="text-2xl font-bold">{customers.length}</p>
          </div>
          
          <div className="border-r pr-4">
            <h4 className="text-sm font-medium text-gray-500">Μέσος Όρος Ραντεβού ανά Πελάτη</h4>
            <p className="text-2xl font-bold">
              {(appointments.length / (customers.length || 1)).toFixed(1)}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Επισκεψιμότητα τρέχοντος μήνα</h4>
            <p className="text-2xl font-bold">
              {(() => {
                const now = new Date();
                const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                return appointments.filter(app => new Date(app.date) >= thisMonth).length;
              })()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
