import React, {useEffect} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

import Items from '../map/Items.js';
import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import FocusedCell from '../map/FocusedCell.js';


import Camera from '../Camera.js';

import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';


export default function GameScene({assets}) {

  const activeCellMap = useStore(state => state.activeCellMap);
  const setCameraFocusPointPosition = useStore(state => state.setCameraFocusPointPosition);
  const loadedAssetData = useStore(state => state.loadedAssetData);
  const setLoadedAssetData = useStore(state => state.setLoadedAssetData);

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
       < directionalLight
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
      <Items textures={loadedAssetData} activeItemMap={activeCellMap}/>

      <StructuralOnTapPlane onTap={(event)=>{
        setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
      }}/>
      {/* <FocusedCell/> */}
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
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

