
import React from "react";

/**
 * Profile stats card on doctor dashboard.
 * Props:
 * - avatar (string)
 * - doctorName (string)
 * - designation (string)
 */
const DoctorDashboardProfileStats = ({
  avatar = "SJ",
  doctorName = "Dr. Sarah Johnson",
  designation = "Cardiologist",
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
      {/* No icon from allowed list for stats */}
      <span className="text-clinic-600 dark:text-clinic-400">
        <svg width="20" height="20" fill="none"><rect width="20" height="20" fill="#9b87f5" rx="4"/></svg>
      </span>
      <h2 className="font-semibold text-lg">Your Stats</h2>
    </div>
    <div className="p-4">
      <div className="flex flex-col items-center p-4">
        <div className="w-24 h-24 rounded-full bg-clinic-100 dark:bg-clinic-900/30 flex items-center justify-center text-clinic-600 dark:text-clinic-400 text-2xl font-bold mb-4">
          {avatar}
        </div>
        <h3 className="font-semibold text-lg">{doctorName}</h3>
        <p className="text-gray-500 dark:text-gray-400">{designation}</p>
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
);

export default DoctorDashboardProfileStats;
