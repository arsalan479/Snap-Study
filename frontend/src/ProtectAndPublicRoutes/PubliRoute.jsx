import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { axiosinstance } from "../AxiosInstance/axios.js";

const PublicRoute = ({ children }) => {
  const [authState, setAuthState] = useState({ loading: true, isAuthenticated: false, role: null });

  useEffect(() => {
      axiosinstance.get("/auth/magic/checkalreadyuserloggedin", {
      })
      .then((res) => {
        setAuthState({
          loading: false,
          isAuthenticated: res.data.isAuthenticated,
          role: res.data.role,
        });
      })
      .catch(() => {
        setAuthState({ loading: false, isAuthenticated: false, role: null });
      });
  }, []);

  if (authState.loading) return <div>Loading...</div>;

  if (authState.isAuthenticated) {
    if (authState.role === "admin") return <Navigate to="/AdminDashboard" />;
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;
