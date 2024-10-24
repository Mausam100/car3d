import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model() {
  const { nodes, materials } = useGLTF("/datsun-transformed.glb");

  return (
    <group>
      {/* Alloy Part */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_1.geometry}
        material={materials.alloy}
        material-color={"grey"}
      />
      {/* Headlights */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_2.geometry}
        material={materials.headlights}
      />
      {/* Black Paint */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_3.geometry}
        material={materials.black_paint}
      />
      {/* Tire */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_4.geometry}
        material={materials.tire}
      />
      {/* Black Matte */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_5.geometry}
        material={materials.black_matte}
      />
      {/* Chrome */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_6.geometry}
        material={materials.chrome}
      />
      {/* License Plate */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_7.geometry}
        material={materials.license}
      />
      {/* Orange Glass */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_8.geometry}
        material={materials.orange_glass}
      />
      {/* Glass */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_9.geometry}
        material={materials.glass}
      />
      {/* Car Paint (color-changing material) */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_10.geometry}
        material={materials.paint}
        material-color={"goldenrod"}
      />
      {/* Red Glass */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_11.geometry}
        material={materials.red_glass}
      />
      {/* Stickers */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_12.geometry}
        material={materials.stickers}
      />

      {/* Button to change the car color */}
    </group>
  );
}

useGLTF.preload("/datsun-transformed.glb");
