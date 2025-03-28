import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const StaffForm = ({ staffMember, onCancel }) => {
  const { addStaffMember, updateStaffMember } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    schedule: {
      monday: { start: '', end: '' },
      tuesday: { start: '', end: '' },
      wednesday: { start: '', end: '' },
      thursday: { start: '', end: '' },
      friday: { start: '', end: '' },
      saturday: { start: '', end: '' },
      sunday: { start: '', end: '' }
    }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (staffMember) {
      setFormData({
        name: staffMember.name || '',
        email: staffMember.email || '',
        phone: staffMember.phone || '',
        position: staffMember.position || '',
        schedule: staffMember.schedule || {
          monday: { start: '', end: '' },
          tuesday: { start: '', end: '' },
          wednesday: { start: '', end: '' },
          thursday: { start: '', end: '' },
          friday: { start: '', end: '' },
          saturday: { start: '', end: '' },
          sunday: { start: '', end: '' }
        }
      });
    }
  }, [staffMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleScheduleChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [field]: value
        }
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Το όνομα είναι υποχρεωτικό';
    
    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Μη έγκυρη διεύθυνση email';
    }
    
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Μη έγκυρος αριθμός τηλεφώνου';
    }
    
    if (!formData.position.trim()) newErrors.position = 'Η θέση είναι υποχρεωτική';
    
    // Validate schedule - make sure end time is after start time
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
      const { start, end } = formData.schedule[day];
      if (start && end && start >= end) {
        newErrors[`schedule_${day}`] = 'Η ώρα λήξης πρέπει να είναι μετά την ώρα έναρξης';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Prepare staff data
    const staffData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      position: formData.position.trim(),
      schedule: formData.schedule
    };
    
    if (staffMember) {
      // Update existing staff member
      updateStaffMember(staffMember.id, staffData);
    } else {
      // Add new staff member
      addStaffMember(staffData);
    }
    
    onCancel();
  };

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
        <div className="form-group">
          <label className="form-label" htmlFor="name">Ονοματεπώνυμο</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="position">Θέση</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.position ? 'border-red-500' : ''}`}
          />
          {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Τηλέφωνο</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Εβδομαδιαίο Πρόγραμμα</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {days.map(day => (
            <div key={day.key} className="border rounded p-3">
              <h4 className="font-medium mb-2">{day.label}</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm" htmlFor={`${day.key}_start`}>Έναρξη</label>
                  <input
                    type="time"
                    id={`${day.key}_start`}
                    value={formData.schedule[day.key].start}
                    onChange={(e) => handleScheduleChange(day.key, 'start', e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm" htmlFor={`${day.key}_end`}>Λήξη</label>
                  <input
                    type="time"
                    id={`${day.key}_end`}
                    value={formData.schedule[day.key].end}
                    onChange={(e) => handleScheduleChange(day.key, 'end', e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                  />
                </div>
              </div>
              {errors[`schedule_${day.key}`] && (
                <p className="text-red-500 text-xs mt-1">{errors[`schedule_${day.key}`]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
        >
          Ακύρωση
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {staffMember ? 'Ενημέρωση' : 'Αποθήκευση'}
        </button>
      </div>
    </form>
  );
};

export default StaffForm;
