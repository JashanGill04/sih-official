import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import "./Calender.css"; // Corrected the spelling from "Calender.css"

export default function AttendanceCalendar({ attendanceData }) {
  // This part is perfect, no changes needed
  const attendanceMap = useMemo(() => {
    const map = new Map();
    if (attendanceData) {
      attendanceData.forEach(record => {
        const dateKey = new Date(record.date).toISOString().split('T')[0];
        map.set(dateKey, record.status);
      });
    }
    return map;
  }, [attendanceData]);

  // NEW: This function applies a CSS class to the entire tile
  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateKey = date.toISOString().split('T')[0];
      if (attendanceMap.has(dateKey)) {
        const status = attendanceMap.get(dateKey);
        // Return a class name based on the status
        return status === 1 ? 'tile-present' : 'tile-absent';
      }
    }
    return null;
  };

  return (
    // The glassmorphism styling is now on this parent div
    <div className="w-full bg-black/30 backdrop-blur-xl text-white rounded-2xl p-4">
      <Calendar
        className="w-full border-none bg-transparent"
        tileClassName={getTileClassName} // Use tileClassName instead of tileContent
      />
      
      {/* Legend */}
      <div className="flex justify-center items-center text-xs mt-4 space-x-6 text-gray-300">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-green-500/70 rounded-full mr-2 border border-green-300"></span> Present
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-500/70 rounded-full mr-2 border border-red-300"></span> Absent
        </div>
      </div>
    </div>
  );
};