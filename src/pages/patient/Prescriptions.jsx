
import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Pill, Clock, FileText, AlertCircle } from 'lucide-react';

const Prescriptions = () => {
  // Mock data
  const activePrescriptions = [
    { id: 1, medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', prescribed: '2025-04-10', doctor: 'Dr. Sarah Johnson', refills: 2, expiryDate: '2025-07-10' },
    { id: 2, medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribed: '2025-04-05', doctor: 'Dr. Thomas Wilson', refills: 5, expiryDate: '2025-10-05' },
    { id: 3, medication: 'Metformin', dosage: '850mg', frequency: 'Twice daily', prescribed: '2025-03-20', doctor: 'Dr. Maria Gonzalez', refills: 3, expiryDate: '2025-06-20' },
  ];
  
  const pastPrescriptions = [
    { id: 101, medication: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', prescribed: '2025-01-15', doctor: 'Dr. James Wilson', refills: 0, expiryDate: '2025-02-15' },
    { id: 102, medication: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', prescribed: '2024-11-05', doctor: 'Dr. Emily Chen', refills: 0, expiryDate: '2025-01-05' },
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Prescriptions</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage your prescriptions</p>
      </div>

      {/* Active Prescriptions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <Pill className="text-clinic-600 dark:text-clinic-400" size={20} />
          <h2 className="font-semibold text-lg">Active Prescriptions</h2>
        </div>
        
        <div className="p-4">
          {activePrescriptions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                    <th className="px-4 py-3 font-medium">Medication</th>
                    <th className="px-4 py-3 font-medium">Dosage</th>
                    <th className="px-4 py-3 font-medium">Frequency</th>
                    <th className="px-4 py-3 font-medium">Prescribed</th>
                    <th className="px-4 py-3 font-medium">Doctor</th>
                    <th className="px-4 py-3 font-medium">Refills</th>
                    <th className="px-4 py-3 font-medium">Expires</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {activePrescriptions.map((prescription) => (
                    <tr key={prescription.id} className="text-sm">
                      <td className="px-4 py-3 font-medium">{prescription.medication}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.dosage}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.frequency}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(prescription.prescribed)}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.doctor}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.refills}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(prescription.expiryDate)}</td>
                      <td className="px-4 py-3">
                        <button className="text-xs px-3 py-1 bg-clinic-50 text-clinic-600 dark:bg-clinic-900/20 dark:text-clinic-400 hover:bg-clinic-100 dark:hover:bg-clinic-900/30 rounded">
                          Request Refill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No active prescriptions</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Prescription Guide */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Medication Reminders</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">Always take medications as prescribed by your doctor. Contact your healthcare provider before making any changes to your medication regimen.</p>
          </div>
        </div>
      </div>

      {/* Past Prescriptions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <Clock className="text-clinic-600 dark:text-clinic-400" size={20} />
          <h2 className="font-semibold text-lg">Past Prescriptions</h2>
        </div>
        
        <div className="p-4">
          {pastPrescriptions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                    <th className="px-4 py-3 font-medium">Medication</th>
                    <th className="px-4 py-3 font-medium">Dosage</th>
                    <th className="px-4 py-3 font-medium">Frequency</th>
                    <th className="px-4 py-3 font-medium">Prescribed</th>
                    <th className="px-4 py-3 font-medium">Doctor</th>
                    <th className="px-4 py-3 font-medium">Expired</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {pastPrescriptions.map((prescription) => (
                    <tr key={prescription.id} className="text-sm">
                      <td className="px-4 py-3 font-medium">{prescription.medication}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.dosage}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.frequency}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(prescription.prescribed)}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{prescription.doctor}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(prescription.expiryDate)}</td>
                      <td className="px-4 py-3">
                        <button className="text-xs px-3 py-1 bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No past prescriptions</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
