import React, { useState } from "react";

const CollectorCard = () => {
  const [isHovered, setIsHovered] = useState(false); // to track whether the card is currently being hovered over.
  return (
    <>
      <div
        className={`image ${isHovered ? "hovered" : ""}`} // to add the shadow effect to the card
        onMouseEnter={() => setIsHovered(true)}    // event handlers to toggle the 'isHovered' state
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3>CollectorCard</h3>
        <p>card content</p>
      </div>
    </>
  );
};

export default CollectorCard;
