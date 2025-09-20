import React from 'react';

// A small sub-component for each individual subject row
const SubjectMeter = ({ name, percentage, status }) => {
  // Function to get the correct color class based on status
  const getStatusStyles = (s) => {
    if (s === 'Danger Zone') return { bar: 'bg-red-500', text: 'text-red-400' };
    if (s === 'At Risk') return { bar: 'bg-yellow-500', text: 'text-yellow-400' };
    return { bar: 'bg-green-500', text: 'text-green-400' };
  };

  const { bar, text } = getStatusStyles(status);

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <p className="font-bold text-white">{name}</p>
        <p className={`text-sm font-semibold ${text}`}>{status}</p>
      </div>
      <div className="flex items-center gap-3">
        {/* The progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`${bar} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="font-semibold text-white w-12 text-right">{percentage}%</span>
      </div>
    </div>
  );
};


// The main component that lists all the meters
export default function SubjectPerformance({ performanceData }) {
  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">Subject Performance</h3>
      <div className="space-y-4">
        {performanceData.map(subject => (
          <SubjectMeter key={subject.name} {...subject} />
        ))}
      </div>
    </div>
  );
}