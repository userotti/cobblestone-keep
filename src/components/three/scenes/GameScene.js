import React, {useEffect} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

import Wall from '../map/wall.js';
import Strucutre from '../map/structure.js';
import Camera from '../Camera.js';

import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';


export default function GameScene({assets, BLOCK_SIZE, MAP_SIZE}) {

    const active_map = useStore(state => state.active_map);
    // const createActiveMap = useStore(state => state.createActiveMap);
  const loadedAssetData = useStore(state => state.loadedAssetData);
  const setLoadedAssetData = useStore(state => state.setLoadedAssetData);


    useEffect(() => {

        const loadingAssetPromises = [
            ...getGLTFLoadingPromises(assets),
            ...getPNGLoadingPromises(assets),
        ];

        Promise.all(loadingAssetPromises).then((assetData) => {
            // createActiveMap(assetData);
            setLoadedAssetData(assetData);
        })


    }, [setLoadedAssetData, assets]);

    return (<ThreeFibreHTMLCanvas>
            <Camera>
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

              {loadedAssetData && <Strucutre texture={loadedAssetData['texture_wall_top']}/>}
            </Camera>
        </ThreeFibreHTMLCanvas>
    );
}

/*
{active_map && active_map.map((column, columnIndex)=>{
  return column.map((block, rowIndex)=>{
    switch (block.type){

      case 'wall': {
        return <Wall key={columnIndex + '' + rowIndex} textures={block.textures} position={block.position}/>
      }

      case 'floor': {
        return <Floor key={columnIndex + '' + rowIndex} textures={block.textures} position={block.position} rotation={block.rotation}/>
      }
      default: {
        return null;
      }
    }

  })
})}
*/


function getPNGLoadingPromises(assets) {
    const textureLoader = new THREE.TextureLoader();

    return Object.keys(assets).filter((assetKey) => assets[assetKey].url.endsWith('png')).map((assetKey, index) => {
        return new Promise((resolve, reject) => {
            textureLoader.load(assets[assetKey].url,
                function (texture) {
                    resolve({[assetKey]: texture});
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded' + assetKey);
                },
                function (error) {
                    console.log('An error happened' + assetKey, error);
                }
            );
        })
    })
}

function getGLTFLoadingPromises(assets) {
    const GLTFloader = new GLTFLoader();

    return Object.keys(assets).filter((assetKey) => assets[assetKey].url.endsWith('gltf')).map((assetKey, index) => {
        return new Promise((resolve, reject) => {
            GLTFloader.load(assets[assetKey].url,
                function (gltf) {
                    resolve({[assetKey]: gltf});
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded' + assetKey);
                },
                function (error) {
                    console.log('An error happened' + assetKey, error);
                }
            );
        })
    })
}


// function createMap(MAP_SIZE,  BLOCK_SIZE, assets) {
//   return [...Array(MAP_SIZE).keys()].map((itemCol, colIndex)=>{
//     return [...Array(MAP_SIZE).keys()].map((itemRow, rowIndex)=>{
//       const positionVector = new THREE.Vector3(colIndex*BLOCK_SIZE, 0, rowIndex*BLOCK_SIZE);
//       const offset = new THREE.Vector3(-(MAP_SIZE-1)/2, 0, -(MAP_SIZE-1)/2);
//       return Math.random() > 1 ? {
//         type: 'wall',
//         textures: {
//           'texture_wall_sides': assets['texture_wall_sides'],
//           'texture_wall_top': assets['texture_wall_top']
//         },
//         position: positionVector.clone().add(offset),
//         size: new THREE.Vector3(1,1.333,1) 
//       } : {
//         type: 'floor',
//         textures: {
//           'texture_floor_stones': assets['texture_floor_stones'],
//         },
//         position: positionVector.clone().add(offset),
//         size: new THREE.Vector2(1,1),
//         rotation: new THREE.Euler(-Math.PI/2, Math.PI/2*Math.floor(Math.random() * 4), 0, 'YXZ'),
//       } 
//     })
//   })
// }