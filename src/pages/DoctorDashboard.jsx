
import { DashboardLayout } from '../components/Layout';
import { Users, Calendar, Clock, UserCheck, Activity, CalendarDays, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoutButton from "../components/LogoutButton";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DoctorDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', age: 35, reason: 'Annual checkup', date: '2025-04-20', time: '10:00 AM', status: 'confirmed' },
    { id: 2, patient: 'Sarah Miller', age: 28, reason: 'Skin consultation', date: '2025-04-20', time: '11:30 AM', status: 'confirmed' },
    { id: 3, patient: 'Robert Johnson', age: 42, reason: 'Follow-up', date: '2025-04-20', time: '2:30 PM', status: 'confirmed' },
  ]);

  const patientStats = [
    { label: 'Total Patients', value: '145', icon: Users, color: 'blue' },
    { label: "Today's Appointments", value: "8", icon: Calendar, color: 'green' },
    { label: 'Pending Reviews', value: '12', icon: Clock, color: 'yellow' },
    { label: 'Completed This Week', value: '32', icon: CheckCircle2, color: 'purple' },
  ];

  const recentPatients = [
    { id: 1, name: 'Emma Wilson', age: 52, lastVisit: '2025-04-10', condition: 'Hypertension' },
    { id: 2, name: 'Michael Chen', age: 34, lastVisit: '2025-04-12', condition: 'Diabetes Type 2' },
    { id: 3, name: 'Linda Kumar', age: 29, lastVisit: '2025-04-15', condition: 'Pregnancy Checkup' },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAppointmentAction = (id, action) => {
    if (action === "complete") {
      toast({ title: "Appointment Completed", description: "Appointment marked as complete!", variant: "default" });
      setAppointments(apps =>
        apps.map(app => app.id === id ? { ...app, status: "completed" } : app)
      );
    } else if (action === "cancel") {
      toast({ title: "Appointment Cancelled", description: "Appointment cancelled.", variant: "destructive" });
      setAppointments(apps =>
        apps.map(app => app.id === id ? { ...app, status: "cancelled" } : app)
      );
    }
  };

  const handlePatientAction = (patient, action) => {
    if (action === "view") {
      toast({ title: "Patient Profile", description: `Viewing ${patient.name}` });
    } else if (action === "schedule") {
      toast({ title: "Schedule New Appointment", description: `Scheduling for ${patient.name}` });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-end mb-4">
        <LogoutButton />
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Doctor Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, Dr. Sarah. Here's your practice overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {patientStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-clinic-600 dark:text-clinic-400" size={20} />
              <h2 className="font-semibold text-lg">Today's Appointments</h2>
            </div>
            <a
              href="/doctor/appointments"
              className="text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300"
            >
              View All
            </a>
          </div>
          <div className="p-4">
            {appointments.filter(app => app.status === "confirmed").length > 0 ? (
              <div className="space-y-4">
                {appointments.filter(app => app.status === "confirmed").map((appointment) => (
                  <div key={appointment.id} className="flex items-start p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 shrink-0">
                      <UserCheck size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <h3 className="font-medium">
                          {appointment.patient}{" "}
                          <span className="text-gray-500 dark:text-gray-400 font-normal">
                            ({appointment.age})
                          </span>
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`}>
                          {appointment.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Reason:</span> {appointment.reason}
                      </p>
                      <div className="mt-2 flex justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(appointment.date)}
                        </span>
                        <div className="space-x-2">
                          <button
                            className="text-xs px-2 py-1 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/10 dark:text-green-400 dark:hover:bg-green-900/20 rounded transition-colors"
                            onClick={() => handleAppointmentAction(appointment.id, "complete")}
                          >
                            Complete
                          </button>
                          <button
                            className="text-xs px-2 py-1 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 rounded transition-colors"
                            onClick={() => handleAppointmentAction(appointment.id, "cancel")}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {appointments
                  .filter(app => app.status !== "confirmed")
                  .map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20">
                    <span>
                      <span className="font-medium">{app.patient}</span> - {app.status === "completed" ? "Completed" : "Cancelled"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">No appointments scheduled for today</p>
                <a
                  href="/doctor/schedule"
                  className="mt-2 text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300 inline-block"
                >
                  Manage your schedule
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <Activity className="text-clinic-600 dark:text-clinic-400" size={20} />
            <h2 className="font-semibold text-lg">Your Stats</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-col items-center p-4">
              <div className="w-24 h-24 rounded-full bg-clinic-100 dark:bg-clinic-900/30 flex items-center justify-center text-clinic-600 dark:text-clinic-400 text-2xl font-bold mb-4">
                SJ
              </div>
              <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
              <p className="text-gray-500 dark:text-gray-400">Cardiologist</p>
              <div className="w-full mt-6 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Weekly Appointments</span>
                    <span className="text-sm font-medium">32/40</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-clinic-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Patient Satisfaction</span>
                    <span className="text-sm font-medium">96%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "96%" }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Documents Completed</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
              <a
                href="/doctor/profile"
                className="mt-6 w-full py-2 bg-clinic-50 text-clinic-600 dark:bg-clinic-900/20 dark:text-clinic-400 hover:bg-clinic-100 dark:hover:bg-clinic-900/30 rounded-md text-center text-sm font-medium transition-colors"
              >
                View Full Analytics
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="text-clinic-600 dark:text-clinic-400" size={20} />
            <h2 className="font-semibold text-lg">Recent Patients</h2>
          </div>
          <a
            href="/doctor/patients"
            className="text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300"
          >
            View All Patients
          </a>
        </div>
        <div className="p-4">
          {recentPatients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                    <th className="px-4 py-3 font-medium">Patient Name</th>
                    <th className="px-4 py-3 font-medium">Age</th>
                    <th className="px-4 py-3 font-medium">Last Visit</th>
                    <th className="px-4 py-3 font-medium">Condition</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {recentPatients.map((patient) => (
                    <tr key={patient.id} className="text-sm">
                      <td className="px-4 py-3 font-medium">{patient.name}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{patient.age}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(patient.lastVisit)}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{patient.condition}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button
                            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded transition-colors"
                            onClick={() => handlePatientAction(patient, "view")}
                          >
                            View
                          </button>
                          <button
                            className="text-xs px-2 py-1 bg-clinic-50 text-clinic-700 hover:bg-clinic-100 dark:bg-clinic-900/10 dark:text-clinic-400 dark:hover:bg-clinic-900/20 rounded transition-colors"
                            onClick={() => handlePatientAction(patient, "schedule")}
                          >
                            Schedule
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No recent patients</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
