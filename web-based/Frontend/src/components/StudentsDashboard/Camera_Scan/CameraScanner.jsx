import React, { useState } from "react";

const CameraScanner = () => {
  const [status, setStatus] = useState("");

  const handleScan = async () => {
    try {
      setStatus("🔄 Opening camera & verifying...");
      const res = await fetch("http://localhost:5000/api/start-recognition", {
        method: "POST",
      });

      const data = await res.json();
      if (data.success) {
        setStatus(`✅ Verified: ${data.name}`);
      } else {
        setStatus("❌ Face not recognized. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("⚠️ Server error. Unable to start recognition.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Face Scan Attendance</h2>

      <button
        onClick={handleScan}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Start Face Recognition
      </button>

      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </div>
  );
};

export default CameraScanner;
