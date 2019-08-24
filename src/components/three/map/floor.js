import React from 'react';
import * as THREE from 'three';
import useStore from '../../../store';

export default function Wall({ textures, position, size, rotation }) {
  
  const cameraFocusPointPosition = useStore(state => state.cameraFocusPointPosition)
  const cameraVisibleRadius = useStore(state => state.cameraVisibleRadius)
  const setCameraFocusPointPosition = useStore(state => state.setCameraFocusPointPosition)

  const difference = new THREE.Vector3(...cameraFocusPointPosition);
  difference.sub(position)

  return (
    (difference.length() < cameraVisibleRadius) ? <group>
      <mesh
        position={new THREE.Vector3(position.x,position.y,position.z)}
        rotation={new THREE.Euler((rotation.x-Math.PI/2), rotation.y, rotation.y)}
        castShadow={false}
        receiveShadow={true} 
        onPointerOver={e => console.log('hover')}
        onClick={e => setCameraFocusPointPosition(position.toArray())}
      >
        <planeBufferGeometry 
          attach="geometry" 
          args={[1, 1]} />
        <meshLambertMaterial attach="material" transparent side={THREE.DoubleSide} color="#878">
          <primitive attach="map" object={textures['texture_floor_stones']} />
        </meshLambertMaterial>
      </mesh>
    </group>
    : null
  )
}