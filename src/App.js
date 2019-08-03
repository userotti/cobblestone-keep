import React, { useState, useEffect } from 'react';
import './App.css';

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import GameScene from './components/three/scenes/GameScene.js';


const BLOCK_SIZE = 3;
const MAP_SIZE = 10;

function createMap(size, {brickWallSceneImported}) {
    return [...Array(size).keys()].map((itemCol, colIndex)=>{
      return [...Array(size).keys()].map((itemRow, rowIndex)=>{
        return Math.random() > 0.8 ? {
          threeObjects: [...brickWallSceneImported.clone().children],
          rotation: new THREE.Euler(0, (-Math.PI/2), 0),
          position: new THREE.Vector3(...[-(colIndex-MAP_SIZE/2) * BLOCK_SIZE,0,-(rowIndex-MAP_SIZE/2) * BLOCK_SIZE])
        } : null
      })
    })
  }

function App() {

  const [worldMap, setWorldMap] = useState(null);
  useEffect(() => {
    
    var loader = new GLTFLoader();
    loader.load(
      '/assets/walls_shadows.gltf',
      function ( gltf ) {
        console.log("gltf.scene: ", gltf.scene);
        // console.log("createMap: ", createMap(12, {brickWallSceneImported: gltf.scene}));
        setWorldMap(createMap(12, {brickWallSceneImported: gltf.scene}));
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.log( 'An error happened', error );
      }
    );

  }, [setWorldMap])
 

  return <GameScene worldMap={worldMap} BLOCK_SIZE={BLOCK_SIZE} MAP_SIZE={MAP_SIZE}/>
}

export default App;



