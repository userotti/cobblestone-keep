import React, { useState, useEffect } from 'react';
import * as THREE from 'three';

export default function Blokkie({ block, BLOCK_SIZE }) {

  fixChildrenCastShadows(block.threeObjects, block.castShadow); 
  fixChildrenReceiveShadows(block.threeObjects, block.receiveShadow); 

  return (
    <group
      position={block.position}
      scale={[BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE]}
      rotation={block.rotation}
    >
      {block.threeObjects && block.threeObjects.length && block.threeObjects.map((item, index)=>(<primitive 
        key={index}
        object={item}
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

function fixChildrenCastShadows(children, castShadow){
  children.forEach((child)=>{
    child.castShadow = castShadow;
    if (child.children.length){
      fixChildrenCastShadows(child.children, castShadow);
    }
  })
}


function fixChildrenReceiveShadows(children, receiveShadow){
  children.forEach((child)=>{
    child.receiveShadow = receiveShadow;
    if (child.children.length){
      fixChildrenReceiveShadows(child.children, receiveShadow);
    }
  })
}