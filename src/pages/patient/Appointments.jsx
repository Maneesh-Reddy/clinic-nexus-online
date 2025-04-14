
import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Calendar, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Appointments = () => {
  // Mock data
  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-04-20', time: '10:00 AM', status: 'confirmed' },
    { id: 2, doctor: 'Dr. Robert Chen', specialty: 'Dermatologist', date: '2025-04-25', time: '2:30 PM', status: 'pending' },
    { id: 3, doctor: 'Dr. Maria Gonzalez', specialty: 'Neurologist', date: '2025-05-02', time: '11:15 AM', status: 'confirmed' },
  ];
  
  const pastAppointments = [
    { id: 101, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-03-15', time: '10:00 AM', status: 'completed' },
    { id: 102, doctor: 'Dr. James Wilson', specialty: 'General Physician', date: '2025-02-20', time: '3:45 PM', status: 'completed' },
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your appointments</p>
        </div>
        <button className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-clinic-600 text-white rounded-md hover:bg-clinic-700 transition-colors">
          <Plus size={16} />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Calendar className="text-clinic-600 dark:text-clinic-400" size={20} />
            Upcoming Appointments
          </h2>
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
                    <div className="mt-3 flex items-center gap-2">
                      <button className="text-xs px-3 py-1.5 bg-clinic-50 text-clinic-600 dark:bg-clinic-900/20 dark:text-clinic-400 hover:bg-clinic-100 dark:hover:bg-clinic-900/30 rounded">
                        View Details
                      </button>
                      <button className="text-xs px-3 py-1.5 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
              <button className="mt-2 text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300">
                Book an appointment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Past Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Clock className="text-clinic-600 dark:text-clinic-400" size={20} />
            Past Appointments
          </h2>
        </div>
        
        <div className="p-4">
          {pastAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                    <th className="px-4 py-3 font-medium">Doctor</th>
                    <th className="px-4 py-3 font-medium">Specialty</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {pastAppointments.map((appointment) => (
                    <tr key={appointment.id} className="text-sm">
                      <td className="px-4 py-3 font-medium">{appointment.doctor}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{appointment.specialty}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(appointment.date)}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{appointment.time}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs px-2 py-1 text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No past appointments</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
