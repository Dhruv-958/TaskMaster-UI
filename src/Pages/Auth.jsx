import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth = () => {
  const backend_url =  import.meta.env.VITE_REACT_APP_BACKEND;

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
  });

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${backend_url}auth/signup`, signupData);
      alert('Signup successful!');
      console.log(res.data);
    } catch (err) {
      alert('Signup failed.');
      console.error(err);
    }
  };

  const handleSignin = async () => {
    try {
      const res = await axios.post(`${backend_url}auth/signin`, signinData);
      alert('Signin successful!');
      console.log(res.data);
    } catch (err) {
      alert('Signin failed.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="logo">TASKMASTER</h1>
      <div className="auth-box">
        {/* SignUp Section */}
        <div className="auth-section signup-section">
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
