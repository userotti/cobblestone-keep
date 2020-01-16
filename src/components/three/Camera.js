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
    
  const canvasContainerSizeInPixels = useStore(state => state.canvasContainerSizeInPixels);  
  const setCameraAspectRatio = useStore(state => state.setCameraAspectRatio);  
  const cameraAspect = useStore(state => state.cameraAspect);
  const cameraSize = useStore(state => state.cameraSize);
  const cameraFocusPointPosition = useStore(state => state.cameraFocusPointPosition);
  const cameraDistanceFromFocusPoint = useStore(state => state.cameraDistanceFromFocusPoint);
  const cameraOrthographicAngle = useStore(state => state.cameraOrthographicAngle);
  const cameraTiltValues = useStore(state => state.cameraTiltValues);
  const cameraTiltIndex = useStore(state => state.cameraTiltIndex);

  const m = new THREE.Matrix4();

  translate_focus_point.identity().makeTranslation(...cameraFocusPointPosition).transpose();
  translate_distance.identity().makeTranslation(0,0,cameraDistanceFromFocusPoint).transpose();
  y_rotate_m.identity().makeRotationY(cameraOrthographicAngle)

  // TILT Camera
  x_rotate_m.identity().makeRotationX(cameraTiltValues[cameraTiltIndex])

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
    console.log("canvasContainerSizeInPixels[0]", canvasContainerSizeInPixels[0]);
    setCameraAspectRatio(canvasContainerSizeInPixels[0], canvasContainerSizeInPixels[1])
  }, [camera, setDefaultCamera, setCameraAspectRatio, canvasContainerSizeInPixels])


  return (
    <>
      <animated.orthographicCamera
        ref={camera}
        matrix={animatedStuff.matrixElements}
        left={animatedStuff.size.interpolate((value)=>-value * cameraAspect)}
        right={animatedStuff.size.interpolate((value)=>value * cameraAspect)}
        top={animatedStuff.size.interpolate((value)=>value)}
        bottom={animatedStuff.size.interpolate((value)=>-value)}
        near={-1000}
        far={1000}
        onUpdate={self => {
          self.matrixAutoUpdate = false;
          self.updateMatrixWorld( true );
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

