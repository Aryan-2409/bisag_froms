import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import "./SideMenu.css";

const SideMenu = ({ userData }) => {
  return (
    <div className="sidemenu-container">
      <UserProfile userData={userData} />
      <div className="sidemenu-items">
        <Link to="/forms/all" className="sidemenu-item">
          Forms
        </Link>
        <Link to="/users" className="sidemenu-item">
          Users
        </Link>
        <Link to="/createuser" className="sidemenu-item">
          Create User
        </Link>
        <Link to="/about" className="sidemenu-item">
          About Us
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;