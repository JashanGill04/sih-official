import React from 'react';

const LeaveApplicationCard = ({ onApplyClick }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md text-center">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">🗓️ Need a Day Off?</h2>
      <button
        onClick={onApplyClick}
        className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md
                   hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                   transition-all duration-300"
      >
        Apply for Leave
      </button>
    </div>
  );
};

export default LeaveApplicationCard;