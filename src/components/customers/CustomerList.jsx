import React from 'react';
import { useData } from '../../context/DataContext';

const CustomerList = ({ customers, onEdit, onViewAppointments }) => {
  const { deleteCustomer } = useData();

  const handleDelete = (id) => {
    if (window.confirm('Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτό τον πελάτη;')) {
      deleteCustomer(id);
    }
  };

  if (customers.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-500">Δεν βρέθηκαν πελάτες</p>
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Ονοματεπώνυμο</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Τηλέφωνο</th>
            <th className="py-3 px-4 text-left">Διεύθυνση</th>
            <th className="py-3 px-4 text-center">Πόντοι</th>
            <th className="py-3 px-4 text-center">Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{customer.name}</td>
              <td className="py-3 px-4">{customer.email || '-'}</td>
              <td className="py-3 px-4">{customer.phone || '-'}</td>
              <td className="py-3 px-4">{customer.address || '-'}</td>
              <td className="py-3 px-4 text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {customer.points}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center space-x-2">
                  <button 
                    onClick={() => onViewAppointments(customer.id)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Ιστορικό ραντεβού"
                  >
                    <i className="fas fa-history"></i>
                  </button>
                  
                  <button 
                    onClick={() => onEdit(customer.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Επεξεργασία"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(customer.id)}
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

export default CustomerList;
