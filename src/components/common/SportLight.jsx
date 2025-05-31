import React, { useEffect, useState } from "react";
 
const SportLight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
 
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
 
    window.addEventListener("mousemove", handleMouseMove);
 
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
 
  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        width: "150px", // Smaller width
        height: "150px", // Smaller height
        background: "rgba(0, 163, 255, 0.60)", // Desired color
        filter: "blur(100px)", // Reduced blur for smaller size
        borderRadius: "50%",
        top: position.y - 75, // Adjusted centering
        left: position.x - 75, // Adjusted centering
      }}
    ></div>
  );
};
 
export default SportLight;