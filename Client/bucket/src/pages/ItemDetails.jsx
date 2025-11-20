// src/pages/ItemDetails.jsx
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";
import Navbar from "../components/Navbar";

const ItemDetails = () => {
  const { id } = useParams();
  const { items } = useContext(ItemsContext);
  const navigate = useNavigate();

  const item = items.find((i) => i.id.toString() === id);

  if (!item)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Navbar />
        <p className="text-red-500 text-xl mt-10">Item not found!</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
        {/* Display Image if uploaded */}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
        )}

        <h1 className="text-3xl font-bold text-blue-600 mb-4">{item.title}</h1>
        <p className="text-gray-700 mb-6">{item.description}</p>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
