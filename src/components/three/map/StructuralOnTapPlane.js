
import React from 'react';
import * as THREE from 'three';
import useStore from '../../../store';

export default function StructuralOnTapPlane({onTap}){
  const visible = false;
  const interactionPlanePosition = useStore(state => state.interactionPlanePosition);
  const activeCellMapParameters = useStore(state => state.activeCellMapParameters);
  
  if (!activeCellMapParameters) return null;
  return (
    <mesh
      position={new THREE.Vector3(...interactionPlanePosition)} 
      rotation={new THREE.Euler(-Math.PI/2, 0, 0)}
      onClick={onTap}
    >
      <planeBufferGeometry 
        attach="geometry" 
        args={[activeCellMapParameters.width*2, activeCellMapParameters.height*2]}/> 
      <meshBasicMaterial attach="material" color="#405A71" alphaTest="0" visible={visible}/>
    </mesh>
  )
}