import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="logo-home">TASKMASTER</h1>
      <div className="flow-wrapper">
        <div className="flow-step">📝 Post 3 tasks Everyday</div>
        <div className="arrow">➜</div>
        <div className="flow-step">🤖 Get Scored by AI</div>
        <div className="arrow">➜</div>
        <div className="flow-step">🏆 Compete on Leaderboard</div>
      </div>
      <Link to="/auth" className="auth-link">
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;
