import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Trophy,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// 1. Added a 'path' property to each navigation item
const navItems = [
  { name: "Dashboard", path: "/student/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Courses", path: "/student/courses", icon: <BookOpen size={20} /> },
  { name: "Schedule", path: "/student/schedule", icon: <Calendar size={20} /> },
  { name: "Leaderboards", path: "/student/leaderboard", icon: <Trophy size={20} /> },
];

const SidebarItem = ({ item, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`
      flex items-center p-3 my-1 cursor-pointer rounded-lg transition-all duration-300
      ${
        isActive
          ? "bg-blue-500/30 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          : "text-gray-400 hover:bg-white/10"
      }
    `}
  >
    {item.icon}
    <span className="ml-4 font-medium">{item.name}</span>
  </li>
);

export default function Sidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  // 2. Created a handler that updates state AND navigates
  const handleItemClick = (item) => {
    setActiveItem(item.name);
    navigate(item.path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 p-4">
      <div className="h-full bg-black/30 backdrop-blur-xl rounded-2xl p-4 flex flex-col">
        <div className="flex items-center mb-10">
          <div className="bg-white/20 p-2 rounded-full">
            <LayoutDashboard className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white ml-3">Dashboard</h1>
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <SidebarItem
                key={item.name}
                item={item}
                isActive={activeItem === item.name}
                onClick={() => handleItemClick(item)} // 3. Updated the onClick call
              />
            ))}
          </ul>
        </nav>
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-gray-400 hover:bg-red-500/20 hover:text-white rounded-lg transition-all duration-300"
          >
            <LogOut size={20} />
            <span className="ml-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}