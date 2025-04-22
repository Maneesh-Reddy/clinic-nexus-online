
import React from "react";
import { Users } from "lucide-react";

/**
 * Props:
 * - recentPatients: Array {id, name, age, lastVisit, condition}
 * - formatDate: fn
 * - handlePatientAction: fn (patient, action)
 */
const DoctorDashboardRecentPatients = ({
  recentPatients,
  formatDate,
  handlePatientAction,
}) => (
  <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Users className="text-clinic-600 dark:text-clinic-400" size={20} />
        <h2 className="font-semibold text-lg">Recent Patients</h2>
      </div>
      <a
        href="/doctor/patients"
        className="text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300"
      >
        View All Patients
      </a>
    </div>
    <div className="p-4">
      {recentPatients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                <th className="px-4 py-3 font-medium">Patient Name</th>
                <th className="px-4 py-3 font-medium">Age</th>
                <th className="px-4 py-3 font-medium">Last Visit</th>
                <th className="px-4 py-3 font-medium">Condition</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="text-sm">
                  <td className="px-4 py-3 font-medium">{patient.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{patient.age}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(patient.lastVisit)}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{patient.condition}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded transition-colors"
                        onClick={() => handlePatientAction(patient, "view")}
                      >
                        View
                      </button>
                      <button
                        className="text-xs px-2 py-1 bg-clinic-50 text-clinic-700 hover:bg-clinic-100 dark:bg-clinic-900/10 dark:text-clinic-400 dark:hover:bg-clinic-900/20 rounded transition-colors"
                        onClick={() => handlePatientAction(patient, "schedule")}
                      >
                        Schedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">No recent patients</p>
        </div>
      )}
    </div>
  </div>
);

export default DoctorDashboardRecentPatients;
