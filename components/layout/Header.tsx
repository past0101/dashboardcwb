import React from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  setMobileMenuOpen: (open: boolean) => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ setMobileMenuOpen, title }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Άνοιγμα μενού</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <h1 className="ml-3 md:ml-0 text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
        </div>
        
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <span className="sr-only">Προβολή ειδοποιήσεων</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          
          <div className="ml-3 relative">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                ΔΚ
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline-block">
                Διαχειριστής
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;