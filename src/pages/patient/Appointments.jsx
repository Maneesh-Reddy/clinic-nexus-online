
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Calendar, Clock, Plus, Search, X, Check, FileText, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import BookAppointmentModal from '../../components/BookAppointmentModal';
import { useToast } from '../../hooks/use-toast';

const Appointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-04-20', time: '10:00 AM', status: 'confirmed' },
    { id: 2, doctor: 'Dr. Robert Chen', specialty: 'Dermatologist', date: '2025-04-25', time: '2:30 PM', status: 'pending' },
    { id: 3, doctor: 'Dr. Maria Gonzalez', specialty: 'Neurologist', date: '2025-05-02', time: '11:15 AM', status: 'confirmed' },
  ]);
  
  const [pastAppointments, setPastAppointments] = useState([
    { id: 101, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-03-15', time: '10:00 AM', status: 'completed' },
    { id: 102, doctor: 'Dr. James Wilson', specialty: 'General Physician', date: '2025-02-20', time: '3:45 PM', status: 'completed' },
  ]);

  const [showBookModal, setShowBookModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCancelAppointment = (id) => {
    setUpcomingAppointments(
      upcomingAppointments.filter(appointment => appointment.id !== id)
    );
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been successfully cancelled.",
      variant: "default",
    });
  };
  
  const handleAddAppointment = (newAppointment) => {
    // Generate a new ID
    const newId = Math.max(...upcomingAppointments.map(a => a.id), 0) + 1;
    
    // Add new appointment with pending status
    setUpcomingAppointments([
      ...upcomingAppointments, 
      { ...newAppointment, id: newId, status: 'pending' }
    ]);
    
    setShowBookModal(false);
    
    toast({
      title: "Appointment Requested",
      description: "Your appointment request has been submitted and is pending confirmation.",
      variant: "default",
    });
  };

  // Filter appointments based on search term
  const filteredUpcoming = upcomingAppointments.filter(appointment => 
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your appointments</p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => setShowBookModal(true)}>
          <Plus size={16} />
          <span>Book New Appointment</span>
        </Button>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search appointments by doctor or specialty..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
          {filteredUpcoming.length > 0 ? (
            <div className="space-y-4">
              {filteredUpcoming.map((appointment) => (
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs px-3 py-1.5 flex items-center gap-1"
                      >
                        <FileText size={14} />
                        View Details
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="text-xs px-3 py-1.5 flex items-center gap-1"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        <X size={14} />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? "No appointments match your search" : "No upcoming appointments"}
              </p>
              {searchTerm ? (
                <Button variant="link" onClick={() => setSearchTerm('')}>
                  Clear search
                </Button>
              ) : (
                <Button variant="link" onClick={() => setShowBookModal(true)}>
                  Book an appointment
                </Button>
              )}
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
                        <Button variant="link" className="text-xs p-0 h-auto">
                          View Details
                        </Button>
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

      {/* Book Appointment Modal */}
      {showBookModal && (
        <BookAppointmentModal 
          onClose={() => setShowBookModal(false)} 
          onSave={handleAddAppointment}
        />
      )}
    </DashboardLayout>
  );
};

export default Appointments;
