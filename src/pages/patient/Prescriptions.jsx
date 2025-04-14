
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Pill, Search, Calendar, Clock, Printer, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../hooks/use-toast';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      medication: 'Amlodipine 10mg',
      doctor: 'Dr. Sarah Johnson',
      issuedDate: '2025-03-10',
      expiryDate: '2025-09-10',
      dosage: '1 tablet once daily',
      instructions: 'Take with food in the morning. Avoid grapefruit juice.',
      refills: 2,
      active: true
    },
    {
      id: 2,
      medication: 'Lisinopril 20mg',
      doctor: 'Dr. Sarah Johnson',
      issuedDate: '2025-03-10',
      expiryDate: '2025-09-10',
      dosage: '1 tablet once daily',
      instructions: 'Take in the evening.',
      refills: 0,
      active: true
    },
    {
      id: 3,
      medication: 'Amoxicillin 500mg',
      doctor: 'Dr. Robert Chen',
      issuedDate: '2025-02-05',
      expiryDate: '2025-02-12',
      dosage: '1 capsule three times daily',
      instructions: 'Take for 7 days until complete. Take with water.',
      refills: 0,
      active: false
    },
    {
      id: 4,
      medication: 'Cetirizine 10mg',
      doctor: 'Dr. James Wilson',
      issuedDate: '2025-01-15',
      expiryDate: '2026-01-15',
      dosage: '1 tablet once daily',
      instructions: 'Take as needed for allergies. May cause drowsiness.',
      refills: 5,
      active: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeOnly, setActiveOnly] = useState(true);
  const { toast } = useToast();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRefill = (id) => {
    setPrescriptions(prescriptions.map(prescription => 
      prescription.id === id ? { ...prescription, refills: prescription.refills - 1 } : prescription
    ));
    
    toast({
      title: "Refill Requested",
      description: "Your prescription refill request has been submitted. You will be notified when it's ready for pickup.",
      variant: "default",
    });
  };

  const handlePrint = (id) => {
    toast({
      title: "Printing Prescription",
      description: "Your prescription has been sent to the printer.",
      variant: "default",
    });
  };

  // Filter prescriptions based on search term and active filter
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesSearch && (activeOnly ? prescription.active : true);
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Prescriptions</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your prescriptions and request refills</p>
      </div>

      {/* Filter/Search Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search prescriptions..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant={activeOnly ? "default" : "outline"}
          className="md:w-auto w-full"
          onClick={() => setActiveOnly(!activeOnly)}
        >
          {activeOnly ? 'Showing Active Only' : 'Show All Prescriptions'}
        </Button>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Pill className="text-clinic-600 dark:text-clinic-400" size={20} />
            {activeOnly ? 'Active Prescriptions' : 'All Prescriptions'}
          </h2>
        </div>

        <div className="p-4">
          {filteredPrescriptions.length > 0 ? (
            <div className="space-y-6">
              {filteredPrescriptions.map((prescription) => (
                <div 
                  key={prescription.id} 
                  className={`border rounded-lg p-4 ${
                    prescription.active 
                      ? 'border-green-200 dark:border-green-900/30' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-lg">{prescription.medication}</h3>
                        {prescription.active ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Active
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            Expired
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.doctor}</p>
                      <div className="mt-2 text-sm">
                        <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Calendar size={14} />
                          <span>Issued: {formatDate(prescription.issuedDate)}</span>
                        </p>
                        <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1">
                          <Clock size={14} />
                          <span>Expires: {formatDate(prescription.expiryDate)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                      <p className="text-sm font-medium">Refills left: {prescription.refills}</p>
                      <div className="mt-2 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handlePrint(prescription.id)}
                        >
                          <Printer size={14} />
                          Print
                        </Button>
                        {prescription.active && prescription.refills > 0 && (
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleRefill(prescription.id)}
                          >
                            <RefreshCw size={14} />
                            Request Refill
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Dosage</p>
                      <p className="text-sm">{prescription.dosage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Instructions</p>
                      <p className="text-sm">{prescription.instructions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Pill size={40} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm 
                  ? "No prescriptions match your search" 
                  : activeOnly 
                    ? "No active prescriptions found" 
                    : "No prescriptions found"}
              </p>
              {searchTerm && (
                <Button variant="link" onClick={() => setSearchTerm('')}>
                  Clear search
                </Button>
              )}
              {activeOnly && !searchTerm && (
                <Button variant="link" onClick={() => setActiveOnly(false)}>
                  Show all prescriptions
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
