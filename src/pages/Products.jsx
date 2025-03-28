import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';

const Products = () => {
  const { products } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'inStock', 'lowStock', 'outOfStock'

  // Get product categories from context
  const { initialData } = useData();
  const categories = initialData?.productCategories || [];

  // Filter products based on search term, active category, and stock filter
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.categoryId === activeCategory);
    }
    
    // Filter by stock status
    if (stockFilter === 'inStock') {
      filtered = filtered.filter(product => product.stock > 10);
    } else if (stockFilter === 'lowStock') {
      filtered = filtered.filter(product => product.stock > 0 && product.stock <= 10);
    } else if (stockFilter === 'outOfStock') {
      filtered = filtered.filter(product => product.stock <= 0);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Sort by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, activeCategory, stockFilter]);

  const handleEditProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditingProduct(product);
      setShowForm(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="products-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Προϊόντα</h1>
        <button 
          className="btn-primary flex items-center"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          <i className="fas fa-plus mr-2"></i>
          Προσθήκη Προϊόντος
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Κατηγορία</label>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Stock Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Απόθεμα</label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${stockFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setStockFilter('all')}
            >
              Όλα
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${stockFilter === 'inStock' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setStockFilter('inStock')}
            >
              Διαθέσιμα
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${stockFilter === 'lowStock' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setStockFilter('lowStock')}
            >
              Χαμηλό Απόθεμα
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${stockFilter === 'outOfStock' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setStockFilter('outOfStock')}
            >
              Εξαντλημένα
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Αναζήτηση προϊόντος..."
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
              {editingProduct ? 'Επεξεργασία Προϊόντος' : 'Προσθήκη Προϊόντος'}
            </h2>
            <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <ProductForm
            product={editingProduct}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <ProductList
          products={filteredProducts}
          onEdit={handleEditProduct}
        />
      )}
    </div>
  );
};

export default Products;
