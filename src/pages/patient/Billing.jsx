
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { CreditCard, Search, Download, Calendar, DollarSign, Filter, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../hooks/use-toast';

const Billing = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2025-001',
      service: 'Annual Checkup',
      date: '2025-03-10',
      amount: 150.00,
      insurance: 120.00,
      status: 'paid',
      dueDate: null
    },
    {
      id: 'INV-2025-002',
      service: 'Blood Tests',
      date: '2025-03-10',
      amount: 75.00,
      insurance: 60.00,
      status: 'paid',
      dueDate: null
    },
    {
      id: 'INV-2025-003',
      service: 'Cardiology Consultation',
      date: '2025-04-05',
      amount: 200.00,
      insurance: 150.00,
      status: 'pending',
      dueDate: '2025-05-05'
    },
    {
      id: 'INV-2025-004',
      service: 'X-Ray',
      date: '2025-02-15',
      amount: 180.00,
      insurance: 145.00,
      status: 'overdue',
      dueDate: '2025-03-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Filter invoices based on search term and status filter
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.service.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });

  const handleDownload = (id) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${id} has been downloaded successfully.`,
      variant: "default",
    });
  };

  const openPaymentModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedInvoice(null);
  };

  const handlePayment = () => {
    if (!selectedInvoice) return;
    
    setInvoices(invoices.map(invoice => 
      invoice.id === selectedInvoice.id 
        ? { ...invoice, status: 'paid', dueDate: null } 
        : invoice
    ));
    
    toast({
      title: "Payment Successful",
      description: `Your payment of ${formatCurrency(selectedInvoice.amount - selectedInvoice.insurance)} for invoice ${selectedInvoice.id} has been processed successfully.`,
      variant: "default",
    });
    
    closePaymentModal();
  };

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'overdue':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Billing & Payments</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage your invoices</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Due</h3>
            <DollarSign className="h-5 w-5 text-red-500 dark:text-red-400" />
          </div>
          <p className="text-2xl font-bold">
            {formatCurrency(
              invoices
                .filter(invoice => invoice.status !== 'paid')
                .reduce((sum, invoice) => sum + (invoice.amount - invoice.insurance), 0)
            )}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Insurance Coverage</h3>
            <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold">
            {formatCurrency(
              invoices.reduce((sum, invoice) => sum + invoice.insurance, 0)
            )}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Paid This Year</h3>
            <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold">
            {formatCurrency(
              invoices
                .filter(invoice => invoice.status === 'paid')
                .reduce((sum, invoice) => sum + (invoice.amount - invoice.insurance), 0)
            )}
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search invoices..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === 'paid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('paid')}
          >
            Paid
          </Button>
          <Button 
            variant={statusFilter === 'overdue' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('overdue')}
          >
            Overdue
          </Button>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <CreditCard className="text-clinic-600 dark:text-clinic-400" size={20} />
            Invoices
          </h2>
        </div>

        <div className="p-4">
          {filteredInvoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400">
                    <th className="px-4 py-3 font-medium">Invoice #</th>
                    <th className="px-4 py-3 font-medium">Service</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-4 py-3 font-medium">{invoice.id}</td>
                      <td className="px-4 py-3">{invoice.service}</td>
                      <td className="px-4 py-3">{formatDate(invoice.date)}</td>
                      <td className="px-4 py-3">
                        <div>
                          <div>{formatCurrency(invoice.amount)}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Insurance: {formatCurrency(invoice.insurance)}
                          </div>
                          <div className="text-xs font-medium">
                            You pay: {formatCurrency(invoice.amount - invoice.insurance)}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClasses(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                        {invoice.status !== 'paid' && (
                          <div className="text-xs mt-1 text-gray-500">
                            Due: {formatDate(invoice.dueDate)}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleDownload(invoice.id)}
                          >
                            <Download size={14} />
                            <span className="hidden sm:inline">Download</span>
                          </Button>
                          {invoice.status !== 'paid' && (
                            <Button 
                              variant="default" 
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => openPaymentModal(invoice)}
                            >
                              <DollarSign size={14} />
                              <span className="hidden sm:inline">Pay</span>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <CreditCard size={40} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm 
                  ? "No invoices match your search" 
                  : statusFilter !== 'all'
                    ? `No ${statusFilter} invoices found` 
                    : "No invoices found"}
              </p>
              {(searchTerm || statusFilter !== 'all') && (
                <Button variant="link" onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}>
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold">Make Payment</h2>
              <Button variant="ghost" size="sm" className="rounded-full" onClick={closePaymentModal}>
                <span className="sr-only">Close</span>
                <X size={18} />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Invoice</p>
                <p className="font-medium">{selectedInvoice.id}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Service</p>
                <p className="font-medium">{selectedInvoice.service}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Amount Due</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(selectedInvoice.amount - selectedInvoice.insurance)}
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <div className="border rounded-md p-3 flex items-center space-x-3 bg-gray-50 dark:bg-gray-700">
                  <CreditCard className="text-gray-500" />
                  <span>Credit Card ending in 3456</span>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={closePaymentModal}>
                  Cancel
                </Button>
                <Button onClick={handlePayment}>
                  Pay {formatCurrency(selectedInvoice.amount - selectedInvoice.insurance)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Billing;
