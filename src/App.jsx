import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import HomePage from './Pages/HomePage';
import UserProfile from './Pages/UserProfile';
import Auth from './Pages/Auth';
import './App.css';

function App() {
  return (
    <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />

      {/* Protected Routes */}
      <Route path="/dashboard/:id" element={<Dashboard />} />
      <Route path="/profile/:id" element={<UserProfile />} />

    </Routes>
  </Router>
  );
}

export default App;
