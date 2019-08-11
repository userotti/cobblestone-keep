import React, { useState, useEffect } from 'react';
import { useSpring } from 'react-spring/three'
import * as THREE from 'three';

import Wall from '../map/Wall.js';
import Floor from '../map/Floor.js';
import Camera from '../Camera.js';
import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';


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


  // Add event listeners
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
    }

    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [position, setAnimatedPosition, BLOCK_SIZE, worldMap, cameraStartingDistanceVector, cameraRotateAngleAmout]); // Empty array ensures that effect is only run on mount and unmount

  
  return (<ThreeFibreHTMLCanvas>
      <Camera worldMap={worldMap} BLOCK_SIZE={BLOCK_SIZE} MAP_SIZE={MAP_SIZE} animatedPosition={animatedPosition}>

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
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
}
