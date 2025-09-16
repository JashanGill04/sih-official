import React, { useState } from 'react';
import AttendanceCalendar from '../Attendance_Calender/AttendanceCalendar'; // <-- Import the new component

// A helper function to calculate percentage
const calculatePercentage = (records = []) => {
  if (records.length === 0) return 0;
  const present = records.filter((d) => d.status === 1).length;
  return Math.round((present / records.length) * 100);
};

export default function SubjectDetails({ attendance, lowAttendanceSubjects }) {
  // Set the first subject as the default
  const [selectedSubject, setSelectedSubject] = useState(Object.keys(attendance)[0]);

  const selectedSubjectData = attendance[selectedSubject];
  const percentage = calculatePercentage(selectedSubjectData);

  return (
    // Main container with the glassmorphism effect
    <div className="lg:col-span-2 w-full bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-white">
      
      {/* Header with subject selector */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Subject Details</h2>
          {lowAttendanceSubjects.length > 0 && (
            <p className="text-sm text-yellow-400 mt-1">
              ⚠️ Low attendance in: {lowAttendanceSubjects.join(", ")}
            </p>
          )}
        </div>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="mt-4 sm:mt-0 bg-black/30 border border-white/20 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(attendance).map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Attendance Calendar and Stats */}
      <div>
        {/* Left Side: Calendar */}
        <div>
          <AttendanceCalendar attendanceData={selectedSubjectData} />
        </div>
      </div>
    </div>
  );
}