import { Canvas } from 'react-three-fiber';
import React, { useState, useEffect, useMemo } from 'react';
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


  const [position, setPosition] = useState([0,0, 0]); 
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
      onCreated={({gl, camera, scene}) => {

        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;

        camera.position.set( 40, 40, 40 );
        camera.lookAt( scene.position ); // or the origin  
        camera.updateProjectionMatrix();

        // console.log(gl);
        
      }}
      >
      <ambientLight intensity={0.8}/>
      <directionalLight 
        intensity={0.8} 
        color={0xffffff} 
        position={[100, 200, -100]}
        castShadow={true}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-25}
        shadow-camera-bottom={-25}
        shadow-camera-top={25}
        shadow-camera-right={25}
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


function Wall2({ tex_url }) {
  // const loader = new THREE.TextureLoader().load(tex_url);
  console.log()
  const texture = useMemo(() => new THREE.TextureLoader().load(tex_url), [tex_url])
  
  console.log("texture: ", texture);
  return <mesh>
      <planeBufferGeometry 
        attach="geometry" 
        args={[1, 1]} />
      <meshLambertMaterial attach="material" transparent>
        <primitive attach="map" object={texture} />
      </meshLambertMaterial>
    </mesh>
}