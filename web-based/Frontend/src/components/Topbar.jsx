import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { LogOut } from "lucide-react"; // For a cleaner icon

export default function Topbar({ title, user, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);



  const handleClick = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <header
      className="flex items-center justify-between bg-black/30 backdrop-blur-xl
                 px-6 py-3 border-b border-white/20 text-white"
    >
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <button
          className="text-lg text-gray-300 hover:text-white"
          onClick={handleClick}
        >
          ☰
        </button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20"
        >
          {theme === "light" ? "☀️" : "🌙"}
        </button>

        <div className="text-right">
          <div className="font-medium text-sm">{user?.name ?? "Student"}</div>
          <div className="text-xs text-gray-400">{user?.role ?? "Student"}</div>
        </div>

        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
          {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
        </div>

      
      </div>
    </header>
  );
}