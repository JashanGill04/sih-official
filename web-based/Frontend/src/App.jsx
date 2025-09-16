import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Leaderboard from "./pages/Student/Leaderboards";
import Profile from "./pages/Student/Profile";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (


    <ThemeProvider>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/student" >
      <Route index element={<StudentDashboard />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>

    </ThemeProvider>
      );
}

export default App;
