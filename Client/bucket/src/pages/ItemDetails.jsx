// src/pages/ItemDetails.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";

const ItemDetails = () => {
  const { id } = useParams();
  const { items } = useContext(ItemsContext);

  const item = items.find((i) => i.id.toString() === id);

  if (!item) return <p>Item not found</p>;

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </div>
  );
};

export default ItemDetails;
