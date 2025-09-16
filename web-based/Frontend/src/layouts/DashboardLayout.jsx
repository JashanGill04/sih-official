import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ role, title, children, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open for desktop

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar: Now using a more responsive approach */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <Sidebar role={role} />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar
          title={title}
          user={user}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Scrollable content */}
        <main className="flex-1  overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}