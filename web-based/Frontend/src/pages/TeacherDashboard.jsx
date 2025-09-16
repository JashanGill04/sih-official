import DashboardLayout from "../layouts/DashboardLayout";

export default function TeacherDashboard() {
  return (
    <DashboardLayout role="teacher" title="Teacher Dashboard">
      <h3 className="text-lg font-bold">Class Attendance</h3>
      <p className="mt-2">List of students will appear here.</p>
    </DashboardLayout>
  );
}
