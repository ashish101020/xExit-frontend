import { createContext, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
      
      // Extract actual token
      const accessToken = res.data.token;  
      // const accessToken = res.data.token?.access?.token;  
      // console.log(accessToken);
      
      if (!accessToken) {
        return { success: false, message: "No token received" };
      }

      localStorage.setItem("token", accessToken);
      setUser(res.data.user);
      return { success: true };
    } catch {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
