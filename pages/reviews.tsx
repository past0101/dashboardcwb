import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { StarIcon, ChevronDownIcon, CheckCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Mock data for reviews
const customerReviews = [
  {
    id: 1,
    customerName: 'Γιώργος Παπαδόπουλος',
    customerImage: null,
    rating: 5,
    date: '15/03/2025',
    comment: 'Εξαιρετική δουλειά! Το αυτοκίνητό μου λάμπει και η επικάλυψη ceramic διαφαίνεται εξαιρετική. Πολύ επαγγελματική ομάδα και άριστη εξυπηρέτηση.',
    service: 'Ceramic Pro 9H',
    vehicleType: 'AUTO',
    response: 'Σας ευχαριστούμε πολύ για τα καλά σας λόγια! Είμαστε χαρούμενοι που μείνατε ικανοποιημένος από τις υπηρεσίες μας.'
  },
  {
    id: 2,
    customerName: 'Μαρία Κωνσταντίνου',
    customerImage: null,
    rating: 4,
    date: '10/03/2025',
    comment: 'Πολύ καλή δουλειά και εξυπηρέτηση. Το μόνο μειονέκτημα ήταν η μικρή καθυστέρηση στο ραντεβού. Κατά τα άλλα, είμαι πολύ ευχαριστημένη από το αποτέλεσμα.',
    service: 'Light/Bronze Package',
    vehicleType: 'AUTO',
    response: null
  },
  {
    id: 3,
    customerName: 'Νίκος Αντωνίου',
    customerImage: null,
    rating: 5,
    date: '05/03/2025',
    comment: 'Απίστευτη εμπειρία! Η μοτοσυκλέτα μου έλαμψε ξανά χάρη στην εξαιρετική δουλειά που έκαναν. Θα το συνιστούσα ανεπιφύλακτα.',
    service: 'Ceramic Pro για μοτοσυκλέτα',
    vehicleType: 'MOTO',
    response: null
  },
  {
    id: 4,
    customerName: 'Αντώνης Δημητρίου',
    customerImage: null,
    rating: 3,
    date: '01/03/2025',
    comment: 'Καλή δουλειά αλλά αρκετά ακριβή υπηρεσία. Το αποτέλεσμα είναι ικανοποιητικό αλλά πιστεύω ότι υπάρχουν πιο οικονομικές επιλογές με παρόμοια ποιότητα.',
    service: 'Gold Package',
    vehicleType: 'AUTO',
    response: 'Σας ευχαριστούμε για την αξιολόγησή σας. Προσπαθούμε πάντα να προσφέρουμε την καλύτερη δυνατή ποιότητα στις υπηρεσίες μας. Θα χαρούμε να συζητήσουμε μαζί σας πιο οικονομικές επιλογές που θα μπορούσαν να καλύψουν τις ανάγκες σας.'
  },
  {
    id: 5,
    customerName: 'Σοφία Παπαδοπούλου',
    customerImage: null,
    rating: 5,
    date: '25/02/2025',
    comment: 'Άψογη εξυπηρέτηση από την αρχή μέχρι το τέλος. Με ενημέρωναν συνεχώς για την πρόοδο των εργασιών και το αποτέλεσμα ήταν εντυπωσιακό!',
    service: 'Πλήρης περιποίηση σκάφους',
    vehicleType: 'YACHT',
    response: 'Ευχαριστούμε πολύ για την εμπιστοσύνη και τα καλά σας λόγια! Είμαστε στη διάθεσή σας για οποιαδήποτε μελλοντική ανάγκη.'
  }
];

// Mock data for team evaluations
const teamEvaluations = [
  {
    id: 1,
    teamLeader: 'Δημήτρης Αναστασίου',
    members: ['Γιάννης Παππάς', 'Μιχάλης Νικολάου'],
    serviceCompleted: 'Ceramic Pro 9H',
    vehicleType: 'AUTO',
    date: '15/03/2025',
    completionTime: '3.5 ώρες',
    averageTime: '4 ώρες',
    efficiency: 112.5,
    quality: 95,
    customerSatisfaction: 5,
    notes: 'Εξαιρετική δουλειά από την ομάδα. Ολοκλήρωσαν το έργο νωρίτερα από το αναμενόμενο με εξαιρετική ποιότητα.'
  },
  {
    id: 2,
    teamLeader: 'Αλέξανδρος Παπαδόπουλος',
    members: ['Κώστας Κωνσταντίνου', 'Στέλιος Παππάς'],
    serviceCompleted: 'Gold Package',
    vehicleType: 'AUTO',
    date: '10/03/2025',
    completionTime: '6.2 ώρες',
    averageTime: '6 ώρες',
    efficiency: 96.8,
    quality: 90,
    customerSatisfaction: 3,
    notes: 'Καλή δουλειά, αλλά υπήρξαν κάποια ζητήματα με το φινίρισμα που χρειάστηκαν επιπλέον χρόνο για διορθώσεις.'
  },
  {
    id: 3,
    teamLeader: 'Γιώργος Κωνσταντίνου',
    members: ['Νίκος Παναγιώτου'],
    serviceCompleted: 'Ceramic Pro για μοτοσυκλέτα',
    vehicleType: 'MOTO',
    date: '05/03/2025',
    completionTime: '1.8 ώρες',
    averageTime: '2 ώρες',
    efficiency: 110,
    quality: 98,
    customerSatisfaction: 5,
    notes: 'Άριστη δουλειά με εξαιρετικό φινίρισμα. Ο πελάτης έμεινε πολύ ικανοποιημένος.'
  },
  {
    id: 4,
    teamLeader: 'Αντώνης Παυλίδης',
    members: ['Γιάννης Αντωνίου', 'Μάριος Δημητρίου'],
    serviceCompleted: 'Πλήρης περιποίηση σκάφους',
    vehicleType: 'YACHT',
    date: '25/02/2025',
    completionTime: '8 ώρες',
    averageTime: '8.5 ώρες',
    efficiency: 106.25,
    quality: 97,
    customerSatisfaction: 5,
    notes: 'Πολύ καλή δουλειά και επικοινωνία με τον πελάτη καθ\' όλη τη διάρκεια της εργασίας.'
  }
];

export default function Reviews() {
  const [activeTab, setActiveTab] = useState<'customers' | 'teams'>('customers');
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterVehicleType, setFilterVehicleType] = useState<string | null>(null);

  // Filter customer reviews
  const filteredCustomerReviews = customerReviews.filter(review => {
    if (filterRating !== null && review.rating !== filterRating) return false;
    if (filterVehicleType !== null && review.vehicleType !== filterVehicleType) return false;
    return true;
  });

  // Filter team evaluations
  const filteredTeamEvaluations = teamEvaluations.filter(evaluation => {
    if (filterVehicleType !== null && evaluation.vehicleType !== filterVehicleType) return false;
    return true;
  });

  const handleReplySubmit = (reviewId: number) => {
    // Here would be the actual logic to submit the reply
    console.log(`Replying to review ${reviewId}: ${replyContent}`);
    setReplyingTo(null);
    setReplyContent('');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < rating ? (
              <StarIconSolid className="h-5 w-5 text-yellow-400" />
            ) : (
              <StarIcon className="h-5 w-5 text-gray-300 dark:text-gray-600" />
            )}
          </span>
        ))}
      </div>
    );
  };

  const getVehicleTypeText = (type: string) => {
    switch(type) {
      case 'AUTO':
        return 'Αυτοκίνητο';
      case 'MOTO':
        return 'Μοτοσυκλέτα';
      case 'YACHT':
        return 'Σκάφος';
      case 'AVIATION':
        return 'Αεροσκάφος';
      default:
        return type;
    }
  };

  const getVehicleIcon = (type: string) => {
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

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 105) return 'text-green-600 dark:text-green-400';
    if (efficiency >= 95) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Αξιολογήσεις</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Διαχειριστείτε αξιολογήσεις πελατών και αξιολογήσεις ομάδων εργασίας
        </p>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'customers'
                ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Αξιολογήσεις Πελατών
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'teams'
                ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Αξιολογήσεις Ομάδων
          </button>
        </nav>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="filter-vehicle-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Τύπος Οχήματος
          </label>
          <select
            id="filter-vehicle-type"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={filterVehicleType || ''}
            onChange={(e) => setFilterVehicleType(e.target.value || null)}
          >
            <option value="">Όλοι οι τύποι</option>
            <option value="AUTO">Αυτοκίνητα</option>
            <option value="MOTO">Μοτοσυκλέτες</option>
            <option value="YACHT">Σκάφη</option>
            <option value="AVIATION">Αεροσκάφη</option>
          </select>
        </div>
        
        {activeTab === 'customers' && (
          <div>
            <label htmlFor="filter-rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Αξιολόγηση
            </label>
            <select
              id="filter-rating"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">Όλες οι αξιολογήσεις</option>
              <option value="5">5 αστέρια</option>
              <option value="4">4 αστέρια</option>
              <option value="3">3 αστέρια</option>
              <option value="2">2 αστέρια</option>
              <option value="1">1 αστέρι</option>
            </select>
          </div>
        )}
      </div>

      {/* Customer reviews content */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          {filteredCustomerReviews.length > 0 ? (
            filteredCustomerReviews.map(review => (
              <div key={review.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{review.customerName}</h3>
                        <div className="mt-1 flex items-center">
                          {renderStars(review.rating)}
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{getVehicleIcon(review.vehicleType)}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{getVehicleTypeText(review.vehicleType)}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">Υπηρεσία:</span> {review.service}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                  </div>
                  {review.response && (
                    <div className="mt-4 pl-4 border-l-4 border-primary-200 dark:border-primary-800">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Απάντηση από την επιχείρηση:</div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{review.response}</p>
                    </div>
                  )}
                  {!review.response && (
                    <div className="mt-4">
                      {replyingTo === review.id ? (
                        <div>
                          <textarea
                            rows={3}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                            placeholder="Γράψτε την απάντησή σας..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                          />
                          <div className="mt-2 flex justify-end space-x-2">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                              onClick={() => setReplyingTo(null)}
                            >
                              Ακύρωση
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-primary-500 dark:hover:bg-primary-600"
                              onClick={() => handleReplySubmit(review.id)}
                            >
                              Απάντηση
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                          onClick={() => setReplyingTo(review.id)}
                        >
                          Απάντηση στην αξιολόγηση
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center text-gray-500 dark:text-gray-400">
              Δεν βρέθηκαν αξιολογήσεις με τα επιλεγμένα κριτήρια.
            </div>
          )}
        </div>
      )}

      {/* Team evaluations content */}
      {activeTab === 'teams' && (
        <div className="space-y-4">
          {filteredTeamEvaluations.length > 0 ? (
            filteredTeamEvaluations.map(evaluation => (
              <div key={evaluation.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ομάδα: {evaluation.teamLeader} (Team Leader)</h3>
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Μέλη: {evaluation.members.join(', ')}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{getVehicleIcon(evaluation.vehicleType)}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{getVehicleTypeText(evaluation.vehicleType)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Υπηρεσία</div>
                      <div className="mt-1 text-sm text-gray-900 dark:text-white">{evaluation.serviceCompleted}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Ημερομηνία</div>
                      <div className="mt-1 text-sm text-gray-900 dark:text-white">{evaluation.date}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Ικανοποίηση Πελάτη</div>
                      <div className="mt-1 flex">
                        {renderStars(evaluation.customerSatisfaction)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Χρόνος Ολοκλήρωσης</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{evaluation.completionTime}</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Μέσος χρόνος: {evaluation.averageTime}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Απόδοση</div>
                      <div className={`mt-1 text-lg font-semibold ${getEfficiencyColor(evaluation.efficiency)}`}>
                        {evaluation.efficiency}%
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {evaluation.efficiency >= 100 ? 'Υψηλότερη από τον μέσο όρο' : 'Χαμηλότερη από τον μέσο όρο'}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Ποιότητα Εργασίας</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{evaluation.quality}%</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Βασισμένη στην αξιολόγηση του team leader
                      </div>
                    </div>
                  </div>
                  
                  {evaluation.notes && (
                    <div className="mt-6">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Σημειώσεις</div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{evaluation.notes}</p>
                    </div>
                  )}

                  {/* Bonus calculation */}
                  <div className="mt-6 bg-primary-50 dark:bg-primary-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-primary-700 dark:text-primary-300">Υπολογισμός Bonus</div>
                      <div className="text-lg font-bold text-primary-700 dark:text-primary-300">
                        {evaluation.efficiency >= 105 ? '+15%' : 
                         evaluation.efficiency >= 100 ? '+10%' : 
                         evaluation.efficiency >= 95 ? '+5%' : '0%'} από τον βασικό μισθό
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-primary-600 dark:text-primary-400">
                      {evaluation.efficiency >= 105 ? 
                        'Εξαιρετική απόδοση με σημαντικά ταχύτερο χρόνο ολοκλήρωσης από τον μέσο όρο' : 
                        evaluation.efficiency >= 100 ? 
                        'Πολύ καλή απόδοση με ταχύτερο χρόνο ολοκλήρωσης από τον μέσο όρο' : 
                        evaluation.efficiency >= 95 ? 
                        'Καλή απόδοση κοντά στον μέσο χρόνο ολοκλήρωσης' : 
                        'Χαμηλότερη απόδοση από τον αναμενόμενο μέσο χρόνο'}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center text-gray-500 dark:text-gray-400">
              Δεν βρέθηκαν αξιολογήσεις ομάδων με τα επιλεγμένα κριτήρια.
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}