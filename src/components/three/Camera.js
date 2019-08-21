import { useThree } from 'react-three-fiber';
import React, { useEffect, useRef } from 'react';
import { useSpring , animated } from 'react-spring/three'
import useStore from '../../store';

function Camera({ worldMap, BLOCK_SIZE, MAP_SIZE, children }) {
  
  const { cameraAspect, previousCameraPosition, cameraPosition, previousCameraSize, cameraSize} = useStore();
  
  console.log("previousCameraSize: ", previousCameraSize);
  console.log("cameraSize: ", cameraSize);
  
  const camera = useRef()
  const { setDefaultCamera } = useThree()
  
  const animatedPostion = useSpring({ position: cameraPosition, from: {position: previousCameraPosition}})
  const animatedCameraSize = useSpring({ size: cameraSize, from: {size: previousCameraSize}})
  

  useEffect(() => {
    void setDefaultCamera(camera.current);
  }, [camera, setDefaultCamera])
  
  return (
    <>
      <animated.orthographicCamera
        ref={camera}
        position={animatedPostion.position}

        left={animatedCameraSize.size.interpolate((value)=>-value * cameraAspect)}
        right={animatedCameraSize.size.interpolate((value)=>value * cameraAspect)}
        top={animatedCameraSize.size.interpolate((value)=>value)}
        bottom={animatedCameraSize.size.interpolate((value)=>-value)}

        onUpdate={self => {

          self.near = 1
          self.far = 1000
          
          self.lookAt( 0,0,0 ); // or the origin  
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