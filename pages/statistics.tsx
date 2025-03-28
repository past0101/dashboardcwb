import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  ArrowPathIcon,
  CurrencyEuroIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  QueueListIcon,
  ChartBarIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

// Import existing chart components
import SalesChart from '@/components/dashboard/SalesChart';
import AppointmentsChart from '@/components/dashboard/AppointmentsChart';
import ServiceTypeDistribution from '@/components/dashboard/ServiceTypeDistribution';

export default function Statistics() {
  const { 
    appointments, 
    sales, 
    customers, 
    services, 
    products, 
    staff, 
    salesData, 
    appointmentsData, 
    refreshChartData 
  } = useData();
  
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [compareMode, setCompareMode] = useState(false);

  // Calculate total sales
  const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
  
  // Calculate total sales by service type (AUTO, MOTO, YACHT, AVIATION)
  const serviceTypeSales = {
    AUTO: 0,
    MOTO: 0,
    YACHT: 0,
    AVIATION: 0
  };
  
  customers.forEach(customer => {
    const customerSales = sales.filter(sale => sale.customerId === customer.id);
    const customerTotal = customerSales.reduce((acc, sale) => acc + sale.total, 0);
    if (customer.type in serviceTypeSales) {
      serviceTypeSales[customer.type as keyof typeof serviceTypeSales] += customerTotal;
    }
  });
  
  // Top service by revenue
  const serviceRevenue: { [key: string]: number } = {};
  sales.forEach(sale => {
    sale.items.forEach(item => {
      if (item.type === 'SERVICE') {
        if (!serviceRevenue[item.name]) {
          serviceRevenue[item.name] = 0;
        }
        serviceRevenue[item.name] += item.price * item.quantity;
      }
    });
  });
  
  const topService = Object.entries(serviceRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1)
    .map(([name, revenue]) => ({ name, revenue }))[0] || { name: 'N/A', revenue: 0 };
  
  // Top product by revenue
  const productRevenue: { [key: string]: number } = {};
  sales.forEach(sale => {
    sale.items.forEach(item => {
      if (item.type === 'PRODUCT') {
        if (!productRevenue[item.name]) {
          productRevenue[item.name] = 0;
        }
        productRevenue[item.name] += item.price * item.quantity;
      }
    });
  });
  
  const topProduct = Object.entries(productRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1)
    .map(([name, revenue]) => ({ name, revenue }))[0] || { name: 'N/A', revenue: 0 };
  
  // Top performing staff
  const staffPerformance: { [key: number]: { count: number, revenue: number } } = {};
  appointments.forEach(appointment => {
    if (!staffPerformance[appointment.staffId]) {
      staffPerformance[appointment.staffId] = { count: 0, revenue: 0 };
    }
    
    if (appointment.status === 'COMPLETED') {
      staffPerformance[appointment.staffId].count += 1;
      
      // Find related sales
      const relatedSales = sales.filter(
        sale => sale.customerId === appointment.customerId &&
        new Date(sale.date).toDateString() === new Date(appointment.date).toDateString()
      );
      
      relatedSales.forEach(sale => {
        staffPerformance[appointment.staffId].revenue += sale.total;
      });
    }
  });
  
  const topStaff = Object.entries(staffPerformance)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 1)
    .map(([id, data]) => {
      const staffMember = staff.find(s => s.id === Number(id));
      return {
        id: Number(id),
        name: staffMember ? staffMember.name : 'Unknown',
        revenue: data.revenue,
        appointments: data.count
      };
    })[0] || { id: 0, name: 'N/A', revenue: 0, appointments: 0 };
  
  // Monthly vs Previous Month Sales
  const currentMonthSales = salesData.slice(-1)[0]?.sales || 0;
  const previousMonthSales = salesData.slice(-2, -1)[0]?.sales || 0;
  const salesGrowth = previousMonthSales ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100 : 0;
  
  // Monthly vs Previous Month Appointments
  const currentMonthAppointments = appointmentsData.slice(-7).reduce((acc, item) => acc + item.appointments, 0);
  const previousMonthAppointments = appointmentsData.slice(-14, -7).reduce((acc, item) => acc + item.appointments, 0);
  const appointmentsGrowth = previousMonthAppointments 
    ? ((currentMonthAppointments - previousMonthAppointments) / previousMonthAppointments) * 100 
    : 0;
  
  // Format numbers for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' })
      .format(value)
      .replace('€', '') // Remove the euro sign as we'll add it manually
      .trim();
  };
  
  const formatPercent = (value: number) => {
    return value.toFixed(1);
  };
  
  const handleRefreshData = () => {
    refreshChartData();
  };
  
  const handleDateRangeChange = (range: 'week' | 'month' | 'quarter' | 'year') => {
    setDateRange(range);
  };
  
  const handleCompareToggle = () => {
    setCompareMode(!compareMode);
  };

  return (
    <Layout>
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Στατιστικά</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Επισκόπηση των βασικών δεικτών απόδοσης της επιχείρησης
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleDateRangeChange('week')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              dateRange === 'week'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Εβδομάδα
          </button>
          <button
            type="button"
            onClick={() => handleDateRangeChange('month')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              dateRange === 'month'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Μήνας
          </button>
          <button
            type="button"
            onClick={() => handleDateRangeChange('quarter')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              dateRange === 'quarter'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Τρίμηνο
          </button>
          <button
            type="button"
            onClick={() => handleDateRangeChange('year')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              dateRange === 'year'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Έτος
          </button>
          <button
            type="button"
            onClick={handleRefreshData}
            className="ml-1 px-2 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            title="Ανανέωση δεδομένων"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* KPI summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Sales Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Συνολικές Πωλήσεις</p>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalSales)} €</p>
              </div>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-md">
              <CurrencyEuroIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {salesGrowth >= 0 ? (
              <>
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1.5" />
                <span className="text-sm text-green-600 dark:text-green-400">+{formatPercent(salesGrowth)}%</span>
              </>
            ) : (
              <>
                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1.5" />
                <span className="text-sm text-red-600 dark:text-red-400">{formatPercent(salesGrowth)}%</span>
              </>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1.5">από τον προηγούμενο μήνα</span>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ραντεβού</p>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{appointments.length}</p>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-md">
              <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {appointmentsGrowth >= 0 ? (
              <>
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1.5" />
                <span className="text-sm text-green-600 dark:text-green-400">+{formatPercent(appointmentsGrowth)}%</span>
              </>
            ) : (
              <>
                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1.5" />
                <span className="text-sm text-red-600 dark:text-red-400">{formatPercent(appointmentsGrowth)}%</span>
              </>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1.5">από την προηγούμενη εβδομάδα</span>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Πελάτες</p>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{customers.length}</p>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-md">
              <UserGroupIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1.5" />
            <span className="text-sm text-green-600 dark:text-green-400">+8.1%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1.5">από τον προηγούμενο μήνα</span>
          </div>
        </div>

        {/* Services & Products Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Υπηρεσίες & Προϊόντα</p>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{services.length + products.length}</p>
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-md">
              <BuildingStorefrontIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <QueueListIcon className="h-4 w-4 mr-1.5" />
            <span>{services.length} υπηρεσίες</span>
            <span className="mx-1">•</span>
            <span>{products.length} προϊόντα</span>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Over Time Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Πωλήσεις</h3>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleCompareToggle}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {compareMode ? 'Απόκρυψη σύγκρισης' : 'Σύγκριση περιόδων'}
              </button>
            </div>
          </div>
          <div className="h-80">
            <SalesChart data={salesData} />
          </div>
        </div>

        {/* Appointments Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ραντεβού</h3>
          </div>
          <div className="h-80">
            <AppointmentsChart data={appointmentsData} />
          </div>
        </div>
      </div>

      {/* Additional statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Service Type Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Κατανομή ανά Τύπο</h3>
          </div>
          <div className="h-64">
            <ServiceTypeDistribution />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Αυτοκίνητα</div>
              <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(serviceTypeSales.AUTO)} €
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Μοτοσυκλέτες</div>
              <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(serviceTypeSales.MOTO)} €
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Σκάφη</div>
              <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(serviceTypeSales.YACHT)} €
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Αεροσκάφη</div>
              <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(serviceTypeSales.AVIATION)} €
              </div>
            </div>
          </div>
        </div>

        {/* Top Services & Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Κορυφαίες Υπηρεσίες & Προϊόντα</h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Κορυφαία Υπηρεσία</h4>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-base font-medium text-gray-900 dark:text-white truncate">{topService.name}</div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Έσοδα: {formatCurrency(topService.revenue)} €</div>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                  <ChartBarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Κορυφαίο Προϊόν</h4>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-base font-medium text-gray-900 dark:text-white truncate">{topProduct.name}</div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Έσοδα: {formatCurrency(topProduct.revenue)} €</div>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md">
                  <ChartPieIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Απόδοση Προσωπικού</h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Κορυφαίος Τεχνικός</h4>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-base font-medium text-gray-900 dark:text-white">{topStaff.name}</div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Έσοδα: {formatCurrency(topStaff.revenue)} € • Ραντεβού: {topStaff.appointments}
                  </div>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
                  <UserGroupIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Στατιστικά Ομάδας</h4>
            <dl className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Μέσος Χρόνος</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">3.2 ώρες / έργο</dd>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Ποσοστό Ολοκλήρωσης</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">94.3%</dd>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Μέση Αξιολόγηση</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">4.7 / 5</dd>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Έργα σε Εξέλιξη</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {appointments.filter(a => a.status === 'SCHEDULED').length}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
}