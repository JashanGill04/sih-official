import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

export default function TeacherDashboard() {
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [attendanceClosed, setAttendanceClosed] = useState(false); // track if attendance is finished

  const currentClass = {
    name: "Data Structures",
    time: "10:00 AM - 11:00 AM",
    location: "Room no 201",
  };

  const upcomingClass = {
    name: "Programming in C++",
    time: "11:00 AM - 12:00 PM",
    location: "Room no 409"
  };

  function toggleAttendance() {
    if (!attendanceOpen) {
      setAttendanceOpen(true);
      setTimeLeft(60);
      setAttendanceClosed(false);
    } else {
      setAttendanceOpen(false);
      setTimeLeft(0);
    }
  }

  useEffect(() => {
    let timer;
    if (attendanceOpen && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (attendanceOpen && timeLeft === 0) {
      setAttendanceOpen(false);
      setAttendanceClosed(true);
    }
    return () => clearInterval(timer);
  }, [attendanceOpen, timeLeft]);

  const totalStudents = 100;
  const studentsPresent = 65;

  return (
    <DashboardLayout role="teacher" title="Teacher Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
        {/* Current Class details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold text-gray-800">Current class info</h3>
          <div className="mt-4">
            <p className="text-xl font-medium">📚 {currentClass.name}</p>
            <p className="text-lg font-semibold text-gray-600 mt-2">{currentClass.time}</p>
            <p className="text-lg font-semibold text-gray-600 mt-2">{currentClass.location}</p>
          </div>

          <div className="mt-6 flex flex-col space-y-3">
            <button
              onClick={toggleAttendance}
              disabled={attendanceClosed}
              className={`px-4 py-2 rounded-lg text-white ${
                attendanceClosed
                  ? "bg-gray-400 cursor-not-allowed"
                  : attendanceOpen
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {attendanceClosed
                ? "Attendance Done"
                : attendanceOpen
                ? "End Attendance"
                : "Start Attendance"}
            </button>

            <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
              Review Attendance
            </button>

            {attendanceOpen && (
              <div className="text-sm text-green-700 font-medium flex items-center space-x-2">
                <span>🟢 Attendance is open</span>
                <span className="ml-2">⏳ Time Left: {timeLeft}s</span>
              </div>
            )}

            {attendanceClosed && (
              <span className="text-sm text-red-600 font-medium">❌ Attendance is closed</span>
            )}
          </div>
        </div>

        {/* Total Students or Attendance message */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold text-lg">Data Structures(section - A) BTech CSE</h3>

          {/* Show attendance message if not closed, else show students details */}
          {attendanceClosed ? (
            <>
              <p className="text-xl text-gray-700 mt-4 flex items-center">
                📋 Total Students:{" "}
                <span className="ml-2 font-bold">{totalStudents}</span>
              </p>

              <div className="mt-4 w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-blue-500 h-6 rounded-full"
                  style={{ width: `${(totalStudents / 100) * 100}%` }}
                ></div>
              </div>

              <p className="text-xl text-green-600 mt-6 flex items-center font-bold">
                ✅ Present: <span className="ml-2 font-bold">{studentsPresent}</span>
              </p>

              <div className="mt-4 w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-green-500 h-6 rounded-full"
                  style={{ width: `${(studentsPresent / 100) * 100}%` }}
                ></div>
              </div>
            </>
          ) : (
            <div className="mt-4 text-gray-700 font-medium text-xl">
              ❗ Attendance is not marked yet
            </div>
          )}
        </div>

        {/*Upcoming class for the teacher*/}
        <div className = "bg-white shadow rounded-lg p-6">
          <h3 className = "font-semibold">Upcoming class info</h3>
          <p className = "text-xl mt-2 font-medium">📚 {upcomingClass.name}</p>
          <p className = "text-lg mt-2 text-gray-600 font-semibold">{upcomingClass.time}</p>
          <p className = "text-lg mt-2 text-gray-600 font-semibold">{upcomingClass.location}</p>
          <a 
            href="/teacher/classes"
            className = "text-blue-500 text-sm mt-2 inline-block"
          >
            View full today's schedule
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}