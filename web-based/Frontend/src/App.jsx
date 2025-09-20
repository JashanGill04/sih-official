import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/Teachers/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Leaderboard from "./pages/Student/Leaderboards";
import Profile from "./pages/Student/Profile";
import { ThemeProvider } from "./contexts/ThemeContext";
import Classes from "./pages/Teachers/Classes";
import Courses from "./pages/Student/Courses";
import Schedule from "./pages/Student/Schedule";

function App() {
  return (


    <ThemeProvider>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path = "/teacher">
      <Route index element = {<TeacherDashboard />} />
        <Route path = "Classes" element = {<Classes />} />
      </Route>

      <Route path="/student" >
      <Route index element={<StudentDashboard />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="courses" element={<Courses/>} />
        <Route path="schedule" element={<Schedule/>} />
      </Route>
    </Routes>

    </ThemeProvider>
      );
}

export default App;
