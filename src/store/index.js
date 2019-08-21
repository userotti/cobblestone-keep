import create from 'zustand'
import * as THREE from 'three';
import { useSpring } from 'react-spring/three'

const cameraStartingPosition = new THREE.Vector3(40,40,40);

const [useStore] = create(set => ({
  cameraAspect: 4/3,
  canvasContainerSizeInPixels: [800, 600], 

  cameraStartingDistanceVector: cameraStartingPosition,
  previousCameraPosition: cameraStartingPosition.toArray(),
  cameraPosition: cameraStartingPosition.toArray(),
  rotateCamera: (amount) => set((state)=>{

    const currentAngle = getCurrentAngle(state.cameraPosition);
    const newAngle = currentAngle + amount;
    const newPosition = getNewPositionXZ(newAngle, Math.hypot(state.cameraStartingDistanceVector.x, state.cameraStartingDistanceVector.z));  
    
    return ({
      previousCameraPosition: state.cameraPosition,
      cameraPosition: [newPosition.x,40,newPosition.z]
    })
  }),

  previousCameraSize: 5.98,
  cameraSize: 6,

  increaseCameraSize: (amount) => set((state) =>{
    return ({
      cameraSize: state.cameraSize + amount
    })
  }),
  
    
}))

export default useStore;



function getCurrentAngle(position){
  return Math.atan2(position[2], position[0]);
}

function getNewPositionXZ(newAngle, hypotenuse){
  
  return {
    x: Math.cos(newAngle)*hypotenuse,
    z: Math.sin(newAngle)*hypotenuse,
  }
}   