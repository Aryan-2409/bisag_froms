import React, { useState } from "react";
import "./signup_component.css";

export default function CreateUser() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(fname, lname, email, password);

    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
        userType: "User", // Set a default user type, e.g., "User"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Registration Successful");
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <div className="signup-bg">
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <h3>Create Users</h3>

          <div className="form-div">
            <label>First name</label>
            <input
              type="text"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="form-div">
            <label>Last name</label>
            <input
              type="text"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="form-div">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-div">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          {/* <p className="forgot-password text-right">
            Already registered <a href="/">sign in?</a>
          </p> */}
        </form>
      </div>
    </div>
  ); 
}



  