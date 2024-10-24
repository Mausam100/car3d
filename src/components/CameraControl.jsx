import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

const CameraControl = ({ position, lookAt, fov }) => {
  const { camera } = useThree();
  const cameraRef = useRef();

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useEffect(() => {
    if (cameraRef.current) {
      // Animate camera position
      gsap.to(cameraRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => cameraRef.current.lookAt(...lookAt), // Ensure the camera looks at the target
      });

      // Animate camera FOV
      gsap.to(cameraRef.current, {
        fov: fov, // Update the FOV
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => cameraRef.current.updateProjectionMatrix(), // Update the projection matrix
      });
    }
  }, [position, lookAt, fov]); // Dependencies include fov for FOV updates

  return null; // This component does not render anything
};

export default CameraControl;
