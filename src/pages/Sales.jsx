import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { getMonthlySalesData } from '../utils/mockData';
import SalesChart from '../components/charts/SalesChart';

const Sales = () => {
  const { sales, customers, services, products, staff } = useData();
  const [salesData, setSalesData] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'week', 'month'
  const [paymentFilter, setPaymentFilter] = useState('all'); // 'all', 'cash', 'card'
  const [searchTerm, setSearchTerm] = useState('');
  const [salesStats, setSalesStats] = useState({
    total: 0,
    count: 0,
    averageSale: 0,
    cashPayments: 0,
    cardPayments: 0
  });

  // Load sales data
  useEffect(() => {
    setSalesData(getMonthlySalesData());
  }, []);

  // Get staff member name by ID
  const getStaffName = (staffId) => {
    const staffMember = staff.find(s => s.id === staffId);
    return staffMember ? staffMember.name : 'Άγνωστος';
  };

  // Get customer name by ID
  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Άγνωστος';
  };

  // Get item details by ID
  const getItemDetails = (item) => {
    if (item.type === 'service') {
      const service = services.find(s => s.id === item.id);
      return service ? service.name : 'Άγνωστη υπηρεσία';
    } else {
      const product = products.find(p => p.id === item.id);
      return product ? product.name : 'Άγνωστο προϊόν';
    }
  };

  // Filter sales based on date, payment method, and search term
  useEffect(() => {
    let filtered = [...sales];
    
    // Apply date filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    if (dateFilter === 'today') {
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= today;
      });
    } else if (dateFilter === 'week') {
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= weekStart;
      });
    } else if (dateFilter === 'month') {
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= monthStart;
      });
    }
    
    // Apply payment method filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(sale => sale.paymentMethod === paymentFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sale => {
        const customerName = getCustomerName(sale.customerId).toLowerCase();
        const staffName = getStaffName(sale.staffId).toLowerCase();
        
        if (customerName.includes(term) || staffName.includes(term)) {
          return true;
        }
        
        // Search in items
        for (const item of sale.items) {
          const itemName = getItemDetails(item).toLowerCase();
          if (itemName.includes(term)) {
            return true;
          }
        }
        
        return false;
      });
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Calculate statistics
    const total = filtered.reduce((sum, sale) => sum + sale.total, 0);
    const count = filtered.length;
    const averageSale = count > 0 ? total / count : 0;
    const cashPayments = filtered.filter(sale => sale.paymentMethod === 'cash')
      .reduce((sum, sale) => sum + sale.total, 0);
    const cardPayments = filtered.filter(sale => sale.paymentMethod === 'card')
      .reduce((sum, sale) => sum + sale.total, 0);
    
    setSalesStats({
      total,
      count,
      averageSale,
      cashPayments,
      cardPayments
    });
    
    setFilteredSales(filtered);
  }, [sales, dateFilter, paymentFilter, searchTerm, customers, services, products, staff]);

  return (
    <div className="sales-page">
      <h1 className="text-2xl font-bold mb-6">Πωλήσεις</h1>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-2">Σύνολο Πωλήσεων</h3>
          <p className="text-3xl font-bold">{salesStats.total.toFixed(2)}€</p>
          <p className="text-sm text-gray-500">{salesStats.count} συναλλαγές</p>
        </div>
        
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-2">Μέση Αξία Συναλλαγής</h3>
          <p className="text-3xl font-bold">{salesStats.averageSale.toFixed(2)}€</p>
        </div>
        
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-2">Μέθοδοι Πληρωμής</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p className="text-sm">Μετρητά</p>
              <p className="text-xl font-bold">{salesStats.cashPayments.toFixed(2)}€</p>
            </div>
            <div>
              <p className="text-sm">Κάρτα</p>
              <p className="text-xl font-bold">{salesStats.cardPayments.toFixed(2)}€</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sales chart */}
      <div className="card p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Πωλήσεις ανά μήνα</h3>
        <SalesChart data={salesData} />
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Χρονική Περίοδος</label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${dateFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setDateFilter('all')}
            >
              Όλες
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${dateFilter === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setDateFilter('today')}
            >
              Σήμερα
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${dateFilter === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setDateFilter('week')}
            >
              Εβδομάδα
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${dateFilter === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setDateFilter('month')}
            >
              Μήνας
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Μέθοδος Πληρωμής</label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${paymentFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setPaymentFilter('all')}
            >
              Όλες
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${paymentFilter === 'cash' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setPaymentFilter('cash')}
            >
              Μετρητά
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${paymentFilter === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setPaymentFilter('card')}
            >
              Κάρτα
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Αναζήτηση</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Αναζήτηση συναλλαγής..."
              className="w-full p-2 pl-8 rounded-lg border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>
      
      {/* Sales list */}
      <div className="card overflow-x-auto">
        {filteredSales.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Ημερομηνία & Ώρα</th>
                <th className="py-3 px-4 text-left">Πελάτης</th>
                <th className="py-3 px-4 text-left">Υπάλληλος</th>
                <th className="py-3 px-4 text-left">Είδη</th>
                <th className="py-3 px-4 text-left">Σύνολο</th>
                <th className="py-3 px-4 text-left">Μέθοδος Πληρωμής</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(sale => (
                <tr key={sale.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {new Date(sale.date).toLocaleString('el-GR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="py-3 px-4">{getCustomerName(sale.customerId)}</td>
                  <td className="py-3 px-4">{getStaffName(sale.staffId)}</td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside">
                      {sale.items.map((item, index) => (
                        <li key={index}>
                          {getItemDetails(item)} x{item.quantity} ({item.price}€)
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4 font-medium">{sale.total.toFixed(2)}€</td>
                  <td className="py-3 px-4">
                    {sale.paymentMethod === 'cash' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <i className="fas fa-money-bill-wave mr-1"></i> Μετρητά
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <i className="fas fa-credit-card mr-1"></i> Κάρτα
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">Δεν βρέθηκαν συναλλαγές</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
