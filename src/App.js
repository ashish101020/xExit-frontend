import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ExitInterview from "./components/ExitInterview";
import ResignationForm from "./components/ResignationForm";
import QuestionnierePanel from "./components/QuestionnierePanel";

function App() {
  const { user } = useContext(AuthContext);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setIsAuthChecked(true);
  }, [user]);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/exit-interview" element={user ? <ExitInterview /> : <Navigate to="/" />} />
        <Route path="/resign" element={user ? <ResignationForm /> : <Navigate to="/" />} />
        <Route path="/QuestionnierePanel" element={user ? <QuestionnierePanel /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
