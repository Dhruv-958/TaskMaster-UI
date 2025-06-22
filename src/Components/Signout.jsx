import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

const Signout = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <p style={styles.message}>Confirm sign out?</p>
        <div style={styles.buttons}>
          <button style={styles.confirmBtn} onClick={handleConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#e8f5e9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem 2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 128, 0, 0.1)',
    textAlign: 'center',
  },
  message: {
    fontSize: '1.1rem',
    color: '#327563',
    marginBottom: '1rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  confirmBtn: {
    backgroundColor: '#327563',
    color: 'white',
    padding: '6px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    color: '#333',
    padding: '6px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Signout;
