import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, text: 'Νέο ραντεβού στις 15:00', time: '10 λεπτά πριν' },
    { id: 2, text: 'Ο χρήστης Γιώργος Παπαδόπουλος έκανε κράτηση', time: '30 λεπτά πριν' },
    { id: 3, text: 'Υπενθύμιση: Συνάντηση προσωπικού στις 17:00', time: '1 ώρα πριν' },
  ];

  return (
    <header className={`py-4 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow flex justify-between items-center`}>
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            className={`p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="sr-only">Ειδοποιήσεις</span>
            <i className="fas fa-bell text-xl"></i>
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
              {notifications.length}
            </span>
          </button>
          
          {showNotifications && (
            <div className={`origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 z-10`}>
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="notifications-menu">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-medium">Ειδοποιήσεις</h3>
                </div>
                {notifications.map(notification => (
                  <a
                    key={notification.id}
                    href="#"
                    className={`px-4 py-3 flex hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} border-b border-gray-200`}
                    role="menuitem"
                  >
                    <div className="flex-shrink-0">
                      <i className="fas fa-info-circle mt-1 mr-2 text-blue-500"></i>
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium">{notification.text}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </a>
                ))}
                <div className="px-4 py-2 text-center text-sm">
                  <a href="#" className="text-blue-500 hover:text-blue-700">Προβολή όλων</a>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <ThemeToggle />
        
        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <span>ΔΚ</span>
            </div>
            <span className="hidden md:block">Διαχειριστής</span>
            <i className="fas fa-chevron-down text-xs"></i>
          </button>
          
          {showUserMenu && (
            <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 z-10`}>
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <a href="#" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Το προφίλ μου</a>
                <a href="#" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Ρυθμίσεις</a>
                <a href="#" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Αποσύνδεση</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
