
import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import { CreditCard, FileText, Download, AlertCircle, CheckCircle2 } from 'lucide-react';

const Billing = () => {
  // Mock data
  const invoices = [
    { id: 1, invoiceNumber: 'INV-2025-001', date: '2025-04-10', service: 'Cardiology Consultation', amount: 150.00, status: 'paid', doctor: 'Dr. Sarah Johnson' },
    { id: 2, invoiceNumber: 'INV-2025-002', date: '2025-03-15', service: 'Blood Test', amount: 85.50, status: 'paid', doctor: 'Dr. Thomas Wilson' },
    { id: 3, invoiceNumber: 'INV-2025-003', date: '2025-04-01', service: 'X-Ray - Chest', amount: 220.00, status: 'pending', doctor: 'Dr. Michael Brown' },
    { id: 4, invoiceNumber: 'INV-2025-004', date: '2025-04-12', service: 'Annual Physical', amount: 175.00, status: 'pending', doctor: 'Dr. James Wilson' },
  ];
  
  const payments = [
    { id: 1, date: '2025-04-10', amount: 150.00, method: 'Credit Card', reference: 'REF-23452345' },
    { id: 2, date: '2025-03-15', amount: 85.50, method: 'Insurance', reference: 'INS-56785678' },
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage your payments</p>
      </div>

      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Due</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">$395.00</p>
            </div>
            <span className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <AlertCircle size={20} />
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Payment</p>
              <p className="text-2xl font-bold">$150.00</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">April 10, 2025</p>
            </div>
            <span className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 size={20} />
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">YTD Total</p>
              <p className="text-2xl font-bold">$630.50</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2025 Year to Date</p>
            </div>
            <span className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <FileText size={20} />
            </span>
          </div>
        </div>
      </div>

      {/* Make a Payment */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="text-clinic-600 dark:text-clinic-400" size={20} />
            <h2 className="font-semibold text-lg">Make a Payment</h2>
          </div>
          <button className="px-4 py-2 bg-clinic-600 text-white rounded-md hover:bg-clinic-700 transition-colors text-sm">
            Pay Now
          </button>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
              <h3 className="font-medium mb-3">Payment Methods</h3>
              <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-md mb-2">
                <input type="radio" name="payment-method" id="card" defaultChecked />
                <label htmlFor="card" className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <span>Credit/Debit Card</span>
                </label>
              </div>
              <button className="text-sm text-clinic-600 hover:text-clinic-700 dark:text-clinic-400 dark:hover:text-clinic-300">
                + Add New Payment Method
              </button>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
              <h3 className="font-medium mb-3">Outstanding Invoices</h3>
              {invoices.filter(inv => inv.status === 'pending').map(invoice => (
                <div key={invoice.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.service}</p>
                  </div>
                  <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <FileText className="text-clinic-600 dark:text-clinic-400" size={20} />
          <h2 className="font-semibold text-lg">Invoices</h2>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                  <th className="px-4 py-3 font-medium">Invoice #</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Doctor</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="text-sm">
                    <td className="px-4 py-3 font-medium">{invoice.invoiceNumber}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(invoice.date)}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{invoice.service}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{invoice.doctor}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(invoice.amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-clinic-600 dark:text-gray-400 dark:hover:text-clinic-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Download">
                          <Download size={16} />
                        </button>
                        {invoice.status === 'pending' && (
                          <button className="text-xs px-2 py-1 bg-clinic-50 text-clinic-600 dark:bg-clinic-900/20 dark:text-clinic-400 hover:bg-clinic-100 dark:hover:bg-clinic-900/30 rounded">
                            Pay
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <CreditCard className="text-clinic-600 dark:text-clinic-400" size={20} />
          <h2 className="font-semibold text-lg">Payment History</h2>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {payments.map((payment) => (
                  <tr key={payment.id} className="text-sm">
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(payment.date)}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(payment.amount)}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{payment.method}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{payment.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
