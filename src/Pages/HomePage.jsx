import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      this is the Home page.
      <Link to="/dashboard">Go to Dashboard</Link>
      <Link to="/auth">Go to Auth</Link>
    </div>
  )
}

export default HomePage
