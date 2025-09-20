import React, { useState, useMemo } from 'react';
import { AlertTriangle, Check, X, BookOpen } from 'lucide-react';
import AttendanceCalendar from '../Attendance_Calender/AttendanceCalendar';

// A small, reusable component for displaying individual stats
const StatItem = ({ icon, value, label, color }) => (
  <div className="bg-black/20 p-4 rounded-lg flex items-center space-x-4">
    <div className={`p-2 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </div>
);

export default function SubjectDetails({ attendance }) {
  const [selectedSubject, setSelectedSubject] = useState(Object.keys(attendance)[0] || '');

  // Calculate stats for the selected subject efficiently
  const stats = useMemo(() => {
    const records = attendance[selectedSubject] || [];
    const total = records.length;
    if (total === 0) {
      return { percentage: 0, attended: 0, missed: 0, total: 0 };
    }
    const attended = records.filter(d => d.status === 1).length;
    const missed = total - attended;
    const percentage = Math.round((attended / total) * 100);
    return { percentage, attended, missed, total };
  }, [selectedSubject, attendance]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl dark:bg-gray-900 p-6 border border-white/20 shadow-lg text-white">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Subject Details</h2>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-black/30 border border-white/20 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(attendance).map((sub) => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Calendar */}
        <div className="w-full">
          <AttendanceCalendar attendanceData={attendance[selectedSubject]} />
        </div>
        
        {/* Right Side: Statistics */}
        <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
                <StatItem icon={<Check size={20} />} value={stats.attended} label="Attended" color="bg-green-500/30" />
                <StatItem icon={<X size={20} />} value={stats.missed} label="Missed" color="bg-red-500/30" />
                <StatItem icon={<BookOpen size={20} />} value={stats.total} label="Total Classes" color="bg-blue-500/30" />
            </div>
        </div>
      </div>
    </div>
  );
}