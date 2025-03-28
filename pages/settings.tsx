import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useTheme } from '@/context/ThemeContext';
import { useNotification } from '@/context/NotificationContext';
import {
  UserIcon,
  BuildingOfficeIcon,
  BellIcon,
  CogIcon,
  LockClosedIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

type SettingsTabType = 'profile' | 'company' | 'notifications' | 'system' | 'security' | 'billing';

// Mock data for example purposes
const notificationSettings = {
  email: {
    newAppointment: true,
    appointmentReminder: true,
    appointmentCancellation: true,
    newReview: true,
    promotions: false
  },
  sms: {
    newAppointment: true,
    appointmentReminder: true,
    appointmentCancellation: true,
    newReview: false,
    promotions: false
  },
  push: {
    newAppointment: true,
    appointmentReminder: true,
    appointmentCancellation: true,
    newReview: true,
    promotions: false
  }
};

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { twilioConfig, setSmsConfig, clearSmsConfig, isSmsConfigured } = useNotification();
  
  const [activeTab, setActiveTab] = useState<SettingsTabType>('profile');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Γιώργος',
    lastName: 'Παπαδόπουλος',
    email: 'gpapadopoulos@example.com',
    phone: '6971234567',
    position: 'Διαχειριστής'
  });
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Ceramic Pro Detailing',
    address: 'Λεωφόρος Κηφισίας 125',
    city: 'Αθήνα',
    postalCode: '11524',
    phone: '2108888888',
    email: 'info@ceramicpro.gr',
    website: 'www.ceramicpro.gr',
    taxId: '123456789',
    logoPath: '/company-logo.png'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [twilioFormData, setTwilioFormData] = useState({
    accountSid: '',
    authToken: '',
    phoneNumber: ''
  });

  // Initialize Twilio form data from context
  useEffect(() => {
    if (twilioConfig) {
      setTwilioFormData({
        accountSid: twilioConfig.accountSid || '',
        authToken: twilioConfig.authToken || '',
        phoneNumber: twilioConfig.phoneNumber || ''
      });
    }
  }, [twilioConfig]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Navigate to tab
  const navigateToTab = (tab: SettingsTabType) => {
    setActiveTab(tab);
  };
  
  // Handle Twilio settings form submission
  const handleTwilioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Save the Twilio settings to context
    setSmsConfig({
      accountSid: twilioFormData.accountSid,
      authToken: twilioFormData.authToken,
      phoneNumber: twilioFormData.phoneNumber
    });
    
    // Show success message
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  // Clear Twilio settings
  const handleClearTwilioSettings = () => {
    clearSmsConfig();
    setTwilioFormData({
      accountSid: '',
      authToken: '',
      phoneNumber: ''
    });
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ρυθμίσεις</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Διαχειριστείτε το προφίλ σας, τις ειδοποιήσεις και τις ρυθμίσεις του συστήματος
        </p>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <button
              onClick={() => navigateToTab('profile')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              <UserIcon className="mr-3 h-5 w-5" aria-hidden="true" />
              Προσωπικό Προφίλ
            </button>

            <button
              onClick={() => navigateToTab('company')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'company'
                  ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              <BuildingOfficeIcon className="mr-3 h-5 w-5" aria-hidden="true" />
              Στοιχεία Επιχείρησης
            </button>

            <button
              onClick={() => navigateToTab('notifications')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              <BellIcon className="mr-3 h-5 w-5" aria-hidden="true" />
              Ειδοποιήσεις
            </button>

            <button
              onClick={() => navigateToTab('system')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'system'
                  ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              <CogIcon className="mr-3 h-5 w-5" aria-hidden="true" />
              Σύστημα
            </button>

            <button
              onClick={() => navigateToTab('security')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'security'
                  ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              <LockClosedIcon className="mr-3 h-5 w-5" aria-hidden="true" />
              Ασφάλεια
            </button>

            <button
              onClick={() => navigateToTab('billing')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'billing'
                  ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              <DocumentTextIcon className="mr-3 h-5 w-5" aria-hidden="true" />
              Τιμολόγηση
            </button>
          </nav>

          <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {personalInfo.position}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Προσωπικό Προφίλ</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserIcon className="h-10 w-10 text-gray-400" />
                      </div>
                      <div>
                        <button
                          type="button"
                          className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                          Αλλαγή Φωτογραφίας
                        </button>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          JPG, GIF ή PNG. Μέγιστο μέγεθος 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Όνομα
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={personalInfo.firstName}
                            onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Επώνυμο
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={personalInfo.lastName}
                            onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Τηλέφωνο
                        </label>
                        <div className="mt-1">
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            autoComplete="tel"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Θέση
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="position"
                            id="position"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={personalInfo.position}
                            onChange={(e) => setPersonalInfo({...personalInfo, position: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Ακύρωση
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-primary-500 dark:hover:bg-primary-600"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Αποθήκευση...' : 'Αποθήκευση'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Company Settings */}
            {activeTab === 'company' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Στοιχεία Επιχείρησης</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <BuildingOfficeIcon className="h-10 w-10 text-gray-400" />
                      </div>
                      <div>
                        <button
                          type="button"
                          className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                          Αλλαγή Λογότυπου
                        </button>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          JPG, GIF ή PNG. Μέγιστο μέγεθος 2MB. Προτεινόμενες διαστάσεις 300x300px.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Επωνυμία
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="company-name"
                            id="company-name"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={companyInfo.name}
                            onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Διεύθυνση
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="address"
                            id="address"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={companyInfo.address}
                            onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Πόλη
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={companyInfo.city}
                            onChange={(e) => setCompanyInfo({...companyInfo, city: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ταχυδρομικός Κώδικας
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={companyInfo.postalCode}
                            onChange={(e) => setCompanyInfo({...companyInfo, postalCode: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="company-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Τηλέφωνο Επιχείρησης
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PhoneIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="company-phone"
                            id="company-phone"
                            className="pl-10 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={companyInfo.phone}
                            onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="company-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Επιχείρησης
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="company-email"
                            id="company-email"
                            className="pl-10 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={companyInfo.email}
                            onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ιστοσελίδα
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            className="pl-10 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={companyInfo.website}
                            onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="tax-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          ΑΦΜ
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="tax-id"
                            id="tax-id"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={companyInfo.taxId}
                            onChange={(e) => setCompanyInfo({...companyInfo, taxId: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Ακύρωση
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-primary-500 dark:hover:bg-primary-600"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Αποθήκευση...' : 'Αποθήκευση'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ρυθμίσεις Ειδοποιήσεων</h2>
                
                {/* Ένδειξη επιτυχίας */}
                {saveSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-green-700">Οι ρυθμίσεις αποθηκεύτηκαν επιτυχώς!</span>
                  </div>
                )}
                
                {/* Ρυθμίσεις SMS (Twilio) */}
                <div className="mb-8 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <DevicePhoneMobileIcon className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    Ρυθμίσεις SMS (Twilio)
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Ρυθμίστε τα στοιχεία του Twilio για να στέλνετε SMS ειδοποιήσεις στους πελάτες σας.
                    </p>
                    <div className="flex items-center">
                      <div className={`${isSmsConfigured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} dark:bg-gray-800 px-2 py-1 rounded text-xs flex items-center`}>
                        {isSmsConfigured ? (
                          <>
                            <CheckIcon className="h-4 w-4 mr-1 text-green-500" />
                            <span>Ρυθμισμένο</span>
                          </>
                        ) : (
                          <>
                            <ExclamationTriangleIcon className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>Μη ρυθμισμένο</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleTwilioSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="account-sid" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Account SID
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="account-sid"
                          id="account-sid"
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          value={twilioFormData.accountSid}
                          onChange={(e) => setTwilioFormData({...twilioFormData, accountSid: e.target.value})}
                          placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="auth-token" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Auth Token
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="auth-token"
                          id="auth-token"
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          value={twilioFormData.authToken}
                          onChange={(e) => setTwilioFormData({...twilioFormData, authToken: e.target.value})}
                          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Αριθμός Τηλεφώνου Twilio
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          value={twilioFormData.phoneNumber}
                          onChange={(e) => setTwilioFormData({...twilioFormData, phoneNumber: e.target.value})}
                          placeholder="+1234567890"
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Συμπεριλάβετε τον κωδικό χώρας (π.χ. +30 για Ελλάδα)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        type="button"
                        onClick={handleClearTwilioSettings}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Καθαρισμός
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-primary-500 dark:hover:bg-primary-600"
                        disabled={isSaving}
                      >
                        {isSaving ? 'Αποθήκευση...' : 'Αποθήκευση'}
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Ειδοποιήσεις Email</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Νέο ραντεβού</span>
                        <button 
                          type="button"
                          className={`${
                            notificationSettings.email.newAppointment
                              ? 'bg-primary-600 dark:bg-primary-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        >
                          <span className={`${
                            notificationSettings.email.newAppointment
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Υπενθύμιση ραντεβού</span>
                        <button 
                          type="button"
                          className={`${
                            notificationSettings.email.appointmentReminder
                              ? 'bg-primary-600 dark:bg-primary-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        >
                          <span className={`${
                            notificationSettings.email.appointmentReminder
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Ακύρωση ραντεβού</span>
                        <button 
                          type="button"
                          className={`${
                            notificationSettings.email.appointmentCancellation
                              ? 'bg-primary-600 dark:bg-primary-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        >
                          <span className={`${
                            notificationSettings.email.appointmentCancellation
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Νέα αξιολόγηση</span>
                        <button 
                          type="button"
                          className={`${
                            notificationSettings.email.newReview
                              ? 'bg-primary-600 dark:bg-primary-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        >
                          <span className={`${
                            notificationSettings.email.newReview
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Προωθητικά μηνύματα</span>
                        <button 
                          type="button"
                          className={`${
                            notificationSettings.email.promotions
                              ? 'bg-primary-600 dark:bg-primary-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        >
                          <span className={`${
                            notificationSettings.email.promotions
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Ειδοποιήσεις SMS</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Νέο ραντεβού</span>
                        <button 
                          type="button"
                          className={`${
                            notificationSettings.sms.newAppointment
                              ? 'bg-primary-600 dark:bg-primary-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        >
                          <span className={`${
                            notificationSettings.sms.newAppointment
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Υπενθύμιση ραντεβού</span>
                        <button 
                          type="button"
                          className={`${
                            notificationSettings.sms.appointmentReminder
                              ? 'bg-primary-600 dark:bg-primary-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        >
                          <span className={`${
                            notificationSettings.sms.appointmentReminder
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Ακύρωση ραντεβού</span>
                        <button 
                          type="button"
                          className={`${
                            notificationSettings.sms.appointmentCancellation
                              ? 'bg-primary-600 dark:bg-primary-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        >
                          <span className={`${
                            notificationSettings.sms.appointmentCancellation
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Επαναφορά
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-primary-500 dark:hover:bg-primary-600"
                    onClick={handleSubmit}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Αποθήκευση...' : 'Αποθήκευση'}
                  </button>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ρυθμίσεις Συστήματος</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Γενικές Ρυθμίσεις</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Θέμα Εφαρμογής</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Επιλέξτε ανάμεσα σε φωτεινό ή σκοτεινό θέμα</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            {theme === 'light' ? (
                              <MoonIcon className="h-5 w-5" />
                            ) : (
                              <SunIcon className="h-5 w-5" />
                            )}
                          </button>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {theme === 'light' ? 'Φωτεινό' : 'Σκοτεινό'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Γλώσσα</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Επιλέξτε τη γλώσσα της εφαρμογής</p>
                        </div>
                        <select className="rounded-md shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <option value="el">Ελληνικά</option>
                          <option value="en">English</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Ζώνη Ώρας</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Επιλέξτε την τοπική ζώνη ώρας</p>
                        </div>
                        <select className="rounded-md shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <option value="Europe/Athens">Europe/Athens (GMT+3)</option>
                          <option value="Europe/London">Europe/London (GMT+1)</option>
                          <option value="America/New_York">America/New_York (GMT-4)</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Αυτόματη αποσύνδεση</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Χρόνος αδράνειας πριν την αυτόματη αποσύνδεση</p>
                        </div>
                        <select className="rounded-md shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <option value="30">30 λεπτά</option>
                          <option value="60">1 ώρα</option>
                          <option value="120">2 ώρες</option>
                          <option value="never">Ποτέ</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Ρυθμίσεις Συνεδριών</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Διάρκεια προεπιλεγμένης συνεδρίας</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Προεπιλεγμένος χρόνος για νέα ραντεβού</p>
                        </div>
                        <select className="rounded-md shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <option value="30">30 λεπτά</option>
                          <option value="60">1 ώρα</option>
                          <option value="90">1 ώρα και 30 λεπτά</option>
                          <option value="120">2 ώρες</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Υπενθύμιση ραντεβού</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Πόσο πριν το ραντεβού θα σταλεί η υπενθύμιση</p>
                        </div>
                        <select className="rounded-md shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <option value="1h">1 ώρα πριν</option>
                          <option value="3h">3 ώρες πριν</option>
                          <option value="6h">6 ώρες πριν</option>
                          <option value="24h">1 ημέρα πριν</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Ενσωμάτωση Υπηρεσιών</h3>
                    <div className="mt-2 space-y-3">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Twilio SMS</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Ρυθμίσεις για αποστολή SMS</p>
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
                          >
                            Διαμόρφωση
                          </button>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google Calendar</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Συγχρονισμός ραντεβού με Google Calendar</p>
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
                          >
                            Σύνδεση
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Επαναφορά
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-primary-500 dark:hover:bg-primary-600"
                    onClick={handleSubmit}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Αποθήκευση...' : 'Αποθήκευση'}
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ρυθμίσεις Ασφαλείας</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Αλλαγή Κωδικού Πρόσβασης</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Τρέχων Κωδικός
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Νέος Κωδικός
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Ο κωδικός πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες και να συνδυάζει γράμματα, αριθμούς και σύμβολα.
                        </p>
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Επιβεβαίωση Νέου Κωδικού
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-primary-500 dark:hover:bg-primary-600"
                        >
                          Αλλαγή Κωδικού
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Έλεγχος Ταυτότητας Δύο Παραγόντων</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Ενισχύστε την ασφάλεια του λογαριασμού σας με επαλήθευση δύο παραγόντων
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Προσθέστε ένα επιπλέον επίπεδο ασφάλειας στο λογαριασμό σας
                        </p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                      >
                        Ρύθμιση
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Ιστορικό Συνδέσεων</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Δείτε το ιστορικό των συνδέσεων στο λογαριασμό σας
                      </p>
                      <ul className="mt-3 space-y-3">
                        <li className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Αθήνα, Ελλάδα (Αυτή η συσκευή)</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Chrome σε Windows • 192.168.1.1 • 28 Μαρτίου 2025, 10:15
                              </p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              <CheckIcon className="-ml-0.5 mr-1.5 h-3 w-3" aria-hidden="true" />
                              Ενεργή
                            </span>
                          </div>
                        </li>
                        <li className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Αθήνα, Ελλάδα</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Safari σε iPhone • 192.168.1.5 • 27 Μαρτίου 2025, 18:30
                              </p>
                            </div>
                            <button
                              type="button"
                              className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Τερματισμός
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Διαγραφή Λογαριασμού</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Διαγράψτε μόνιμα τον λογαριασμό σας και όλα τα δεδομένα
                        </p>
                        <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">
                          Αυτή η ενέργεια είναι μη αναστρέψιμη
                        </p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none dark:bg-red-900 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-800"
                      >
                        <TrashIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
                        Διαγραφή
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Στοιχεία Τιμολόγησης</h2>
                
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Τρέχον Πακέτο</h3>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-base font-medium text-gray-900 dark:text-white">Professional Plan</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          79,99€ / μήνα
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Επόμενη χρέωση: 15 Απριλίου 2025
                        </p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-primary-300 shadow-sm text-xs font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 focus:outline-none dark:bg-primary-900 dark:border-primary-800 dark:text-primary-300 dark:hover:bg-primary-800"
                      >
                        Αλλαγή Πακέτου
                      </button>
                    </div>
                    <ul className="mt-3 space-y-1">
                      <li className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                        <CheckIcon className="h-3 w-3 text-green-500 mr-1.5" />
                        Απεριόριστοι πελάτες
                      </li>
                      <li className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                        <CheckIcon className="h-3 w-3 text-green-500 mr-1.5" />
                        Απεριόριστα ραντεβού
                      </li>
                      <li className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                        <CheckIcon className="h-3 w-3 text-green-500 mr-1.5" />
                        Ειδοποιήσεις SMS και email
                      </li>
                      <li className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                        <CheckIcon className="h-3 w-3 text-green-500 mr-1.5" />
                        Online booking
                      </li>
                      <li className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                        <CheckIcon className="h-3 w-3 text-green-500 mr-1.5" />
                        Προηγμένα στατιστικά και αναφορές
                      </li>
                    </ul>
                  </div>
                  
                  {/* Payment Methods */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Μέθοδοι Πληρωμής</h3>
                      <button
                        type="button"
                        className="inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        + Προσθήκη νέας κάρτας
                      </button>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded mr-3 flex items-center justify-center text-xs font-medium">VISA</div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Λήξη: 12/26</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Προεπιλογή
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Billing History */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Ιστορικό Τιμολόγησης</h3>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-md">
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="px-4 py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Μάρτιος 2025</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Professional Plan - Μηνιαία συνδρομή</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">79,99€</span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Πληρώθηκε
                              </span>
                              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </li>
                        <li className="px-4 py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Φεβρουάριος 2025</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Professional Plan - Μηνιαία συνδρομή</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">79,99€</span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Πληρώθηκε
                              </span>
                              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </li>
                        <li className="px-4 py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Ιανουάριος 2025</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Basic Plan - Μηνιαία συνδρομή</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">49,99€</span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Πληρώθηκε
                              </span>
                              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Notification for successful save */}
          {saveSuccess && (
            <div className="mt-4 rounded-md bg-green-50 dark:bg-green-900 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Οι αλλαγές αποθηκεύτηκαν με επιτυχία
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}