
import React from "react";
import { UserCheck } from "lucide-react";

/**
 * Props:
 * - appointments: Array with { id, patient, age, reason, date, time, status }
 * - formatDate: fn (dateStr) => string
 * - handleAppointmentAction: fn (id, action)
 */
const DoctorDashboardAppointments = ({
  appointments,
  formatDate,
  handleAppointmentAction,
}) => (
  <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-clinic-600 dark:text-clinic-400">
          {/* Limited icon choice, must use lucide-react icons provided */}
          <svg width="20" height="20" fill="none"><rect width="20" height="20" fill="#9b87f5" rx="4"/></svg>
        </span>
        <h2 className="font-semibold text-lg">Today's Appointments</h2>
      </div>
      <a
        href="/doctor/appointments"
        className="text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300"
      >
        View All
      </a>
    </div>
    <div className="p-4">
      {appointments.filter(app => app.status === "confirmed").length > 0 ? (
        <div className="space-y-4">
          {appointments.filter(app => app.status === "confirmed").map((appointment) => (
            <div key={appointment.id} className="flex items-start p-3 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 shrink-0">
                <UserCheck size={20} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h3 className="font-medium">
                    {appointment.patient}{" "}
                    <span className="text-gray-500 dark:text-gray-400 font-normal">({appointment.age})</span>
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{appointment.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Reason:</span> {appointment.reason}
                </p>
                <div className="mt-2 flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(appointment.date)}
                  </span>
                  <div className="space-x-2">
                    <button
                      className="text-xs px-2 py-1 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/10 dark:text-green-400 dark:hover:bg-green-900/20 rounded transition-colors"
                      onClick={() => handleAppointmentAction(appointment.id, "complete")}
                    >
                      Complete
                    </button>
                    <button
                      className="text-xs px-2 py-1 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 rounded transition-colors"
                      onClick={() => handleAppointmentAction(appointment.id, "cancel")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {appointments
            .filter(app => app.status !== "confirmed")
            .map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20">
                <span>
                  <span className="font-medium">{app.patient}</span> - {app.status === "completed" ? "Completed" : "Cancelled"}
                </span>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">No appointments scheduled for today</p>
          <a
            href="/doctor/schedule"
            className="mt-2 text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300 inline-block"
          >
            Manage your schedule
          </a>
        </div>
      )}
    </div>
  </div>
);

export default DoctorDashboardAppointments;
