import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const backend_url = import.meta.env.VITE_REACT_APP_BACKEND;
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${backend_url}auth/signup`, signupData);
      alert("Signup successful!");
      console.log(res.data);
      setSignupData({ name: "", email: "", password: "" }); // Clear form
    } catch (err) {
      alert("Signup failed.");
      console.error(err);
    }
  };

  const handleSignin = async () => {
    try {
      const res = await axios.post(`${backend_url}auth/signin`, signinData);
      alert("Signin successful!");
      console.log(res.data);

      const { token, user } = res.data;

      // ✅ Save token and user to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setSigninData({ email: "", password: "" });

      navigate(`/dashboard/${user.id}`); // Route to user dashboard
    } catch (err) {
      alert("Signin failed.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="logo">TASKMASTER</h1>
      <button className="back-btn" onClick={() => navigate(`/`)}>⬅ Back to Homepage</button>
      <div className="auth-box">
        {/* SignUp Section */}
        <div className="auth-section signup-section">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={signupData.name}
            onChange={(e) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <button className="signup-btn" onClick={handleSignup}>
            Sign Up
          </button>
        </div>

        {/* SignIn Section */}
        <div className="auth-section signin-section">
          <h2>Sign In</h2>
          <input type="text" placeholder="Name" className="hidden-input" />
          <input
            type="email"
            placeholder="Email"
            value={signinData.email}
            onChange={(e) =>
              setSigninData({ ...signinData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={signinData.password}
            onChange={(e) =>
              setSigninData({ ...signinData, password: e.target.value })
            }
          />
          <button className="signin-btn" onClick={handleSignin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
