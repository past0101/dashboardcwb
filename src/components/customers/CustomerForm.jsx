import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const CustomerForm = ({ customer, onCancel }) => {
  const { addCustomer, updateCustomer } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    points: 0
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        notes: customer.notes || '',
        points: customer.points || 0
      });
    }
  }, [customer]);

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
    
    if (!formData.name.trim()) newErrors.name = 'Το όνομα είναι υποχρεωτικό';
    
    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Μη έγκυρη διεύθυνση email';
    }
    
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Μη έγκυρος αριθμός τηλεφώνου';
    }
    
    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.phone = 'Απαιτείται τουλάχιστον ένας τρόπος επικοινωνίας (τηλέφωνο ή email)';
      newErrors.email = 'Απαιτείται τουλάχιστον ένας τρόπος επικοινωνίας (τηλέφωνο ή email)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Prepare customer data
    const customerData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      notes: formData.notes.trim(),
      points: parseInt(formData.points, 10) || 0
    };
    
    if (customer) {
      // Update existing customer
      updateCustomer(customer.id, customerData);
    } else {
      // Add new customer
      addCustomer(customerData);
    }
    
    onCancel();
  };

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
        
        <div className="form-group">
          <label className="form-label" htmlFor="address">Διεύθυνση</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
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
        
        <div className="form-group">
          <label className="form-label" htmlFor="points">Πόντοι</label>
          <input
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded"
          />
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
          {customer ? 'Ενημέρωση' : 'Αποθήκευση'}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
