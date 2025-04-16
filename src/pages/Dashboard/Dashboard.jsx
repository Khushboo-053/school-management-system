import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarCheck, FaTrophy } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard';
import { schoolStats } from '../../data/studentsData';

const Dashboard = () => {
  const attendanceData = [
    { name: 'Mon', attendance: 92 },
    { name: 'Tue', attendance: 88 },
    { name: 'Wed', attendance: 95 },
    { name: 'Thu', attendance: 85 },
    { name: 'Fri', attendance: 90 },
  ];

  const performanceData = [
    { name: 'Science', value: 78 },
    { name: 'Math', value: 82 },
    { name: 'English', value: 88 },
    { name: 'History', value: 74 },
    { name: 'Arts', value: 92 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Students" 
          value={schoolStats.totalStudents} 
          icon={<FaUserGraduate className="text-white text-xl" />} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Teachers" 
          value={schoolStats.totalTeachers} 
          icon={<FaChalkboardTeacher className="text-white text-xl" />} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Average Attendance" 
          value={`${schoolStats.averageAttendance}%`} 
          icon={<FaCalendarCheck className="text-white text-xl" />} 
          color="bg-yellow-500" 
        />
        <StatCard 
          title="Average Performance" 
          value={`${schoolStats.averagePerformance}%`} 
          icon={<FaTrophy className="text-white text-xl" />} 
          color="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Weekly Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Subject Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Department Distribution</h2>
          <div className="flex flex-wrap justify-around">
            {schoolStats.departments.map((dept, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                  <span className="text-white text-lg font-bold">{dept.students}</span>
                </div>
                <h3 className="font-medium">{dept.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {schoolStats.events.map((event, index) => (
            <div key={index} className="flex items-center p-3 border-b last:border-b-0">
              <div className="bg-blue-100 text-blue-800 p-3 rounded-lg mr-4">
                <FaCalendarCheck />
              </div>
              <div>
                <h3 className="font-medium">{event.name}</h3>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 