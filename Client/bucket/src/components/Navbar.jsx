// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "text-purple-600 font-bold"
      : "text-gray-700 hover:text-purple-600 font-medium";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-purple-600 font-bold text-xl">
            BucketList
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/add" className={linkClass("/add")}>
              Add Item
            </Link>
            <Link to="/login" className={linkClass("/login")}>
              Login
            </Link>
            <Link to="/signup" className={linkClass("/signup")}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
