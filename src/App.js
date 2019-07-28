import React, { useState, useEffect } from 'react';
import './App.css';

import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { useSpring, animated } from 'react-spring'

const BLOCK_SIZE = 5;
const MAP_SIZE = 10;

function createMap(size) {
  return [...Array(size).keys()].map(()=>{
    return [...Array(size).keys()].map(()=>{
      return Math.random() > 0.9 ? 1 : 0
    })
  })
}

function App() {

 

  const aspect = window.innerWidth / window.innerHeight;
  const d = 50;
  
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

        console.log(gl);
        // const aspect = window.innerWidth / window.innerHeight;
        // const d = 50;
        
        // let camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
        // gl.setDefaultCamera(camera);
        
        // camera.position.set( 20, 20, 20 ); // all components equal
        // camera.left = -(d * aspect);
        // camera.right = (d * aspect);
        // camera.top = d;
        // camera.bottom = -(d);
        // camera.lookAt( gl.scene.position ); // or the origin
        // camera.updateProjectionMatrix();

        // return ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))

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
      {createMap(MAP_SIZE).map((column, columnIndex)=>{
        return column.map((blockPositionValue, rowIndex)=>{
          return blockPositionValue ? <Blokkie key={columnIndex + '' + rowIndex} position={[-(columnIndex-MAP_SIZE/2) * BLOCK_SIZE,0,-(rowIndex-MAP_SIZE/2) * BLOCK_SIZE]}/> : null
        })
      })}

      <Player position={[0,0,0]}/>
      
    </Canvas>
      
  );
}

export default App;

// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}


function Blokkie({ position }) {
  return (
    <group >
      <mesh
        visible
        userData={{ test: "hello" }}
        position={new THREE.Vector3(...position)}
        rotation={new THREE.Euler(0, 0, 0)}
        geometry={new THREE.BoxGeometry( BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)}
        castShadow={true}
        >
        <meshStandardMaterial attach="material"/>
      </mesh>          
    </group>
  )
}

function Plane({ position }) {
  // Register plane as a physics body with zero mass
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

function Player({ position }) {
  // Register plane as a physics body with zero mass
  // const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  // const happyPress = useKeyPress('h');
  // console.log("happyPress: ", happyPress);  
  return (
    <group >
      <mesh
        visible
        userData={{ test: "hello" }}
        position={new THREE.Vector3(...position)}
        rotation={new THREE.Euler(0, 0, 0)}
        geometry={new THREE.BoxGeometry( BLOCK_SIZE/10, BLOCK_SIZE/10, BLOCK_SIZE/10)}
        material={new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffffff)})} />
      <pointLight  
        color={0xefef55} 
        intensity={1} 
        distance={50}
        decay={1}
        castShadow={true}
        position={new THREE.Vector3(...position)}
        />
    </group>
  )
}