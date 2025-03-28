import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import StaffList from '../components/staff/StaffList';
import StaffForm from '../components/staff/StaffForm';

const Staff = () => {
  const { staff, appointments } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingStaffMember, setEditingStaffMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  // Filter staff based on search term
  useEffect(() => {
    let filtered = [...staff];
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(term) || 
        member.position.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term)
      );
    }
    
    // Sort by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    setFilteredStaff(filtered);
  }, [staff, searchTerm]);

  const handleEditStaffMember = (staffId) => {
    const member = staff.find(s => s.id === staffId);
    if (member) {
      setEditingStaffMember(member);
      setShowForm(true);
    }
  };

  const handleViewSchedule = (staffId) => {
    setSelectedStaffId(staffId);
    setActiveTab('schedule');
  };

  const handleCancelEdit = () => {
    setEditingStaffMember(null);
    setShowForm(false);
  };

  const getStaffAppointments = (staffId) => {
    return appointments
      .filter(appointment => appointment.staffId === staffId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="staff-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Προσωπικό</h1>
        {activeTab === 'list' && (
          <button 
            className="btn-primary flex items-center"
            onClick={() => {
              setEditingStaffMember(null);
              setShowForm(true);
            }}
          >
            <i className="fas fa-plus mr-2"></i>
            Προσθήκη Υπαλλήλου
          </button>
        )}
        {activeTab === 'schedule' && (
          <button 
            className="btn-secondary flex items-center"
            onClick={() => setActiveTab('list')}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Επιστροφή στη λίστα
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs mb-6">
        <div className="flex border-b">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'list' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('list')}
          >
            Λίστα Υπαλλήλων
          </button>
          {selectedStaffId && (
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'schedule' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('schedule')}
            >
              Πρόγραμμα & Ραντεβού
            </button>
          )}
        </div>
      </div>

      {activeTab === 'list' && (
        <>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Αναζήτηση υπαλλήλου..."
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
                  {editingStaffMember ? 'Επεξεργασία Υπαλλήλου' : 'Προσθήκη Υπαλλήλου'}
                </h2>
                <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <StaffForm
                staffMember={editingStaffMember}
                onCancel={handleCancelEdit}
              />
            </div>
          ) : (
            <StaffList
              staff={filteredStaff}
              onEdit={handleEditStaffMember}
              onViewSchedule={handleViewSchedule}
            />
          )}
        </>
      )}

      {activeTab === 'schedule' && selectedStaffId && (
        <div className="staff-schedule">
          <div className="card p-4 mb-6">
            {(() => {
              const member = staff.find(s => s.id === selectedStaffId);
              return (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Υπάλληλος: {member ? member.name : 'Άγνωστος'}</h2>
                  {member && (
                    <div className="text-sm text-gray-500 mt-1">
                      <p>Θέση: {member.position}</p>
                      <p>Email: {member.email}</p>
                      <p>Τηλέφωνο: {member.phone}</p>
                    </div>
                  )}
                </div>
              );
            })()}
            
            <h3 className="text-lg font-medium mb-3">Εβδομαδιαίο Πρόγραμμα</h3>
            {(() => {
              const member = staff.find(s => s.id === selectedStaffId);
              if (!member || !member.schedule) return null;
              
              const weekdays = [
                { key: 'monday', name: 'Δευτέρα' },
                { key: 'tuesday', name: 'Τρίτη' },
                { key: 'wednesday', name: 'Τετάρτη' },
                { key: 'thursday', name: 'Πέμπτη' },
                { key: 'friday', name: 'Παρασκευή' },
                { key: 'saturday', name: 'Σάββατο' },
                { key: 'sunday', name: 'Κυριακή' }
              ];
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {weekdays.map(day => (
                    <div key={day.key} className="border rounded p-3">
                      <h4 className="font-medium">{day.name}</h4>
                      <div className="mt-2">
                        {member.schedule[day.key] && member.schedule[day.key].start ? (
                          <p>{member.schedule[day.key].start} - {member.schedule[day.key].end}</p>
                        ) : (
                          <p className="text-gray-500">Δεν εργάζεται</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
            
            <h3 className="text-lg font-medium mb-3">Επερχόμενα Ραντεβού</h3>
            
            {(() => {
              const now = new Date();
              const staffAppointments = getStaffAppointments(selectedStaffId)
                .filter(app => new Date(app.date) >= now);
              
              if (staffAppointments.length === 0) {
                return <p className="text-center py-4">Δεν βρέθηκαν επερχόμενα ραντεβού</p>;
              }
              
              return (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Ημερομηνία & Ώρα</th>
                        <th className="py-2 px-4 text-left">Πελάτης</th>
                        <th className="py-2 px-4 text-left">Υπηρεσία</th>
                        <th className="py-2 px-4 text-left">Κατάσταση</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffAppointments.map(appointment => (
                        <tr key={appointment.id} className="border-t hover:bg-gray-50">
                          <td className="py-2 px-4">
                            {new Date(appointment.date).toLocaleString('el-GR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="py-2 px-4">
                            {(() => {
                              const { customers } = useData();
                              const customer = customers.find(c => c.id === appointment.customerId);
                              return customer ? customer.name : 'Άγνωστος πελάτης';
                            })()}
                          </td>
                          <td className="py-2 px-4">
                            {(() => {
                              const { services } = useData();
                              const service = services.find(s => s.id === appointment.serviceId);
                              return service ? service.name : 'Άγνωστη υπηρεσία';
                            })()}
                          </td>
                          <td className="py-2 px-4">
                            <span className={`badge ${
                              appointment.status === 'confirmed' ? 'badge-success' : 
                              appointment.status === 'pending' ? 'badge-warning' : 
                              'badge-danger'
                            }`}>
                              {appointment.status === 'confirmed' ? 'Επιβεβαιωμένο' : 
                              appointment.status === 'pending' ? 'Σε αναμονή' : 
                              'Ακυρωμένο'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
