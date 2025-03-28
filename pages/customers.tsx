import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Customer } from '@/lib/types';

export default function Customers() {
  const { customers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION'>('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Filter customers based on search term and type
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        customer.phone.includes(searchTerm);
    const matchesType = selectedType === 'ALL' || customer.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Διαχείριση Πελατών</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Προβολή και διαχείριση πελατών, ιστορικού οχημάτων και προγράμματος επιβράβευσης
        </p>
      </div>

      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-3/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:text-white sm:text-sm"
              placeholder="Αναζήτηση πελάτη με όνομα, email ή τηλέφωνο..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <select
            id="vehicle-type"
            name="vehicle-type"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm rounded-md"
            onChange={(e) => setSelectedType(e.target.value as 'ALL' | 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION')}
            value={selectedType}
          >
            <option value="ALL">Όλοι οι τύποι οχημάτων</option>
            <option value="AUTO">Αυτοκίνητα</option>
            <option value="MOTO">Μοτοσυκλέτες</option>
            <option value="YACHT">Σκάφη</option>
            <option value="AVIATION">Αεροσκάφη</option>
          </select>
        </div>
      </div>

      {/* Add new customer button */}
      <div className="mb-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Νέος Πελάτης
        </button>
      </div>

      {/* Customers list and details split view */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Customers list */}
        <div className={`${showDetails ? 'lg:w-2/3' : 'w-full'} bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden`}>
          {filteredCustomers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Πελάτης</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Επικοινωνία</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Τύπος</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bonus Points</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ενέργειες</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredCustomers.map((customer) => (
                    <tr 
                      key={customer.id} 
                      onClick={() => handleCustomerClick(customer)}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Πελάτης από {customer.dateAdded}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <EnvelopeIcon className="h-4 w-4 mr-1" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{getTypeIcon(customer.type)}</span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {customer.type === 'AUTO' ? 'Αυτοκίνητο' : 
                             customer.type === 'MOTO' ? 'Μοτοσυκλέτα' : 
                             customer.type === 'YACHT' ? 'Σκάφος' : 'Αεροσκάφος'}
                          </span>
                        </div>
                        {customer.vehicle && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{customer.vehicle}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white font-medium">
                          {/* Dummy points - would come from actual data */}
                          {Math.floor(Math.random() * 500)} πόντοι
                        </div>
                        <div className="text-xs text-primary-600 dark:text-primary-400">
                          Επίπεδο: {Math.floor(Math.random() * 3) + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Edit action
                            }}
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Delete action
                            }}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
              Δεν βρέθηκαν πελάτες με τα επιλεγμένα κριτήρια.
            </div>
          )}
        </div>

        {/* Customer details side panel */}
        {showDetails && selectedCustomer && (
          <div className="lg:w-1/3 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{selectedCustomer.name}</h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={() => setShowDetails(false)}
                >
                  <span className="sr-only">Κλείσιμο</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 space-y-6">
                {/* Contact information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Στοιχεία Επικοινωνίας</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">{selectedCustomer.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Στοιχεία Οχήματος</h3>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{getTypeIcon(selectedCustomer.type)}</span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {selectedCustomer.type === 'AUTO' ? 'Αυτοκίνητο' : 
                         selectedCustomer.type === 'MOTO' ? 'Μοτοσυκλέτα' : 
                         selectedCustomer.type === 'YACHT' ? 'Σκάφος' : 'Αεροσκάφος'}
                      </span>
                    </div>
                    {selectedCustomer.vehicle && (
                      <div className="text-sm text-gray-900 dark:text-white mt-1">{selectedCustomer.vehicle}</div>
                    )}
                  </div>
                </div>

                {/* Vehicle history */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ιστορικό Οχημάτων & Εργασιών</h3>
                  <div className="mt-2 space-y-2">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Ceramic Pro 9H</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Ολοκληρώθηκε: 15/02/2025</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Εγγύηση έως: 15/02/2030</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Πλύσιμο & Κέρωμα</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Ολοκληρώθηκε: 10/01/2025</div>
                    </div>
                  </div>
                </div>

                {/* Loyalty program */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Πρόγραμμα Επιβράβευσης</h3>
                  <div className="mt-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Συνολικοί Πόντοι</div>
                      <div className="text-sm font-bold text-primary-600 dark:text-primary-400">350 πόντοι</div>
                    </div>
                    <div className="mt-2">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Επίπεδο 2
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Επίπεδο 3 (500 πόντοι)
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
                          <div style={{ width: '70%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                          Ακόμα 150 πόντοι για το επόμενο επίπεδο
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs font-medium text-gray-900 dark:text-white">Διαθέσιμες Προσφορές</div>
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                        • Δωρεάν πλύσιμο αυτοκινήτου (200 πόντοι)
                      </div>
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                        • Έκπτωση 15% στην επόμενη εργασία (400 πόντοι)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next maintenance reminder */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Επόμενη Προβλεπόμενη Συντήρηση</h3>
                  <div className="mt-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Ανανέωση Ceramic Pro</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Προτεινόμενη ημερομηνία: 15/08/2025</div>
                    <button className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      Αποστολή Υπενθύμισης SMS/Viber
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}