import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LeaveApplicationModal = ({ isOpen, onClose }) => {
  const [leaveDate, setLeaveDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to the backend.
    // For now, we'll just log it and show an alert.
    console.log({ leaveDate, reason });
    alert(`Leave application submitted for ${leaveDate}!`);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    // AnimatePresence allows the component to animate when it's removed from the DOM
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Close modal when clicking the backdrop
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Apply for Leave</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="leaveDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date of Leave
                  </label>
                  <input
                    type="date"
                    id="leaveDate"
                    value={leaveDate}
                    onChange={(e) => setLeaveDate(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    rows="4"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    placeholder="Please provide a reason for your absence..."
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeaveApplicationModal;