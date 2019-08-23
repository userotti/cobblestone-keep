import React, { useState, useEffect } from 'react';
import { useSpring } from 'react-spring/three'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Wall from '../map/wall.js';
import Floor from '../map/floor.js';
import Camera from '../Camera.js';
import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';



export default function GameScene({ assets, BLOCK_SIZE, MAP_SIZE }) {

  
  const [worldMap, setWorldMap] = useState(null);
  
  useEffect(() => {
    
    const loadingAssetPromises = [
      ...getGLTFLoadingPromises(assets),
      ...getPNGLoadingPromises(assets),
    ]; 
    
    Promise.all(loadingAssetPromises).then((assetData)=>{
      setWorldMap(createMap(MAP_SIZE, BLOCK_SIZE, assetData.reduce((total, item, index)=>{
        return {
          ...total,
          ...item
        }  
      }, {}), ));
    })

  }, [setWorldMap, assets, MAP_SIZE, BLOCK_SIZE])
  
  return (<ThreeFibreHTMLCanvas>
      <Camera worldMap={worldMap} BLOCK_SIZE={BLOCK_SIZE} MAP_SIZE={MAP_SIZE}>

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


function createMap(MAP_SIZE,  BLOCK_SIZE, assets) {
  return [...Array(MAP_SIZE).keys()].map((itemCol, colIndex)=>{
    return [...Array(MAP_SIZE).keys()].map((itemRow, rowIndex)=>{
      console.log("colIndex: rowIndex", colIndex + ': '+ rowIndex);

      // console.log("[MAP_SIZE/2-(colIndex-MAP_SIZE/2) * BLOCK_SIZE,0,MAP_SIZE/2-(rowIndex-MAP_SIZE/2) * BLOCK_SIZE]: ", [MAP_SIZE/2-(colIndex-MAP_SIZE/2) * BLOCK_SIZE,0,MAP_SIZE/2-(rowIndex-MAP_SIZE/2) * BLOCK_SIZE]);
      
      
      const positionVector = new THREE.Vector3(colIndex*BLOCK_SIZE, 0, rowIndex*BLOCK_SIZE);
      const offset = new THREE.Vector3(-(MAP_SIZE-1)/2, 0, -(MAP_SIZE-1)/2);

      return Math.random() > 0.7 ? {
        type: 'wall',
        textures: {
          'texture_wall_sides': assets['texture_wall_sides'],
          'texture_wall_top': assets['texture_wall_top']
        },
        position: positionVector.clone().add(offset),
        size: new THREE.Vector3(1,1.333,1) 
      } : {
        type: 'floor',
        textures: {
          'texture_floor_stones': assets['texture_floor_stones'],
        },
        position: positionVector.clone().add(offset),
        size: new THREE.Vector2(1,1),
        rotation: new THREE.Euler(0, 0, 0),
      } 
    })
  })
}