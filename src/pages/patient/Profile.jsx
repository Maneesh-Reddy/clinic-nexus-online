
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Save, X, Lock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../hooks/use-toast';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    dob: '1985-06-15',
    address: {
      street: '123 Main Street',
      city: 'Anytown',
      state: 'California',
      zipCode: '12345'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '(555) 987-6543'
    },
    insurance: {
      provider: 'HealthPlus Insurance',
      policyNumber: 'HP-12345678',
      groupNumber: 'G-87654321'
    }
  });

  const [editMode, setEditMode] = useState({
    personal: false,
    address: false,
    emergency: false,
    insurance: false
  });

  const [tempData, setTempData] = useState({});
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { toast } = useToast();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = (section) => {
    setTempData({
      ...tempData,
      [section]: section === 'address' || section === 'emergency' || section === 'insurance'
        ? { ...profile[section] }
        : { ...profile }
    });
    
    setEditMode({
      ...editMode,
      [section]: true
    });
  };

  const handleCancel = (section) => {
    setEditMode({
      ...editMode,
      [section]: false
    });
  };

  const handleChange = (section, field, value) => {
    if (section === 'address' || section === 'emergency' || section === 'insurance') {
      setTempData({
        ...tempData,
        [section]: {
          ...tempData[section],
          [field]: value
        }
      });
    } else {
      setTempData({
        ...tempData,
        [section]: {
          ...tempData[section],
          [field]: value
        }
      });
    }
  };

  const handleSave = (section) => {
    if (section === 'address' || section === 'emergency' || section === 'insurance') {
      setProfile({
        ...profile,
        [section]: {
          ...tempData[section]
        }
      });
    } else {
      setProfile({
        ...profile,
        ...tempData[section]
      });
    }

    setEditMode({
      ...editMode,
      [section]: false
    });

    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
      variant: "default",
    });
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData({
      ...passwordData,
      [field]: value
    });
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Error",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }

    // Mock password change success
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
      variant: "default",
    });

    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setChangePasswordMode(false);
  };

  const cancelPasswordChange = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setChangePasswordMode(false);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your personal information</p>
      </div>

      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <User className="text-clinic-600 dark:text-clinic-400" size={20} />
            Personal Information
          </h2>
          {!editMode.personal ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => handleEdit('personal')}
            >
              <Edit size={14} />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleCancel('personal')}
              >
                <X size={14} />
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSave('personal')}
              >
                <Save size={14} />
                Save
              </Button>
            </div>
          )}
        </div>

        <div className="p-6">
          {!editMode.personal ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium">{profile.firstName} {profile.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium flex items-center gap-1">
                  <Mail size={14} className="text-gray-400" />
                  {profile.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium flex items-center gap-1">
                  <Phone size={14} className="text-gray-400" />
                  {profile.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar size={14} className="text-gray-400" />
                  {formatDate(profile.dob)}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                <Input 
                  id="firstName" 
                  value={tempData.personal?.firstName || profile.firstName} 
                  onChange={(e) => handleChange('personal', 'firstName', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                <Input 
                  id="lastName" 
                  value={tempData.personal?.lastName || profile.lastName} 
                  onChange={(e) => handleChange('personal', 'lastName', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={tempData.personal?.email || profile.email} 
                  onChange={(e) => handleChange('personal', 'email', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                <Input 
                  id="phone" 
                  value={tempData.personal?.phone || profile.phone} 
                  onChange={(e) => handleChange('personal', 'phone', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium mb-1">Date of Birth</label>
                <Input 
                  id="dob" 
                  type="date" 
                  value={tempData.personal?.dob || profile.dob} 
                  onChange={(e) => handleChange('personal', 'dob', e.target.value)} 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <MapPin className="text-clinic-600 dark:text-clinic-400" size={20} />
            Address
          </h2>
          {!editMode.address ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => handleEdit('address')}
            >
              <Edit size={14} />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleCancel('address')}
              >
                <X size={14} />
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSave('address')}
              >
                <Save size={14} />
                Save
              </Button>
            </div>
          )}
        </div>

        <div className="p-6">
          {!editMode.address ? (
            <div className="space-y-1">
              <p className="font-medium">{profile.address.street}</p>
              <p>{profile.address.city}, {profile.address.state} {profile.address.zipCode}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="street" className="block text-sm font-medium mb-1">Street Address</label>
                <Input 
                  id="street" 
                  value={tempData.address?.street || profile.address.street} 
                  onChange={(e) => handleChange('address', 'street', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                <Input 
                  id="city" 
                  value={tempData.address?.city || profile.address.city} 
                  onChange={(e) => handleChange('address', 'city', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                <Input 
                  id="state" 
                  value={tempData.address?.state || profile.address.state} 
                  onChange={(e) => handleChange('address', 'state', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
                <Input 
                  id="zipCode" 
                  value={tempData.address?.zipCode || profile.address.zipCode} 
                  onChange={(e) => handleChange('address', 'zipCode', e.target.value)} 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Phone className="text-clinic-600 dark:text-clinic-400" size={20} />
            Emergency Contact
          </h2>
          {!editMode.emergency ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => handleEdit('emergency')}
            >
              <Edit size={14} />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleCancel('emergency')}
              >
                <X size={14} />
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSave('emergency')}
              >
                <Save size={14} />
                Save
              </Button>
            </div>
          )}
        </div>

        <div className="p-6">
          {!editMode.emergency ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium">{profile.emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Relationship</p>
                <p className="font-medium">{profile.emergencyContact.relationship}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium flex items-center gap-1">
                  <Phone size={14} className="text-gray-400" />
                  {profile.emergencyContact.phone}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="emergencyName" className="block text-sm font-medium mb-1">Name</label>
                <Input 
                  id="emergencyName" 
                  value={tempData.emergency?.name || profile.emergencyContact.name} 
                  onChange={(e) => handleChange('emergency', 'name', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="relationship" className="block text-sm font-medium mb-1">Relationship</label>
                <Input 
                  id="relationship" 
                  value={tempData.emergency?.relationship || profile.emergencyContact.relationship} 
                  onChange={(e) => handleChange('emergency', 'relationship', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="emergencyPhone" className="block text-sm font-medium mb-1">Phone</label>
                <Input 
                  id="emergencyPhone" 
                  value={tempData.emergency?.phone || profile.emergencyContact.phone} 
                  onChange={(e) => handleChange('emergency', 'phone', e.target.value)} 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Insurance Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Shield className="text-clinic-600 dark:text-clinic-400" size={20} />
            Insurance Information
          </h2>
          {!editMode.insurance ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => handleEdit('insurance')}
            >
              <Edit size={14} />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleCancel('insurance')}
              >
                <X size={14} />
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSave('insurance')}
              >
                <Save size={14} />
                Save
              </Button>
            </div>
          )}
        </div>

        <div className="p-6">
          {!editMode.insurance ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Insurance Provider</p>
                <p className="font-medium">{profile.insurance.provider}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Policy Number</p>
                <p className="font-medium">{profile.insurance.policyNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Group Number</p>
                <p className="font-medium">{profile.insurance.groupNumber}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="provider" className="block text-sm font-medium mb-1">Insurance Provider</label>
                <Input 
                  id="provider" 
                  value={tempData.insurance?.provider || profile.insurance.provider} 
                  onChange={(e) => handleChange('insurance', 'provider', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="policyNumber" className="block text-sm font-medium mb-1">Policy Number</label>
                <Input 
                  id="policyNumber" 
                  value={tempData.insurance?.policyNumber || profile.insurance.policyNumber} 
                  onChange={(e) => handleChange('insurance', 'policyNumber', e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="groupNumber" className="block text-sm font-medium mb-1">Group Number</label>
                <Input 
                  id="groupNumber" 
                  value={tempData.insurance?.groupNumber || profile.insurance.groupNumber} 
                  onChange={(e) => handleChange('insurance', 'groupNumber', e.target.value)} 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Lock className="text-clinic-600 dark:text-clinic-400" size={20} />
            Security Settings
          </h2>
        </div>

        <div className="p-6">
          {!changePasswordMode ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your password</p>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => setChangePasswordMode(true)}
              >
                <Lock size={14} />
                Change Password
              </Button>
            </div>
          ) : (
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">Current Password</label>
                <Input 
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password</label>
                <Input 
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm New Password</label>
                <Input 
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={cancelPasswordChange}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Update Password
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
