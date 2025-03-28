import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  ClockIcon,
  UserPlusIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

// Ορισμός τύπων για ομάδες και εργασιακούς τομείς
type TeamCategory = 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION' | 'ALL';
type TeamRoles = 'TEAM_LEADER' | 'TECHNICIAN' | 'ASSISTANT';

// Mock data για τις ομάδες
const teams = [
  {
    id: 1,
    name: 'Ομάδα Α',
    leader: 'Αντώνης Παπαδόπουλος',
    members: ['Γιώργος Νικολάου', 'Μάριος Κωνσταντίνου'],
    categories: ['AUTO', 'MOTO'],
    rating: 4.8,
    completedServices: 34,
    averageCompletionTime: 94, // % του μέσου όρου (κάτω από 100% είναι καλύτερο)
    activeServices: 2
  },
  {
    id: 2,
    name: 'Ομάδα Β',
    leader: 'Χρήστος Δημητρίου',
    members: ['Αλέξανδρος Ιωάννου'],
    categories: ['AUTO'],
    rating: 4.5,
    completedServices: 28,
    averageCompletionTime: 102,
    activeServices: 1
  },
  {
    id: 3,
    name: 'Ομάδα Γ',
    leader: 'Βασίλης Αλεξίου',
    members: ['Ιωάννης Παναγιώτου', 'Στέλιος Αντωνίου'],
    categories: ['YACHT', 'AUTO'],
    rating: 4.7,
    completedServices: 22,
    averageCompletionTime: 90,
    activeServices: 0
  },
  {
    id: 4,
    name: 'Ομάδα Δ',
    leader: 'Μιχάλης Κυριακίδης',
    members: ['Σπύρος Νικολαΐδης'],
    categories: ['MOTO'],
    rating: 4.6,
    completedServices: 19,
    averageCompletionTime: 95,
    activeServices: 3
  }
];

