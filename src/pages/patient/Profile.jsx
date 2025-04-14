import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { UserCog, Mail, Phone, Calendar, Heart, Home, Lock, BellRing, Upload } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  // Mock user data
  const user = {
    id: 'P-10042',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    dob: '1985-05-15',
    gender: 'Male',
    bloodType: 'O+',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '(555) 987-6543'
    },
    insurance: {
      provider: 'Health Shield Insurance',
      policyNumber: 'HS-1234567890',
      groupNumber: 'GRP-543210',
      effectiveDate: '2025-01-01'
    },
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension']
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm sticky top-6">
            <div className="flex flex-col items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-clinic-100 dark:bg-clinic-900/30 flex items-center justify-center text-clinic-600 dark:text-clinic-400 text-2xl font-bold">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 p-1 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm">
                  <Upload size={16} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500 dark:text-gray-400">Patient ID: {user.id}</p>
              <button className="mt-4 w-full py-2 bg-clinic-600 text-white rounded-md hover:bg-clinic-700 transition-colors text-sm">
                Edit Profile
              </button>
            </div>
            
            <div className="p-4">
              <nav>
                <button 
                  onClick={() => setActiveTab('personal')}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left mb-1 ${
                    activeTab === 'personal' 
                      ? 'bg-clinic-100 text-clinic-600 dark:bg-clinic-900/30 dark:text-clinic-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-750'
                  }`}
                >
                  <UserCog size={18} />
                  <span>Personal Information</span>
                </button>
                <button 
                  onClick={() => setActiveTab('address')}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left mb-1 ${
                    activeTab === 'address' 
                      ? 'bg-clinic-100 text-clinic-600 dark:bg-clinic-900/30 dark:text-clinic-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-750'
                  }`}
                >
                  <Home size={18} />
                  <span>Address</span>
                </button>
                <button 
                  onClick={() => setActiveTab('emergency')}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left mb-1 ${
                    activeTab === 'emergency' 
                      ? 'bg-clinic-100 text-clinic-600 dark:bg-clinic-900/30 dark:text-clinic-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-750'
                  }`}
                >
                  <Phone size={18} />
                  <span>Emergency Contact</span>
                </button>
                <button 
                  onClick={() => setActiveTab('insurance')}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left mb-1 ${
                    activeTab === 'insurance' 
                      ? 'bg-clinic-100 text-clinic-600 dark:bg-clinic-900/30 dark:text-clinic-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-750'
                  }`}
                >
                  <Heart size={18} />
                  <span>Insurance</span>
                </button>
                <button 
                  onClick={() => setActiveTab('healthInfo')}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left mb-1 ${
                    activeTab === 'healthInfo' 
                      ? 'bg-clinic-100 text-clinic-600 dark:bg-clinic-900/30 dark:text-clinic-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-750'
                  }`}
                >
                  <Heart size={18} />
                  <span>Health Information</span>
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left mb-1 ${
                    activeTab === 'security' 
                      ? 'bg-clinic-100 text-clinic-600 dark:bg-clinic-900/30 dark:text-clinic-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-750'
                  }`}
                >
                  <Lock size={18} />
                  <span>Security</span>
                </button>
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left mb-1 ${
                    activeTab === 'notifications' 
                      ? 'bg-clinic-100 text-clinic-600 dark:bg-clinic-900/30 dark:text-clinic-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-750'
                  }`}
                >
                  <BellRing size={18} />
                  <span>Notifications</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
            {activeTab === 'personal' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <UserCog size={20} className="text-clinic-600 dark:text-clinic-400" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                    <input 
                      type="text" 
                      value={user.firstName} 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      value={user.lastName} 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                      <input 
                        type="email" 
                        value={user.email} 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500 dark:text-gray-400" />
                      <input 
                        type="tel" 
                        value={user.phone} 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                      <input 
                        type="date" 
                        value={user.dob} 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                    <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blood Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500">
                      <option>O+</option>
                      <option>O-</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>Unknown</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-clinic-600 text-white rounded-md hover:bg-clinic-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'address' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Home size={20} className="text-clinic-600 dark:text-clinic-400" />
                  Address Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
                    <input 
                      type="text" 
                      value={user.address.street} 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                      <input 
                        type="text" 
                        value={user.address.city} 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State/Province</label>
                      <input 
                        type="text" 
                        value={user.address.state} 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zip/Postal Code</label>
                      <input 
                        type="text" 
                        value={user.address.zip} 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                      <input 
                        type="text" 
                        value={user.address.country} 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-clinic-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-clinic-600 text-white rounded-md hover:bg-clinic-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {/* Other tabs would be implemented similarly */}
            {activeTab !== 'personal' && activeTab !== 'address' && (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-gray-500 dark:text-gray-400">This section is under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
