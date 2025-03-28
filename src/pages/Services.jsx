import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import ServiceList from '../components/services/ServiceList';
import ServiceForm from '../components/services/ServiceForm';

const Services = () => {
  const { services } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Get service categories from context
  const { initialData } = useData();
  const categories = initialData?.serviceCategories || [];

  // Filter services based on search term and active category
  useEffect(() => {
    let filtered = [...services];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(service => service.categoryId === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(term) || 
        service.description.toLowerCase().includes(term)
      );
    }
    
    // Sort by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    setFilteredServices(filtered);
  }, [services, searchTerm, activeCategory]);

  const handleEditService = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setEditingService(service);
      setShowForm(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingService(null);
    setShowForm(false);
  };

  return (
    <div className="services-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Υπηρεσίες</h1>
        <button 
          className="btn-primary flex items-center"
          onClick={() => {
            setEditingService(null);
            setShowForm(true);
          }}
        >
          <i className="fas fa-plus mr-2"></i>
          Προσθήκη Υπηρεσίας
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap mb-6 gap-2">
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium 
            ${activeCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveCategory('all')}
        >
          Όλες
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-3 py-1 rounded-full text-sm font-medium 
              ${activeCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Αναζήτηση υπηρεσίας..."
            className="w-full p-3 pl-10 rounded-lg border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>

      {showForm ? (
        <div className="card p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingService ? 'Επεξεργασία Υπηρεσίας' : 'Προσθήκη Υπηρεσίας'}
            </h2>
            <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <ServiceForm
            service={editingService}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <ServiceList
          services={filteredServices}
          onEdit={handleEditService}
        />
      )}
    </div>
  );
};

export default Services;
