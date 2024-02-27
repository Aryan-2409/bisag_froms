import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Components/Dashboard";
import App from "./Components/App";
import Login from "./Components/login_component";
import SignUp from "./Components/signup_component";
import UserDetails from "./Components/userDetails";
import ImageUpload from "./Components/imageUpload.";
import AdminHome from "./Components/adminHome";
import AboutUs from "./Components/AboutUs";
import SideMenu from "./Components/SideMenu";
import HeaderMenu from "./Components/HeaderMenu";
import CreateUser from "./Components/CreateUser";
import ForgotPassword from "./Components/Forget-Password";
import ResetPassword from "./Components/ResetPassword";

const Main = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  console.log(isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to Dashboard if logged in, otherwise render Login */}
        {!isLoggedIn ? (
          <Route path="/" element={<Navigate to="/login" />} />
        ) : (
          <Route path="/" element={<Dashboard />}>
          
            <Route path="forms/all" element={<App />} />
            <Route path="users" element={<AdminHome />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="createuser" element={<CreateUser/>} />

          </Route>
        )}

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>


      </Routes>
    </BrowserRouter>
  );
};

export default Main;