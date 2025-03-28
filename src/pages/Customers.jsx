import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import CustomerList from '../components/customers/CustomerList';
import CustomerForm from '../components/customers/CustomerForm';

const Customers = () => {
  const { customers, appointments } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // Filter customers based on search term
  useEffect(() => {
    let filtered = [...customers];
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(term) || 
        customer.email.toLowerCase().includes(term) ||
        customer.phone.includes(term)
      );
    }
    
    // Sort by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    setFilteredCustomers(filtered);
  }, [customers, searchTerm]);

  const handleEditCustomer = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setEditingCustomer(customer);
      setShowForm(true);
    }
  };

  const handleViewAppointmentHistory = (customerId) => {
    setSelectedCustomerId(customerId);
    setActiveTab('appointments');
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
    setShowForm(false);
  };

  const getCustomerAppointments = (customerId) => {
    return appointments
      .filter(appointment => appointment.customerId === customerId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <div className="customers-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Πελάτες</h1>
        {activeTab === 'list' && (
          <button 
            className="btn-primary flex items-center"
            onClick={() => {
              setEditingCustomer(null);
              setShowForm(true);
            }}
          >
            <i className="fas fa-plus mr-2"></i>
            Προσθήκη Πελάτη
          </button>
        )}
        {activeTab === 'appointments' && (
          <button 
            className="btn-secondary flex items-center"
            onClick={() => setActiveTab('list')}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Επιστροφή στη λίστα
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs mb-6">
        <div className="flex border-b">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'list' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('list')}
          >
            Λίστα Πελατών
          </button>
          {selectedCustomerId && (
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'appointments' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('appointments')}
            >
              Ιστορικό Ραντεβού
            </button>
          )}
        </div>
      </div>

      {activeTab === 'list' && (
        <>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Αναζήτηση πελάτη..."
                className="w-full p-3 pl-10 rounded-lg border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          {showForm ? (
            <div className="card p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingCustomer ? 'Επεξεργασία Πελάτη' : 'Προσθήκη Πελάτη'}
                </h2>
                <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <CustomerForm
                customer={editingCustomer}
                onCancel={handleCancelEdit}
              />
            </div>
          ) : (
            <CustomerList
              customers={filteredCustomers}
              onEdit={handleEditCustomer}
              onViewAppointments={handleViewAppointmentHistory}
            />
          )}
        </>
      )}

      {activeTab === 'appointments' && selectedCustomerId && (
        <div className="appointment-history">
          <div className="card p-4 mb-6">
            {(() => {
              const customer = customers.find(c => c.id === selectedCustomerId);
              return (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Πελάτης: {customer ? customer.name : 'Άγνωστος'}</h2>
                  {customer && (
                    <div className="text-sm text-gray-500 mt-1">
                      <p>Email: {customer.email}</p>
                      <p>Τηλέφωνο: {customer.phone}</p>
                    </div>
                  )}
                </div>
              );
            })()}
            
            <h3 className="text-lg font-medium mb-3">Ιστορικό Ραντεβού</h3>
            
            {(() => {
              const customerAppointments = getCustomerAppointments(selectedCustomerId);
              
              if (customerAppointments.length === 0) {
                return <p className="text-center py-4">Ο πελάτης δεν έχει ιστορικό ραντεβού</p>;
              }
              
              return (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Ημερομηνία & Ώρα</th>
                        <th className="py-2 px-4 text-left">Υπηρεσία</th>
                        <th className="py-2 px-4 text-left">Κατάσταση</th>
                        <th className="py-2 px-4 text-left">Σημειώσεις</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerAppointments.map(appointment => (
                        <tr key={appointment.id} className="border-t hover:bg-gray-50">
                          <td className="py-2 px-4">
                            {new Date(appointment.date).toLocaleString('el-GR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="py-2 px-4">
                            {(() => {
                              const { services } = useData();
                              const service = services.find(s => s.id === appointment.serviceId);
                              return service ? service.name : 'Άγνωστη υπηρεσία';
                            })()}
                          </td>
                          <td className="py-2 px-4">
                            <span className={`badge ${
                              appointment.status === 'confirmed' ? 'badge-success' : 
                              appointment.status === 'pending' ? 'badge-warning' : 
                              'badge-danger'
                            }`}>
                              {appointment.status === 'confirmed' ? 'Επιβεβαιωμένο' : 
                              appointment.status === 'pending' ? 'Σε αναμονή' : 
                              'Ακυρωμένο'}
                            </span>
                          </td>
                          <td className="py-2 px-4">{appointment.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
