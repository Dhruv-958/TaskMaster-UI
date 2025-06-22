/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const backend_url = import.meta.env.VITE_REACT_APP_BACKEND;


  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteTasksModal, setShowDeleteTasksModal] = useState(false);
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get( `${backend_url}user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        setUpdatedName(res.data.user.name);
        setUpdatedEmail(res.data.user.email);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [backend_url, token]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${backend_url}task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((task) => task._id !== taskId),
      }));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${backend_url}user/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => setShowPasswordModal(false), 1500);
    } catch (err) {
      setPasswordMessage(err.response?.data?.message || "Error updating password");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${backend_url}user/profile`,
        { name: updatedName, email: updatedEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUpdateMessage(res.data.message);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setUpdateMessage(err.response?.data?.message || "Update failed");
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      await axios.delete(`${backend_url}user/delete-tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData((prev) => ({ ...prev, tasks: [] }));
      setShowDeleteTasksModal(false);
    } catch (err) {
      alert("Failed to delete tasks");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`${backend_url}user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      alert("Failed to delete profile");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>User not found</div>;

  const { user, tasks, totalScore, monthlyScore } = userData;

  return (
    <div className="profile-container">
      <div className="profile-left">
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>

        <div className="profile-summary">
          <h4>Summary:</h4>
          <p>Total Tasks: {tasks.length}</p>
          <p>Total Score: {totalScore.toFixed(2)}</p>
          <p>Monthly Score: {monthlyScore.toFixed(2)}</p>
        </div>

        <div className="account-settings">
          <h4>Account Settings</h4>
          <button onClick={() => setShowUpdateModal(true)}>Update Profile</button>
          <button onClick={() => setShowPasswordModal(true)}>Change Password</button>
          <button onClick={() => setShowDeleteTasksModal(true)}>Delete All Tasks</button>
          <button onClick={() => setShowDeleteProfileModal(true)}>Delete Profile</button>
        </div>
      </div>

      <div className="profile-right">
        <h3>Your Tasks</h3>
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p><strong>Time:</strong> {task.timeTaken} mins</p>
              <p><strong>Score:</strong> {task.score.toFixed(2)}</p>
              <p className="created-at">Created: {new Date(task.createdAt).toLocaleString()}</p>
              <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Change Password</h3>
            <form onSubmit={handleChangePassword}>
              <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
              <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setShowPasswordModal(false)}>Cancel</button>
              {passwordMessage && <p className="msg">{passwordMessage}</p>}
            </form>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Profile</h3>
            <form onSubmit={handleUpdateProfile}>
              <input type="text" placeholder="Name" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} required />
              <input type="email" placeholder="Email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} required />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowUpdateModal(false)}>Cancel</button>
              {updateMessage && <p className="msg">{updateMessage}</p>}
            </form>
          </div>
        </div>
      )}

      {showDeleteTasksModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete All Tasks?</h3>
            <button onClick={handleDeleteAllTasks}>Yes, Delete All</button>
            <button onClick={() => setShowDeleteTasksModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showDeleteProfileModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete your profile?</h3>
            <button onClick={handleDeleteProfile}>Yes, Delete Profile</button>
            <button onClick={() => setShowDeleteProfileModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
