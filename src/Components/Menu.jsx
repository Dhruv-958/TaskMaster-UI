import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ setActiveView, activeView }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleToggleMenu = () => {
    if (menuOpen) {
      // Trigger closing animation
      setClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setClosing(false);
      }, 300); // match animation duration in CSS
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <>
      {!menuOpen && !closing && (
        <div className="menu-toggle-icon" onClick={handleToggleMenu}>
          <div className="bookmark-icon"/>
        </div>
      )}

      {(menuOpen || closing) && (
        <div className={`menu-container ${menuOpen ? 'open' : ''} ${closing ? 'closing' : ''}`}>
          <button className="close-button" onClick={handleToggleMenu}>×</button>
          <nav className="menu-links">
            <button onClick={() => setActiveView('post')} className={activeView === 'post' ? 'active' : ''}>post</button>
            <button onClick={() => setActiveView('leaderboard')} className={activeView === 'leaderboard' ? 'active' : ''}>leaderboard</button>
            <button onClick={() => setActiveView('profile')} className={activeView === 'profile' ? 'active' : ''}>profile</button>
            <button onClick={() => setActiveView('signout')} className={activeView === 'signout' ? 'active' : ''}>signout</button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Menu;
