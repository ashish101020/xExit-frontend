import React from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
const EmployeeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Employee Dashboard</h2>
      {/* <h3>Resign Status: {resignStatus}</h3> */}
      <button onClick={() => navigate("/resign")}>Submit Resignation</button>
      <button onClick={() => navigate("/exit-interview")}>Complete Exit Interview</button>
    </div>
  );
};

export default EmployeeDashboard;
