// src/pages/Home.jsx
import React, { useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";
import BucketItemCard from "../components/BucketItemCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const { items } = useContext(ItemsContext);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-32 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to Your Bucket List!
        </h1>
        <p className="text-lg md:text-xl mb-6 drop-shadow-md">
          Discover, add, and track amazing experiences you want to achieve in life.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Why Choose Our Bucket List?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">Track Your Goals</h3>
            <p className="text-gray-600">Easily add and monitor your bucket list items.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">Stay Motivated</h3>
            <p className="text-gray-600">Get reminders and inspiration for each goal.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">Share with Friends</h3>
            <p className="text-gray-600">Show your achievements and explore ideas from others.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
