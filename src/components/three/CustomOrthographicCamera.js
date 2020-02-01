import { useThree } from 'react-three-fiber';
import React, { useEffect, useRef, useMemo } from 'react';
import { useSpring , animated, config } from 'react-spring/three'
import useStore from '../../store';
import * as THREE from 'three';


const translate_focus_point = new THREE.Matrix4();
const translate_distance = new THREE.Matrix4();
const y_rotate_m = new THREE.Matrix4();
const x_rotate_m = new THREE.Matrix4();

export default function CustomOrthographicCamera() {
  
  const cameraRef = useRef()
  const { setDefaultCamera } = useThree()
  const canvasContainerSizeInPixels = useStore(state => state.canvasContainerSizeInPixels);  

  const { 
    setCameraAspectRatio, 
    cameraAspect, 
    cameraSize,
    cameraFocusPointPosition, 
    cameraDistanceFromFocusPoint,
    cameraOrthographicAngle, 
    cameraTiltValues, 
    cameraTiltIndex,
  } = useStore(state => state.camera);

  const { cameraMatrix } = useMemo(()=>{
    
    const m = new THREE.Matrix4();
    translate_focus_point.identity().makeTranslation(...cameraFocusPointPosition).transpose();
    translate_distance.identity().makeTranslation(0,0,cameraDistanceFromFocusPoint).transpose();
    y_rotate_m.identity().makeRotationY(cameraOrthographicAngle)
    x_rotate_m.identity().makeRotationX(cameraTiltValues[cameraTiltIndex])

    m.identity();
    m.multiply(translate_distance); 
    m.multiply(x_rotate_m);
    m.multiply(y_rotate_m);        
    m.multiply(translate_focus_point);  

    return {
      cameraMatrix: m
    }
  }, [cameraFocusPointPosition, cameraDistanceFromFocusPoint, cameraOrthographicAngle, cameraTiltIndex, cameraTiltValues])  
  
  const animatedStuff = useSpring({
    to: { 
      matrixElements: cameraMatrix.elements,
      size: cameraSize
    }, 
    from: { 
      matrixElements: cameraMatrix.elements,
      size: cameraSize-0.02
    },
    config: config.default
  })

  useEffect(() => {
    setDefaultCamera(cameraRef.current);
    setCameraAspectRatio(canvasContainerSizeInPixels[0], canvasContainerSizeInPixels[1])
  }, [cameraRef, setDefaultCamera, setCameraAspectRatio, canvasContainerSizeInPixels])

  return (<animated.orthographicCamera
    ref={cameraRef}
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
  />)
}



