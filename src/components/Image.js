import React, { useState } from "react";

export default function Image(props) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="w-1/3 p-1 border flex justify-center">
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <i
          className={`fas fa-times absolute right-0 cursor-pointer opacity-25 hover:opacity-100
          ${isHovering?"":"hidden"}`}
          onClick={() => props.handleRemove(props.index)}
        ></i>
        <img src={props.image} width="150" />
      </div>
    </div>
  );
}