export default function Staff() {
  const { staff } = useData();
  const [selectedView, setSelectedView] = useState<'staff' | 'teams'>('staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TeamCategory>('ALL');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);

  // Filter staff based on search term
  const filteredStaff = staff.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter teams based on search term and category
  const filteredTeams = teams.filter(team => {
    const matchesSearch = 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.members.some(member => member.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'ALL' || team.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const getCompletionTimeColor = (time: number) => {
    if (time <= 95) return 'text-green-600 dark:text-green-400';
    if (time <= 105) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Διαχείριση Προσωπικού</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Διαχειριστείτε το προσωπικό, τις ομάδες και τα bonus απόδοσης
        </p>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setSelectedView('staff')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'staff'
                ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Προσωπικό
          </button>
          <button
            onClick={() => setSelectedView('teams')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'teams'
                ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Ομάδες Εργασίας
          </button>
        </nav>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-2/3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:text-white sm:text-sm"
              placeholder={selectedView === 'staff' ? "Αναζήτηση υπαλλήλου..." : "Αναζήτηση ομάδας..."}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
        {selectedView === 'teams' && (
          <div className="w-full md:w-1/3">
            <select
              id="team-category"
              name="team-category"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onChange={(e) => setSelectedCategory(e.target.value as TeamCategory)}
              value={selectedCategory}
            >
              <option value="ALL">Όλες οι κατηγορίες</option>
              <option value="AUTO">Αυτοκίνητα</option>
              <option value="MOTO">Μοτοσυκλέτες</option>
              <option value="YACHT">Σκάφη</option>
              <option value="AVIATION">Αεροσκάφη</option>
            </select>
          </div>
        )}
      </div>

      {/* Add button section */}
      <div className="mb-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
          onClick={() => selectedView === 'staff' ? setShowStaffModal(true) : setShowTeamModal(true)}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {selectedView === 'staff' ? 'Νέος Υπάλληλος' : 'Νέα Ομάδα'}
        </button>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'staff' && (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
          {filteredStaff.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Υπάλληλος</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Επικοινωνία</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Θέση</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Στατιστικά</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bonus</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredStaff.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-700 dark:text-primary-200">
                            {employee.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <span>Από {employee.startDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <EnvelopeIcon className="h-4 w-4 mr-1" />
                            <span>{employee.email}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <PhoneIcon className="h-4 w-4 mr-1" />
                            <span>{employee.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {employee.position}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            <span>Ραντεβού: {employee.stats.appointments}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            <span>Ολοκληρωμένα: {employee.stats.completed}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <ChartBarIcon className="h-4 w-4 mr-1" />
                            <span>Πωλήσεις: {employee.stats.sales}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {/* Dummy bonus calculation based on stats */}
                          {(employee.stats.completed / employee.stats.appointments > 0.9) ? '+15%' : 
                           (employee.stats.completed / employee.stats.appointments > 0.8) ? '+10%' : 
                           (employee.stats.completed / employee.stats.appointments > 0.7) ? '+5%' : '+0%'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Του τρέχοντος μήνα
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
              Δεν βρέθηκαν υπάλληλοι με τα επιλεγμένα κριτήρια.
            </div>
          )}
        </div>
      )}

      {selectedView === 'teams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTeams.length > 0 ? (
            filteredTeams.map(team => (
              <div key={team.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{team.name}</h3>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Αξιολόγηση:</span>
                      <span className="ml-2 text-sm font-semibold text-yellow-500">{team.rating} / 5</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Μέλη</span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-5 w-5 text-primary-500" />
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">{team.leader} (Team Leader)</span>
                    </div>
                    {team.members.map((member, idx) => (
                      <div key={idx} className="flex items-center pl-2">
                        <span className="ml-5 text-sm text-gray-600 dark:text-gray-300">{member}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Στατιστικά Απόδοσης</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Ολοκληρωμένες Εργασίες</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{team.completedServices}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Ενεργές Εργασίες</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{team.activeServices}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Χρόνος Ολοκλήρωσης</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className={`text-lg font-semibold ${getCompletionTimeColor(team.averageCompletionTime)}`}>
                        {team.averageCompletionTime}%
                      </div>
                      <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {team.averageCompletionTime <= 95 ? 'Ταχύτερα από τον μέσο χρόνο' : 
                         team.averageCompletionTime <= 105 ? 'Κοντά στον μέσο χρόνο' : 
                         'Πιο αργά από τον μέσο χρόνο'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1">
                      {team.categories.map((category, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {category === 'AUTO' ? 'Αυτοκίνητα' : 
                           category === 'MOTO' ? 'Μοτοσυκλέτες' : 
                           category === 'YACHT' ? 'Σκάφη' : 'Αεροσκάφη'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 focus:outline-none"
                  >
                    Προβολή Λεπτομερειών
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 focus:outline-none"
                  >
                    <UserPlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                    Προσθήκη Μέλους
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center text-gray-500 dark:text-gray-400">
              Δεν βρέθηκαν ομάδες με τα επιλεγμένα κριτήρια.
            </div>
          )}
        </div>
      )}

      {/* Team Creation Modal - Would be implemented as a proper modal component */}
      {showTeamModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Δημιουργία Νέας Ομάδας</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setShowTeamModal(false)}
              >
                <span className="sr-only">Κλείσιμο</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="team-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Όνομα Ομάδας
                </label>
                <input
                  type="text"
                  id="team-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Όνομα Ομάδας"
                />
              </div>
              <div>
                <label htmlFor="team-leader" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Team Leader
                </label>
                <select
                  id="team-leader"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option>Επιλέξτε Team Leader</option>
                  {staff.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Κατηγορίες Εργασιών
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="auto-category"
                      name="auto-category"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="auto-category" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                      Αυτοκίνητα
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="moto-category"
                      name="moto-category"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="moto-category" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                      Μοτοσυκλέτες
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="yacht-category"
                      name="yacht-category"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="yacht-category" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                      Σκάφη
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="aviation-category"
                      name="aviation-category"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="aviation-category" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                      Αεροσκάφη
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                onClick={() => setShowTeamModal(false)}
              >
                Ακύρωση
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-primary-500 dark:hover:bg-primary-600"
                onClick={() => setShowTeamModal(false)}
              >
                Δημιουργία
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Creation Modal - Would be implemented as a proper modal component */}
      {showStaffModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Προσθήκη Νέου Υπαλλήλου</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setShowStaffModal(false)}
              >
                <span className="sr-only">Κλείσιμο</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="staff-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ονοματεπώνυμο
                </label>
                <input
                  type="text"
                  id="staff-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Ονοματεπώνυμο"
                />
              </div>
              <div>
                <label htmlFor="staff-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="staff-email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="staff-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Τηλέφωνο
                </label>
                <input
                  type="tel"
                  id="staff-phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Τηλέφωνο"
                />
              </div>
              <div>
                <label htmlFor="staff-position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Θέση
                </label>
                <select
                  id="staff-position"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option>Επιλέξτε Θέση</option>
                  <option value="TEAM_LEADER">Team Leader</option>
                  <option value="TECHNICIAN">Τεχνικός</option>
                  <option value="ASSISTANT">Βοηθός</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                onClick={() => setShowStaffModal(false)}
              >
                Ακύρωση
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-primary-500 dark:hover:bg-primary-600"
                onClick={() => setShowStaffModal(false)}
              >
                Προσθήκη
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}