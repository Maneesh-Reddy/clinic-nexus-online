
import React from "react";
import LogoutButton from "../LogoutButton";

const DashboardHeader = () => {
  console.log("Rendering DashboardHeader");
  return (
    <div className="flex justify-end mb-4">
      <LogoutButton />
    </div>
  );
};

export default DashboardHeader;
