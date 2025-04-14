
import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import { FileText, Download, Eye } from 'lucide-react';

const Records = () => {
  // Mock data
  const medicalRecords = [
    { id: 1, title: 'Annual Physical Examination', date: '2025-03-10', doctor: 'Dr. Sarah Johnson', type: 'Examination', fileSize: '1.2 MB' },
    { id: 2, title: 'Blood Test Results', date: '2025-02-15', doctor: 'Dr. Thomas Wilson', type: 'Laboratory', fileSize: '850 KB' },
    { id: 3, title: 'ECG Report', date: '2025-01-22', doctor: 'Dr. Sarah Johnson', type: 'Cardiology', fileSize: '1.5 MB' },
    { id: 4, title: 'X-Ray Report - Chest', date: '2024-12-05', doctor: 'Dr. Michael Brown', type: 'Radiology', fileSize: '3.2 MB' },
    { id: 5, title: 'Allergy Test Results', date: '2024-10-18', doctor: 'Dr. Emily Chen', type: 'Immunology', fileSize: '945 KB' },
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <p className="text-gray-600 dark:text-gray-400">Access and manage your medical history</p>
      </div>

      {/* Records List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <FileText className="text-clinic-600 dark:text-clinic-400" size={20} />
          <h2 className="font-semibold text-lg">Your Medical Records</h2>
        </div>
        
        <div className="p-4">
          {medicalRecords.length > 0 ? (
            <>
              <div className="flex justify-end mb-4">
                <div className="relative max-w-xs w-full">
                  <input 
                    type="text" 
                    placeholder="Search records..." 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-clinic-500"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-700">
                      <th className="px-4 py-3 font-medium">Title</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Doctor</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Size</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {medicalRecords.map((record) => (
                      <tr key={record.id} className="text-sm hover:bg-gray-50 dark:hover:bg-gray-750">
                        <td className="px-4 py-3 font-medium">{record.title}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(record.date)}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{record.doctor}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 rounded-full bg-clinic-100 text-clinic-700 dark:bg-clinic-900/30 dark:text-clinic-400">
                            {record.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{record.fileSize}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-gray-500 hover:text-clinic-600 dark:text-gray-400 dark:hover:text-clinic-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="View">
                              <Eye size={16} />
                            </button>
                            <button className="p-1.5 text-gray-500 hover:text-clinic-600 dark:text-gray-400 dark:hover:text-clinic-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Download">
                              <Download size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Showing 5 of 5 records</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-700" disabled>
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-700" disabled>
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto mb-3 text-gray-400" size={48} />
              <h3 className="text-lg font-medium mb-2">No Records Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">You don't have any medical records yet.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Records;
