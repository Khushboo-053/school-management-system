
import React, { useState } from "react";
import { FaSearch, FaPlus, FaBook, FaUser, FaCalendar, FaUsers, FaEllipsisV } from "react-icons/fa";
import Layout from "../../components/Layout";

const Course = () => {
  const [search, setSearch] = useState("");

  const courses = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      teacher: "Dr. ABC",
      duration: "Jan - May 2025",
      students: 45,
      status: "active",
      description: "introduction",
      schedule: "Mon, Wed, Fri 10:00 AM",
      room: "Room 301"
    },
    {
      id: 2,
      name: "Physics",
      code: "PHY201",
      teacher: "Prof. DEF",
      duration: "Jan - May 2025",
      students: 38,
      status: "active",
      description: "introduction",
      schedule: "Tue, Thu 2:00 PM",
      room: "Lab 102"
    },
    {
      id: 3,
      name: "Computer Science",
      code: "CS301",
      teacher: "Dr.kkk",
      duration: "Feb - Jun 2025",
      students: 52,
      status: "upcoming",
      description: "introductioin",
      schedule: "Mon, Wed 1:00 PM",
      room: "Computer Lab 1"
    },
    {
      id: 4,
      name: "English Literature",
      code: "ENG101",
      teacher: "Prof. pppn",
      duration: "Jan - May 2025",
      students: 40,
      status: "active",
      description: "Introduction",
      schedule: "Tue, Thu 11:00 AM",
      room: "Room 205"
    },
    {
      id: 5,
      name: "Chemistry",
      code: "CHEM201",
      teacher: "Dr. iii",
      duration: "Feb - Jun 2025",
      students: 35,
      status: "upcoming",
      description: "Introduction",
      schedule: "Mon, Wed, Fri 3:00 PM",
      room: "Chemistry Lab"
    },
    {
      id: 6,
      name: "History",
      code: "HIST101",
      teacher: "Prof.www",
      duration: "Jan - May 2025",
      students: 42,
      status: "active",
      description: "Introduction",
      schedule: "Tue, Thu 9:00 AM",
      room: "Room 108"
    }
  ];

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.code.toLowerCase().includes(search.toLowerCase()) ||
    course.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Courses">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Courses</h2>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaPlus className="mr-2" />
            Add New Course
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses by name, code, or teacher..."
            className="w-full md:w-1/3 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-4xl font-semibold text-gray-800 mb-1">{course.name}</h3>
                      <p className="text-lg text-gray-600 font-medium">{course.code}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xl font-medium ${getStatusColor(course.status)}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-gray-900 text-xl mb-4">{course.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaUser className="mr-2 text-gray-400" />
                      {course.teacher}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendar className="mr-2 text-gray-400" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaUsers className="mr-2 text-gray-400" />
                      {course.students} Students
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaBook className="mr-2 text-gray-400" />
                      {course.schedule} - {course.room}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      View Details
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEllipsisV />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Course;


