import React from 'react';
import * as THREE from 'three';
import { useSpring, animated } from 'react-spring/three'

export default function Player({ animatedPosition, size, BLOCK_SIZE }) {
  return (
    
    <group >
      <animated.mesh
        onClick={(e) => {
          
          
        }}
        visible
        userData={{ test: "hello" }}
        position={animatedPosition.position}
        rotation={new THREE.Euler(0, 0, 0)}
        geometry={new THREE.BoxGeometry( BLOCK_SIZE*size, BLOCK_SIZE*size, BLOCK_SIZE*size)}
        material={new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffffff)})} /> 
      <animated.pointLight  
        color={0xefad55} 
        intensity={0.4} 
        distance={50}
        decay={1}
        castShadow={true}
        position={animatedPosition.position}
        />
    </group>
  )
}