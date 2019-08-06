import React, { useState, useEffect } from 'react';
import './App.css';

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import GameScene from './components/three/scenes/GameScene.js';


const BLOCK_SIZE = 3;
const MAP_SIZE = 5;

const assets = {
  'grey_brick_wall_three_gltf': '/assets/walls_on_ground.gltf',  
  'brown_floor_three_gltf': '/assets/tiled_floor.gltf',
  'minecraft_atlas': '/assets/atlas.png'
  
}

function createMap(size, assets) {

    return [...Array(size).keys()].map((itemCol, colIndex)=>{
      return [...Array(size).keys()].map((itemRow, rowIndex)=>{

        return {
          tex_url: assets['minecraft_atlas']
        }  
        // Import from GLTF file format 
        // return Math.random() > 0.8 ? {
        //   threeObjects: [...grey_brick_wall_three_gltf.scene.clone().children],
        //   rotation: new THREE.Euler(0, (-Math.PI/2), 0),
        //   position: new THREE.Vector3(...[-(colIndex-MAP_SIZE/2) * BLOCK_SIZE,0,-(rowIndex-MAP_SIZE/2) * BLOCK_SIZE]),
          
        //   castShadow: true,
        //   receiveShadow: true
        // } : null
        
        //  {
        //   threeObjects: [...brown_floor_three_gltf.scene.clone().children],
        //   rotation: new THREE.Euler(0, (-Math.PI/2), 0),
        //   position: new THREE.Vector3(...[-(colIndex-MAP_SIZE/2) * BLOCK_SIZE,0,-(rowIndex-MAP_SIZE/2) * BLOCK_SIZE]),
        //   castShadow:false,
        //   receiveShadow:true
        // }
      })
    })
  }

function App() {

  const [worldMap, setWorldMap] = useState(null);
  useEffect(() => {

    setWorldMap(createMap(MAP_SIZE, assets));  
    console.log("here!");
    // var loader = new GLTFLoader();

    // const loadingAssetPromises = Object.keys(assets).map((assetKey, index)=>{
    //   return new Promise((resolve, reject)=>{
    //     loader.load(assets[assetKey],
    //       function ( gltf ) {
    //         console.log("gltf: ", gltf);
    //         resolve({[assetKey]: gltf});
    //       },
    //       function ( xhr ) {
    //         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' + assetKey );
    //       },
    //       function ( error ) {
    //         console.log( 'An error happened' + assetKey, error );
    //       }
    //     );
    //   })
    // })

    // Promise.all(loadingAssetPromises).then((assetData)=>{
    //   setWorldMap(createMap(MAP_SIZE, assetData.reduce((item, total, index)=>{
    //     return {
    //       ...total,
    //       ...item
    //     }  
    //   }, {})));
    //   console.log("assetData: ", assetData);  
    // })

    // new Promise((resolve, reject)=>{
    //    loader.load(
    //     '/assets/walls_shadows.gltf',
    //     function ( gltf ) {
    //       resolve({brickWallSceneImported: gltf.scene});
    //       // console.log("gltf.scene: ", gltf.scene);
    //       // console.log("createMap: ", createMap(12, {brickWallSceneImported: gltf.scene}));
    //       // setWorldMap(createMap(MAP_SIZE, {brickWallSceneImported: gltf.scene}));
    //     },
    //     function ( xhr ) {
    //       console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    //     },
    //     function ( error ) {
    //       console.log( 'An error happened', error );
    //     }
    //   );
    // })
    // loader.load(
    //   '/assets/walls_shadows.gltf',
    //   function ( gltf ) {
    //     console.log("gltf.scene: ", gltf.scene);
    //     // console.log("createMap: ", createMap(12, {brickWallSceneImported: gltf.scene}));
    //     setWorldMap(createMap(MAP_SIZE, {brickWallSceneImported: gltf.scene}));
    //   },
    //   function ( xhr ) {
    //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    //   },
    //   function ( error ) {
    //     console.log( 'An error happened', error );
    //   }
    // );

  }, [setWorldMap])
 

  return <GameScene worldMap={worldMap} BLOCK_SIZE={BLOCK_SIZE} MAP_SIZE={MAP_SIZE}/>
}


export default App;



