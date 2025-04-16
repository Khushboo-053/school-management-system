import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus, FaSearch, FaFilter } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { studentsData as initialStudents } from '../../data/studentsData';
import AddEditStudentModal from './AddEditStudentModal';

const Students = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState({ isOpen: false, student: null, mode: 'add' });
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, studentId: null });

  const handleAddStudent = () => {
    setModal({ isOpen: true, student: null, mode: 'add' });
  };

  const handleEditStudent = (student) => {
    setModal({ isOpen: true, student, mode: 'edit' });
  };

  const handleDeleteStudent = (studentId) => {
    setConfirmDelete({ isOpen: true, studentId });
  };

  const confirmDeleteStudent = () => {
    setStudents(students.filter(student => student.id !== confirmDelete.studentId));
    setConfirmDelete({ isOpen: false, studentId: null });
  };

  const handleSaveStudent = (studentData) => {
    if (modal.mode === 'add') {
      const newStudent = {
        ...studentData,
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1
      };
      setStudents([...students, newStudent]);
    } else {
      setStudents(students.map(s => s.id === studentData.id ? studentData : s));
    }
    setModal({ isOpen: false, student: null, mode: 'add' });
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Students">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="relative mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search students..."
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
            onClick={handleAddStudent}
          >
            <FaUserPlus className="mr-2" />
            Add Student
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.section}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-2">{student.attendance}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${student.attendance}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-2">{student.performance}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${student.performance}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.contactNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleEditStudent(student)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No students found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Student Modal */}
      {modal.isOpen && (
        <AddEditStudentModal 
          isOpen={modal.isOpen}
          mode={modal.mode}
          student={modal.student}
          onClose={() => setModal({ isOpen: false, student: null, mode: 'add' })}
          onSave={handleSaveStudent}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this student? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                onClick={() => setConfirmDelete({ isOpen: false, studentId: null })}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={confirmDeleteStudent}
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

export default Students; 