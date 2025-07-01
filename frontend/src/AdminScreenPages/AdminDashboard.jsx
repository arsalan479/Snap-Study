import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get("success");
    const name = params.get("name");
    const userRole = params.get("role"); // Get role from URL params

    if (success === "true" && name) {
      // Set role if available
      if (userRole) {
        setRole(userRole);
        localStorage.setItem("userRole", userRole);
      }

      // Customize welcome message based on role
      const welcomeMessage = userRole 
        ? `Welcome back ${userRole} ${name}!` 
        : `Welcome back ${name}!`;

      toast.success(welcomeMessage, { id: "welcome-toast" });
      localStorage.setItem("userName", name);
      setUserName(name);

      // Clean URL after showing message
      window.history.replaceState({}, document.title, location.pathname);
    } else {
      // On page reload, get data from localStorage
      const savedName = localStorage.getItem("userName");
      const savedRole = localStorage.getItem("userRole");
      
      if (savedName) {
        setUserName(savedName);
      }
      if (savedRole) {
        setRole(savedRole);
      }
    }
  }, [location]);

  return (
    <div>AdminDashboard</div>
  );
};

export default AdminDashboard;