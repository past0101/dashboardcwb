import React from 'react';
import Layout from '@/components/layout/Layout';
import SalesChart from '@/components/dashboard/SalesChart';
import AppointmentsChart from '@/components/dashboard/AppointmentsChart';
import ServiceTypeDistribution from '@/components/dashboard/ServiceTypeDistribution';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';
import { useData } from '@/context/DataContext';
import StatCard from '@/components/ui/StatCard';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  CurrencyEuroIcon, 
  CheckBadgeIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  const { customers, appointments, sales } = useData();
  
  // Calculate total sales for the current month
  const calculateMonthlySales = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return sales
      .filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
      })
      .reduce((total, sale) => total + sale.total, 0);
  };
  
  // Get completed appointments count for the current month
  const getCompletedAppointments = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointment.status === 'COMPLETED' &&
        appointmentDate.getMonth() === currentMonth &&
        appointmentDate.getFullYear() === currentYear
      );
    }).length;
  };
  
  // Calculate customer growth rate
  const calculateCustomerGrowth = () => {
    // This would normally be calculated by comparing current month customers to previous month
    // For mock data we'll just return a placeholder
    return 8.5;
  };
  
  // Calculate sales growth rate
  const calculateSalesGrowth = () => {
    // This would normally be calculated by comparing current month sales to previous month
    // For mock data we'll just return a placeholder
    return 12.3;
  };

  return (
    <Layout>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Πελάτες"
          value={customers.length}
          icon={<UserGroupIcon className="h-5 w-5" />}
          trend={{ value: calculateCustomerGrowth(), isPositive: true }}
        />
        
        <StatCard 
          title="Μηνιαία Ραντεβού"
          value={getCompletedAppointments()}
          icon={<CalendarIcon className="h-5 w-5" />}
          trend={{ value: 4.2, isPositive: true }}
        />
        
        <StatCard 
          title="Μηνιαίες Πωλήσεις"
          value={`${calculateMonthlySales().toLocaleString()} €`}
          icon={<CurrencyEuroIcon className="h-5 w-5" />}
          trend={{ value: calculateSalesGrowth(), isPositive: true }}
        />
        
        <StatCard 
          title="Ποσοστό Ολοκλήρωσης"
          value="94%"
          icon={<CheckBadgeIcon className="h-5 w-5" />}
          trend={{ value: 1.8, isPositive: true }}
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SalesChart />
        <AppointmentsChart />
      </div>
      
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceTypeDistribution />
        <UpcomingAppointments />
      </div>
    </Layout>
  );
}