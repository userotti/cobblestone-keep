import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas } from 'react-three-fiber'
import { useSpring, animated } from 'react-spring/three'

const BLOCK_SIZE = 5;
const MAP_SIZE = 10;

function createMap(size, model) {
    return [...Array(size).keys()].map(()=>{
      return [...Array(size).keys()].map(()=>{
        return Math.random() > 0.8 ? model.clone() : null
      })
    })
  }

function App() {
  const [worldMap, setWorldMap] = useState(null);
  
  

  useEffect(() => {
    // Instantiate a loader
    var loader = new GLTFLoader();
        // Load a glTF resource
    loader.load(
      // resource URL
      '/assets/mure2.gltf',
      // called when the resource is loaded
      function ( gltf ) {

        console.log("gltf", gltf);
        setWorldMap(createMap(10, gltf.scene));
      },
      // called while loading is progressing
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened', error );

      }
    );

  }, [setWorldMap])
 

  return <GameScene worldMap={worldMap}/>
}

export default App;


function GameScene({ worldMap }) {
  
  const aspect = window.innerWidth / window.innerHeight;
  const d = 50;  

  const [position, setPosition] = useState([0, 0, 0]); 
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
  }, [position, setAnimatedPosition]); // Empty array ensures that effect is only run on mount and unmount


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
      <ambientLight intensity={0.5} />
      <spotLight  
        intensity={0.3} 
        position={[0, 70, 80]} 
        angle={0.6} penumbra={1} 
        castShadow={true}
        />

      <Plane 
        position={[0+(MAP_SIZE - BLOCK_SIZE)/2,-BLOCK_SIZE/2,0+(MAP_SIZE - BLOCK_SIZE)/2]}
        />  
      {worldMap && worldMap.map((column, columnIndex)=>{
        return column.map((blockModel, rowIndex)=>{
          return blockModel ? <Blokkie key={columnIndex + '' + rowIndex} position={[-(columnIndex-MAP_SIZE/2) * BLOCK_SIZE,0,-(rowIndex-MAP_SIZE/2) * BLOCK_SIZE]} muurModel={blockModel}/> : null
        })
      })}

      <Player animatedPosition={animatedPosition} size={0.2}/>
      
    </Canvas>
      
  );
}


function Blokkie({ position, muurModel }) {

  console.log("position: ", position);
  return (
    <group>
      {muurModel && <primitive 
        object={muurModel.clone()} 
        position={new THREE.Vector3(...position)} 
        scale={[BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE]}
        rotation={new THREE.Euler(0, (-Math.PI/2)*Math.floor(Math.random()*5+1), 0)}/>}       
    </group>
  )
  // return (
  //   <group>
  //     {muurModel && <mesh
  //       visible
  //       userData={{ test: "hello" }}
  //       position={new THREE.Vector3(...position)}
  //       rotation={new THREE.Euler(0, 0, 0)}
  //       geometry={new THREE.BoxGeometry( BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)}
  //       castShadow={true}
  //       >
  //       <meshStandardMaterial attach="material" color="#886622"/>
  //     </mesh>}       
  //   </group>
  // )
}

function Plane({ position }) {
  return (
    <mesh
      position={position} 
      rotation={new THREE.Euler(-Math.PI/2, 0, 0)}
      receiveShadow={true} 
    >
      <planeBufferGeometry 
        attach="geometry" 
        args={[BLOCK_SIZE*MAP_SIZE*2, BLOCK_SIZE*MAP_SIZE*2]}/> 
      <meshStandardMaterial attach="material" color="#272727" />
    </mesh>
  )
}

function Player({ animatedPosition, size }) {
  return (
    
    <group >
      <animated.mesh
        onClick={(e) => {
          
          
        }}
        visible
        userData={{ test: "hello" }}
        position={animatedPosition.position}
        rotation={new THREE.Euler(0, 0, 0)}
        geometry={new THREE.BoxGeometry( BLOCK_SIZE*size, BLOCK_SIZE*size, BLOCK_SIZE*size)}
        material={new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffffff)})} /> */}
      <animated.pointLight  
        color={0xefef55} 
        intensity={1} 
        distance={50}
        decay={1}
        castShadow={true}
        position={animatedPosition.position}
        />
    </group>
  )
}

