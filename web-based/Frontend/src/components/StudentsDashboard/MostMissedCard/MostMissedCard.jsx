import React from 'react';
import { AlertTriangle, X } from 'lucide-react'; // Import the X icon

// The component now accepts an `onClose` function as a prop
export default function MostMissedCard({ data, onClose }) {
  if (!data) {
    return null;
  }

  return (
    // Add `relative` positioning to contain the close button
    <div className="relative w-full bg-yellow-500/10 border border-yellow-500/30 text-white p-4 rounded-2xl flex items-center space-x-4 shadow-lg">
      
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={18} />
      </button>

      <div className="bg-yellow-500/20 p-3 rounded-full">
        <AlertTriangle className="text-yellow-400" size={24} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-300">Attention Area</h3>
        <p className="text-lg font-bold text-white">
          {data.name}
        </p>
        <p className="text-sm text-yellow-400 font-medium">
          Your lowest attendance is here at {data.percentage}%.
        </p>
      </div>
    </div>
  );
}