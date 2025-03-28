import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  DocumentTextIcon, 
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

// Define invoice mock data types
type InvoiceStatus = 'PAID' | 'PENDING' | 'OVERDUE' | 'DRAFT';
type InvoiceType = 'RECEIPT' | 'INVOICE';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  taxRate: number;
}

interface Invoice {
  id: number;
  number: string;
  customerId: number;
  customerName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  status: InvoiceStatus;
  type: InvoiceType;
  notes?: string;
}

// Mock data for invoices
const mockInvoices: Invoice[] = [
  {
    id: 1,
    number: 'INV-2025-001',
    customerId: 1,
    customerName: 'Γιώργος Παπαδόπουλος',
    date: '2025-03-15',
    dueDate: '2025-04-15',
    items: [
      {
        description: 'Ceramic Pro 9H',
        quantity: 1,
        unitPrice: 450,
        total: 450,
        taxRate: 24
      },
      {
        description: 'Καθαρισμός Εσωτερικού',
        quantity: 1,
        unitPrice: 80,
        total: 80,
        taxRate: 24
      }
    ],
    subtotal: 530,
    taxTotal: 127.2,
    total: 657.2,
    status: 'PAID',
    type: 'INVOICE'
  },
  {
    id: 2,
    number: 'INV-2025-002',
    customerId: 2,
    customerName: 'Μαρία Κωνσταντίνου',
    date: '2025-03-10',
    dueDate: '2025-04-10',
    items: [
      {
        description: 'Light/Bronze Package',
        quantity: 1,
        unitPrice: 250,
        total: 250,
        taxRate: 24
      }
    ],
    subtotal: 250,
    taxTotal: 60,
    total: 310,
    status: 'PENDING',
    type: 'INVOICE'
  },
  {
    id: 3,
    number: 'REC-2025-001',
    customerId: 3,
    customerName: 'Νίκος Αντωνίου',
    date: '2025-03-05',
    dueDate: '2025-03-05',
    items: [
      {
        description: 'Ceramic Pro για μοτοσυκλέτα',
        quantity: 1,
        unitPrice: 200,
        total: 200,
        taxRate: 24
      }
    ],
    subtotal: 200,
    taxTotal: 48,
    total: 248,
    status: 'PAID',
    type: 'RECEIPT'
  },
  {
    id: 4,
    number: 'INV-2025-003',
    customerId: 4,
    customerName: 'Αντώνης Δημητρίου',
    date: '2025-03-01',
    dueDate: '2025-04-01',
    items: [
      {
        description: 'Gold Package',
        quantity: 1,
        unitPrice: 650,
        total: 650,
        taxRate: 24
      },
      {
        description: 'Πλύσιμο Εξωτερικό',
        quantity: 1,
        unitPrice: 50,
        total: 50,
        taxRate: 24
      }
    ],
    subtotal: 700,
    taxTotal: 168,
    total: 868,
    status: 'OVERDUE',
    type: 'INVOICE'
  },
  {
    id: 5,
    number: 'INV-2025-004',
    customerId: 5,
    customerName: 'Σοφία Παπαδοπούλου',
    date: '2025-02-25',
    dueDate: '2025-03-25',
    items: [
      {
        description: 'Πλήρης περιποίηση σκάφους',
        quantity: 1,
        unitPrice: 1200,
        total: 1200,
        taxRate: 24
      }
    ],
    subtotal: 1200,
    taxTotal: 288,
    total: 1488,
    status: 'PAID',
    type: 'INVOICE'
  },
  {
    id: 6,
    number: 'DRAFT-2025-001',
    customerId: 2,
    customerName: 'Μαρία Κωνσταντίνου',
    date: '2025-03-20',
    dueDate: '2025-04-20',
    items: [
      {
        description: 'Gold Package',
        quantity: 1,
        unitPrice: 650,
        total: 650,
        taxRate: 24
      }
    ],
    subtotal: 650,
    taxTotal: 156,
    total: 806,
    status: 'DRAFT',
    type: 'INVOICE',
    notes: 'Πρόχειρο τιμολόγιο - προς επιβεβαίωση'
  }
];

