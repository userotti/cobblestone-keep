import React, { useState, useEffect } from 'react';

export default function Blokkie({ position, block, BLOCK_SIZE }) {

  return (
    <group>
      {block.model && <primitive 
        object={block.model} 
        position={block.position} 
        scale={[BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE]}
        rotation={block.rotation}/>}       
    </group>
  )
  // return (
  //   <group>
  //     {muurModel && <mesh
  //       visible
  //       userData={{ test: "hello" }}
  //       position={new THREE.Vector3(...position)}
  //       rotation={new THREE.Euler(0, 0, 0)}
  //       geometry={new THREE.BoxGeometry( BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)}
  //       castShadow={true}
  //       >
  //       <meshStandardMaterial attach="material" color="#886622"/>
  //     </mesh>}       
  //   </group>
  // )
}