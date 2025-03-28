import React from 'react';
import { useData } from '../../context/DataContext';

const AppointmentList = ({ appointments, onEdit, customers, services, staff }) => {
  const { deleteAppointment, updateAppointment } = useData();

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Άγνωστος';
  };

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Άγνωστη';
  };

  const getStaffName = (staffId) => {
    const staffMember = staff.find(s => s.id === staffId);
    return staffMember ? staffMember.name : 'Άγνωστος';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="badge badge-success">Επιβεβαιωμένο</span>;
      case 'pending':
        return <span className="badge badge-warning">Σε Αναμονή</span>;
      case 'cancelled':
        return <span className="badge badge-danger">Ακυρωμένο</span>;
      default:
        return <span className="badge badge-info">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('el-GR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUpdateStatus = (id, newStatus) => {
    updateAppointment(id, { status: newStatus });
  };

  const handleDelete = (id) => {
    if (window.confirm('Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτό το ραντεβού;')) {
      deleteAppointment(id);
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-500">Δεν βρέθηκαν ραντεβού</p>
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Ημερομηνία & Ώρα</th>
            <th className="py-3 px-4 text-left">Πελάτης</th>
            <th className="py-3 px-4 text-left">Υπηρεσία</th>
            <th className="py-3 px-4 text-left">Υπάλληλος</th>
            <th className="py-3 px-4 text-left">Κατάσταση</th>
            <th className="py-3 px-4 text-center">Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{formatDate(appointment.date)}</td>
              <td className="py-3 px-4">{getCustomerName(appointment.customerId)}</td>
              <td className="py-3 px-4">{getServiceName(appointment.serviceId)}</td>
              <td className="py-3 px-4">{getStaffName(appointment.staffId)}</td>
              <td className="py-3 px-4">{getStatusBadge(appointment.status)}</td>
              <td className="py-3 px-4">
                <div className="flex justify-center space-x-2">
                  {appointment.status === 'pending' && (
                    <button 
                      onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                      className="text-green-600 hover:text-green-800"
                      title="Επιβεβαίωση"
                    >
                      <i className="fas fa-check-circle"></i>
                    </button>
                  )}
                  
                  {appointment.status !== 'cancelled' && (
                    <button 
                      onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}
                      className="text-red-600 hover:text-red-800"
                      title="Ακύρωση"
                    >
                      <i className="fas fa-ban"></i>
                    </button>
                  )}
                  
                  <button 
                    onClick={() => onEdit(appointment.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Επεξεργασία"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(appointment.id)}
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

export default AppointmentList;
