import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const Invoices = () => {
  const { invoices, customers } = useData();
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'paid', 'unpaid'
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'thisMonth', 'lastMonth', 'thisYear'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'customer', 'total'
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc', 'desc'

  // Get customer name by ID
  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Άγνωστος';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('el-GR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Filter and sort invoices
  useEffect(() => {
    let filtered = [...invoices];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }
    
    // Apply date filter
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const thisYear = new Date(now.getFullYear(), 0, 1);
    
    if (dateFilter === 'thisMonth') {
      filtered = filtered.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= thisMonth;
      });
    } else if (dateFilter === 'lastMonth') {
      filtered = filtered.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= lastMonth && invoiceDate <= lastMonthEnd;
      });
    } else if (dateFilter === 'thisYear') {
      filtered = filtered.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= thisYear;
      });
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(invoice => {
        const customerName = getCustomerName(invoice.customerId).toLowerCase();
        return customerName.includes(term) || invoice.id.includes(term);
      });
    }
    
    // Sort results
    if (sortBy === 'date') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === 'customer') {
      filtered.sort((a, b) => {
        const customerA = getCustomerName(a.customerId);
        const customerB = getCustomerName(b.customerId);
        return sortDirection === 'asc' 
          ? customerA.localeCompare(customerB) 
          : customerB.localeCompare(customerA);
      });
    } else if (sortBy === 'total') {
      filtered.sort((a, b) => {
        return sortDirection === 'asc' ? a.total - b.total : b.total - a.total;
      });
    }
    
    setFilteredInvoices(filtered);
  }, [invoices, statusFilter, dateFilter, searchTerm, sortBy, sortDirection, customers]);

  // Handle sort click
  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to descending
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  // Render sort icon
  const renderSortIcon = (field) => {
    if (sortBy !== field) return <i className="fas fa-sort text-gray-300 ml-1"></i>;
    
    return sortDirection === 'asc' 
      ? <i className="fas fa-sort-up text-blue-500 ml-1"></i>
      : <i className="fas fa-sort-down text-blue-500 ml-1"></i>;
  };

  return (
    <div className="invoices-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Τιμολόγια</h1>
        <button className="btn-primary flex items-center">
          <i className="fas fa-plus mr-2"></i>
          Δημιουργία Τιμολογίου
        </button>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Κατάσταση</label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${statusFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setStatusFilter('all')}
            >
              Όλα
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${statusFilter === 'paid' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setStatusFilter('paid')}
            >
              Εξοφλημένα
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${statusFilter === 'unpaid' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setStatusFilter('unpaid')}
            >
              Ανεξόφλητα
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Χρονική Περίοδος</label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${dateFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setDateFilter('all')}
            >
              Όλα
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${dateFilter === 'thisMonth' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setDateFilter('thisMonth')}
            >
              Τρέχων Μήνας
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${dateFilter === 'lastMonth' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setDateFilter('lastMonth')}
            >
              Προηγούμενος Μήνας
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${dateFilter === 'thisYear' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setDateFilter('thisYear')}
            >
              Τρέχον Έτος
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Αναζήτηση</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Αναζήτηση τιμολογίου..."
              className="w-full p-2 pl-8 rounded-lg border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>
      
      {/* Invoices table */}
      <div className="card overflow-x-auto">
        {filteredInvoices.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">
                  <button 
                    className="font-medium flex items-center" 
                    onClick={() => handleSort('date')}
                  >
                    Ημερομηνία {renderSortIcon('date')}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Αριθμός</th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="font-medium flex items-center" 
                    onClick={() => handleSort('customer')}
                  >
                    Πελάτης {renderSortIcon('customer')}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Ημ. Λήξης</th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="font-medium flex items-center" 
                    onClick={() => handleSort('total')}
                  >
                    Σύνολο {renderSortIcon('total')}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Κατάσταση</th>
                <th className="py-3 px-4 text-center">Ενέργειες</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="py-3 px-4">#{invoice.id}</td>
                  <td className="py-3 px-4">{getCustomerName(invoice.customerId)}</td>
                  <td className="py-3 px-4">{formatDate(invoice.dueDate)}</td>
                  <td className="py-3 px-4 font-medium">{invoice.total.toFixed(2)}€</td>
                  <td className="py-3 px-4">
                    {invoice.status === 'paid' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <i className="fas fa-check-circle mr-1"></i> Εξοφλημένο
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <i className="fas fa-clock mr-1"></i> Ανεξόφλητο
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        title="Προβολή"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      
                      <button 
                        className="text-green-600 hover:text-green-800"
                        title="PDF"
                      >
                        <i className="fas fa-file-pdf"></i>
                      </button>
                      
                      {invoice.status === 'unpaid' && (
                        <button 
                          className="text-green-600 hover:text-green-800"
                          title="Εξόφληση"
                        >
                          <i className="fas fa-check-circle"></i>
                        </button>
                      )}
                      
                      <button 
                        className="text-red-600 hover:text-red-800"
                        title="Διαγραφή"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">Δεν βρέθηκαν τιμολόγια</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
