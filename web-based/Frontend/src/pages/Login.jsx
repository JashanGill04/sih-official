import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Attendance System</h1>
      <div className="space-y-4">
        <Link to="/student" className="block px-4 py-2 bg-blue-500 text-white rounded">
          Login as Student
        </Link>
        <Link to="/teacher" className="block px-4 py-2 bg-green-500 text-white rounded">
          Login as Teacher
        </Link>
        <Link to="/admin" className="block px-4 py-2 bg-purple-500 text-white rounded">
          Login as Admin
        </Link>
      </div>
    </div>
  );
}
