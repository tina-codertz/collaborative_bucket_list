import React, { createContext, useState, useContext } from "react";

// Create context
const AuthContext = createContext();

// Custom hook
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      // TODO: Add real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Temporary login to avoid warnings
      const loggedUser = {
        username: credentials.username || "user",
        email: `${credentials.username}@example.com`,
      };

      setUser(loggedUser);

      return { success: true };
    } catch {
      return { success: false, error: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Register function  
  const register = async (userData) => {
    setLoading(true);
    try {
      // TODO: Add real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        username: userData.username,
        email: userData.email,
      };

      setUser(newUser);

      return { success: true };
    } catch {
      return { success: false, error: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Change password function
  const changePassword = async () => {
    setLoading(true);
    try {
      // TODO: Add real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return { success: true };
    } catch {
      return { success: false, error: "Password change failed" };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export only components (no functions/variables)
export { AuthProvider, useAuth };