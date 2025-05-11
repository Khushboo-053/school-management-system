import React from 'react';
import { BrowserRouter as Router, Routes, Route,layout } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Students from './pages/Students/Students';
import './index.css';
import Teachers from './pages/Teachers/Teachers';
import Schedule from './pages/Schedule/Schedule';
import Course from './pages/Courses/Course';
import SettingsPage from './pages/Settings/SettingsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers/>}/>
        <Route path="/schedule" element={<Schedule/>}/>
        <Route path="/courses" element={<Course/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
       
      </Routes>
    </Router>
  );
}

export default App; 