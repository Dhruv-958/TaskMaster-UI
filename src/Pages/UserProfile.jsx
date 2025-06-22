import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 👈 import useNavigate
import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
  const backend_url = import.meta.env.VITE_REACT_APP_BACKEND;

  const { id } = useParams();
  const navigate = useNavigate(); // 👈 initialize
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backend_url}user/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading user profile", err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token, backend_url]);

  if (loading) return <div>Loading user...</div>;
  if (!userData) return <div>User not found</div>;

  const { user, tasks, totalScore, monthlyScore } = userData;

  return (
    <div className="user-profile-container">
      <button className="back-btn" onClick={() => navigate(`/dashboard/${id}`)}>⬅ Back to Dashboard</button>

      <div className="profile-left">
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>

        <div className="profile-summary">
          <p><strong>Total Tasks:</strong> {tasks.length}</p>
          <p><strong>Total Score:</strong> {totalScore.toFixed(2)}</p>
          <p><strong>Monthly Score:</strong> {monthlyScore.toFixed(2)}</p>
        </div>
      </div>

      <div className="profile-right">
        <h3>Task History</h3>
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p><strong>Time Taken:</strong> {task.timeTaken} mins</p>
              <p><strong>Score:</strong> {task.score.toFixed(2)}</p>
              <p className="created-at">Created: {new Date(task.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
