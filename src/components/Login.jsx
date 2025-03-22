import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!credentials.username || !credentials.password) {
      setError("Username and Password are required");
      return;
    }

    setLoading(true);
    const response = await login(credentials);
    setLoading(false);

    if (response.success) {
      navigate("/");
    } else {
      setError(response.message || "Login failed");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Login</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input"
          onChange={handleChange}
          value={credentials.username}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
          value={credentials.password}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-3">Create new account</p>
      <button className="btn mt-2" onClick={() => navigate("/register")}>Register</button>
    </div>
  );
};

export default Login;
