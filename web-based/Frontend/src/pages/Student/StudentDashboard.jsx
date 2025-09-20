import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StudentsDashboard/Statcard";
import MarkAttendanceCard from "../../components/StudentsDashboard/Camera_Scan/MarkAttendanceCard";
import SubjectDetails from "../../components/StudentsDashboard/Subject/SubjectDetails";
import LeaveApplicationCard from "../../components/StudentsDashboard/Leave_Application/LeaveApplicationCard"; 
import LeaveApplicationModal from "../../components/StudentsDashboard/Leave_Application/LeaveApplicationModal";
import MostMissedCard from "../../components/StudentsDashboard/MostMissedCard/MostMissedCard";
import AttendanceRiskMeter from "../../components/StudentsDashboard/AttendanceRisKMeter/AttendanceRiskMeter";


export default function Dashboard() {
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false); // State for the modal
  const [showMostMissedNotification, setShowMostMissedNotification] = useState(true);

  // -- Animation Variants --
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // --- Dummy Data ---
  const studentData = {
    name: "John Doe",
    streak: 3,
    badges: ["Consistent", "On-time"],
    attendance: {
      Math: [
        { date: "2025-09-01", status: 1 },
        { date: "2025-09-02", status: 1 },
        { date: "2025-09-03", status: 0 },
        { date: "2025-09-04", status: 0 },
        { date: "2025-09-05", status: 1 },
        { date: "2025-09-06", status: 0 },
        { date: "2025-09-07", status: 1 },
        { date: "2025-09-08", status: 1 },

      ],
      Physics: [
        { date: "2025-09-01", status: 1 },
        { date: "2025-09-02", status: 1 },
        { date: "2025-09-03", status: 0 },
        { date: "2025-09-04", status: 0 },
        { date: "2025-09-05", status: 1 },
        { date: "2025-09-06", status: 0 },
        { date: "2025-09-07", status: 1 },
      ],
      Chemistry: [
        { date: "2025-09-01", status: 1 },
        { date: "2025-09-02", status: 1 },
        { date: "2025-09-03", status: 0 },
        { date: "2025-09-04", status: 1 },
        { date: "2025-09-05", status: 1 },
        { date: "2025-09-06", status: 0 },
        { date: "2025-09-07", status: 1 },
      ],
    },
  };


const subjectPerformance = useMemo(() => {
  // Return an empty array if there's no data
  if (!studentData.attendance) return [];

  // Use Object.entries to loop through subjects and create the new array
  return Object.entries(studentData.attendance).map(([name, records]) => {
    if (records.length === 0) {
      return { name, percentage: 0, status: 'No Data' };
    }

    const presentCount = records.filter(d => d.status === 1).length;
    const percentage = Math.round((presentCount / records.length) * 100);

    let status = 'Safe';
    if (percentage < 75) {
      status = 'Danger Zone';
    } else if (percentage < 85) {
      status = 'At Risk';
    }

    return { name, percentage, status };
  });
}, [studentData.attendance]);



  const lowAttendanceSubjects = useMemo(
    () =>
      Object.keys(studentData.attendance).filter((sub) => {
        const records = studentData.attendance[sub];
        if (records.length === 0) return false;
        const present = records.filter((d) => d.status === 1).length;
        return (present / records.length) * 100 < 75;
      }),
    [studentData.attendance]
  );

const mostMissedClass = useMemo(() => {
    // Return null if there's no attendance data to avoid errors
    if (!studentData.attendance || Object.keys(studentData.attendance).length === 0) {
      return null;
    }

    let lowestPercentage = 101; // Start above 100
    let subjectWithLowest = null;

    // Loop through each subject in the attendance data
    for (const subjectName in studentData.attendance) {
      const records = studentData.attendance[subjectName];
      if (records.length === 0) continue; // Skip subjects with no classes yet

      const presentCount = records.filter(d => d.status === 1).length;
      const percentage = (presentCount / records.length) * 100;

      // If this subject's percentage is the new lowest, store it
      if (percentage < lowestPercentage) {
        lowestPercentage = percentage;
        subjectWithLowest = subjectName;
      }
    }
    
    // Only return a result if a lowest subject was found and it's not perfect
    if (subjectWithLowest && lowestPercentage < 100) {
       return {
          name: subjectWithLowest,
          percentage: Math.round(lowestPercentage),
       };
    }

    return null; // Return null if all subjects are at 100%
  }, [studentData.attendance]); // Dependency array

















  // --- API HANDLER ---
  const handleFaceScan = async () => {
    setIsLoading(true);
    setPopupMessage("Checking location...");
  };

  return (
    <DashboardLayout
      role="student"
      title="Student Dashboard"
      user={studentData.name}
    >




{showMostMissedNotification &&
        <div className="flex justify-center p-4 dark:bg-gray-800 ">
        
<MostMissedCard data={mostMissedClass}
                onClose={() => setShowMostMissedNotification(false)}
/>
        </div>
}






      <div className="h-screen bg-gray-50 dark:bg-gray-800">
        <motion.div
          className=" gap-6 flex w-full mx-auto p-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* == LEFT COLUMN == */}
          <motion.div className="lg:col-span-1 w-1/2 space-y-6" variants={itemVariants}>
            <MarkAttendanceCard
              handleFaceScan={handleFaceScan}
              isLoading={isLoading}
              popupMessage={popupMessage}
            />
             <AttendanceRiskMeter performanceData={subjectPerformance} />

              </motion.div>

{/*  gamifications 
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Overall Attendance"
                value={`${overallPercentage}%`}
                icon={"📊"}
              />
              <StatCard
                title="Daily Streak"
                value={`${studentData.streak} Days`}
                icon={"🔥"}
              />
            </div>
            {studentData.badges.length > 0 && (
              <StatCard
                title="Badges Earned"
                value={studentData.badges.join(", ")}
                icon={"🏆"}
              />
            )} */}







          {/* == RIGHT COLUMN == */}
          <motion.div variants={itemVariants}
          className=" flex flex-col dark:bg-gray-800 gap-7"
          >
             {/* Placed the LeaveApplicationCard here */}
            <LeaveApplicationCard onApplyClick={() => setIsLeaveModalOpen(true)} />
            <SubjectDetails
              attendance={studentData.attendance}
              lowAttendanceSubjects={lowAttendanceSubjects}
            />

           
          </motion.div>
        </motion.div>
      </div>
      
      {/* This part is correct! The modal is rendered at the end. */}
      <LeaveApplicationModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />
    </DashboardLayout>
  );
}