
import React from "react";
import { DashboardLayout } from "../components/Layout";
import { DoctorDashboardHeader } from "../components/doctor/DashboardHeader";
import { DoctorMainContent } from "../components/doctor/MainContent";

const DoctorDashboard = () => {
  console.log("Rendering DoctorDashboard");
  return (
    <DashboardLayout>
      <DoctorDashboardHeader />
      <DoctorMainContent />
    </DashboardLayout>
  );
};

export default DoctorDashboard;
