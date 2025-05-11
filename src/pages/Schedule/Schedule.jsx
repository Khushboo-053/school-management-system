import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { scheduleData as initialSchedules } from '../../data/scheduleData';
import AddEditScheduleModal from './AddEditScheduleModal';

const Schedule = () => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState({ isOpen: false, schedule: null, mode: 'add' });
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, scheduleId: null });

  const handleAddSchedule = () => {
    setModal({ isOpen: true, schedule: null, mode: 'add' });
  };

  const handleEditSchedule = (schedule) => {
    setModal({ isOpen: true, schedule, mode: 'edit' });
  };

  const handleDeleteSchedule = (scheduleId) => {
    setConfirmDelete({ isOpen: true, scheduleId });
  };

  const confirmDeleteSchedule = () => {
    setSchedules(schedules.filter(schedule => schedule.id !== confirmDelete.scheduleId));
    setConfirmDelete({ isOpen: false, scheduleId: null });
  };

  const handleSaveSchedule = (scheduleData) => {
    if (modal.mode === 'add') {
      const newSchedule = {
        ...scheduleData,
        id: schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1
      };
      setSchedules([...schedules, newSchedule]);
    } else {
      setSchedules(schedules.map(s => s.id === scheduleData.id ? scheduleData : s));
    }
    setModal({ isOpen: false, schedule: null, mode: 'add' });
  };

  const filteredSchedules = schedules.filter(schedule => 
    schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.day.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Class Schedule">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="relative mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search schedules..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <div className='flex space x-3'>
          <button className='px-4 py-2 flex items-center bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'>
            <FaFilter className='mr-2'/>
            Filter
            </button>

        


                  
          <button 
            className="px-4 py-2 flex items-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleAddSchedule}
          >
            <FaPlus className="mr-2" />
            Add Class
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade/Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.startTime} - {schedule.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.teacher}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.grade} {schedule.section}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleEditSchedule(schedule)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredSchedules.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No schedules found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Schedule Modal */}
      {modal.isOpen && (
        <AddEditScheduleModal 
          isOpen={modal.isOpen}
          mode={modal.mode}
          schedule={modal.schedule}
          onClose={() => setModal({ isOpen: false, schedule: null, mode: 'add' })}
          onSave={handleSaveSchedule}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this class from the schedule? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                onClick={() => setConfirmDelete({ isOpen: false, scheduleId: null })}
              >
                Cancel
            
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={confirmDeleteSchedule}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Schedule; 