import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  ClockIcon,
  UserGroupIcon,
  TagIcon,
  CurrencyEuroIcon
} from '@heroicons/react/24/outline';
import { Service } from '@/lib/types';

export default function Services() {
  const { services } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION'>('ALL');

  // Form state for a new service
  const [newService, setNewService] = useState<{
    name: string;
    description: string;
    price: string;
    duration: string;
    category: 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION';
    technicians: string;
  }>({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'AUTO',
    technicians: '1'
  });

  // Filter services based on search term and category
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'ALL' || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryText = (category: string) => {
    switch(category) {
      case 'AUTO':
        return 'Αυτοκίνητο';
      case 'MOTO':
        return 'Μοτοσυκλέτα';
      case 'YACHT':
        return 'Σκάφος';
      case 'AVIATION':
        return 'Αεροσκάφος';
      default:
        return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to actually add the service
    setShowAddModal(false);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setNewService({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      category: service.category,
      technicians: '2' // Default, would come from actual data
    });
    setShowEditModal(true);
  };

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Διαχείριση Υπηρεσιών</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Διαχειριστείτε τις υπηρεσίες, τους χρόνους διάρκειας και τις απαιτήσεις προσωπικού
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
              placeholder="Αναζήτηση υπηρεσίας..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <select
            id="category-filter"
            name="category-filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setCategoryFilter(e.target.value as 'ALL' | 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION')}
            value={categoryFilter}
          >
            <option value="ALL">Όλες οι κατηγορίες</option>
            <option value="AUTO">Αυτοκίνητα</option>
            <option value="MOTO">Μοτοσυκλέτες</option>
            <option value="YACHT">Σκάφη</option>
            <option value="AVIATION">Αεροσκάφη</option>
          </select>
        </div>
      </div>

      {/* Add service button */}
      <div className="mb-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
          onClick={() => setShowAddModal(true)}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Νέα Υπηρεσία
        </button>
      </div>

      {/* Services list */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Υπηρεσία</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Κατηγορία</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Τιμή</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Διάρκεια</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Τεχνικοί</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs truncate">{service.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{getCategoryIcon(service.category)}</span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {getCategoryText(service.category)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <CurrencyEuroIcon className="h-5 w-5 mr-1 text-gray-400" />
                        {service.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
                        {service.duration} λεπτά
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <UserGroupIcon className="h-5 w-5 mr-1 text-gray-400" />
                        {/* This would be dynamic in a real implementation */}
                        {service.duration > 240 ? 3 : service.duration > 120 ? 2 : 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-300"
                          onClick={() => handleEditService(service)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-red-500 dark:hover:text-red-300"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Δεν βρέθηκαν υπηρεσίες με τα επιλεγμένα κριτήρια.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section for service time details */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Τυπικοί Χρόνοι Εργασιών ανά Κατηγορία</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🚗</span>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Αυτοκίνητα</h3>
              </div>
            </div>
            <div className="px-6 py-5">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ceramic Pro 9H</h4>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">4 ώρες</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserGroupIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">2 τεχνικοί</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Light/Bronze Package</h4>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">2 ώρες</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserGroupIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">2 τεχνικοί</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Gold Package</h4>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">6 ώρες</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserGroupIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">3 τεχνικοί</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🏍️</span>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Μοτοσυκλέτες</h3>
              </div>
            </div>
            <div className="px-6 py-5">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ceramic Pro για μοτοσυκλέτα</h4>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">2 ώρες</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserGroupIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">1 τεχνικός</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Υαλοκαθαριστήρες</h4>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">1 ώρα</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserGroupIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">1 τεχνικός</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <span className="text-2xl mr-2">⛵</span>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Σκάφη</h3>
              </div>
            </div>
            <div className="px-6 py-5">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Πλήρης περιποίηση σκάφους</h4>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">8 ώρες</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserGroupIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">3 τεχνικοί</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ceramic Pro για σκάφος</h4>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">5 ώρες</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserGroupIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">2 τεχνικοί</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <span className="text-2xl mr-2">✈️</span>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Αεροσκάφη</h3>
              </div>
            </div>
            <div className="px-6 py-5">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ceramic Pro για αεροσκάφος</h4>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">10 ώρες</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserGroupIcon className="h-5 w-5 mr-1 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">4 τεχνικοί</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add service modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Προσθήκη Νέας Υπηρεσίας</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setShowAddModal(false)}
              >
                <span className="sr-only">Κλείσιμο</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Όνομα Υπηρεσίας *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={newService.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Περιγραφή
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={newService.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Κατηγορία *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newService.category}
                    onChange={handleInputChange}
                  >
                    <option value="AUTO">Αυτοκίνητο</option>
                    <option value="MOTO">Μοτοσυκλέτα</option>
                    <option value="YACHT">Σκάφος</option>
                    <option value="AVIATION">Αεροσκάφος</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Τιμή (€) *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      step="0.01"
                      min="0"
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                      value={newService.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Διάρκεια (λεπτά) *
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    required
                    min="1"
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newService.duration}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="technicians" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Απαιτούμενοι Τεχνικοί *
                  </label>
                  <select
                    id="technicians"
                    name="technicians"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newService.technicians}
                    onChange={handleInputChange}
                  >
                    <option value="1">1 Τεχνικός</option>
                    <option value="2">2 Τεχνικοί</option>
                    <option value="3">3 Τεχνικοί</option>
                    <option value="4">4 Τεχνικοί</option>
                    <option value="5">5 Τεχνικοί</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                  onClick={() => setShowAddModal(false)}
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

      {/* Edit service modal */}
      {showEditModal && selectedService && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Επεξεργασία Υπηρεσίας</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setShowEditModal(false)}
              >
                <span className="sr-only">Κλείσιμο</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Όνομα Υπηρεσίας *
                </label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={newService.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Περιγραφή
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={newService.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Κατηγορία *
                  </label>
                  <select
                    id="edit-category"
                    name="category"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newService.category}
                    onChange={handleInputChange}
                  >
                    <option value="AUTO">Αυτοκίνητο</option>
                    <option value="MOTO">Μοτοσυκλέτα</option>
                    <option value="YACHT">Σκάφος</option>
                    <option value="AVIATION">Αεροσκάφος</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Τιμή (€) *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                    <input
                      type="number"
                      id="edit-price"
                      name="price"
                      required
                      step="0.01"
                      min="0"
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                      value={newService.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="edit-duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Διάρκεια (λεπτά) *
                  </label>
                  <input
                    type="number"
                    id="edit-duration"
                    name="duration"
                    required
                    min="1"
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newService.duration}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="edit-technicians" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Απαιτούμενοι Τεχνικοί *
                  </label>
                  <select
                    id="edit-technicians"
                    name="technicians"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newService.technicians}
                    onChange={handleInputChange}
                  >
                    <option value="1">1 Τεχνικός</option>
                    <option value="2">2 Τεχνικοί</option>
                    <option value="3">3 Τεχνικοί</option>
                    <option value="4">4 Τεχνικοί</option>
                    <option value="5">5 Τεχνικοί</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                  onClick={() => setShowEditModal(false)}
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Αποθήκευση
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}