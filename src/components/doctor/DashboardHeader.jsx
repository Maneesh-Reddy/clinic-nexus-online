
import React from "react";
import { Calendar, Clock, Users, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const DoctorDashboardHeader = () => {
  console.log("Rendering DashboardHeader");
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your appointments, patients, and schedule</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={() => navigate('/doctor/settings')}>
            <Settings size={16} />
            <span className="ml-2">Settings</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <NavCard 
          title="Appointments" 
          count="8" 
          description="Today's appointments"
          icon={<Calendar size={20} />}
          onClick={() => navigate('/doctor/appointments')}
        />
        <NavCard 
          title="Patients" 
          count="124" 
          description="Active patients"
          icon={<Users size={20} />}
          onClick={() => navigate('/doctor/patients')}
        />
        <NavCard 
          title="Schedule" 
          count="35h" 
          description="Hours this week"
          icon={<Clock size={20} />}
          onClick={() => navigate('/doctor/schedule')}
        />
      </div>
    </div>
  );
};

const NavCard = ({ title, count, description, icon, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-clinic-100 dark:bg-clinic-900/30 flex items-center justify-center text-clinic-600 dark:text-clinic-400 mr-3">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-clinic-600 dark:text-clinic-400">
          {count}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardHeader;
