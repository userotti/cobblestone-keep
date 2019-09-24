import React, {useEffect} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

import Structural from '../map/structural.js';
import Camera from '../Camera.js';

import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';


export default function GameScene({assets, BLOCK_SIZE, MAP_SIZE}) {

  const activeCellMap = useStore(state => state.activeCellMap);
  const activeCellMapParameters = useStore(state => state.activeCellMapParameters);
  const setCameraFocusPointPosition = useStore(state => state.setCameraFocusPointPosition);
  const loadedAssetData = useStore(state => state.loadedAssetData);
  const setLoadedAssetData = useStore(state => state.setLoadedAssetData);

  console.log("GameScene activeCellMap: ",activeCellMap);
  useEffect(() => {

      const loadingAssetPromises = [
        ...getGLTFLoadingPromises(assets),
        ...getPNGLoadingPromises(assets),
      ];

      Promise.all(loadingAssetPromises).then((assetData) => {
        setLoadedAssetData(assetData);
      })


  }, [setLoadedAssetData, assets]);

  return (
    <ThreeFibreHTMLCanvas>
      <Camera>
        <ambientLight intensity={0.9}/>
        <directionalLight
          intensity={0.9}
          color={0xffffff}
          position={[100, 200, -100]}
          castShadow={true}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-48}
          shadow-camera-bottom={-48}
          shadow-camera-top={48}
          shadow-camera-right={48}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

      <Structural textures={loadedAssetData} activeCellMap={activeCellMap}/>
      {activeCellMapParameters && <StructuralOnTapPlane width={activeCellMapParameters.width} height={activeCellMapParameters.height} onTap={(event)=>{
        setCameraFocusPointPosition([event.point.x, 0, event.point.z])
      }}/> }
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
}

// import React from 'react';
// import * as THREE from 'three';

function StructuralOnTapPlane({width, height, onTap}){
  
  return (
    <mesh
      position={new THREE.Vector3(0,-1,0)} 
      rotation={new THREE.Euler(-Math.PI/2, 0, 0)}
      onClick={onTap}
    >
      <planeBufferGeometry 

        attach="geometry" 
        args={[width*2, height*2]}/> 
      <meshBasicMaterial attach="material" color="#405A71" alphaTest="0"/>
    </mesh>
  )
}



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

