import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "../pages/AdminDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import { Container, Button, CircularProgress, Box } from "@mui/material";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user || !user.role) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {user.role === "Employee" ? <EmployeeDashboard /> : <AdminDashboard />}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
