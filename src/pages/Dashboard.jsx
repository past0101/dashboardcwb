import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import SalesChart from '../components/charts/SalesChart';
import AppointmentsChart from '../components/charts/AppointmentsChart';
import { getMonthlySalesData, getWeeklyAppointmentsData } from '../utils/mockData';

const Dashboard = () => {
  const { appointments, customers, sales, services, products } = useData();
  const [salesData, setSalesData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalSales: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    lowStockProducts: 0
  });

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      
      // Get sales data for chart
      const salesChartData = getMonthlySalesData();
      setSalesData(salesChartData);
      
      // Get appointments data for chart
      const appointmentsChartData = getWeeklyAppointmentsData();
      setAppointmentsData(appointmentsChartData);
      
      // Get today's appointments
      const today = new Date();
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);
      
      const todaysApps = appointments ? appointments.filter(app => {
        if (!app.date) return false;
        const appDate = new Date(app.date);
        return appDate >= startOfDay && appDate <= endOfDay;
      }) : [];
      
      setTodayAppointments(todaysApps);
      
      // Calculate statistics
      const totalCustomersCount = customers ? customers.length : 0;
      const totalSalesAmount = sales ? sales.reduce((sum, sale) => sum + (sale.total || 0), 0) : 0;
      const totalAppointmentsCount = appointments ? appointments.length : 0;
      const pendingAppointmentsCount = appointments ? 
        appointments.filter(app => app.status === 'pending').length : 0;
      const lowStockProductsCount = products ? 
        products.filter(product => product.stock < 10).length : 0;
      
      setStats({
        totalCustomers: totalCustomersCount,
        totalSales: totalSalesAmount,
        totalAppointments: totalAppointmentsCount,
        pendingAppointments: pendingAppointmentsCount,
        lowStockProducts: lowStockProductsCount
      });
      
      setLoading(false);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError("Παρουσιάστηκε σφάλμα κατά τη φόρτωση των δεδομένων");
      setLoading(false);
    }
  }, [appointments, customers, sales, products]);

  // Helper function to get service name by ID
  const getServiceName = (serviceId) => {
    if (!services) return 'Άγνωστη υπηρεσία';
    const service = services.find(s => s && s.id === serviceId);
    return service ? service.name : 'Άγνωστη υπηρεσία';
  };
  
  // Helper function to get customer name by ID
  const getCustomerName = (customerId) => {
    if (!customers) return 'Άγνωστος πελάτης';
    const customer = customers.find(c => c && c.id === customerId);
    return customer ? customer.name : 'Άγνωστος πελάτης';
  };

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-6">Στατιστικά Επισκόπησης</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-blue-500 text-3xl mb-4"></i>
            <p>Φόρτωση δεδομένων...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-1">Πελάτες</h3>
              <p className="text-3xl font-bold">{stats.totalCustomers}</p>
              <p className="text-sm text-gray-500">Σύνολο εγγεγραμμένων</p>
            </div>
            
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-1">Πωλήσεις</h3>
              <p className="text-3xl font-bold">{stats.totalSales.toFixed(2)}€</p>
              <p className="text-sm text-gray-500">Συνολικά έσοδα</p>
            </div>
            
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-1">Ραντεβού</h3>
              <p className="text-3xl font-bold">{stats.totalAppointments}</p>
              <p className="text-sm text-gray-500">Συνολικά ραντεβού</p>
            </div>
            
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-1">Σε αναμονή</h3>
              <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
              <p className="text-sm text-gray-500">Ραντεβού προς επιβεβαίωση</p>
            </div>
            
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-1">Χαμηλό απόθεμα</h3>
              <p className="text-3xl font-bold">{stats.lowStockProducts}</p>
              <p className="text-sm text-gray-500">Προϊόντα που χρειάζονται ανανέωση</p>
            </div>
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-4">Πωλήσεις ανά μήνα</h3>
              {salesData && salesData.length > 0 ? (
                <SalesChart data={salesData} />
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                  <p className="text-gray-500">Δεν υπάρχουν δεδομένα πωλήσεων</p>
                </div>
              )}
            </div>
            
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-4">Ραντεβού ανά ημέρα</h3>
              {appointmentsData && appointmentsData.length > 0 ? (
                <AppointmentsChart data={appointmentsData} />
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                  <p className="text-gray-500">Δεν υπάρχουν δεδομένα ραντεβού</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Today's Appointments */}
          <div className="card p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Σημερινά Ραντεβού</h3>
            {todayAppointments && todayAppointments.length > 0 ? (
              <div className="table-container">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Ώρα</th>
                      <th>Πελάτης</th>
                      <th>Υπηρεσία</th>
                      <th>Κατάσταση</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{new Date(appointment.date).toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}</td>
                        <td>{getCustomerName(appointment.customerId)}</td>
                        <td>{getServiceName(appointment.serviceId)}</td>
                        <td>
                          <span className={`badge ${
                            appointment.status === 'confirmed' ? 'badge-success' : 
                            appointment.status === 'pending' ? 'badge-warning' : 
                            'badge-danger'
                          }`}>
                            {appointment.status === 'confirmed' ? 'Επιβεβαιωμένο' : 
                             appointment.status === 'pending' ? 'Σε αναμονή' : 
                             'Ακυρωμένο'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-4">Δεν υπάρχουν ραντεβού για σήμερα</p>
            )}
          </div>
          
          {/* Google Analytics Placeholder */}
          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-4">Επισκεψιμότητα</h3>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p>Η ενότητα αυτή θα συνδεθεί με το Google Analytics API</p>
              <p className="text-sm text-gray-500 mt-2">Για την προβολή στατιστικών επισκεψιμότητας του ιστοτόπου σας</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
