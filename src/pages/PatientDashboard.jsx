
import { DashboardLayout } from '../components/Layout';
import { CalendarDays, FileText, Pill, CreditCard, Clock, UserCog, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  // Mock data
  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-04-20', time: '10:00 AM', status: 'confirmed' },
    { id: 2, doctor: 'Dr. Robert Chen', specialty: 'Dermatologist', date: '2025-04-25', time: '2:30 PM', status: 'pending' },
  ];
  
  const recentPrescriptions = [
    { id: 1, medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', prescribed: '2025-04-10', doctor: 'Dr. Sarah Johnson' },
    { id: 2, medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribed: '2025-04-05', doctor: 'Dr. Thomas Wilson' },
  ];
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, John. Here's an overview of your health.</p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/patient/appointments" className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="font-medium">Book Appointment</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Schedule a visit</p>
          </div>
        </Link>
        
        <Link to="/patient/records" className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-medium">Medical Records</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">View your history</p>
          </div>
        </Link>
        
        <Link to="/patient/prescriptions" className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Pill size={20} />
          </div>
          <div>
            <h3 className="font-medium">Prescriptions</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">View & refill</p>
          </div>
        </Link>
        
        <Link to="/patient/billing" className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
            <CreditCard size={20} />
          </div>
          <div>
            <h3 className="font-medium">Billing</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage payments</p>
          </div>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-clinic-600 dark:text-clinic-400" size={20} />
              <h2 className="font-semibold text-lg">Upcoming Appointments</h2>
            </div>
            <Link to="/patient/appointments" className="text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300">
              View All
            </Link>
          </div>
          
          <div className="p-4">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-clinic-100 dark:bg-clinic-900/30 flex items-center justify-center text-clinic-600 dark:text-clinic-400 mr-3 shrink-0">
                      <Clock size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <h3 className="font-medium">{appointment.doctor}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <p>{formatDate(appointment.date)} at {appointment.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
                <Link to="/patient/appointments" className="mt-2 text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300 inline-block">
                  Book an appointment
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* User Profile Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <UserCog className="text-clinic-600 dark:text-clinic-400" size={20} />
            <h2 className="font-semibold text-lg">Your Profile</h2>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col items-center p-4">
              <div className="w-24 h-24 rounded-full bg-clinic-100 dark:bg-clinic-900/30 flex items-center justify-center text-clinic-600 dark:text-clinic-400 text-2xl font-bold mb-4">
                JD
              </div>
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-gray-500 dark:text-gray-400">Patient ID: P-10042</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Email:</span>
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Date of Birth:</span>
                  <span>May 15, 1985</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Blood Type:</span>
                  <span>O+</span>
                </div>
              </div>
              
              <Link to="/patient/profile" className="mt-6 w-full py-2 bg-clinic-50 text-clinic-600 dark:bg-clinic-900/20 dark:text-clinic-400 hover:bg-clinic-100 dark:hover:bg-clinic-900/30 rounded-md text-center text-sm font-medium transition-colors">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Prescriptions */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Pill className="text-clinic-600 dark:text-clinic-400" size={20} />
            <h2 className="font-semibold text-lg">Recent Prescriptions</h2>
          </div>
          <Link to="/patient/prescriptions" className="text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300">
            View All
          </Link>
        </div>
        
        <div className="p-4">
          {recentPrescriptions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                    <th className="px-4 py-3 font-medium">Medication</th>
                    <th className="px-4 py-3 font-medium">Dosage</th>
                    <th className="px-4 py-3 font-medium">Frequency</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Prescribed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {recentPrescriptions.map((prescription) => (
                    <tr key={prescription.id} className="text-sm">
                      <td className="px-4 py-3 font-medium">{prescription.medication}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.dosage}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.frequency}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(prescription.prescribed)}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.doctor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No recent prescriptions</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
