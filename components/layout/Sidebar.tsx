import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../ui/ThemeToggle';
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon,
  CurrencyEuroIcon,
  DocumentTextIcon,
  ChartBarIcon,
  StarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isMobile: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ isMobile, setMobileMenuOpen }) => {
  const router = useRouter();
  
  // Navigation items
  const navItems: NavItem[] = [
    {
      name: 'Επισκόπηση',
      path: '/',
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      name: 'Ραντεβού',
      path: '/appointments',
      icon: <CalendarIcon className="h-6 w-6" />,
    },
    {
      name: 'Πελάτες',
      path: '/customers',
      icon: <UserGroupIcon className="h-6 w-6" />,
    },
    {
      name: 'Προσωπικό',
      path: '/staff',
      icon: <UserIcon className="h-6 w-6" />,
    },
    {
      name: 'Υπηρεσίες',
      path: '/services',
      icon: <WrenchScrewdriverIcon className="h-6 w-6" />,
    },
    {
      name: 'Προϊόντα',
      path: '/products',
      icon: <ShoppingBagIcon className="h-6 w-6" />,
    },
    {
      name: 'Πωλήσεις',
      path: '/sales',
      icon: <CurrencyEuroIcon className="h-6 w-6" />,
    },
    {
      name: 'Τιμολόγια',
      path: '/invoices',
      icon: <DocumentTextIcon className="h-6 w-6" />,
    },
    {
      name: 'Στατιστικά',
      path: '/statistics',
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      name: 'Αξιολογήσεις',
      path: '/reviews',
      icon: <StarIcon className="h-6 w-6" />,
    },
    {
      name: 'Ρυθμίσεις',
      path: '/settings',
      icon: <Cog6ToothIcon className="h-6 w-6" />,
    },
  ];
  
  // Is the current path active
  const isActiveLink = (path: string): boolean => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };
  
  // Mobile sidebar with backdrop
  if (isMobile) {
    return (
      <div className="relative z-50">
        {/* Backdrop - outside click closes the menu */}
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" 
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Sidebar panel */}
        <div className="fixed inset-y-0 left-0 flex max-w-full">
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-gray-800 pt-5 pb-4">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/logo.svg"
                  alt="Ceramic Pro"
                />
                <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Ceramic Pro
                </h1>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActiveLink(item.path)
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div 
                      className={`mr-4 flex-shrink-0 ${
                        isActiveLink(item.path) 
                          ? 'text-white' 
                          : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                      }`}
                    >
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 Ceramic Pro
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Desktop persistent sidebar
  return (
    <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 md:z-10">
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Ceramic Pro"
            />
            <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
              Ceramic Pro
            </h1>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActiveLink(item.path)
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <div 
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    isActiveLink(item.path) 
                      ? 'text-white' 
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                  }`}
                >
                  {item.icon}
                </div>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Ceramic Pro
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;