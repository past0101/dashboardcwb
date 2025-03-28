import React, { useState, ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  // Get the current page title based on the route
  const getPageTitle = () => {
    const path = router.pathname;
    
    switch(path) {
      case '/':
        return 'Επισκόπηση';
      case '/appointments':
        return 'Ραντεβού';
      case '/customers':
        return 'Πελάτες';
      case '/staff':
        return 'Προσωπικό';
      case '/services':
        return 'Υπηρεσίες';
      case '/products':
        return 'Προϊόντα';
      case '/sales':
        return 'Πωλήσεις';
      case '/invoices':
        return 'Τιμολόγια';
      case '/statistics':
        return 'Στατιστικά';
      case '/reviews':
        return 'Αξιολογήσεις';
      case '/settings':
        return 'Ρυθμίσεις';
      default:
        return 'Admin Dashboard';
    }
  };
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{`Ceramic Pro - ${getPageTitle()}`}</title>
        <meta name="description" content="Admin Dashboard για διαχείριση επιχείρησης Ceramic Pro" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      
      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <Sidebar 
          isMobile={true} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />
      )}
      
      {/* Desktop sidebar */}
      <Sidebar 
        isMobile={false} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden md:ml-64">
        <Header 
          setMobileMenuOpen={setMobileMenuOpen} 
          title={getPageTitle()} 
        />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;