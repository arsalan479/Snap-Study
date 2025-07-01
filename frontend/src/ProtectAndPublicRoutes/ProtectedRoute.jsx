import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosinstance } from "../AxiosInstance/axios.js";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState({ loading: true, isAuthenticated: false, role: null });
  const location = useLocation();

  useEffect(() => {
    
      axiosinstance.get("/auth/magic/verifytoken", {
        withCredentials:true
      })
      .then((res) => {
        setAuthState({
          loading: false,
          isAuthenticated: true,
          role: res.data.user.role,
        });
      })
      .catch(() => {
        setAuthState({ loading: false, isAuthenticated: false, role: null });
      });
  }, []);

  if (authState.loading) return <div>Loading...</div>;

  if (!authState.isAuthenticated) return <Navigate to="/" />;

  // 👇 Block access to admin route if not admin
  if (location.pathname === "/AdminDashboard" && authState.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
