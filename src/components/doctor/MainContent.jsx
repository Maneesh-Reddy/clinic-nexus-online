
import React from "react";

const MainContent = () => {
  console.log("Rendering MainContent");
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Welcome to the Doctor Dashboard</h2>
      {/* You can add doctor-specific content here */}
      <p>This is where doctors can manage their appointments, patient files, and medical notes.</p>
    </>
  );
};

export default MainContent;
