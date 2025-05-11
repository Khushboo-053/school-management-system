import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import Layout from '../../components/Layout';

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    schoolName: 'public hr sec institute',
    email: 'admin@pulichr.edu',
    phone: '+1 234567',
    address: '123 Education St, Learning City'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appNotifications: true
  });

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    
    alert('Settings saved successfully!');
  };

  return (
    <Layout title="Settings">
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSaveSettings}>
        
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              General Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                <input
                  type="text"
                  name="schoolName"
                  value={generalSettings.schoolName}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={generalSettings.email}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={generalSettings.phone}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={generalSettings.address}
                  onChange={handleGeneralChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          </div>

        
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Notifications
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">
                  Enable email notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  name="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="smsNotifications" className="ml-2 text-sm text-gray-700">
                  Enable SMS notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="appNotifications"
                  name="appNotifications"
                  checked={notificationSettings.appNotifications}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="appNotifications" className="ml-2 text-sm text-gray-700">
                  Enable in-app notifications
                </label>
              </div>
            </div>
          </div>

         
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 flex items-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaSave className="mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SettingsPage; 