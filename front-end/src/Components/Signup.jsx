import React, { useState, useEffect } from "react";
import "./Signup.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  },[]);
  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:6500/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(err=>{
      console.log("Signup collectData");
      console.log(err.message);
    })
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate("/");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="signup-container">
      <h1>Register</h1>
      <form className="signup-form">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button onClick={collectData} type="button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
