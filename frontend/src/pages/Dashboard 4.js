import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="pt-32 p-6"> {/* Added pt-20 for top padding */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl mb-4">Welcome back, {userEmail || 'User'}!</h2>
        <p>This is your protected dashboard content.</p>
      </div>
    </div>
  );
};

export default Dashboard;