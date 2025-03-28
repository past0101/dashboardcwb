import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  CheckIcon, 
  XMarkIcon, 
  PlusIcon, 
  UserGroupIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { useData } from '@/context/DataContext';
import { Appointment, Customer, Staff, Service } from '@/lib/types';

export default function Appointments() {
  const { appointments, customers, staff, services, addAppointment } = useData();
  const [selectedView, setSelectedView] = useState<'upcoming' | 'availability' | 'rules' | 'new'>('upcoming');
  const [statusFilter, setStatusFilter] = useState<'all' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'>('all');
  const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false);

  // Form state for new appointment
  const [newAppointment, setNewAppointment] = useState<{
    customerId: number;
    staffId: number;
    serviceId: string;
    date: string;
    time: string;
    notes: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    type: 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION';
  }>({
    customerId: 0,
    staffId: 0,
    serviceId: '',
    date: '',
    time: '',
    notes: '',
    status: 'SCHEDULED',
    type: 'AUTO'
  });

  const filteredAppointments = appointments.filter(appointment => 
    statusFilter === 'all' || appointment.status === statusFilter
  );

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'AUTO':
        return '🚗';
      case 'MOTO':
        return '🏍️';
      case 'YACHT':
        return '⛵';
      case 'AVIATION':
        return '✈️';
      default:
        return '🚗';
    }
  };

  const handleNewAppointmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));

    // If the service changes, update the vehicle type accordingly
    if (name === 'serviceId') {
      const selectedService = services.find(service => service.id.toString() === value);
      if (selectedService) {
        setNewAppointment(prev => ({
          ...prev,
          type: selectedService.category
        }));
      }
    }
  };

  const handleNewAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCustomer = customers.find(c => c.id === newAppointment.customerId);
    const selectedStaff = staff.find(s => s.id === newAppointment.staffId);
    const selectedService = services.find(s => s.id.toString() === newAppointment.serviceId);
    
    if (selectedCustomer && selectedStaff && selectedService) {
      const appointment: Omit<Appointment, 'id'> = {
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        staffId: selectedStaff.id,
        staffName: selectedStaff.name,
        service: selectedService.name,
        date: newAppointment.date,
        time: newAppointment.time,
        status: newAppointment.status,
        type: newAppointment.type,
        notes: newAppointment.notes
      };
      
      addAppointment(appointment);
      
      // Reset form
      setNewAppointment({
        customerId: 0,
        staffId: 0,
        serviceId: '',
        date: '',
        time: '',
        notes: '',
        status: 'SCHEDULED',
        type: 'AUTO'
      });
      
      // Go back to appointment list
      setSelectedView('upcoming');
    }
  };

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Διαχείριση Ραντεβού</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Διαχειριστείτε τα ραντεβού, δείτε τη διαθεσιμότητα και ορίστε κανόνες κράτησης
        </p>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setSelectedView('upcoming')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'upcoming'
                ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Επερχόμενα Ραντεβού
          </button>
          <button
            onClick={() => setSelectedView('new')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'new'
                ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Νέο Ραντεβού
          </button>
          <button
            onClick={() => setSelectedView('availability')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'availability'
                ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Διαθεσιμότητα
          </button>
          <button
            onClick={() => setSelectedView('rules')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'rules'
                ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Κανόνες Κράτησης
          </button>
        </nav>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'upcoming' && (
        <>
          {/* Status filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                statusFilter === 'all' 
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Όλα
            </button>
            <button
              onClick={() => setStatusFilter('SCHEDULED')}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                statusFilter === 'SCHEDULED' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Προγραμματισμένα
            </button>
            <button
              onClick={() => setStatusFilter('COMPLETED')}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                statusFilter === 'COMPLETED' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Ολοκληρωμένα
            </button>
            <button
              onClick={() => setStatusFilter('CANCELLED')}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                statusFilter === 'CANCELLED' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Ακυρωμένα
            </button>
          </div>

          {/* Add new appointment button */}
          <div className="mb-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
              onClick={() => setSelectedView('new')}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Νέο Ραντεβού
            </button>
          </div>

          {/* Appointments list */}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <li key={appointment.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getTypeIcon(appointment.type)}</span>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900 dark:text-white">{appointment.customerName}</span>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(appointment.status)}`}>
                              {appointment.status === 'SCHEDULED' ? 'Προγραμματισμένο' : 
                               appointment.status === 'COMPLETED' ? 'Ολοκληρωμένο' : 'Ακυρωμένο'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>{appointment.date}</span>
                              <ClockIcon className="h-4 w-4 ml-3 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <UserIcon className="h-4 w-4 mr-1" />
                              <span>Τεχνικός: {appointment.staffName}</span>
                            </div>
                            <div className="mt-1">{appointment.service}</div>
                            {appointment.notes && (
                              <div className="mt-1 italic">{appointment.notes}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-300 focus:outline-none"
                          title="Ολοκλήρωση"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-red-300 focus:outline-none"
                          title="Ακύρωση"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-300 focus:outline-none"
                          title="Επεξεργασία"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Δεν βρέθηκαν ραντεβού με τα επιλεγμένα κριτήρια.
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      {selectedView === 'new' && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Δημιουργία Νέου Ραντεβού</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Συμπληρώστε τα στοιχεία για τη δημιουργία νέου ραντεβού
            </p>
          </div>
          
          <form onSubmit={handleNewAppointmentSubmit} className="px-6 py-5 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* Customer Selection */}
              <div className="sm:col-span-3">
                <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Πελάτης *
                </label>
                <div className="mt-1 flex">
                  <select
                    id="customerId"
                    name="customerId"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newAppointment.customerId}
                    onChange={handleNewAppointmentChange}
                  >
                    <option value="">Επιλέξτε πελάτη</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} - {customer.phone}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 focus:outline-none"
                    onClick={() => setShowCustomerModal(true)}
                  >
                    <PlusIcon className="-ml-0.5 mr-1 h-4 w-4" /> Νέος
                  </button>
                </div>
              </div>

              {/* Staff Selection */}
              <div className="sm:col-span-3">
                <label htmlFor="staffId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Τεχνικός *
                </label>
                <div className="mt-1">
                  <select
                    id="staffId"
                    name="staffId"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newAppointment.staffId}
                    onChange={handleNewAppointmentChange}
                  >
                    <option value="">Επιλέξτε τεχνικό</option>
                    {staff.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} - {employee.position}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Selection */}
              <div className="sm:col-span-3">
                <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Υπηρεσία *
                </label>
                <div className="mt-1">
                  <select
                    id="serviceId"
                    name="serviceId"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newAppointment.serviceId}
                    onChange={handleNewAppointmentChange}
                  >
                    <option value="">Επιλέξτε υπηρεσία</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {service.category} ({service.duration} λεπτά)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Selection */}
              <div className="sm:col-span-3">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Κατάσταση *
                </label>
                <div className="mt-1">
                  <select
                    id="status"
                    name="status"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newAppointment.status}
                    onChange={handleNewAppointmentChange}
                  >
                    <option value="SCHEDULED">Προγραμματισμένο</option>
                    <option value="COMPLETED">Ολοκληρωμένο</option>
                    <option value="CANCELLED">Ακυρωμένο</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="sm:col-span-3">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ημερομηνία *
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newAppointment.date}
                    onChange={handleNewAppointmentChange}
                  />
                </div>
              </div>

              {/* Time */}
              <div className="sm:col-span-3">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ώρα *
                </label>
                <div className="mt-1">
                  <input
                    type="time"
                    name="time"
                    id="time"
                    required
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newAppointment.time}
                    onChange={handleNewAppointmentChange}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="sm:col-span-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Σημειώσεις
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Προσθέστε σημειώσεις σχετικά με το ραντεβού..."
                    value={newAppointment.notes}
                    onChange={handleNewAppointmentChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                onClick={() => setSelectedView('upcoming')}
              >
                Ακύρωση
              </button>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                Δημιουργία Ραντεβού
              </button>
            </div>
          </form>
        </div>
      )}

      {selectedView === 'availability' && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Διαθεσιμότητα Ραντεβού</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Εδώ μπορείτε να δείτε και να διαχειριστείτε τη διαθεσιμότητα για νέα ραντεβού. Το σύστημα υπολογίζει αυτόματα τις διαθέσιμες ώρες με βάση τα υπάρχοντα ραντεβού και τους κανόνες που έχετε ορίσει.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Availability chart */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Διαθεσιμότητα Εβδομάδας</h3>
              <div className="h-64 bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Το διάγραμμα διαθεσιμότητας θα εμφανιστεί εδώ (πίτα με κενές ώρες σε πραγματικό χρόνο)
                </p>
              </div>
            </div>

            {/* Next available slots */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Επόμενες Διαθέσιμες Ώρες</h3>
              <ul className="space-y-3">
                <li className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <div className="text-sm font-medium">Αύριο, 11:00 - 13:30</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">2.5 ώρες διαθέσιμες</div>
                </li>
                <li className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <div className="text-sm font-medium">Παρασκευή, 09:00 - 12:00</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">3 ώρες διαθέσιμες</div>
                </li>
                <li className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <div className="text-sm font-medium">Δευτέρα, 14:00 - 18:00</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">4 ώρες διαθέσιμες</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Σύστημα Αυτόματης Εύρεσης Διαθεσιμότητας</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Το σύστημα θα εντοπίζει αυτόματα την αμέσως επόμενη διαθέσιμη ημερομηνία, με βάση κανόνες και περιορισμούς που έχετε ορίσει. Θα παρέχεται επίσης εναλλακτική ημερομηνία.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Επόμενη Προτεινόμενη Ημερομηνία</div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">Τετάρτη, 29 Μαρτίου - 10:30</div>
                </div>
                <div className="mt-3 md:mt-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Εναλλακτική Ημερομηνία</div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">Πέμπτη, 30 Μαρτίου - 14:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'rules' && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Κανόνες Κράτησης Ραντεβού</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Διαμορφώστε τους κανόνες για τη ρύθμιση των ραντεβού σύμφωνα με το είδος της εργασίας και τις απαιτούμενες ώρες απασχόλησης.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Τύποι Εργασιών και Διάρκειες</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Υπηρεσία</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Κατηγορία</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Διάρκεια</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Άτομα</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Ceramic Pro 9H</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">AUTO</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">4 ώρες</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Light/Bronze Package</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">AUTO</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2 ώρες</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Gold Package</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">AUTO</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">6 ώρες</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">3</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Υαλοκαθαριστήρες</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">MOTO</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">1 ώρα</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Περιορισμοί Ωρών και Ημερών</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Ώρες Λειτουργίας</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Δευτέρα - Παρασκευή: 08:00 - 20:00</li>
                    <li>Σάββατο: 09:00 - 16:00</li>
                    <li>Κυριακή: Κλειστά</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Ειδικοί Περιορισμοί</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Ελάχιστος χρόνος μεταξύ ραντεβού: 30 λεπτά</li>
                    <li>Μέγιστα ταυτόχρονα ραντεβού: 3</li>
                    <li>Lead time για κρατήσεις: 1 ημέρα</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Ειδοποιήσεις προς Πελάτες</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="sms-confirmation"
                    name="sms-confirmation"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    defaultChecked
                  />
                  <label htmlFor="sms-confirmation" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                    Επιβεβαίωση ραντεβού (SMS – Viber)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="sms-reminder-5days"
                    name="sms-reminder-5days"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    defaultChecked
                  />
                  <label htmlFor="sms-reminder-5days" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                    Υπενθύμιση 5 ημέρες πριν το ραντεβού
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="sms-reminder-1day"
                    name="sms-reminder-1day"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    defaultChecked
                  />
                  <label htmlFor="sms-reminder-1day" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                    Υπενθύμιση 1 ημέρα πριν το ραντεβού
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="sms-completion"
                    name="sms-completion"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    defaultChecked
                  />
                  <label htmlFor="sms-completion" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                    Ειδοποίηση ολοκλήρωσης εργασίας
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="sms-feedback"
                    name="sms-feedback"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    defaultChecked
                  />
                  <label htmlFor="sms-feedback" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                    Αίτημα για αξιολόγηση μετά την ολοκλήρωση
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal για Νέο Πελάτη */}
      {showCustomerModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Προσθήκη Νέου Πελάτη</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setShowCustomerModal(false)}
              >
                <span className="sr-only">Κλείσιμο</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Όνομα *
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    required
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Επώνυμο *
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    required
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Τηλέφωνο *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="application-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Τύπος Εφαρμογής *
                  </label>
                  <select
                    id="application-type"
                    name="application-type"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Επιλέξτε τύπο</option>
                    <option value="AUTO">Αυτοκίνητο</option>
                    <option value="MOTO">Μοτοσυκλέτα</option>
                    <option value="YACHT">Σκάφος</option>
                    <option value="AVIATION">Αεροσκάφος</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Μάρκα και μοντέλο οχήματος
                  </label>
                  <input
                    type="text"
                    name="vehicle"
                    id="vehicle"
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="π.χ. Audi A4 2020"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Συμπληρώνεται εφόσον έχετε επιλέξει Αυτοκίνητο ή Μοτοσυκλέτα</p>
                </div>
                <div>
                  <label htmlFor="vehicle-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Χρώμα οχήματος
                  </label>
                  <input
                    type="text"
                    name="vehicle-color"
                    id="vehicle-color"
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Συμπληρώνεται εφόσον έχετε επιλέξει Αυτοκίνητο ή Μοτοσυκλέτα</p>
                </div>
                <div>
                  <label htmlFor="vehicle-year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Έτος κατασκευής
                  </label>
                  <input
                    type="number"
                    name="vehicle-year"
                    id="vehicle-year"
                    min="1900"
                    max="2100"
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Συμπληρώνεται εφόσον έχετε επιλέξει Αυτοκίνητο ή Μοτοσυκλέτα</p>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="vehicle-condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Κατάσταση οχήματος *
                  </label>
                  <select
                    id="vehicle-condition"
                    name="vehicle-condition"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Επιλέξτε κατάσταση</option>
                    <option value="NEW">Καινούργιο</option>
                    <option value="USED">Μεταχειρισμένο</option>
                    <option value="PAINT_WORN">Φθαρμένη βαφή</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Έχω εφαρμόσει παλιότερα κεραμική προστασία
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="ceramic-other-vehicle"
                        name="ceramic-protection"
                        type="radio"
                        value="other_vehicle"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="ceramic-other-vehicle" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        ΝΑΙ, σε άλλο όχημα
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="ceramic-same-vehicle"
                        name="ceramic-protection"
                        type="radio"
                        value="same_vehicle"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="ceramic-same-vehicle" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        ΝΑΙ, στο ίδιο όχημα
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="ceramic-no"
                        name="ceramic-protection"
                        type="radio"
                        value="no"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="ceramic-no" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        ΟΧΙ
                      </label>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="client-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Είμαι
                  </label>
                  <select
                    id="client-type"
                    name="client-type"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="INDIVIDUAL">Ιδιώτης</option>
                    <option value="BUSINESS">Επιχείρηση</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Διεύθυνση
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone-fixed" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Τηλέφωνο σταθερό
                  </label>
                  <input
                    type="tel"
                    name="phone-fixed"
                    id="phone-fixed"
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone-mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Τηλέφωνο κινητό
                  </label>
                  <input
                    type="tel"
                    name="phone-mobile"
                    id="phone-mobile"
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                  onClick={() => setShowCustomerModal(false)}
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Προσθήκη
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}