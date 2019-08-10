import { Canvas, useThree, useRender } from 'react-three-fiber';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSpring, animated } from 'react-spring/three'
import * as THREE from 'three';

import Blokkie from '../map/Blokkie.js';
import Plane from '../map/Plane.js';
import Player from '../map/Player.js';
import Wall from '../map/wall.js';
import Floor from '../map/floor.js';



export default function GameScene({ worldMap, BLOCK_SIZE, MAP_SIZE }) {

  const aspect = window.innerWidth / window.innerHeight;
  const d = 5;  


  const [position, setPosition] = useState([0,0,0]); 
  const [animatedPosition, setAnimatedPosition] = useSpring(() => ({
    position:position
  }));

  
  
  // // Add event listeners
  useEffect(() => {

    // // If pressed key is our target key then set to true
    const downHandler = ({ key }) => {

      if (key === 'ArrowRight') {
        let p =[position[0]+BLOCK_SIZE,position[1],position[2]];
        setPosition(p);
        setAnimatedPosition({
          position:p
        })
      }

      if (key === 'ArrowLeft') {
        let p = [position[0]-BLOCK_SIZE,position[1],position[2]];
        setPosition(p);
        setAnimatedPosition({
          position:p
        })
      }

      if (key === 'ArrowUp') {
        let p =[position[0],position[1],position[2]-BLOCK_SIZE];
        setPosition(p);
        setAnimatedPosition({
          position:p
        })
      }

      if (key === 'ArrowDown') {
        let p =[position[0],position[1],position[2]+BLOCK_SIZE];
        setPosition(p);
        setAnimatedPosition({
          position:p
        })
      }
    }

    window.addEventListener('keydown', downHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [position, setAnimatedPosition, BLOCK_SIZE, worldMap]); // Empty array ensures that effect is only run on mount and unmount

  return (
    <Canvas
      updateDefaultCamera={false}
      orthographic={true}
      camera={{
        left: - d * aspect,
        right: d * aspect,
        top: d,
        bottom: -d,
        near: 1,
        far: 1000
      }}
      position={animatedPosition}
      onCreated={({gl, camera, scene}) => {

        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;

        camera.position.set( 40, 40, 40 );
        camera.lookAt( scene.position ); // or the origin  
        camera.updateProjectionMatrix();

        // console.log(gl);
        
      }}
      >
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
      
      {/* <Plane 
        position={[0+(MAP_SIZE - BLOCK_SIZE)/2,-0.7,0+(MAP_SIZE - BLOCK_SIZE)/2]}
        BLOCK_SIZE={BLOCK_SIZE}
        MAP_SIZE={MAP_SIZE}
        />   */}

      {/* <Wall2 tex_url='/assets/atlas.png'></Wall2> */}

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
      
    </Canvas>
      
  );
}

function Content() {
  const camera = useRef()
  const controls = useRef()
  const { size, setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(camera.current), [camera, setDefaultCamera])
  useRender(() => controls.current.update())
  return (
    <>
      <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        fov={55}
        position={[0, 0, 5]}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      {camera.current && (
        <group>
          
        </group>
      )}
    </>
  )
}