import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const AppointmentForm = ({ appointment, onCancel, customers, services, staff }) => {
  const { addAppointment, updateAppointment } = useData();
  const [formData, setFormData] = useState({
    customerId: '',
    serviceId: '',
    staffId: '',
    date: '',
    time: '',
    notes: '',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appointment) {
      const appointmentDate = new Date(appointment.date);
      
      setFormData({
        customerId: appointment.customerId,
        serviceId: appointment.serviceId,
        staffId: appointment.staffId,
        date: appointmentDate.toISOString().split('T')[0],
        time: appointmentDate.toTimeString().slice(0, 5),
        notes: appointment.notes || '',
        status: appointment.status
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerId) newErrors.customerId = 'Παρακαλώ επιλέξτε πελάτη';
    if (!formData.serviceId) newErrors.serviceId = 'Παρακαλώ επιλέξτε υπηρεσία';
    if (!formData.staffId) newErrors.staffId = 'Παρακαλώ επιλέξτε υπάλληλο';
    if (!formData.date) newErrors.date = 'Παρακαλώ επιλέξτε ημερομηνία';
    if (!formData.time) newErrors.time = 'Παρακαλώ επιλέξτε ώρα';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Combine date and time
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    
    // Prepare appointment data
    const appointmentData = {
      customerId: formData.customerId,
      serviceId: formData.serviceId,
      staffId: formData.staffId,
      date: dateTime.toISOString(),
      status: formData.status,
      notes: formData.notes
    };
    
    // Calculate end time based on service duration
    const selectedService = services.find(s => s.id === formData.serviceId);
    if (selectedService) {
      const endTime = new Date(dateTime);
      endTime.setMinutes(endTime.getMinutes() + selectedService.duration);
      appointmentData.endTime = endTime.toISOString();
    }
    
    if (appointment) {
      // Update existing appointment
      updateAppointment(appointment.id, appointmentData);
    } else {
      // Add new appointment
      addAppointment(appointmentData);
    }
    
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="form-label" htmlFor="customerId">Πελάτης</label>
          <select
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.customerId ? 'border-red-500' : ''}`}
          >
            <option value="">Επιλέξτε πελάτη</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="serviceId">Υπηρεσία</label>
          <select
            id="serviceId"
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.serviceId ? 'border-red-500' : ''}`}
          >
            <option value="">Επιλέξτε υπηρεσία</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} - {service.duration} λεπτά - {service.price.toFixed(2)}€
              </option>
            ))}
          </select>
          {errors.serviceId && <p className="text-red-500 text-sm mt-1">{errors.serviceId}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="staffId">Υπάλληλος</label>
          <select
            id="staffId"
            name="staffId"
            value={formData.staffId}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.staffId ? 'border-red-500' : ''}`}
          >
            <option value="">Επιλέξτε υπάλληλο</option>
            {staff.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.position}
              </option>
            ))}
          </select>
          {errors.staffId && <p className="text-red-500 text-sm mt-1">{errors.staffId}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="status">Κατάσταση</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="pending">Σε Αναμονή</option>
            <option value="confirmed">Επιβεβαιωμένο</option>
            <option value="cancelled">Ακυρωμένο</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="date">Ημερομηνία</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : ''}`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="time">Ώρα</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.time ? 'border-red-500' : ''}`}
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
        </div>
        
        <div className="form-group md:col-span-2">
          <label className="form-label" htmlFor="notes">Σημειώσεις</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
          ></textarea>
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
          {appointment ? 'Ενημέρωση' : 'Αποθήκευση'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
