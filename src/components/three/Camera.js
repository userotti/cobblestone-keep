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
  console.log("newCameraPosition: ", newCameraPosition);
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
        near={1}
        far={1000}
        
        onUpdate={self => {

          // const x_axis = new THREE.Vector3(1,0,0);
          // const y_axis = new THREE.Vector3(0,1,0);
          // const z_axis = new THREE.Vector3(0,0,1);
          
          
          // const xRotation = new THREE.Quaternion().setFromAxisAngle(x_axis, -Math.PI / 4)
          // const yRotation = new THREE.Quaternion().setFromAxisAngle(y_axis, -Math.atan( - newCameraPosition[1] / Math.sqrt( Math.pow(newCameraPosition[0],2) + Math.pow(newCameraPosition[2],2) ) ))
          // const zRotation = new THREE.Quaternion().setFromAxisAngle(z_axis, Math.PI / 6 )
          
          // self.quaternion.multiply(yRotation);
          // self.quaternion.set(xRotation.x,xRotation.y,xRotation.z,xRotation.w)
          // self.quaternion.multiply(yRotation);
          // self.quaternion.multiply(zRotation);
          
          // console.log("quaternion: ", self.quaternion);
          // self.rotation.order = 'YXZ';
          // self.rotation.y = - Math.PI / 4;
          
          
          // self.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );

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
