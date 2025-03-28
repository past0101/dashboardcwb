import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Customers from './pages/Customers';
import Staff from './pages/Staff';
import Services from './pages/Services';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Invoices from './pages/Invoices';
import Statistics from './pages/Statistics';
import Reviews from './pages/Reviews';
import Settings from './pages/Settings';
import { useTheme } from './context/ThemeContext';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { theme } = useTheme();
  
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <Appointments />;
      case 'customers':
        return <Customers />;
      case 'staff':
        return <Staff />;
      case 'services':
        return <Services />;
      case 'products':
        return <Products />;
      case 'sales':
        return <Sales />;
      case 'invoices':
        return <Invoices />;
      case 'statistics':
        return <Statistics />;
      case 'reviews':
        return <Reviews />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}>
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;
