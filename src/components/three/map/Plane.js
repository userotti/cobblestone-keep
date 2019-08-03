import React from 'react';
import * as THREE from 'three';

export default function Plane({ position, BLOCK_SIZE, MAP_SIZE }) {
  return (
    <mesh
      position={position} 
      rotation={new THREE.Euler(-Math.PI/2, 0, 0)}
      receiveShadow={true} 
    >
      <planeBufferGeometry 
        attach="geometry" 
        args={[BLOCK_SIZE*MAP_SIZE*2, BLOCK_SIZE*MAP_SIZE*2]}/> 
      <meshStandardMaterial attach="material" color="#405A71" />
    </mesh>
  )
}