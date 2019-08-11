import { useThree } from 'react-three-fiber';
import React, { useEffect, useRef } from 'react';
import { animated } from 'react-spring/three'
import useStore from '../../store';

function Camera({ worldMap, BLOCK_SIZE, MAP_SIZE, animatedPosition, children }) {
  
  const cameraSize = useStore(state => state.cameraSize);
  const camera = useRef()
  const { setDefaultCamera } = useThree()
  const aspect = window.innerWidth / window.innerHeight;
  

  useEffect(() => {
    void setDefaultCamera(camera.current);
  }, [camera, setDefaultCamera])

  
  return (
    <>
      <animated.orthographicCamera
        ref={camera}
        position={animatedPosition.position}
        onUpdate={self => {

          self.left = -cameraSize * aspect
          self.right = cameraSize * aspect
          self.top = cameraSize
          self.bottom = -cameraSize
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