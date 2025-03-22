import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

const QuestionnierePanel = () => {
  const [quesRes, setQuesRes] = useState([]);

  const [resignStatus, setResignStatus] = useState("pending");

  const token = localStorage.getItem("token");
  const fetchStatus = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/resign`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResignStatus(res.data.status);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/exit_responses", {
          headers: { Authorization: `Bearer ${token}` },
        } );

      setQuesRes(response.data.data);
    } catch (err) {
      console.error("Error fetching responses:", err);
    }
  };

  useEffect(() => {
    fetchRes();
    fetchStatus();
  }, []); 

  return (
    <div>
      <h2>Exit Interview Responses</h2>
      <h3>Resignation Status:{resignStatus}</h3>
      {quesRes.length === 0 ? (
        <p>No responses available</p>
      ) : (
        <ul>
          {quesRes.map((res, idx) => (
            <li key={idx}>
              <strong>{res.employeeId?.username}:</strong>
              <ul>
                {res.responses.map((r, index) => (
                  <li key={index}>
                    <strong>Q:</strong> {r.questionText} <br />
                    <strong>A:</strong> {r.response}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionnierePanel;
