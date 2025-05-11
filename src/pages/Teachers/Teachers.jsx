import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus, FaSearch, FaFilter } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { teachersData as initialTeachers } from '../../data/teachersData';
import AddEditTeacherModal from './AddEditTeacherModal';

const Teachers = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState({ isOpen: false, teacher: null, mode: 'add' });
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, teacherId: null });

  const handleAddTeacher = () => {
    setModal({ isOpen: true, teacher: null, mode: 'add' });
  };

  const handleEditTeacher = (teacher) => {
    setModal({ isOpen: true, teacher, mode: 'edit' });
  };

  const handleDeleteTeacher = (teacherId) => {
    setConfirmDelete({ isOpen: true, teacherId });
  };

  const confirmDeleteTeacher = () => {
    setTeachers(teachers.filter(teacher => teacher.id !== confirmDelete.teacherId));
    setConfirmDelete({ isOpen: false, teacherId: null });
  };

  const handleSaveTeacher = (teacherData) => {
    if (modal.mode === 'add') {
      const newTeacher = {
        ...teacherData,
        id: teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1
      };
      setTeachers([...teachers, newTeacher]);
    } else {
      setTeachers(teachers.map(t => t.id === teacherData.id ? teacherData : t));
    }
    setModal({ isOpen: false, teacher: null, mode: 'add' });
  };

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Teachers">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="relative mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search teachers..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 flex items-center bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <FaFilter className="mr-2" />
            Filter
          </button>
          <button 
            className="px-4 py-2 flex items-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleAddTeacher}
          >
            <FaUserPlus className="mr-2" />
            Add Teacher
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.experience} years</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.contactNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleEditTeacher(teacher)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteTeacher(teacher.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTeachers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No teachers found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Teacher Modal */}
      {modal.isOpen && (
        <AddEditTeacherModal 
          isOpen={modal.isOpen}
          mode={modal.mode}
          teacher={modal.teacher}
          onClose={() => setModal({ isOpen: false, teacher: null, mode: 'add' })}
          onSave={handleSaveTeacher}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this teacher? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                onClick={() => setConfirmDelete({ isOpen: false, teacherId: null })}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={confirmDeleteTeacher}
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

export default Teachers; 