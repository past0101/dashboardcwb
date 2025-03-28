import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { settings, updateSettings } = useData();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('business');
  const [formData, setFormData] = useState({
    businessInfo: { ...settings.businessInfo },
    businessHours: { ...settings.businessHours },
    notifications: { ...settings.notifications }
  });
  const [users, setUsers] = useState([
    { id: '1', name: 'Διαχειριστής', email: 'admin@example.com', role: 'admin' },
    { id: '2', name: 'Χρήστης', email: 'user@example.com', role: 'user' }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setFormData({
      ...formData,
      businessHours: {
        ...formData.businessHours,
        [day]: {
          ...formData.businessHours[day],
          [field]: value
        }
      }
    });
  };

  const handleNotificationChange = (field, value) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [field]: value
      }
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate business info
    if (activeTab === 'business') {
      if (!formData.businessInfo.name) errors.name = 'Το όνομα είναι υποχρεωτικό';
      if (!formData.businessInfo.address) errors.address = 'Η διεύθυνση είναι υποχρεωτική';
      if (!formData.businessInfo.phone) errors.phone = 'Το τηλέφωνο είναι υποχρεωτικό';
      if (!formData.businessInfo.email) errors.email = 'Το email είναι υποχρεωτικό';
      if (formData.businessInfo.email && !/^\S+@\S+\.\S+$/.test(formData.businessInfo.email)) {
        errors.email = 'Μη έγκυρη διεύθυνση email';
      }
    }

    // Validate business hours
    if (activeTab === 'hours') {
      // Validate that end time is after start time for each day
      Object.keys(formData.businessHours).forEach(day => {
        const { open, close } = formData.businessHours[day];
        if (open && close && open >= close) {
          errors[`hours_${day}`] = 'Η ώρα λήξης πρέπει να είναι μετά την ώρα έναρξης';
        }
      });
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    updateSettings(formData);
    setIsEditing(false);
  };

  const renderBusinessInfoTab = () => (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="form-label" htmlFor="businessName">Όνομα Επιχείρησης</label>
          <input
            type="text"
            id="businessName"
            value={formData.businessInfo.name}
            onChange={(e) => handleChange('businessInfo', 'name', e.target.value)}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${formErrors.name ? 'border-red-500' : ''}`}
          />
          {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="businessAddress">Διεύθυνση</label>
          <input
            type="text"
            id="businessAddress"
            value={formData.businessInfo.address}
            onChange={(e) => handleChange('businessInfo', 'address', e.target.value)}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${formErrors.address ? 'border-red-500' : ''}`}
          />
          {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="businessPhone">Τηλέφωνο</label>
          <input
            type="text"
            id="businessPhone"
            value={formData.businessInfo.phone}
            onChange={(e) => handleChange('businessInfo', 'phone', e.target.value)}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${formErrors.phone ? 'border-red-500' : ''}`}
          />
          {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="businessEmail">Email</label>
          <input
            type="email"
            id="businessEmail"
            value={formData.businessInfo.email}
            onChange={(e) => handleChange('businessInfo', 'email', e.target.value)}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : ''}`}
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="businessWebsite">Ιστοσελίδα</label>
          <input
            type="text"
            id="businessWebsite"
            value={formData.businessInfo.website}
            onChange={(e) => handleChange('businessInfo', 'website', e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="businessTaxId">ΑΦΜ</label>
          <input
            type="text"
            id="businessTaxId"
            value={formData.businessInfo.taxId}
            onChange={(e) => handleChange('businessInfo', 'taxId', e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      {isEditing ? (
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Ακύρωση
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Αποθήκευση
          </button>
        </div>
      ) : (
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn-primary"
          >
            Επεξεργασία
          </button>
        </div>
      )}
    </form>
  );

  const renderBusinessHoursTab = () => {
    const days = [
      { key: 'monday', label: 'Δευτέρα' },
      { key: 'tuesday', label: 'Τρίτη' },
      { key: 'wednesday', label: 'Τετάρτη' },
      { key: 'thursday', label: 'Πέμπτη' },
      { key: 'friday', label: 'Παρασκευή' },
      { key: 'saturday', label: 'Σάββατο' },
      { key: 'sunday', label: 'Κυριακή' }
    ];

    return (
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {days.map(day => (
            <div key={day.key} className="border rounded p-4">
              <h3 className="font-medium mb-3">{day.label}</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor={`${day.key}_open`}>Άνοιγμα</label>
                  <input
                    type="time"
                    id={`${day.key}_open`}
                    value={formData.businessHours[day.key].open}
                    onChange={(e) => handleBusinessHoursChange(day.key, 'open', e.target.value)}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor={`${day.key}_close`}>Κλείσιμο</label>
                  <input
                    type="time"
                    id={`${day.key}_close`}
                    value={formData.businessHours[day.key].close}
                    onChange={(e) => handleBusinessHoursChange(day.key, 'close', e.target.value)}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              {formErrors[`hours_${day.key}`] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[`hours_${day.key}`]}</p>
              )}
            </div>
          ))}
        </div>
        
        {isEditing ? (
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Ακύρωση
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Αποθήκευση
            </button>
          </div>
        ) : (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="btn-primary"
            >
              Επεξεργασία
            </button>
          </div>
        )}
      </form>
    );
  };

  const renderNotificationsTab = () => (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="card p-4">
          <h3 className="font-medium mb-4">Επιλογές Ειδοποιήσεων</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Ειδοποιήσεις μέσω Email</h4>
                <p className="text-sm text-gray-500">Αποστολή ειδοποιήσεων μέσω email</p>
              </div>
              <div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={formData.notifications.email}
                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span className={`slider round ${isEditing ? '' : 'opacity-60'}`}></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Ειδοποιήσεις μέσω SMS</h4>
                <p className="text-sm text-gray-500">Αποστολή ειδοποιήσεων μέσω SMS</p>
              </div>
              <div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={formData.notifications.sms}
                    onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span className={`slider round ${isEditing ? '' : 'opacity-60'}`}></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Υπενθύμιση Ραντεβού</h4>
                <p className="text-sm text-gray-500">Αποστολή υπενθυμίσεων για επερχόμενα ραντεβού</p>
              </div>
              <div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={formData.notifications.appointmentReminder}
                    onChange={(e) => handleNotificationChange('appointmentReminder', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span className={`slider round ${isEditing ? '' : 'opacity-60'}`}></span>
                </label>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Χρόνος Υπενθύμισης (ώρες πριν το ραντεβού)</label>
              <select
                value={formData.notifications.reminderTime}
                onChange={(e) => handleNotificationChange('reminderTime', parseInt(e.target.value))}
                disabled={!isEditing || !formData.notifications.appointmentReminder}
                className={`w-full p-2 border rounded ${!formData.notifications.appointmentReminder ? 'opacity-60' : ''}`}
              >
                <option value="1">1 ώρα</option>
                <option value="2">2 ώρες</option>
                <option value="3">3 ώρες</option>
                <option value="6">6 ώρες</option>
                <option value="12">12 ώρες</option>
                <option value="24">24 ώρες</option>
                <option value="48">2 ημέρες</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <h3 className="font-medium mb-4">Σύνδεση API</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label" htmlFor="emailApiKey">API Key για Email</label>
              <input
                type="password"
                id="emailApiKey"
                placeholder="••••••••••••••••"
                disabled={!isEditing}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="smsApiKey">API Key για SMS</label>
              <input
                type="password"
                id="smsApiKey"
                placeholder="••••••••••••••••"
                disabled={!isEditing}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      </div>
      
      {isEditing ? (
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Ακύρωση
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Αποθήκευση
          </button>
        </div>
      ) : (
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn-primary"
          >
            Επεξεργασία
          </button>
        </div>
      )}
    </form>
  );

  const renderUsersTab = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Διαχείριση Χρηστών</h3>
        <button
          className="btn-primary text-sm"
        >
          <i className="fas fa-plus mr-2"></i>
          Προσθήκη Χρήστη
        </button>
      </div>
      
      <div className="card overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Όνομα</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Ρόλος</th>
              <th className="py-3 px-4 text-center">Ενέργειες</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  {user.role === 'admin' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Διαχειριστής
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Χρήστης
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800"
                      title="Επεξεργασία"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    
                    <button 
                      className="text-red-600 hover:text-red-800"
                      title="Διαγραφή"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8">
        <h3 className="font-medium mb-4">Ρόλοι και Δικαιώματα</h3>
        
        <div className="card p-4">
          <div className="mb-4">
            <h4 className="font-medium">Διαχειριστής</h4>
            <p className="text-sm text-gray-600 mt-1">Πλήρης πρόσβαση σε όλες τις λειτουργίες του συστήματος.</p>
          </div>
          
          <div>
            <h4 className="font-medium">Χρήστης</h4>
            <p className="text-sm text-gray-600 mt-1">Περιορισμένη πρόσβαση. Μπορεί να διαχειρίζεται ραντεβού και πελάτες, χωρίς πρόσβαση στα οικονομικά στοιχεία και τις ρυθμίσεις.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThemeTab = () => (
    <div>
      <div className="card p-4 mb-6">
        <h3 className="font-medium mb-4">Εμφάνιση</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Σκούρο Θέμα</h4>
              <p className="text-sm text-gray-500">Εναλλαγή μεταξύ φωτεινού και σκούρου θέματος</p>
            </div>
            <div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card p-4">
        <h3 className="font-medium mb-4">Γλώσσα</h3>
        
        <div className="form-group">
          <label className="block mb-2">Επιλογή Γλώσσας</label>
          <select
            className="w-full p-2 border rounded"
            defaultValue="el"
          >
            <option value="el">Ελληνικά</option>
            <option value="en">English</option>
          </select>
          <p className="text-sm text-gray-500 mt-2">
            Η αλλαγή γλώσσας θα εφαρμοστεί μετά την επόμενη ανανέωση της σελίδας.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      <h1 className="text-2xl font-bold mb-6">Ρυθμίσεις</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="card p-4">
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'business' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('business')}
                >
                  <i className="fas fa-building mr-2"></i>
                  Πληροφορίες Επιχείρησης
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'hours' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('hours')}
                >
                  <i className="fas fa-clock mr-2"></i>
                  Ωράριο Λειτουργίας
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'notifications' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <i className="fas fa-bell mr-2"></i>
                  Ειδοποιήσεις
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'users' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('users')}
                >
                  <i className="fas fa-users mr-2"></i>
                  Χρήστες & Ρόλοι
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'theme' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('theme')}
                >
                  <i className="fas fa-palette mr-2"></i>
                  Εμφάνιση & Γλώσσα
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="card p-4">
            {activeTab === 'business' && renderBusinessInfoTab()}
            {activeTab === 'hours' && renderBusinessHoursTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'users' && renderUsersTab()}
            {activeTab === 'theme' && renderThemeTab()}
          </div>
        </div>
      </div>
      
      {/* Styles for switches are now in tailwind.css */}
    </div>
  );
};

export default Settings;
