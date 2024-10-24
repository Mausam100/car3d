import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Garage(props) {
  const { nodes, materials } = useGLTF('/parking_garage.glb')
  return (
    <group {...props} dispose={null}>
       <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={0.03}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials['Mat.1']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.glass}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/parking_garage.glb')
