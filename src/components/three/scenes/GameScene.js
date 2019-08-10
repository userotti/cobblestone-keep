import { Canvas, useThree, useRender } from 'react-three-fiber';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSpring, animated } from 'react-spring/three'
import * as THREE from 'three';

import Blokkie from '../map/Blokkie.js';
import Plane from '../map/Plane.js';
import Player from '../map/Player.js';
import Wall from '../map/wall.js';
import Floor from '../map/floor.js';

function getCurrentAngle(position){
  return Math.atan2(position[2], position[0]);
}

function getNewPositionXZ(newAngle, hypotenuse){
  
  return {
    x: Math.cos(newAngle)*hypotenuse,
    z: Math.sin(newAngle)*hypotenuse,
  }
}

export default function GameScene({ worldMap, BLOCK_SIZE, MAP_SIZE }) {

  const cameraRotateAngleAmout = Math.PI/4;
  const cameraStartingDistanceVector = new THREE.Vector3(40,40,40);


  const [position, setPosition] = useState(cameraStartingDistanceVector.toArray()); 
  
  const [animatedPosition, setAnimatedPosition] = useSpring(() => ({
    position:position
  }));

  
  
  // // Add event listeners
  useEffect(() => {

    // // If pressed key is our target key then set to true
    const downHandler = ({ key }) => {

      if (key === 'ArrowRight') {
        const currentAngle = getCurrentAngle(position);
        const newAngle = currentAngle + cameraRotateAngleAmout;
        const newPosition = getNewPositionXZ(newAngle, Math.hypot(cameraStartingDistanceVector.x, cameraStartingDistanceVector.z));  
        let p =[newPosition.x,40,newPosition.z];
        setPosition(p);
        setAnimatedPosition({
          position:p
        })
      }

      if (key === 'ArrowLeft') {
        const currentAngle = getCurrentAngle(position);
        const newAngle = currentAngle - cameraRotateAngleAmout;
        const newPosition = getNewPositionXZ(newAngle, Math.hypot(cameraStartingDistanceVector.x, cameraStartingDistanceVector.z));  
        let p =[newPosition.x,40,newPosition.z];
        setPosition(p);
        setAnimatedPosition({
          position:p
        })
      }

      // if (key === 'ArrowUp') {
      //   let p =[position[0],position[1],position[2]];
      //   setPosition(p);
      //   setAnimatedPosition({
      //     position:p
      //   })
      // }

      // if (key === 'ArrowDown') {
      //   let p =[position[0],position[1],position[2]];
      //   setPosition(p);
      //   setAnimatedPosition({
      //     position:p
      //   })
      // }
    }

    window.addEventListener('keydown', downHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [position, setAnimatedPosition, BLOCK_SIZE, worldMap, cameraStartingDistanceVector, cameraRotateAngleAmout]); // Empty array ensures that effect is only run on mount and unmount

  
  return (
    <Canvas
      onCreated={({gl, camera, scene}) => {

        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      
      }}>

      <Content worldMap={worldMap} BLOCK_SIZE={BLOCK_SIZE} MAP_SIZE={MAP_SIZE} animatedPosition={animatedPosition}/>
      
    </Canvas>
      
  );
}

function Content({ worldMap, BLOCK_SIZE, MAP_SIZE, animatedPosition }) {
  const camera = useRef()
  const controls = useRef()
  const { size, setDefaultCamera } = useThree()
  useEffect(() => {
    void setDefaultCamera(camera.current);
  }, [camera, setDefaultCamera])

  const aspect = window.innerWidth / window.innerHeight;
  const d = 10;  
  
  return (
    <>
      <animated.orthographicCamera
        ref={camera}
        
        position={animatedPosition.position}
        onUpdate={self => {

          self.left = -d * aspect
          self.right = d * aspect
          self.top = d
          self.bottom = -d
          self.near = 1
          self.far = 1000
          
          self.lookAt( 0,0,0 ); // or the origin  
          self.updateProjectionMatrix();

        }}
      />
      {camera.current && (
      <group>
        <ambientLight intensity={0.9}/>
        <directionalLight 
          intensity={0.9} 
          color={0xffffff} 
          position={[100, 200, -100]}
          castShadow={true}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-8}
          shadow-camera-bottom={-8}
          shadow-camera-top={8}
          shadow-camera-right={8}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
       
        {worldMap && worldMap.map((column, columnIndex)=>{
          return column.map((block, rowIndex)=>{
            switch (block.type){

              case 'wall': {
                return <Wall key={columnIndex + '' + rowIndex} textures={block.textures} position={block.position} size={block.size} BLOCK_SIZE={BLOCK_SIZE}/>
              }

              case 'floor': {
                return <Floor key={columnIndex + '' + rowIndex} textures={block.textures} position={block.position} size={block.size} rotation={block.rotation} BLOCK_SIZE={BLOCK_SIZE}/>
              }
              default: {
                return null;
              }
            }
            
          })
        })}

        {/* <Player animatedPosition={animatedPosition} size={0.2} BLOCK_SIZE={BLOCK_SIZE}/> */}
      </group>  
        
        
      )}
    </>
  )
}