import React from 'react';
import * as THREE from 'three';
import useStore from '../../../store';


export default function FocusedCell() {

  const activeCellMap = useStore(state => state.activeCellMap);
  const cameraFocusPointPosition = useStore(state => state.cameraFocusPointPosition);
  const cellSize = useStore(state => state.cellSize);

  var geometry = new THREE.BoxBufferGeometry( cellSize[0]*2.01,cellSize[1]*2.01,cellSize[2]*2.01 );
  var geo = new THREE.EdgesGeometry( geometry );
  var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
  
  if (!activeCellMap) return null; 
  return (
    <lineSegments
      position={new THREE.Vector3(cameraFocusPointPosition[0], cameraFocusPointPosition[1]+0.05, cameraFocusPointPosition[2])}
    >
      <primitive attach="geometry" object={geo}/>
      <primitive attach="material" object={mat}/>
    </lineSegments>

  )
}