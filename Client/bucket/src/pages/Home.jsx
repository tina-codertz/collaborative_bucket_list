import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 to-blue-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">Bucket List App</h1>
          <div className="flex items-center space-x-4">
            <span className="text-white">Welcome, {user?.username}!</span>
            <Link 
              to="/profile"
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">its just a demo to test my profile part</h2>
          <p className="text-gray-600 mb-6">Your personal goals and dreams tracker</p>
          <Link 
            to="/profile"
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition inline-block"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;