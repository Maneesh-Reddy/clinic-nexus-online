
import React, { useState } from "react";
import { Calendar, Clock, Check, X, User } from "lucide-react";
import { Button } from "../ui/button";

export const DoctorMainContent = () => {
  console.log("Rendering MainContent");
  const [activeTab, setActiveTab] = useState("appointments");
  
  // Mock data for today's appointments
  const todayAppointments = [
    { 
      id: 1, 
      time: "09:00 AM", 
      patient: "John Smith", 
      type: "Follow-up", 
      status: "confirmed" 
    },
    { 
      id: 2, 
      time: "10:30 AM", 
      patient: "Emma Johnson", 
      type: "Consultation", 
      status: "confirmed" 
    },
    { 
      id: 3, 
      time: "11:45 AM", 
      patient: "Michael Williams", 
      type: "New Patient", 
      status: "confirmed" 
    },
    { 
      id: 4, 
      time: "01:15 PM", 
      patient: "Sophia Brown", 
      type: "Follow-up", 
      status: "confirmed" 
    },
    { 
      id: 5, 
      time: "02:30 PM", 
      patient: "Oliver Jones", 
      type: "Emergency", 
      status: "confirmed" 
    },
    { 
      id: 6, 
      time: "03:45 PM", 
      patient: "Isabella Miller", 
      type: "Consultation", 
      status: "pending" 
    },
    { 
      id: 7, 
      time: "04:30 PM", 
      patient: "William Davis", 
      type: "Follow-up", 
      status: "confirmed" 
    }
  ];

  // Mock data for recent patients
  const recentPatients = [
    { 
      id: 101, 
      name: "Olivia Martinez", 
      lastVisit: "2025-04-10", 
      reason: "Annual physical", 
      age: 32, 
      gender: "Female" 
    },
    { 
      id: 102, 
      name: "Noah Garcia", 
      lastVisit: "2025-04-12", 
      reason: "Flu symptoms", 
      age: 45, 
      gender: "Male" 
    },
    { 
      id: 103, 
      name: "Emma Rodriguez", 
      lastVisit: "2025-04-15", 
      reason: "Migraine", 
      age: 28, 
      gender: "Female" 
    },
    { 
      id: 104, 
      name: "Liam Wilson", 
      lastVisit: "2025-04-18", 
      reason: "Blood pressure check", 
      age: 58, 
      gender: "Male" 
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <TabButton 
            title="Today's Appointments" 
            isActive={activeTab === "appointments"} 
            onClick={() => setActiveTab("appointments")}
          />
          <TabButton 
            title="Recent Patients" 
            isActive={activeTab === "patients"} 
            onClick={() => setActiveTab("patients")}
          />
        </div>
        
        {activeTab === "appointments" ? (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-clinic-600 dark:text-clinic-400" size={20} />
              Today's Schedule
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-start p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-clinic-100 dark:bg-clinic-900/30 flex items-center justify-center text-clinic-600 dark:text-clinic-400 mr-3 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <h3 className="font-medium">{appointment.patient}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.type}</p>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <p>Scheduled for {appointment.time}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs px-3 py-1.5 flex items-center gap-1"
                      >
                        <User size={14} />
                        View Patient
                      </Button>
                      {appointment.status === 'confirmed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs px-3 py-1.5 flex items-center gap-1 text-green-600 dark:text-green-400"
                        >
                          <Check size={14} />
                          Start Session
                        </Button>
                      )}
                      {appointment.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs px-3 py-1.5 flex items-center gap-1 text-green-600 dark:text-green-400"
                          >
                            <Check size={14} />
                            Confirm
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs px-3 py-1.5 flex items-center gap-1 text-red-600 dark:text-red-400"
                          >
                            <X size={14} />
                            Decline
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="text-clinic-600 dark:text-clinic-400" size={20} />
              Recent Patients
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                    <th className="px-4 py-3 font-medium">Patient Name</th>
                    <th className="px-4 py-3 font-medium">Age</th>
                    <th className="px-4 py-3 font-medium">Gender</th>
                    <th className="px-4 py-3 font-medium">Last Visit</th>
                    <th className="px-4 py-3 font-medium">Reason</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {recentPatients.map((patient) => (
                    <tr key={patient.id} className="text-sm">
                      <td className="px-4 py-3 font-medium">{patient.name}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{patient.age}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{patient.gender}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(patient.lastVisit)}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{patient.reason}</td>
                      <td className="px-4 py-3">
                        <Button variant="outline" size="sm" className="text-xs">
                          View Records
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Quick Notes</h2>
        <textarea 
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-500 h-32" 
          placeholder="Type your notes here..."
        ></textarea>
        <div className="mt-2 flex justify-end">
          <Button size="sm">Save Notes</Button>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 font-medium text-sm focus:outline-none ${
        isActive 
          ? 'border-b-2 border-clinic-600 dark:border-clinic-400 text-clinic-600 dark:text-clinic-400' 
          : 'text-gray-600 dark:text-gray-300 hover:text-clinic-600 dark:hover:text-clinic-400'
      }`}
    >
      {title}
    </button>
  );
};

export default DoctorMainContent;
