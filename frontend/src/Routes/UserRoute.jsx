import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../UserScreensPage/UserPage/Home";
import PublicRoute from "../ProtectAndPublicRoutes/PubliRoute";
import Checkauthgooglegithub from "../Components/WebComponents/Checkauthgooglegithub";
import MainSystem from "../UserScreensPage/UserPage/MainSystem";
import ProtectedRoute from "../ProtectAndPublicRoutes/ProtectedRoute";
 import Googleinput from '../UserScreensPage/Googleinput';
import { GoogleOTP } from '../UserScreensPage/GoogleOTP';

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
        <Route path="/home" element={
          <ProtectedRoute>
            <MainSystem/>
          </ProtectedRoute>
        } />



 <Route path="/googleregister" element={
        <PublicRoute>
          <Googleinput/>
        </PublicRoute>
      }/>
      <Route path="/googleOTP" element={
        <PublicRoute>
          <GoogleOTP/>
        </PublicRoute>
      }/>


      </Routes>
    </>
  );
};

export default UserRoute;
