// src/components/BucketItemCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const BucketItemCard = ({ item }) => {
  return (
    <div className="bucket-item-card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <Link to={`/items/${item.id}`}>View Details</Link>
    </div>
  );
};

export default BucketItemCard;
