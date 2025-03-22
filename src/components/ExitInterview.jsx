import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

const ExitInterview = () => {
  const [responses, setResponses] = useState([
    { questionText: "", response: "" },
  ]);

  const handleChange = (index, field, value) => {
    const newResponses = [...responses];
    newResponses[index][field] = value;
    setResponses(newResponses);
  };

  const addResponse = () => {
    setResponses([...responses, { questionText: "", response: "" }]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in again.");
        return;
      }
      
      const formattedResponses = responses.map(resp => ({
        questionText: resp.questionText.trim(),
        response: resp.response.trim(),
      }));
      
      await axios.post(
        `${API_BASE_URL}/api/user/responses`,
        { responses: formattedResponses },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert("Exit interview submitted successfully!");
      setResponses([{ questionText: "", response: "" }]);
    } catch (error) {
      alert(error.response?.data?.message || "Submission failed! Please try again.");
    }
  };
  
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Exit Interview
        </Typography>
        {responses.map((resp, idx) => (
          <Box key={idx} mb={2}>
            <TextField
              label="Question"
              fullWidth
              value={resp.questionText}
              onChange={(e) => handleChange(idx, "questionText", e.target.value)}
              required
              margin="normal"
            />
            <TextField
              label="Answer"
              fullWidth
              multiline
              rows={3}
              value={resp.response}
              onChange={(e) => handleChange(idx, "response", e.target.value)}
              required
              margin="normal"
            />
          </Box>
        ))}
        <Button variant="outlined" color="primary" onClick={addResponse} sx={{ mb: 2 }}>
          + Add Another Question
        </Button>
        <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default ExitInterview;
