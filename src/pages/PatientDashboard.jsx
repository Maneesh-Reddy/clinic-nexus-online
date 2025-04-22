
import React from "react";
import { DashboardLayout } from "../components/Layout";
import { Calendar, ClipboardList, CreditCard, User } from "lucide-react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your healthcare portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Quick access cards */}
        <DashboardCard 
          title="Appointments" 
          icon={<Calendar className="text-clinic-600 dark:text-clinic-400" />}
          count="2"
          description="Upcoming appointments"
          link="/patient/appointments"
        />
        <DashboardCard 
          title="Medical Records" 
          icon={<ClipboardList className="text-clinic-600 dark:text-clinic-400" />}
          count="12"
          description="Available records"
          link="/patient/records"
        />
        <DashboardCard 
          title="Billing" 
          icon={<CreditCard className="text-clinic-600 dark:text-clinic-400" />}
          count="3"
          description="Pending invoices"
          link="/patient/billing"
        />
        <DashboardCard 
          title="Profile" 
          icon={<User className="text-clinic-600 dark:text-clinic-400" />}
          description="Update your information"
          link="/patient/profile"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem 
            date="2025-04-20" 
            title="Appointment with Dr. Sarah Johnson"
            description="Cardiology checkup at 10:00 AM"
          />
          <ActivityItem 
            date="2025-04-15" 
            title="New prescription added"
            description="Prescribed by Dr. Robert Chen"
          />
          <ActivityItem 
            date="2025-04-10" 
            title="Lab results available"
            description="Blood work results from your last visit"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4">Health Reminders</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Remember to take your medication as prescribed</li>
          <li>Your annual checkup is due in 2 months</li>
          <li>Stay hydrated and maintain regular exercise</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

// Dashboard card component
const DashboardCard = ({ title, icon, count, description, link }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full bg-clinic-100 dark:bg-clinic-900/30 flex items-center justify-center text-clinic-600 dark:text-clinic-400">
            {icon}
          </div>
          {count && (
            <span className="text-lg font-bold">{count}</span>
          )}
        </div>
        <h3 className="text-lg font-medium mt-3">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
};

// Activity item component
const ActivityItem = ({ date, title, description }) => {
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex items-start gap-3">
      <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1 text-xs font-medium w-14 text-center">
        {formatDate(date)}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default PatientDashboard;
