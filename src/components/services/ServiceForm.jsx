import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const ServiceForm = ({ service, onCancel }) => {
  const { addService, updateService } = useData();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 30,
    price: 0,
    categoryId: ''
  });
  const [errors, setErrors] = useState({});

  // Get service categories from context
  const { initialData } = useData();
  const categories = initialData?.serviceCategories || [];

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        duration: service.duration || 30,
        price: service.price || 0,
        categoryId: service.categoryId || ''
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? parseFloat(value) : value;
    
    setFormData(prev => ({ ...prev, [name]: updatedValue }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Το όνομα είναι υποχρεωτικό';
    if (formData.duration <= 0) newErrors.duration = 'Η διάρκεια πρέπει να είναι μεγαλύτερη από 0';
    if (formData.price < 0) newErrors.price = 'Η τιμή δεν μπορεί να είναι αρνητική';
    if (!formData.categoryId) newErrors.categoryId = 'Παρακαλώ επιλέξτε κατηγορία';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Prepare service data
    const serviceData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      duration: parseInt(formData.duration, 10),
      price: parseFloat(formData.price),
      categoryId: formData.categoryId
    };
    
    if (service) {
      // Update existing service
      updateService(service.id, serviceData);
    } else {
      // Add new service
      addService(serviceData);
    }
    
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Όνομα Υπηρεσίας</label>
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
          <label className="form-label" htmlFor="categoryId">Κατηγορία</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.categoryId ? 'border-red-500' : ''}`}
          >
            <option value="">Επιλέξτε κατηγορία</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="duration">Διάρκεια (λεπτά)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            min="1"
            step="1"
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.duration ? 'border-red-500' : ''}`}
          />
          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="price">Τιμή (€)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            min="0"
            step="0.01"
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : ''}`}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
        
        <div className="form-group md:col-span-2">
          <label className="form-label" htmlFor="description">Περιγραφή</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
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
          {service ? 'Ενημέρωση' : 'Αποθήκευση'}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
