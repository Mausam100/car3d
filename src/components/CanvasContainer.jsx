import React, { useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Canvas from "./Canvas";

gsap.registerPlugin(ScrollTrigger);

const CanvasContainer = () => {
  const [cameraPosition, setCameraPosition] = useState([4, 1, 4.5]);
  const [lookAt, setLookAt] = useState([0, 0, 0]);
  const [fov, setFov] = useState(30);
  const [paintColor, setPaintColor] = useState("goldenrod");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [alloyColor, setAlloyColor] = useState("grey"); // Default alloy color
  const [showAlloyPicker, setShowAlloyPicker] = useState(false);

  const handleCameraChange = (position, fov) => {
    setCameraPosition(position);
    setLookAt([0, 0, 0]);
    setFov(fov);
  };

  const handlePaintChange = (color) => {
    setPaintColor(color);
    setShowColorPicker(false); // Optionally hide color picker after selection
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker); // Toggle visibility
  };

  const handleBack = () => {
    setShowColorPicker(false); // Hide color picker and show all buttons
  };

  const handleAlloyChange = (color) => {
    setAlloyColor(color);
    setShowAlloyPicker(false); // Hide color picker after selection
  };

  const toggleAlloyPicker = () => {
    setShowAlloyPicker(!showAlloyPicker); // Toggle visibility of alloy color picker
  };

  useGSAP(() => {
    gsap.to(".cardiv", {
      opacity: 1,
      scrollTrigger: {
        trigger: "#parentDiv",
        start: "bottom bottom",
        end: "bottom bottom",
        scrub: 2,
        // markers: true,
      },
    });
  });
  
  return (
    <main className="cardiv bg-cover bg-center items-center w-full h-screen fixed top-0 left-0 opacity-0 bg-[#282222]">
      <Canvas cameraPosition={cameraPosition} lookAt={lookAt} fov={fov} paintColor={paintColor} alloyColor={alloyColor} />
      <div className="absolute bottom-10 left-10 space-x-4">
        {showColorPicker ? (
          <>
            <input
              type="color"
              value={paintColor}
              onChange={(e) => handlePaintChange(e.target.value)}
              className="w-10 h-10"
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleBack}
            >
              Back
            </button>
          </>
        ) : showAlloyPicker ? (
          <>
            <input
              type="color"
              value={alloyColor}
              onChange={(e) => handleAlloyChange(e.target.value)}
              className="w-10 h-10"
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleBack}
            >
              Back
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={()=>{
                handleCameraChange([4, 1.5, 0], 30);
                toggleColorPicker();
              }}
            >
              Paint
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={()=>{
                handleCameraChange([6, -0.5, -7], 4);
                toggleColorPicker();
              }}
            >
              Alloys
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleCameraChange([4, 1, 4.5], 35)} 
            >
              Back
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default CanvasContainer;
