import DashboardLayout from "../layouts/DashboardLayout";

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
      <h3 className="text-lg font-bold">Analytics</h3>
      <p className="mt-2">Attendance trends and reports will appear here.</p>
    </DashboardLayout>
  );
}
