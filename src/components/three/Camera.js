import { useThree } from 'react-three-fiber';
import React, { useEffect, useRef } from 'react';
import { useSpring , animated } from 'react-spring/three'
import useStore from '../../store';
import * as THREE from 'three';

const translate_focus_point = new THREE.Matrix4();
const translate_distance = new THREE.Matrix4();
const y_rotate_m = new THREE.Matrix4();
const x_rotate_m = new THREE.Matrix4();


function Camera({ children }) {
  
  const camera = useRef()
  const { setDefaultCamera } = useThree()
    
  const cameraAspect = useStore(state => state.cameraAspect);
  const cameraSize = useStore(state => state.cameraSize);
  const cameraFocusPointPosition = useStore(state => state.cameraFocusPointPosition);
  const cameraDistanceFromFocusPoint = useStore(state => state.cameraDistanceFromFocusPoint);
  const cameraOrthographicAngle = useStore(state => state.cameraOrthographicAngle);
  
  const m = new THREE.Matrix4();

  translate_focus_point.identity().makeTranslation(...cameraFocusPointPosition).transpose();
  translate_distance.identity().makeTranslation(0,0,cameraDistanceFromFocusPoint).transpose();
  y_rotate_m.identity().makeRotationY(cameraOrthographicAngle)
  x_rotate_m.identity().makeRotationX(Math.atan( 1/Math.sqrt(2)))

  m.identity();
  m.multiply(translate_distance); 
  m.multiply(x_rotate_m);
  m.multiply(y_rotate_m);        
  m.multiply(translate_focus_point);  
  
  const animatedStuff = useSpring({
    to: { 
      matrixElements: m.elements,
      size: cameraSize
    }, 
    from: { 
      matrixElements: m.elements,
      size: cameraSize-0.02
    }}
  )

  useEffect(() => {
    void setDefaultCamera(camera.current);
  }, [camera, setDefaultCamera])


  return (
    <>
      <animated.orthographicCamera
        ref={camera}
        matrix={animatedStuff.matrixElements}
        left={animatedStuff.size.interpolate((value)=>-value * cameraAspect)}
        right={animatedStuff.size.interpolate((value)=>value * cameraAspect)}
        top={animatedStuff.size.interpolate((value)=>value)}
        bottom={animatedStuff.size.interpolate((value)=>-value)}
        near={1}
        far={1000}
        onUpdate={self => {
          self.matrixAutoUpdate = false;
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

const y_axis = new THREE.Vector3( 0, 1, 0 );

const calculateCameraPosition = function(focusPointPositionArray, distance, angle){
  
  const focusPointPosition =  new THREE.Vector3(...focusPointPositionArray);
  const cameraPostion =  new THREE.Vector3(0,0,distance);


  const result = cameraPostion.clone()
  result.applyAxisAngle(y_axis,angle)

  result.add(focusPointPosition)
  return result.toArray()
  
} 
