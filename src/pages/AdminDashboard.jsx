
import { DashboardLayout } from '../components/Layout';
import { Users, UserCog, Calendar, Pill, CreditCard, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock data
  const stats = [
    { label: 'Total Patients', value: '1,245', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Total Doctors', value: '37', change: '+3%', icon: UserCog, color: 'green' },
    { label: 'Appointments Today', value: '82', change: '+5%', icon: Calendar, color: 'purple' },
    { label: 'Revenue This Month', value: '$24,500', change: '+8%', icon: CreditCard, color: 'yellow' },
  ];
  
  const recentDoctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', patients: 145, rating: 4.8 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurologist', patients: 120, rating: 4.7 },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', patients: 210, rating: 4.9 },
  ];
  
  const recentPatients = [
    { id: 1, name: 'John Doe', age: 35, doctor: 'Dr. Sarah Johnson', lastVisit: '2025-04-10' },
    { id: 2, name: 'Sarah Miller', age: 28, doctor: 'Dr. Emily Rodriguez', lastVisit: '2025-04-12' },
    { id: 3, name: 'Robert Johnson', age: 42, doctor: 'Dr. Michael Chen', lastVisit: '2025-04-15' },
  ];
  
  const alerts = [
    { id: 1, type: 'warning', message: 'Low stock for Amoxicillin (500mg)', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Dr. Sarah Johnson updated schedule for next week', time: '4 hours ago' },
    { id: 3, type: 'error', message: 'System maintenance scheduled for 04/20 at 2AM', time: '1 day ago' },
  ];
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, Admin. Here's what's happening at Virtual Clinic.</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change} this month
                </p>
              </div>
              <div className={`w-10 h-10 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-clinic-600 dark:text-clinic-400" size={20} />
              <h2 className="font-semibold text-lg">Revenue Overview</h2>
            </div>
            <div>
              <select className="text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded-md py-1 px-2">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
          </div>
          
          <div className="p-4 h-80 flex items-center justify-center">
            {/* This would typically contain a chart component */}
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/30 rounded-lg w-full max-w-md">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Revenue chart would be displayed here</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Using Recharts or other charting library</p>
            </div>
          </div>
        </div>
        
        {/* Recent Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <AlertCircle className="text-clinic-600 dark:text-clinic-400" size={20} />
            <h2 className="font-semibold text-lg">Recent Alerts</h2>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800' 
                    : alert.type === 'error'
                    ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800'
                    : 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800'
                }`}>
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 ${
                      alert.type === 'warning' 
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' 
                        : alert.type === 'error'
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      <AlertCircle size={16} />
                    </div>
                    <div>
                      <p className={`text-sm ${
                        alert.type === 'warning' 
                          ? 'text-yellow-800 dark:text-yellow-400' 
                          : alert.type === 'error'
                          ? 'text-red-800 dark:text-red-400'
                          : 'text-blue-800 dark:text-blue-400'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-center text-sm font-medium transition-colors">
              View All Alerts
            </button>
          </div>
        </div>
      </div>
      
      {/* Recent Doctors */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserCog className="text-clinic-600 dark:text-clinic-400" size={20} />
            <h2 className="font-semibold text-lg">Recent Doctors</h2>
          </div>
          <Link to="/admin/doctors" className="text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300">
            View All Doctors
          </Link>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                  <th className="px-4 py-3 font-medium">Doctor Name</th>
                  <th className="px-4 py-3 font-medium">Specialty</th>
                  <th className="px-4 py-3 font-medium">Total Patients</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentDoctors.map((doctor) => (
                  <tr key={doctor.id} className="text-sm">
                    <td className="px-4 py-3 font-medium">{doctor.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{doctor.specialty}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{doctor.patients}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-gray-600 dark:text-gray-300">{doctor.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded transition-colors">
                          View
                        </button>
                        <button className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/10 dark:text-yellow-400 dark:hover:bg-yellow-900/20 rounded transition-colors">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Recent Patients */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="text-clinic-600 dark:text-clinic-400" size={20} />
            <h2 className="font-semibold text-lg">Recent Patients</h2>
          </div>
          <Link to="/admin/patients" className="text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300">
            View All Patients
          </Link>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                  <th className="px-4 py-3 font-medium">Patient Name</th>
                  <th className="px-4 py-3 font-medium">Age</th>
                  <th className="px-4 py-3 font-medium">Doctor</th>
                  <th className="px-4 py-3 font-medium">Last Visit</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="text-sm">
                    <td className="px-4 py-3 font-medium">{patient.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{patient.age}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{patient.doctor}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(patient.lastVisit)}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded transition-colors">
                          View
                        </button>
                        <button className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/10 dark:text-yellow-400 dark:hover:bg-yellow-900/20 rounded transition-colors">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/doctors/add" className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 p-4 rounded-lg flex items-center gap-3 transition-colors border border-blue-100 dark:border-blue-800">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <UserCog size={20} />
          </div>
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300">Add New Doctor</h3>
            <p className="text-xs text-blue-600 dark:text-blue-400">Register a new healthcare provider</p>
          </div>
        </Link>
        
        <Link to="/admin/appointments" className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 p-4 rounded-lg flex items-center gap-3 transition-colors border border-purple-100 dark:border-purple-800">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="font-medium text-purple-800 dark:text-purple-300">Manage Appointments</h3>
            <p className="text-xs text-purple-600 dark:text-purple-400">View and update appointments</p>
          </div>
        </Link>
        
        <Link to="/admin/medicines" className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 p-4 rounded-lg flex items-center gap-3 transition-colors border border-green-100 dark:border-green-800">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <Pill size={20} />
          </div>
          <div>
            <h3 className="font-medium text-green-800 dark:text-green-300">Medicine Inventory</h3>
            <p className="text-xs text-green-600 dark:text-green-400">Manage medicine stock</p>
          </div>
        </Link>
        
        <Link to="/admin/billing" className="bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 p-4 rounded-lg flex items-center gap-3 transition-colors border border-yellow-100 dark:border-yellow-800">
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
            <CreditCard size={20} />
          </div>
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Billing Reports</h3>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">Generate financial reports</p>
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
