import { useThree } from 'react-three-fiber';
import React, { useEffect, useRef } from 'react';
import { useSpring , animated } from 'react-spring/three'
import useStore from '../../store';
import * as THREE from 'three';


function Camera({ children }) {
  
  const camera = useRef()
  const { setDefaultCamera } = useThree()
    
  const cameraAspect = useStore(state => state.cameraAspect);
  const cameraSize = useStore(state => state.cameraSize);
  const cameraFocusPointPosition = useStore(state => state.cameraFocusPointPosition);
  const cameraFocusPointPositionOffset = useStore(state => state.cameraFocusPointPositionOffset);
  const cameraOrthographicAngle = useStore(state => state.cameraOrthographicAngle);
  
  const newCameraPosition = calculateCameraPosition(cameraFocusPointPosition, cameraFocusPointPositionOffset, cameraOrthographicAngle);
  const animatedPostion = useSpring({
    to: { 
      position: newCameraPosition,
    }, 
    from: { 
      poistion: newCameraPosition
    }})

  const animatedCameraSize = useSpring({to: { size: cameraSize}, from:{ size: cameraSize-0.02}})
  

  useEffect(() => {
    void setDefaultCamera(camera.current);
  }, [camera, setDefaultCamera])
  
  return (
    <>
      <animated.orthographicCamera
        ref={camera}
        position={animatedPostion.position.interpolate((x,y,z)=>{
          return [x,y,z]
        })}
        left={animatedCameraSize.size.interpolate((value)=>-value * cameraAspect)}
        right={animatedCameraSize.size.interpolate((value)=>value * cameraAspect)}
        top={animatedCameraSize.size.interpolate((value)=>value)}
        bottom={animatedCameraSize.size.interpolate((value)=>-value)}

        onUpdate={self => {
          self.near = 1
          self.far = 1000
          self.lookAt( ...cameraFocusPointPosition ); // or the origin  
          self.updateProjectionMatrix();
        }}
      />
      {camera.current && (<group>
        {children}
      </group>
      )}
    </>
  )
}

export default Camera

const axis = new THREE.Vector3( 0, 1, 0 );

const calculateCameraPosition = function(focusPointPositionArray, focusPointOffsetArray, angle){
  
  const focusPointPosition =  new THREE.Vector3(...focusPointPositionArray);
  const focusPointOffset =  new THREE.Vector3(...focusPointOffsetArray);
  const result = focusPointOffset.clone()
  result.applyAxisAngle(axis,angle)
  result.add(focusPointPosition)
  return result.toArray()
  
} 
