import React, { useState } from "react";
import { SwatchesPicker } from "react-color";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Canvas from "./Canvas";

gsap.registerPlugin(ScrollTrigger);

const CanvasContainer = () => {
  const [cameraPosition, setCameraPosition] = useState([4, 1, 4.5]);
  const [lookAt, setLookAt] = useState([0, 0, 0]);
  const [fov, setFov] = useState(30);
  const [paintColor, setPaintColor] = useState("#820014");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [alloyColor, setAlloyColor] = useState("grey");
  const [showAlloyPicker, setShowAlloyPicker] = useState(false);
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(false);

  // Update camera position and FOV
  const updateCamera = (position, fov) => {
    setCameraPosition(position);
    setLookAt([0, 0, 0]);
    setFov(fov);
  };

  // Handle color change for paint
  const handlePaintChange = (color) => setPaintColor(color.hex);

  // Handle color change for alloys
  const handleAlloyChange = (color) => setAlloyColor(color.hex);

  // Toggle color pickers visibility
  const togglePicker = (picker) => {
    setShowColorPicker(picker === "paint" ? !showColorPicker : false);
    setShowAlloyPicker(picker === "alloy" ? !showAlloyPicker : false);
  };

  // Handle back button to reset the UI and camera
  const handleBack = () => {
    togglePicker(); // Hide all pickers
    updateCamera([4, 1, 4.5], 35); // Reset camera
  };

  // Scroll animation effect for opacity
  useGSAP(() => {
    gsap.to(".cardiv", {
      opacity: 1,
      scrollTrigger: {
        trigger: "#parentDiv",
        start: "bottom bottom",
        end: "bottom bottom",
        scrub: 2,
      },
    });
  });

  return (
    <main className="cardiv bg-cover bg-center items-center w-full h-screen fixed top-0 left-0 opacity-0 bg-[#282222]">
      <Canvas
        cameraPosition={cameraPosition}
        lookAt={lookAt}
        fov={fov}
        paintColor={paintColor}
        alloyColor={alloyColor}
        orbitControlsEnabled={orbitControlsEnabled}
      />
      <div className="absolute font-mono bottom-10 left-10 space-x-4">
        {showColorPicker ? (
          <>
            <SwatchesPicker color={paintColor} onChange={handlePaintChange} />
            <button
              className="bg-zinc-700 text-white px-4 py-2 rounded"
              onClick={handleBack}
            >
              Back
            </button>
          </>
        ) : showAlloyPicker ? (
          <>
            <SwatchesPicker color={alloyColor} onChange={handleAlloyChange} />
            <button
              className="bg-zinc-700 text-white px-4 py-2 rounded"
              onClick={handleBack}
            >
              Back
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={() => {
                updateCamera([4, 1.5, 0], 30);
                togglePicker("paint");
              }}
            >
              Color
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={() => {
                updateCamera([6, -0.5, -7], 4);
                togglePicker("alloy");
              }}
            >
              Alloys
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={() => updateCamera([4, 1, 4.5], 35)}
            >
              Back
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={() => setOrbitControlsEnabled(!orbitControlsEnabled)}
            >
              {orbitControlsEnabled ? "Disable OrbitControls" : "Enable OrbitControls"}
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default CanvasContainer;
