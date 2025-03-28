import React from 'react';
import { useData } from '../../context/DataContext';

const StaffList = ({ staff, onEdit, onViewSchedule }) => {
  const { deleteStaffMember } = useData();

  const handleDelete = (id) => {
    if (window.confirm('Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτόν τον υπάλληλο;')) {
      deleteStaffMember(id);
    }
  };

  const getWorkingDays = (schedule) => {
    const days = [];
    const dayNames = {
      monday: 'Δε',
      tuesday: 'Τρ',
      wednesday: 'Τε',
      thursday: 'Πε',
      friday: 'Πα',
      saturday: 'Σα',
      sunday: 'Κυ'
    };
    
    for (const day in schedule) {
      if (schedule[day].start && schedule[day].end) {
        days.push(dayNames[day]);
      }
    }
    
    return days.join(', ');
  };

  if (staff.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-500">Δεν βρέθηκαν υπάλληλοι</p>
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Ονοματεπώνυμο</th>
            <th className="py-3 px-4 text-left">Θέση</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Τηλέφωνο</th>
            <th className="py-3 px-4 text-left">Εργάσιμες Ημέρες</th>
            <th className="py-3 px-4 text-center">Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(member => (
            <tr key={member.id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{member.name}</td>
              <td className="py-3 px-4">{member.position}</td>
              <td className="py-3 px-4">{member.email || '-'}</td>
              <td className="py-3 px-4">{member.phone || '-'}</td>
              <td className="py-3 px-4">{getWorkingDays(member.schedule)}</td>
              <td className="py-3 px-4">
                <div className="flex justify-center space-x-2">
                  <button 
                    onClick={() => onViewSchedule(member.id)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Πρόγραμμα"
                  >
                    <i className="fas fa-calendar-alt"></i>
                  </button>
                  
                  <button 
                    onClick={() => onEdit(member.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Επεξεργασία"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(member.id)}
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

export default StaffList;
