import React, { useState, useEffect } from "react";
import "./Login.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const collectData = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:6500/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(err=>{
      console.log('Login collectData');
      console.log(err.message);
    })
    result = await result.json();
    console.warn(result);

    if (result.auth) {
       localStorage.setItem("user", JSON.stringify(result.user));
       localStorage.setItem("token", JSON.stringify(result.auth));
   navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="signup-container">
      <h1>Login</h1>
      <form className="signup-form">
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
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
