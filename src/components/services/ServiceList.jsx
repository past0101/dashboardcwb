import React from 'react';
import { useData } from '../../context/DataContext';

const ServiceList = ({ services, onEdit }) => {
  const { deleteService, initialData } = useData();
  const categories = initialData?.serviceCategories || [];

  const handleDelete = (id) => {
    if (window.confirm('Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτή την υπηρεσία;')) {
      deleteService(id);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Άγνωστη';
  };

  if (services.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-500">Δεν βρέθηκαν υπηρεσίες</p>
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Όνομα</th>
            <th className="py-3 px-4 text-left">Κατηγορία</th>
            <th className="py-3 px-4 text-left">Διάρκεια</th>
            <th className="py-3 px-4 text-left">Τιμή</th>
            <th className="py-3 px-4 text-left">Περιγραφή</th>
            <th className="py-3 px-4 text-center">Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{service.name}</td>
              <td className="py-3 px-4">{getCategoryName(service.categoryId)}</td>
              <td className="py-3 px-4">{service.duration} λεπτά</td>
              <td className="py-3 px-4">{service.price.toFixed(2)}€</td>
              <td className="py-3 px-4">
                <div className="max-w-xs truncate">{service.description}</div>
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center space-x-2">
                  <button 
                    onClick={() => onEdit(service.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Επεξεργασία"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(service.id)}
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
  );
};

export default ServiceList;
