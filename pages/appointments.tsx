import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { CalendarIcon, ClockIcon, UserIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useData } from '@/context/DataContext';

export default function Appointments() {
  const { appointments } = useData();
  const [selectedView, setSelectedView] = useState<'upcoming' | 'availability' | 'rules'>('upcoming');
  const [statusFilter, setStatusFilter] = useState<'all' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'>('all');

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
                          className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 focus:outline-none"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 focus:outline-none"
                        >
                          <XMarkIcon className="h-5 w-5" />
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
    </Layout>
  );
}