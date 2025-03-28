import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const Reviews = () => {
  const { reviews, customers, staff, services } = useData();
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('all'); // 'all', '1', '2', '3', '4', '5'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'rating'
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc', 'desc'
  const [searchTerm, setSearchTerm] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  });

  // Get customer name by ID
  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Άγνωστος';
  };

  // Get staff name by ID
  const getStaffName = (staffId) => {
    const staffMember = staff.find(s => s.id === staffId);
    return staffMember ? staffMember.name : 'Άγνωστος';
  };

  // Get service name by ID
  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Άγνωστη υπηρεσία';
  };

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...reviews];
    
    // Apply rating filter
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(ratingFilter));
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(review => {
        const customerName = getCustomerName(review.customerId).toLowerCase();
        const staffName = getStaffName(review.staffId).toLowerCase();
        const serviceName = getServiceName(review.serviceId).toLowerCase();
        const comment = review.comment ? review.comment.toLowerCase() : '';
        
        return customerName.includes(term) || 
               staffName.includes(term) || 
               serviceName.includes(term) || 
               comment.includes(term);
      });
    }
    
    // Sort results
    if (sortBy === 'date') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => {
        return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      });
    }
    
    setFilteredReviews(filtered);
    
    // Calculate average rating
    if (reviews.length > 0) {
      const sum = reviews.reduce((total, review) => total + review.rating, 0);
      setAverageRating(sum / reviews.length);
      
      // Calculate rating distribution
      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviews.forEach(review => {
        distribution[review.rating]++;
      });
      setRatingDistribution(distribution);
    }
  }, [reviews, ratingFilter, sortBy, sortDirection, searchTerm, customers, staff, services]);

  // Handle sort click
  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to descending
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`fas fa-star ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        ></i>
      );
    }
    return stars;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('el-GR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="reviews-page">
      <h1 className="text-2xl font-bold mb-6">Αξιολογήσεις</h1>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-2">Συνολική Βαθμολογία</h3>
          <div className="flex items-center">
            <div className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</div>
            <div className="text-yellow-400 text-xl">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="ml-2 text-sm text-gray-500">({reviews.length} αξιολογήσεις)</div>
          </div>
        </div>
        
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-2">Κατανομή Αξιολογήσεων</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center">
                <div className="w-10">{rating} <i className="fas fa-star text-yellow-400"></i></div>
                <div className="flex-1 mx-2">
                  <div className="bg-gray-200 rounded-full h-2.5 w-full">
                    <div 
                      className="bg-yellow-400 rounded-full h-2.5" 
                      style={{ 
                        width: `${reviews.length ? (ratingDistribution[rating] / reviews.length * 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-10 text-right text-sm">
                  {ratingDistribution[rating]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Βαθμολογία</label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${ratingFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setRatingFilter('all')}
            >
              Όλες
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${ratingFilter === rating.toString() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setRatingFilter(rating.toString())}
              >
                {rating} <i className="fas fa-star"></i>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Αναζήτηση</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Αναζήτηση αξιολογήσεων..."
              className="w-full p-2 pl-8 rounded-lg border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>
      
      {/* Sort buttons */}
      <div className="flex mb-4">
        <button
          className={`mr-4 flex items-center text-sm font-medium ${
            sortBy === 'date' ? 'text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => handleSort('date')}
        >
          Ημερομηνία
          {sortBy === 'date' && (
            <i className={`ml-1 fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
          )}
        </button>
        
        <button
          className={`flex items-center text-sm font-medium ${
            sortBy === 'rating' ? 'text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => handleSort('rating')}
        >
          Βαθμολογία
          {sortBy === 'rating' && (
            <i className={`ml-1 fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
          )}
        </button>
      </div>
      
      {/* Reviews list */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <div key={review.id} className="card p-4">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{getCustomerName(review.customerId)}</div>
                <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
              </div>
              
              <div className="flex items-center mb-2">
                <div className="text-yellow-400 mr-2">
                  {renderStars(review.rating)}
                </div>
                <div className="text-sm text-gray-600">
                  {getServiceName(review.serviceId)} (από {getStaffName(review.staffId)})
                </div>
              </div>
              
              {review.comment && (
                <div className="mt-2 text-gray-700">{review.comment}</div>
              )}
            </div>
          ))
        ) : (
          <div className="card p-8 text-center">
            <p className="text-gray-500">Δεν βρέθηκαν αξιολογήσεις</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
