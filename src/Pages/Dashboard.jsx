import React, { useState } from 'react';
import Menu from '../Components/Menu';
import Post from '../Components/Post';
import Leaderboard from '../Components/Leaderboard';
import Profile from '../Components/Profile';
import Signout from '../Components/Signout';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('leaderboard'); 

  const renderContent = () => {
    switch (activeView) {
      case 'post':
        return <Post />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      case 'signout':
        return <Signout />;
      default:
        return <Leaderboard />;
    }
  };

  return (
    <div className="dashboard-container">
      <Menu setActiveView={setActiveView} activeView={activeView} />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