export default function Invoices() {
  const { customers, sales } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | InvoiceType>('all');
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter invoices based on search term, status, and type
  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesType = typeFilter === 'all' || invoice.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Toggle invoice details
  const toggleInvoiceDetails = (invoiceId: number) => {
    if (showDetails === invoiceId) {
      setShowDetails(null);
    } else {
      setShowDetails(invoiceId);
    }
  };

  // Get status badge styling
  const getStatusBadgeClass = (status: InvoiceStatus) => {
    switch(status) {
      case 'PAID':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Get status info with icon and text
  const getStatusInfo = (status: InvoiceStatus) => {
    switch(status) {
      case 'PAID':
        return { text: 'Εξοφλημένο', icon: <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" /> };
      case 'PENDING':
        return { text: 'Σε εκκρεμότητα', icon: <ClockIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" /> };
      case 'OVERDUE':
        return { text: 'Ληξιπρόθεσμο', icon: <ExclamationCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" /> };
      case 'DRAFT':
        return { text: 'Πρόχειρο', icon: <DocumentTextIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" /> };
      default:
        return { text: status, icon: <DocumentTextIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" /> };
    }
  };

  // Format date to display in Greek format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('el-GR');
  };

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Διαχείριση Τιμολογίων</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Δημιουργία, αποστολή και παρακολούθηση τιμολογίων και αποδείξεων
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Συνολικά Τιμολόγια</p>
              <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">{mockInvoices.length}</p>
            </div>
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-md">
              <DocumentTextIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Εξοφλημένα</p>
              <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                {mockInvoices.filter(inv => inv.status === 'PAID').length}
              </p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md">
              <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Σε Εκκρεμότητα</p>
              <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                {mockInvoices.filter(inv => inv.status === 'PENDING').length}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-md">
              <ClockIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ληξιπρόθεσμα</p>
              <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                {mockInvoices.filter(inv => inv.status === 'OVERDUE').length}
              </p>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-md">
              <ExclamationCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-2/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:text-white sm:text-sm"
              placeholder="Αναζήτηση αριθμού ή πελάτη..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <select
            id="status-filter"
            name="status-filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setStatusFilter(e.target.value as 'all' | InvoiceStatus)}
            value={statusFilter}
          >
            <option value="all">Όλες οι καταστάσεις</option>
            <option value="PAID">Εξοφλημένα</option>
            <option value="PENDING">Σε εκκρεμότητα</option>
            <option value="OVERDUE">Ληξιπρόθεσμα</option>
            <option value="DRAFT">Πρόχειρα</option>
          </select>
        </div>
        <div className="w-full md:w-1/4">
          <select
            id="type-filter"
            name="type-filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setTypeFilter(e.target.value as 'all' | InvoiceType)}
            value={typeFilter}
          >
            <option value="all">Όλοι οι τύποι</option>
            <option value="INVOICE">Τιμολόγια</option>
            <option value="RECEIPT">Αποδείξεις</option>
          </select>
        </div>
      </div>

      {/* Create invoice button */}
      <div className="mb-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Νέο Τιμολόγιο
        </button>
      </div>

      {/* Invoices list */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Αριθμός</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Πελάτης</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ημερομηνία</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Κατάσταση</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Σύνολο</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <React.Fragment key={invoice.id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{invoice.customerName}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">ID: {invoice.customerId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="h-5 w-5 mr-1 text-gray-400" />
                          <span>{formatDate(invoice.date)}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Λήξη: {formatDate(invoice.dueDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusInfo(invoice.status).icon}
                          <span className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}>
                            {getStatusInfo(invoice.status).text}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {invoice.type === 'INVOICE' ? 'Τιμολόγιο' : 'Απόδειξη'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{invoice.total.toFixed(2)} €</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Φ.Π.Α.: {invoice.taxTotal.toFixed(2)} €</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-300"
                            onClick={() => toggleInvoiceDetails(invoice.id)}
                          >
                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-300"
                          >
                            <PrinterIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-300"
                          >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-300"
                          >
                            <EnvelopeIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {showDetails === invoice.id && (
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Αναλυτικά Στοιχεία Τιμολογίου</div>
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead>
                              <tr>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Περιγραφή</th>
                                <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Ποσότητα</th>
                                <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Τιμή Μονάδας</th>
                                <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Φ.Π.Α.</th>
                                <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Σύνολο</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                              {invoice.items.map((item, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{item.description}</td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-900 dark:text-white">{item.quantity}</td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-900 dark:text-white">{item.unitPrice.toFixed(2)} €</td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-900 dark:text-white">{item.taxRate}%</td>
                                  <td className="px-4 py-2 text-sm text-right font-medium text-gray-900 dark:text-white">{item.total.toFixed(2)} €</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan={4} className="px-4 py-2 text-sm font-medium text-right text-gray-900 dark:text-white">Υποσύνολο:</td>
                                <td className="px-4 py-2 text-sm text-right font-medium text-gray-900 dark:text-white">{invoice.subtotal.toFixed(2)} €</td>
                              </tr>
                              <tr>
                                <td colSpan={4} className="px-4 py-2 text-sm font-medium text-right text-gray-900 dark:text-white">Φ.Π.Α. (24%):</td>
                                <td className="px-4 py-2 text-sm text-right font-medium text-gray-900 dark:text-white">{invoice.taxTotal.toFixed(2)} €</td>
                              </tr>
                              <tr>
                                <td colSpan={4} className="px-4 py-2 text-sm font-bold text-right text-gray-900 dark:text-white">Σύνολο:</td>
                                <td className="px-4 py-2 text-sm text-right font-bold text-gray-900 dark:text-white">{invoice.total.toFixed(2)} €</td>
                              </tr>
                            </tfoot>
                          </table>
                          {invoice.notes && (
                            <div className="mt-4 px-4 py-3 bg-gray-100 dark:bg-gray-600 rounded">
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-300">Σημειώσεις:</div>
                              <div className="mt-1 text-sm text-gray-900 dark:text-white">{invoice.notes}</div>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Δεν βρέθηκαν τιμολόγια με τα επιλεγμένα κριτήρια.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create invoice modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Δημιουργία Νέου Τιμολογίου</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setShowCreateModal(false)}
              >
                <span className="sr-only">Κλείσιμο</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="invoice-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Τύπος *
                  </label>
                  <select
                    id="invoice-type"
                    name="invoice-type"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="INVOICE">Τιμολόγιο</option>
                    <option value="RECEIPT">Απόδειξη</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="invoice-customer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Πελάτης *
                  </label>
                  <select
                    id="invoice-customer"
                    name="invoice-customer"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Επιλέξτε πελάτη</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="invoice-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ημερομηνία *
                  </label>
                  <input
                    type="date"
                    id="invoice-date"
                    name="invoice-date"
                    required
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="invoice-due-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ημερομηνία Λήξης *
                  </label>
                  <input
                    type="date"
                    id="invoice-due-date"
                    name="invoice-due-date"
                    required
                    defaultValue={(() => {
                      const dueDate = new Date();
                      dueDate.setMonth(dueDate.getMonth() + 1);
                      return dueDate.toISOString().split('T')[0];
                    })()}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Στοιχεία Τιμολογίου *
                  </label>
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 focus:outline-none"
                  >
                    <PlusIcon className="-ml-0.5 mr-1 h-4 w-4" />
                    Προσθήκη
                  </button>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md space-y-3">
                  {/* Item row */}
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Περιγραφή"
                        className="block w-full px-3 py-2 text-sm border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        defaultValue="1"
                        min="1"
                        placeholder="Ποσότητα"
                        className="block w-full px-3 py-2 text-sm border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">€</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <select className="block w-full px-3 py-2 text-sm border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white">
                        <option value="24">Φ.Π.Α. 24%</option>
                        <option value="13">Φ.Π.Α. 13%</option>
                        <option value="6">Φ.Π.Α. 6%</option>
                        <option value="0">Φ.Π.Α. 0%</option>
                      </select>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="invoice-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Σημειώσεις
                </label>
                <textarea
                  id="invoice-notes"
                  name="invoice-notes"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Προσθέστε τυχόν σημειώσεις ή λεπτομέρειες..."
                />
              </div>
              
              <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Σύνολο:</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">0.00 €</div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                  onClick={() => setShowCreateModal(false)}
                >
                  Ακύρωση
                </button>
                <button
                  type="button"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"
                >
                  Αποθήκευση ως Πρόχειρο
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Έκδοση Τιμολογίου
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}