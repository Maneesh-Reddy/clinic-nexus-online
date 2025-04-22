
import React from "react";
import DashboardHeader from "../components/doctor/DashboardHeader";
import MainContent from "../components/doctor/MainContent";

const DoctorDashboard = () => {
  console.log("Rendering DoctorDashboard");
  return (
    <div>
      <DashboardHeader />
      <MainContent />
    </div>
  );
};

export default DoctorDashboard;
