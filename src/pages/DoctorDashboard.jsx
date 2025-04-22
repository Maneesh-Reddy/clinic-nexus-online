
import React, { useState } from "react";
import { Users, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import DoctorDashboardStats from "../components/DoctorDashboardStats";
import DoctorDashboardAppointments from "../components/DoctorDashboardAppointments";
import DoctorDashboardProfileStats from "../components/DoctorDashboardProfileStats";
import DoctorDashboardRecentPatients from "../components/DoctorDashboardRecentPatients";
import { DashboardLayout } from "../components/Layout";

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
      <DoctorDashboardStats stats={patientStats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DoctorDashboardAppointments
          appointments={appointments}
          formatDate={formatDate}
          handleAppointmentAction={handleAppointmentAction}
        />
        <DoctorDashboardProfileStats />
      </div>
      <DoctorDashboardRecentPatients
        recentPatients={recentPatients}
        formatDate={formatDate}
        handlePatientAction={handlePatientAction}
      />
    </DashboardLayout>
  );
};

export default DoctorDashboard;
