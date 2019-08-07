import React, { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

export default function Wall({ textures, position, size, rotation }) {
  
  return (
    <group>
      <mesh
        position={new THREE.Vector3(position.x,position.y,position.z)}
        rotation={new THREE.Euler((rotation.x-Math.PI/2), rotation.y, rotation.y)}
        castShadow={false}
        receiveShadow={true} 
      >
        <planeBufferGeometry 
          attach="geometry" 
          args={[1, 1]} />
        <meshLambertMaterial attach="material" transparent side={THREE.DoubleSide} color="#878">
          <primitive attach="map" object={textures['texture_floor_stones']} />
        </meshLambertMaterial>
      </mesh>
    </group>
    
  )
}