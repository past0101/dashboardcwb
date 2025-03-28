import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Customer } from '@/lib/types';

export default function Customers() {
  const { customers, addCustomer } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION'>('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false);
  // Μεταβλητές κατάστασης για τη φόρμα του νέου πελάτη
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleCondition, setVehicleCondition] = useState('');
  const [ceramicProtection, setCeramicProtection] = useState('');
  const [clientType, setClientType] = useState('INDIVIDUAL');
  const [address, setAddress] = useState('');
  const [phoneFixed, setPhoneFixed] = useState('');
  const [phoneMobile, setPhoneMobile] = useState('');

  // Helper function για reset της φόρμας
  const resetCustomerForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setApplicationType('');
    setVehicle('');
    setVehicleColor('');
    setVehicleYear('');
    setVehicleCondition('');
    setCeramicProtection('');
    setClientType('INDIVIDUAL');
    setAddress('');
    setPhoneFixed('');
    setPhoneMobile('');
  };

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
          onClick={() => setShowCustomerModal(true)}
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
                          {/* Dummy points - using fixed values to prevent hydration errors */}
                          350 πόντοι
                        </div>
                        <div className="text-xs text-primary-600 dark:text-primary-400">
                          Επίπεδο: 2
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

      {/* Modal για Νέο Πελάτη */}
      {showCustomerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
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
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              // Add the customer if all required fields are filled
              if (firstName && lastName && email && phone && applicationType) {
                const fullName = `${firstName} ${lastName}`;
                addCustomer({
                  name: fullName,
                  email: email,
                  phone: phone || phoneMobile || phoneFixed,
                  type: applicationType as 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION',
                  vehicle: vehicle,
                  dateAdded: new Date().toLocaleDateString('el-GR')
                });
                // Reset form and close modal
                resetCustomerForm();
                setShowCustomerModal(false);
              }
            }}>
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={applicationType}
                    onChange={(e) => setApplicationType(e.target.value)}
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
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
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
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
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
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
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
                    value={vehicleCondition}
                    onChange={(e) => setVehicleCondition(e.target.value)}
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
                        checked={ceramicProtection === 'other_vehicle'}
                        onChange={() => setCeramicProtection('other_vehicle')}
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
                        checked={ceramicProtection === 'same_vehicle'}
                        onChange={() => setCeramicProtection('same_vehicle')}
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
                        checked={ceramicProtection === 'no'}
                        onChange={() => setCeramicProtection('no')}
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
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={phoneFixed}
                    onChange={(e) => setPhoneFixed(e.target.value)}
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
                    value={phoneMobile}
                    onChange={(e) => setPhoneMobile(e.target.value)}
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