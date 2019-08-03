import React, { useState, useEffect } from 'react';
import * as THREE from 'three';

export default function Blokkie({ block, BLOCK_SIZE }) {

  return (
    <group
      position={block.position} 
      scale={[BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE]}
      rotation={block.rotation}
    >
      {block.threeObjects && block.threeObjects.length && block.threeObjects.map((item, index)=>(<primitive 
        key={index}
        object={item} 
        castShadow={true}
      />))}
    </group>
  )
  // return (
  //   <group>
  //     {<mesh
  //       visible
  //       position={block.position}
  //       rotation={block.rotation}
  //       geometry={new THREE.BoxGeometry( BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)}
  //       receiveShadow={false} 
  //       castShadow={true}
  //       >
  //       <meshStandardMaterial attach="material" color="#886622"/>
  //     </mesh>}       
  //   </group>
  // )
}