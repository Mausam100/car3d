import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model from "../components/Model";
import Garage from "../components/Garage";
import CameraControl from "./CameraControl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const CanvasBox = ({cameraPosition, lookAt, fov}) => {
    
  return (
    <Canvas>
        <CameraControl position={cameraPosition} lookAt={lookAt} fov={fov} />
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 5, 5]} />
        <Environment preset="night" />
        <fog attach="fog" args={["#282222", 5, 15]} />
        <Garage position={[0, -0.55, -3.5]} />
        <Model />
        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
  )
}

export default CanvasBox;