import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, TextField } from "@mui/material";

const AdminDashboard = () => {
  const [resignations, setResignations] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [exitDates, setExitDates] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchResignations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/resignations", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setResignations(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching resignations", error);
      }
    };
    fetchResignations();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleExitDateChange = (id, date) => {
    setExitDates((prev) => ({ ...prev, [id]: date }));
  };

  const handleSubmit = async (id) => {
    const status = statusUpdates[id] || "pending";
    const lwd = exitDates[id];

    if (status === "approved" && !lwd) {
      alert("Please set an exit date before approving.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:8080/api/admin/conclude_resignation",
        { resignationId: id, approved: status === "approved", lwd },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setResignations((prev) =>
        prev.map((res) => (res._id === id ? { ...res, status, lwd } : res))
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleView = (id) => {
    navigate("/QuestionnierePanel");
  }
  // console.log(resignations[0].employeeId.username);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Last Working Day</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Exit Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resignations.map((resignation) => (
            <TableRow key={resignation._id}>
              <TableCell>{resignation.username}</TableCell>
              <TableCell>{resignation.lwd ? new Date(resignation.lwd).toLocaleDateString() : "Not Set"}</TableCell>
              <TableCell>
                <Select
                  value={statusUpdates[resignation._id] || resignation.status}
                  onChange={(e) => handleStatusChange(resignation._id, e.target.value)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  disabled={statusUpdates[resignation._id] !== "approved"}
                  onChange={(e) => handleExitDateChange(resignation._id, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit(resignation._id)}
                >
                  Submit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleView(resignation.employeeId._id)}
                >
                  View Questionniere
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminDashboard;
