// src/pages/AddItem.jsx
import React, { useState, useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddItem = () => {
  const { addItem } = useContext(ItemsContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      title,
      description,
      image: image ? URL.createObjectURL(image) : null,
    };

    addItem(newItem);
    navigate(`/item/${newItem.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Add a New Bucket Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter item title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              placeholder="Enter item description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Optional Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition">
                <span className="text-gray-500 text-center">
                  Click to upload or drag image here
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
            {image && (
              <p className="mt-2 text-green-600 font-medium">{image.name} selected</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
