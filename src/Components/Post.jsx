import React, { useState } from 'react';
import axios from 'axios';
import './Post.css';

const Post = () => {
  const backend_url = import.meta.env.VITE_REACT_APP_BACKEND;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeTaken: '',
  });

  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backend_url}task/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setScore(res.data.score);
      setFormData({ title: '', description: '', timeTaken: '' });

      setTimeout(() => setScore(null), 5000);
    } catch (err) {
      alert('Task creation failed!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-wrapper">
      <div className="post-container">
        <h2 className="post-title">📌 Log Your Task</h2>

        {score !== null && (
          <div className="score-box">
            🎯 <strong>Task Score:</strong> {score.toFixed(2)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="post-form">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="timeTaken"
            placeholder="Time Taken (minutes)"
            value={formData.timeTaken}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
