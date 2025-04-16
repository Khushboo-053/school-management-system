import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-600 text-medium font-bold">{title}</h3>
          <p className="text-3xl font-bold mt-1 text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard; 