import React from 'react';

const MarkAttendanceCard = ({ handleFaceScan, isLoading, popupMessage }) => (
  <div className="bg-white  dark:bg-gray-900 p-6 rounded-2xl shadow-md text-center">
    <h2 className="text-xl font-bold dark:text-white mb-4">📸 Mark Today's Attendance</h2>
    <button
      onClick={handleFaceScan}
      disabled={isLoading}
      className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-300"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Scanning...
        </div>
      ) : (
        "Scan Face & Mark Attendance"
      )}
    </button>
    {popupMessage && <p className="mt-4 text-sm font-medium text-gray-600">{popupMessage}</p>}
  </div>
);

export default MarkAttendanceCard;