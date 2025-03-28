import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children, setCurrentPage, currentPage }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme}-theme min-h-screen flex flex-col md:flex-row`}>
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          {children}
        </main>
        <footer className="py-4 px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} - Πίνακας Διαχείρισης Επιχείρησης</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
