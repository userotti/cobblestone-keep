import React, { useState, useEffect } from 'react';
import './App.css';

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import GameScene from './components/three/scenes/GameScene.js';


const BLOCK_SIZE = 1;
const MAP_SIZE = 10;


function App() {

  const [assets, setAssets] = useState({
    'grey_brick_wall_three_gltf': {
      url: '/assets/walls_on_ground.gltf',
    },
    'brown_floor_three_gltf': {
      url: '/assets/tiled_floor.gltf',
    },
    'minecraft_atlas': {
      url: '/assets/atlas.png',
    },

    'texture_wall_sides': {
      url: '/assets/walls/bricks_shaded.png',
    },
    'texture_wall_top': {
      url: '/assets/walls/bricks-top2.png',
    },
    'texture_floor_stones': {
      url: '/assets/walls/floor-stones.png',
    },
  });

  const [worldMap, setWorldMap] = useState(null);
  
  useEffect(() => {

    const loadingAssetPromises = [
      ...getGLTFLoadingPromises(assets),
      ...getPNGLoadingPromises(assets),
    ]; 
    
    Promise.all(loadingAssetPromises).then((assetData)=>{
      setWorldMap(createMap(MAP_SIZE, assetData.reduce((total, item, index)=>{
        return {
          ...total,
          ...item
        }  
      }, {})));
    })

  }, [setWorldMap, assets])
  
  return <GameScene worldMap={worldMap} BLOCK_SIZE={BLOCK_SIZE} MAP_SIZE={MAP_SIZE}/>
}


function getPNGLoadingPromises(assets) {
  const textureLoader = new THREE.TextureLoader();

  return Object.keys(assets).filter((assetKey)=>assets[assetKey].url.endsWith('png')).map((assetKey, index)=>{
    return new Promise((resolve, reject)=>{
      textureLoader.load(assets[assetKey].url,
        function ( texture ) {
          resolve({[assetKey]: texture});
        },
        function ( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' + assetKey );
        },
        function ( error ) {
          console.log( 'An error happened' + assetKey, error );
        }
      );
    })
  })
}  

function getGLTFLoadingPromises(assets) {
  const GLTFloader = new GLTFLoader();

  return Object.keys(assets).filter((assetKey)=>assets[assetKey].url.endsWith('gltf')).map((assetKey, index)=>{
    return new Promise((resolve, reject)=>{
      GLTFloader.load(assets[assetKey].url,
        function ( gltf ) {
          resolve({[assetKey]: gltf});
        },
        function ( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' + assetKey );
        },
        function ( error ) {
          console.log( 'An error happened' + assetKey, error );
        }
      );
    })
  })
}  


function createMap(size, assets) {
  return [...Array(size).keys()].map((itemCol, colIndex)=>{
    return [...Array(size).keys()].map((itemRow, rowIndex)=>{
      return Math.random() > 0.7 ? {
        type: 'wall',
        textures: {
          'texture_wall_sides': assets['texture_wall_sides'],
          'texture_wall_top': assets['texture_wall_top']
        },
        position: new THREE.Vector3(...[-(colIndex-MAP_SIZE/2) * BLOCK_SIZE,0,-(rowIndex-MAP_SIZE/2) * BLOCK_SIZE]),
        size: new THREE.Vector3(1,1.333,1) 
      } : {
        type: 'floor',
        textures: {
          'texture_floor_stones': assets['texture_floor_stones'],
        },
        position: new THREE.Vector3(...[-(colIndex-MAP_SIZE/2) * BLOCK_SIZE,0,-(rowIndex-MAP_SIZE/2) * BLOCK_SIZE]),
        size: new THREE.Vector2(1,1),
        rotation: new THREE.Euler(0, 0, 0),
      } 
    })
  })
}

export default App;



