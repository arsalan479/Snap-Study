import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../UserScreensPage/UserPage/Home";
import PublicRoute from "../ProtectAndPublicRoutes/PubliRoute";
import Checkauthgooglegithub from "../Components/WebComponents/Checkauthgooglegithub";

const UserRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/snapstudylogin"
          element={
            <PublicRoute>
              <Checkauthgooglegithub />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
};

export default UserRoute;
