import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ setCurrentPage, currentPage }) => {
  const { theme } = useTheme();
  
  const menuItems = [
    { id: 'dashboard', name: 'Στατιστικά Επισκόπησης', icon: 'fa-chart-pie' },
    { id: 'appointments', name: 'Ραντεβού', icon: 'fa-calendar-check' },
    { id: 'customers', name: 'Πελάτες', icon: 'fa-users' },
    { id: 'staff', name: 'Προσωπικό', icon: 'fa-user-tie' },
    { id: 'services', name: 'Υπηρεσίες', icon: 'fa-concierge-bell' },
    { id: 'products', name: 'Προϊόντα', icon: 'fa-box' },
    { id: 'sales', name: 'Πωλήσεις', icon: 'fa-money-bill-wave' },
    { id: 'invoices', name: 'Τιμολόγια', icon: 'fa-file-invoice' },
    { id: 'statistics', name: 'Στατιστικά', icon: 'fa-chart-line' },
    { id: 'reviews', name: 'Αξιολογήσεις', icon: 'fa-star' },
    { id: 'settings', name: 'Ρυθμίσεις', icon: 'fa-cog' }
  ];

  return (
    <div className={`sidebar w-64 h-screen overflow-y-auto fixed md:relative shadow-lg z-10 transform md:transform-none transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Διαχείριση Επιχείρησης</h1>
      </div>
      <nav className="mt-5">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id);
                }}
                className={`flex items-center px-4 py-3 text-sm ${
                  currentPage === item.id
                    ? theme === 'dark' 
                      ? 'bg-blue-800 text-white' 
                      : 'bg-blue-100 text-blue-800'
                    : 'hover:bg-gray-700 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} w-5 mr-3`}></i>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
