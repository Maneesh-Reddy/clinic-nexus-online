
import React from "react";

/**
 * Props:
 * - stats: Array of objects, each: { label, value, icon, color }
 */
const DoctorDashboardStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {stats.map((stat, index) => (
      <div
        key={index}
        className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
          <div
            className={`w-10 h-10 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400`}
          >
            <stat.icon size={20} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default DoctorDashboardStats;
