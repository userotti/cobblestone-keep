import React, { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import useStore from '../../../store';

export default function Wall({ textures, position }) {
  
  // const cameraFocusPointPosition = useStore(state => state.cameraFocusPointPosition)
  // const cameraVisibleRadius = useStore(state => state.cameraVisibleRadius)
  
  
  // const difference = new THREE.Vector3(...cameraFocusPointPosition);
  // difference.sub(position)

  const castShadow = true;
  const receiveShadow = true;
    
  
  return (
    <group 
      position={new THREE.Vector3(0,0+(1.333)/2,0)}
    >
      <mesh
        position={new THREE.Vector3(position.x,position.y,position.z+0.5)}
        rotation={new THREE.Euler(0, 0, 0)}
        castShadow={castShadow}
        receiveShadow={receiveShadow}  
      >
        <planeBufferGeometry 
          attach="geometry" 
          args={[1, 1.333]} />
        <meshLambertMaterial attach="material" transparent side={THREE.FrontSide}>
          <primitive attach="map" object={textures['texture_wall_sides']} />
        </meshLambertMaterial>
      </mesh>

      <mesh
        position={new THREE.Vector3(position.x+0.5,position.y,position.z)}
        rotation={new THREE.Euler(0, (Math.PI/2), 0)}
        castShadow={castShadow} 
        receiveShadow={receiveShadow}  
      >
        <planeBufferGeometry 
          attach="geometry" 
          args={[1, 1.333]} />
        <meshLambertMaterial attach="material" transparent side={THREE.FrontSide}>
          <primitive attach="map" object={textures['texture_wall_sides']} />
        </meshLambertMaterial>
      </mesh>

      <mesh
        position={new THREE.Vector3(position.x-0.5,position.y,position.z)}
        rotation={new THREE.Euler(0, (-Math.PI/2), 0)}
        castShadow={castShadow}
        receiveShadow={receiveShadow}   
      >
        <planeBufferGeometry 
          attach="geometry" 
          args={[1, 1.333]} />
        <meshLambertMaterial attach="material" transparent side={THREE.FrontSide}>
          <primitive attach="map" object={textures['texture_wall_sides']} />
        </meshLambertMaterial>
      </mesh>

      <mesh
        position={new THREE.Vector3(position.x,position.y,position.z-0.5)}
        rotation={new THREE.Euler(0, (-Math.PI), 0)}
        castShadow={castShadow}
        receiveShadow={receiveShadow}   
      >
        <planeBufferGeometry 
          attach="geometry" 
          args={[1, 1.333]} />
        <meshLambertMaterial attach="material" transparent side={THREE.FrontSide}>
          <primitive attach="map" object={textures['texture_wall_sides']} />
        </meshLambertMaterial>
      </mesh>


      <mesh
        position={new THREE.Vector3(position.x,position.y+(1.333)/2,position.z)}
        rotation={new THREE.Euler((-Math.PI/2), 0, 0)}
        castShadow={castShadow} 
        receiveShadow={receiveShadow} 
      >
        <planeBufferGeometry 
          attach="geometry" 
          args={[1, 1]} />
        <meshLambertMaterial attach="material" transparent side={THREE.FrontSide} color="#dfdfdf">
          <primitive attach="map" object={textures['texture_wall_top']} />
        </meshLambertMaterial>
      </mesh>
      <mesh
        position={new THREE.Vector3(position.x,position.y-(1.333)/2,position.z)}
        rotation={new THREE.Euler((-Math.PI/2), 0, 0)}
        castShadow={castShadow} 
        receiveShadow={receiveShadow} 
      >
        <planeBufferGeometry 
          attach="geometry" 
          args={[1, 1]} />
        <meshLambertMaterial attach="material" transparent side={THREE.FrontSide} color="#dfdfdf">
          <primitive attach="map" object={textures['texture_wall_top']} />
        </meshLambertMaterial>
      </mesh>
    </group>
  )
}