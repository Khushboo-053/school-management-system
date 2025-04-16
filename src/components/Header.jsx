import React from 'react';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

const Header = ({ title }) => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-gray-100 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-600 text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>
        
        <div className="flex items-center cursor-pointer">
          <FaUserCircle className="text-gray-600 text-2xl mr-2" />
          <span className="text-gray-700 font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 