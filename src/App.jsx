import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import HomePage from './Pages/HomePage';
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
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  );
}

export default App;
