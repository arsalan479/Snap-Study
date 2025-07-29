import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../AdminScreenPages/AdminDashboard";
import ProtectedRoute from "../ProtectAndPublicRoutes/ProtectedRoute";

const AdminRoute = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRoute;
