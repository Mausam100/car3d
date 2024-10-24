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

  const handleCameraChange = (position, fov) => {
    setCameraPosition(position);
    setLookAt([0, 0, 0]);
    setFov(fov);
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
      <Canvas cameraPosition={cameraPosition} lookAt={lookAt} fov={fov} />
      <div className="absolute bottom-10 left-10 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleCameraChange([4, 1.5, 0], 30)} // Front View
        >
          Paint
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleCameraChange([6, -0.5, -7], 4)} // Side View
        >
          Alloys
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleCameraChange([4, 1, 4.5], 35)} // Top View
        >
          Back
        </button>
      </div>
    </main>
  );
};

export default CanvasContainer;
