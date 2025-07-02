import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { axiosinstance } from "../AxiosInstance/axios.js";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState({
    loading: true,
    isAuthenticated: false,
    role: null,
    checked: false, // NEW: to avoid multiple calls
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.checked) return; // prevent duplicate checks

    axiosinstance
      .get("/auth/magic/verifytoken", { withCredentials: true })
      .then((res) => {
        setAuthState({
          loading: false,
          isAuthenticated: true,
          role: res.data.user.role,
          checked: true,
        });
      })
      .catch((err) => {
        const status = err.response?.status;

        if (status === 403) {
          toast.error("Your session has been revoked (blacklisted token).");
        } else if (status === 401) {
          toast.error("Unauthorized. Please login again.");
        } else {
          toast.error("Authentication error.");
        }

        // Clear cookie so it doesn't loop
        document.cookie = "token=; Max-Age=0; path=/";

        setAuthState({
          loading: false,
          isAuthenticated: false,
          role: null,
          checked: true,
        });

        // Delay redirect slightly to show toast
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      });
  }, [authState.checked, navigate]);

  if (authState.loading) return <div>Loading...</div>;

  if (!authState.isAuthenticated) return null; // prevent double render

  // Admin route guard
  if (location.pathname === "/AdminDashboard" && authState.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
