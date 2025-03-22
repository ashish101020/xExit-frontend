import React, { useState } from "react"; 
import axios from "axios";
import { API_BASE_URL } from "../api/api";

const ResignationForm = () => {
  const [lwd, setLwd] = useState("");
  // const [reason, setReason] = useState(""); // Add reason field

  const submitResignation = async () => {
    if (!lwd) {
      alert("Please select your Last Working Day and provide a reason.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (lwd <= today) {
      alert("Last Working Day must be a future date.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/api/user/resign`,
        { lwd }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || "Resignation submitted!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Error submitting resignation");
      } else {
        alert("Network error. Please try again later.");
      }
    }
    
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Submit Resignation</h2>
      
      <label className="block mb-2">Last Working Day:</label>
      <input
        type="date"
        value={lwd}
        onChange={(e) => setLwd(e.target.value)}
        required
        className="input"
      />

      {/* <label className="block mt-3 mb-2">Reason for Resignation:</label>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
        className="input"
      /> */}

      <button onClick={submitResignation} className="btn mt-3">Submit</button>
    </div>
  );
};

export default ResignationForm;
