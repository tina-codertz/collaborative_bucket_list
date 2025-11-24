import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

const Profile = () => {
  const { user, changePassword, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    fullName: user?.fullName || '',
    bio: user?.bio || '🌟 Dreamer & Adventurer 🌟',
    location: user?.location || 'Somewhere in the world',
    website: user?.website || '',
    phone: user?.phone || ''
  });
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ==================== BACKEND CONFIGURATION ====================
  // TODO: Set your backend API base URL here when backend is ready
  const API_BASE_URL = 'http://localhost:8000/api'; // Change to your backend URL
  // ==================== END BACKEND CONFIGURATION ====================

  // Real statistics based on user data
  const [statistics, setStatistics] = useState({
    totalItems: 12,
    completed: 5,
    active: 7,
    totalVotes: 42
  });

  // ==================== BACKEND INTEGRATION POINT 1: Fetch Statistics ====================
  const fetchUserStatistics = useCallback(async () => {
    try {
      // TODO: REPLACE THIS MOCK DATA WITH REAL BACKEND API CALL
      // UNCOMMENT THE CODE BELOW WHEN BACKEND IS READY:
      /*
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/${user?.id}/statistics/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const stats = await response.json();
        setStatistics({
          totalItems: stats.total_items || stats.totalItems || 0,
          completed: stats.completed_items || stats.completed || 0,
          active: stats.active_items || stats.active || 0,
          totalVotes: stats.total_votes || stats.totalVotes || 0,
        });
      } else {
        throw new Error('Failed to fetch statistics');
      }
      */

      // CURRENT MOCK DATA - DELETE THIS BLOCK WHEN BACKEND IS READY
      const mockStats = {
        totalItems: 12,
        completed: 5,
        active: 7,
        totalVotes: 42
      };
      setStatistics(mockStats);
      // END OF MOCK DATA

    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      setStatistics({
        totalItems: 0,
        completed: 0,
        active: 0,
        totalVotes: 0,
      });
    }
  }, []);

  useEffect(() => {
    fetchUserStatistics();
  }, [fetchUserStatistics]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  // ==================== BACKEND INTEGRATION POINT 2: Profile Picture Upload ====================
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // TODO: REPLACE THIS MOCK UPLOAD WITH REAL BACKEND API CALL
        // UNCOMMENT THE CODE BELOW WHEN BACKEND IS READY:
        /*
        const formData = new FormData();
        formData.append('profile_picture', file);
        
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/users/${user?.id}/profile-picture/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setProfilePic(data.profile_picture_url || data.image_url);
          setMessage('🎉 Profile picture updated!');
        } else {
          throw new Error('Failed to upload profile picture');
        }
        */

        // CURRENT MOCK UPLOAD - DELETE THIS BLOCK WHEN BACKEND IS READY
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfilePic(e.target.result);
          setMessage('🎉 Profile picture updated!');
        };
        reader.readAsDataURL(file);
        // END OF MOCK UPLOAD

      } catch (error) {
        console.error('Upload error:', error);
        setMessage('❌ Failed to upload profile picture');
      }
    }
  };

  // ==================== BACKEND INTEGRATION POINT 3: Profile Update ====================
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: REPLACE THIS MOCK UPDATE WITH REAL BACKEND API CALL
      // UNCOMMENT THE CODE BELOW WHEN BACKEND IS READY:
      /*
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/${user?.id}/profile/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: profileData.username,
          email: profileData.email,
          full_name: profileData.fullName,
          bio: profileData.bio,
          location: profileData.location,
          website: profileData.website,
          phone: profileData.phone,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setMessage('✅ Profile updated successfully!');
        setIsEditing(false);
        // Update user context here if needed
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Profile update failed');
      }
      */

      // CURRENT MOCK UPDATE - DELETE THIS BLOCK WHEN BACKEND IS READY
      setTimeout(() => {
        setMessage('✅ Profile updated successfully!');
        setLoading(false);
        setIsEditing(false);
      }, 1000);
      // END OF MOCK UPDATE

    } catch (error) {
      setMessage('❌ ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ==================== BACKEND INTEGRATION POINT 4: Change Password ====================
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("❌ Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      // TODO: REPLACE THIS MOCK PASSWORD CHANGE WITH REAL BACKEND API CALL
      // UNCOMMENT THE CODE BELOW WHEN BACKEND IS READY:
      /*
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/auth/change-password/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setMessage('✅ Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Password change failed');
      }
      */

      // CURRENT MOCK PASSWORD CHANGE - DELETE THIS BLOCK WHEN BACKEND IS READY
      const result = await changePassword(passwordData);
      if (result.success) {
        setMessage('✅ Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        throw new Error(result.error);
      }
      // END OF MOCK PASSWORD CHANGE

    } catch (error) {
      setMessage('❌ ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setProfileData({
      username: user?.username || '',
      email: user?.email || '',
      fullName: user?.fullName || '',
      bio: user?.bio || '🌟 Dreamer & Adventurer 🌟',
      location: user?.location || 'Somewhere in the world',
      website: user?.website || '',
      phone: user?.phone || ''
    });
  };

  const completionPercentage = Math.round((statistics.completed / statistics.totalItems) * 100);

  return (
    <div className="min-h-screen bg-line-to-br from-slate-50 to-blue-50 py-6">
      <div className="max-w-lg mx-auto px-4">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-slate-600 hover:text-slate-800 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:shadow-md transition-shadow">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="ml-2 font-medium">Back</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          {/* Profile Header with Gradient */}
          <div className="relative bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 p-8 pb-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
                backgroundSize: '100px 100px'
              }}></div>
            </div>
            
            {/* Profile Picture */}
            <div className="relative flex justify-center -mb-20">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-2xl flex items-center justify-center overflow-hidden">
                  {profilePic ? (
                    <img 
                      src={profilePic} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white text-3xl font-bold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* Camera Icon */}
                <label className="absolute -bottom-2 -right-2 bg-white text-purple-600 rounded-full p-3 cursor-pointer hover:scale-110 transition-transform shadow-lg border border-purple-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleProfilePicChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-6 pb-6">
            {/* Username and Bio */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-800 mb-2">{user?.username}</h1>
              <p className="text-slate-600 text-lg leading-relaxed">{profileData.bio}</p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center justify-center p-3 bg-slate-50 rounded-xl">
                <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-slate-700 font-medium">{user?.email}</span>
              </div>
              
              <div className="flex items-center justify-center p-3 bg-slate-50 rounded-xl">
                <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-slate-700 font-medium">{profileData.location}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-800">{statistics.totalItems}</div>
                  <div className="text-xs text-slate-600 font-medium">GOALS</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{statistics.completed}</div>
                  <div className="text-xs text-slate-600 font-medium">DONE</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{statistics.active}</div>
                  <div className="text-xs text-slate-600 font-medium">ACTIVE</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Progress</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-linear-to-r from-green-400 to-green-500 h-2 rounded-full shadow-sm transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleEditProfile}
                className="flex-1 bg-linear-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                ✏️ Edit Profile
              </button>
          
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex bg-white rounded-2xl shadow-sm p-1 mb-6">
          {['profile', 'stats', 'password'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab 
                  ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'profile' && '👤 Profile'}
              {tab === 'stats' && '📊 Stats'} 
              {tab === 'password' && '🔒 Password'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {message && (
            <div className={`p-4 rounded-xl mb-6 ${
              message.includes('✅') 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {activeTab === 'profile' && isEditing && (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    rows="2"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                    placeholder="Tell your story..."
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="Where are you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="Your phone"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-linear-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? '💫 Saving...' : '💾 Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'stats' && (
            <div className="text-center">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold mb-1">{statistics.totalItems}</div>
                  <div className="text-blue-100 text-sm">Total Goals</div>
                </div>
                <div className="bg-linear-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold mb-1">{statistics.completed}</div>
                  <div className="text-green-100 text-sm">Completed</div>
                </div>
                <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold mb-1">{statistics.active}</div>
                  <div className="text-purple-100 text-sm">In Progress</div>
                </div>
                <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold mb-1">{statistics.totalVotes}</div>
                  <div className="text-orange-100 text-sm">Total Votes</div>
                </div>
              </div>
              <div className="text-slate-600 text-sm">
                🎉 Keep going! You're doing amazing!
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Confirm new password"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 mt-4"
              >
                {loading ? '🔄 Updating...' : '🔐 Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;