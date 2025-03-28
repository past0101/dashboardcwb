import React from 'react';
import { useData } from '../../context/DataContext';

const ProductList = ({ products, onEdit }) => {
  const { deleteProduct, initialData } = useData();
  const categories = initialData?.productCategories || [];

  const handleDelete = (id) => {
    if (window.confirm('Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτό το προϊόν;')) {
      deleteProduct(id);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Άγνωστη';
  };

  const getStockStatus = (stock) => {
    if (stock <= 0) {
      return <span className="badge badge-danger">Εξαντλημένο</span>;
    } else if (stock < 10) {
      return <span className="badge badge-warning">Χαμηλό ({stock})</span>;
    } else {
      return <span className="badge badge-success">Διαθέσιμο ({stock})</span>;
    }
  };

  if (products.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-500">Δεν βρέθηκαν προϊόντα</p>
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
            <th className="py-3 px-4 text-left">Τιμή</th>
            <th className="py-3 px-4 text-left">Απόθεμα</th>
            <th className="py-3 px-4 text-left">Περιγραφή</th>
            <th className="py-3 px-4 text-center">Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4">{getCategoryName(product.categoryId)}</td>
              <td className="py-3 px-4">{product.price.toFixed(2)}€</td>
              <td className="py-3 px-4">{getStockStatus(product.stock)}</td>
              <td className="py-3 px-4">
                <div className="max-w-xs truncate">{product.description}</div>
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center space-x-2">
                  <button 
                    onClick={() => onEdit(product.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Επεξεργασία"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(product.id)}
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

export default ProductList;
