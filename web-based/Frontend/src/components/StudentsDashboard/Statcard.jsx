// src/components/dashboard/StatCard.js

import React from 'react';
import { motion } from 'framer-motion'; // <-- Import motion

const StatCard = ({ title, value, icon }) => (
  // Replace the main div with motion.div and add hover/tap animations
  <motion.div 
    className="bg-white rounded-xl shadow p-4 flex flex-col"
    whileHover={{ scale: 1.05 }} // <-- Enlarge on hover
    whileTap={{ scale: 0.95 }}   // <-- Shrink on click/tap
  >
    <div className="text-gray-500 text-sm font-medium">{title}</div>
    <div className="text-2xl font-bold text-gray-800 mt-1">
      {icon} {value}
    </div>
  </motion.div>
);

export default StatCard;