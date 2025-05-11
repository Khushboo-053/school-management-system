
import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaSearch, FaUserCircle, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle className="text-gray-800 text-2xl mr-2" />
            <span className="text-gray-700 font-medium">khushboo</span>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
              <div className="flex items-center px-4 py-3 border-b">
                <img 
                  src="https://via.placeholder.com/40" 
                  alt="profile" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold text-gray-800">khushboo</p>
                  <p className="text-sm text-gray-500">khushboo@gmail.com</p>
                  <span className="text-xs text-blue-500 font-medium">SUPER_ADMIN</span>
                </div>
              </div>

              <div className="flex flex-col py-2">
                <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FaUser className="mr-2" />
                  My Profile
                </button>
                <button className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100">
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
