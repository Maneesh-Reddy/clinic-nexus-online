import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { FileText, Search, Download, Eye, Calendar, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../hooks/use-toast';

const Records = () => {
  const [records, setRecords] = useState([
    { 
      id: 1, 
      title: 'Annual Checkup Results', 
      doctor: 'Dr. Sarah Johnson', 
      date: '2025-03-10', 
      type: 'Lab Results',
      summary: 'All results within normal range. Cholesterol slightly elevated but within acceptable limits.'
    },
    { 
      id: 2, 
      title: 'Vaccination Record', 
      doctor: 'Dr. James Wilson', 
      date: '2025-02-15', 
      type: 'Immunization',
      summary: 'COVID-19 booster and annual flu vaccination administered.'
    },
    { 
      id: 3, 
      title: 'X-Ray Results', 
      doctor: 'Dr. Maria Gonzalez', 
      date: '2025-01-20', 
      type: 'Radiology',
      summary: 'No fractures or abnormalities detected in right ankle.'
    },
    { 
      id: 4, 
      title: 'Blood Test Results', 
      doctor: 'Dr. Robert Chen', 
      date: '2024-12-05', 
      type: 'Lab Results',
      summary: 'Iron levels low. Vitamin D deficiency detected. See attached prescription for supplements.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { toast } = useToast();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredRecords = records.filter(record => 
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (id) => {
    toast({
      title: "Download Started",
      description: "Your medical record is being downloaded.",
      variant: "default",
    });
  };

  const viewRecordDetails = (id) => {
    const record = records.find(r => r.id === id);
    setSelectedRecord(record);
  };

  const closeRecordDetails = () => {
    setSelectedRecord(null);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <p className="text-gray-600 dark:text-gray-400">View and download your medical records</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search records by title, doctor, or type..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Record List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <FileText className="text-clinic-600 dark:text-clinic-400" size={20} />
            Your Medical Records
          </h2>
        </div>

        <div className="p-4">
          {filteredRecords.length > 0 ? (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="flex flex-col p-4 border rounded-lg border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{record.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{record.doctor}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center">
                        <Calendar size={12} className="mr-1" /> 
                        {formatDate(record.date)}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {record.type}
                    </span>
                  </div>
                  <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                    {record.summary.length > 100 
                      ? `${record.summary.substring(0, 100)}...` 
                      : record.summary}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => viewRecordDetails(record.id)}
                    >
                      <Eye size={14} />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(record.id)}
                    >
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <FileText size={40} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm 
                  ? "No records match your search" 
                  : "No medical records found"}
              </p>
              {searchTerm && (
                <Button variant="link" onClick={() => setSearchTerm('')}>
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold">{selectedRecord.title}</h2>
              <Button variant="ghost" size="sm" className="rounded-full" onClick={closeRecordDetails}>
                <span className="sr-only">Close</span>
                <X size={18} />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Doctor</p>
                  <p className="font-medium">{selectedRecord.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium">{formatDate(selectedRecord.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                  <p className="font-medium">{selectedRecord.type}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Summary</p>
                <p className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  {selectedRecord.summary}
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="default" 
                  className="flex items-center gap-1"
                  onClick={() => handleDownload(selectedRecord.id)}
                >
                  <Download size={16} />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Records;
