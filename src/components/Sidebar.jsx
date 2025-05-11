import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaBookOpen, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <FaHome className="mr-2" /> },
    { path: '/students', name: 'Students', icon: <FaUserGraduate className="mr-2" /> },
    { path: '/teachers', name: 'Teachers', icon: <FaChalkboardTeacher className="mr-2" /> },
    { path: '/schedule', name: 'Schedule', icon: <FaCalendarAlt className="mr-2" /> },
    { path: '/courses', name: 'Courses', icon: <FaBookOpen className="mr-2" /> },
    { path: '/settings', name: 'Settings', icon: <FaCog className="mr-2" /> },
    {path:'/Events',name:'Events',icon: <FaCalendarAlt className='mr-2'/>},
  ];

  return (
    <div className="h-screen bg-gray-800 text-white w-64 py-8 px-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 text-center">
        School Manager
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link 
                to={item.path} 
                className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-600 text-xl text-gray-400">
        <p className="mb-1">School Management System</p>
        <p>v1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar; 