
import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const BookAppointmentModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});

  // List of doctors (in a real app this would come from an API)
  const doctors = [
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiologist' },
    { name: 'Dr. Robert Chen', specialty: 'Dermatologist' },
    { name: 'Dr. Maria Gonzalez', specialty: 'Neurologist' },
    { name: 'Dr. James Wilson', specialty: 'General Physician' },
    { name: 'Dr. Emily Taylor', specialty: 'Pediatrician' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    // Auto-fill specialty when doctor is selected
    if (name === 'doctor') {
      const selectedDoctor = doctors.find(doc => doc.name === value);
      if (selectedDoctor) {
        setFormData(prev => ({
          ...prev,
          specialty: selectedDoctor.specialty
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.doctor) newErrors.doctor = 'Please select a doctor';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar size={20} className="text-clinic-600 dark:text-clinic-400" />
            Book New Appointment
          </h2>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={onClose}>
            <X size={18} />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Doctor Selection */}
            <div className="space-y-2">
              <label htmlFor="doctor" className="block text-sm font-medium">
                Select Doctor
              </label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className={`w-full rounded-md border ${errors.doctor ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                  bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-500`}
              >
                <option value="">-- Select a doctor --</option>
                {doctors.map(doctor => (
                  <option key={doctor.name} value={doctor.name}>
                    {doctor.name} ({doctor.specialty})
                  </option>
                ))}
              </select>
              {errors.doctor && <p className="text-xs text-red-500 mt-1">{errors.doctor}</p>}
            </div>
            
            {/* Specialty (auto-filled) */}
            <div className="space-y-2">
              <label htmlFor="specialty" className="block text-sm font-medium">
                Specialty
              </label>
              <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                disabled
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
            
            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium">
                Date
              </label>
              <Input
                type="date"
                id="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>
            
            {/* Time */}
            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-medium">
                Time
              </label>
              <Input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={errors.time ? 'border-red-500' : ''}
              />
              {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
            </div>
            
            {/* Notes */}
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-500"
                placeholder="Any specific concerns or information the doctor should know..."
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Request Appointment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
