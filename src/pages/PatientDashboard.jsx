import React from "react";
import LogoutButton from "../components/LogoutButton";

const PatientDashboard = () => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <LogoutButton />
      </div>
      <h2 className="text-2xl font-bold mb-2">Welcome to the Patient Dashboard</h2>
      {/* You can add patient-specific content here */}
      <p>This is where patients can view their appointments, medical records, and communicate with their doctors.</p>
    </div>
  );
};

export default PatientDashboard;
