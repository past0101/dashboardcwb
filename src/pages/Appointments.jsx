import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import AppointmentList from '../components/appointments/AppointmentList';
import AppointmentForm from '../components/appointments/AppointmentForm';

const Appointments = () => {
  const { appointments, customers, services, staff } = useData();
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter appointments based on active tab and search term
  useEffect(() => {
    let filtered = [...appointments];

    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === activeTab);
    }

    // Filter by search term (customer name)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(appointment => {
        const customer = customers.find(c => c.id === appointment.customerId);
        return customer && customer.name.toLowerCase().includes(term);
      });
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredAppointments(filtered);
  }, [appointments, activeTab, searchTerm, customers]);

  const handleEditAppointment = (appointmentId) => {
    const appointment = appointments.find(app => app.id === appointmentId);
    if (appointment) {
      setEditingAppointment(appointment);
      setShowForm(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    setShowForm(false);
  };

  return (
    <div className="appointments-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ραντεβού</h1>
        <button 
          className="btn-primary flex items-center"
          onClick={() => {
            setEditingAppointment(null);
            setShowForm(true);
          }}
        >
          <i className="fas fa-plus mr-2"></i>
          Νέο Ραντεβού
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs mb-6">
        <div className="flex border-b">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('all')}
          >
            Όλα
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('pending')}
          >
            Σε Αναμονή
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'confirmed' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('confirmed')}
          >
            Επιβεβαιωμένα
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'cancelled' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Ακυρωμένα
          </button>
        </div>
      </div>

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
              {editingAppointment ? 'Επεξεργασία Ραντεβού' : 'Νέο Ραντεβού'}
            </h2>
            <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <AppointmentForm
            appointment={editingAppointment}
            onCancel={handleCancelEdit}
            customers={customers}
            services={services}
            staff={staff}
          />
        </div>
      ) : (
        <AppointmentList
          appointments={filteredAppointments}
          onEdit={handleEditAppointment}
          customers={customers}
          services={services}
          staff={staff}
        />
      )}
    </div>
  );
};

export default Appointments;
