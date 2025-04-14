
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { UserCog, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { useToast } from '../../hooks/use-toast';

const DoctorsManagement = () => {
  const [doctors, setDoctors] = useState([
    { 
      id: 1, 
      name: 'Dr. Sarah Johnson', 
      specialty: 'Cardiology', 
      email: 'sarah.johnson@virtualclinic.com',
      phone: '+1 (555) 123-4567',
      patients: 145,
      rating: 4.8 
    },
    { 
      id: 2, 
      name: 'Dr. Michael Chen', 
      specialty: 'Neurology', 
      email: 'michael.chen@virtualclinic.com',
      phone: '+1 (555) 987-6543',
      patients: 120,
      rating: 4.7 
    },
    { 
      id: 3, 
      name: 'Dr. Emily Rodriguez', 
      specialty: 'Pediatrics', 
      email: 'emily.rodriguez@virtualclinic.com',
      phone: '+1 (555) 246-8135',
      patients: 210,
      rating: 4.9 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { toast } = useToast();

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    toast({
      title: "Add Doctor",
      description: "Functionality to add a new doctor will be implemented soon.",
      variant: "default"
    });
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    toast({
      title: "Edit Doctor",
      description: `Editing details for ${doctor.name}`,
      variant: "default"
    });
  };

  const handleDeleteDoctor = (doctorId) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this doctor?');
    if (confirmDelete) {
      setDoctors(doctors.filter(doc => doc.id !== doctorId));
      toast({
        title: "Doctor Removed",
        description: "The doctor has been removed from the system.",
        variant: "destructive"
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserCog className="text-clinic-600 dark:text-clinic-400" size={32} />
          Doctors Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">View, add, and manage healthcare providers</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative flex-grow mr-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search doctors by name or specialty..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleAddDoctor} className="flex items-center gap-2">
              <Plus size={16} /> Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
            </DialogHeader>
            {/* Add doctor form will be implemented in future iterations */}
            <p>Doctor registration form coming soon.</p>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg">Registered Doctors</h2>
        </div>

        <div className="p-4">
          {filteredDoctors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                    <th className="px-4 py-3 font-medium">Doctor Name</th>
                    <th className="px-4 py-3 font-medium">Specialty</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Phone</th>
                    <th className="px-4 py-3 font-medium">Total Patients</th>
                    <th className="px-4 py-3 font-medium">Rating</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="text-sm">
                      <td className="px-4 py-3 font-medium">{doctor.name}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{doctor.specialty}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{doctor.email}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{doctor.phone}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{doctor.patients}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 text-gray-600 dark:text-gray-300">{doctor.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditDoctor(doctor)}
                          >
                            <Edit size={14} className="mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteDoctor(doctor.id)}
                          >
                            <Trash2 size={14} className="mr-1" /> Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <UserCog size={40} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm 
                  ? "No doctors match your search" 
                  : "No doctors found in the system"}
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
    </DashboardLayout>
  );
};

export default DoctorsManagement;
