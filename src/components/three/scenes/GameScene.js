import React, {useEffect, useMemo , Fragment} from 'react';
import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import Characters from '../map/Characters.js';
import Items from '../map/Items.js';
import ModeManager from '../../ui/ModeManager.js';

import * as THREE from 'three';
import Camera from '../Camera.js';
import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';


import styled from 'styled-components';

export default function GameScene() {
  
  const loadAssets = useStore(state => state.loadAssets);
  const loadedAssetData = useStore(state => state.loadedAssetData);  
  const setActiveCellMapParameters = useStore(state => state.cellMap.setActiveCellMapParameters);
  const movePlayerTowardsCellAt = useStore(state => state.player.movePlayerTowardsCellAt);
  const setPlayerPositionToRandomOpenCell = useStore(state => state.player.setPlayerPositionToRandomOpenCell);
  const setCameraFocusPointOnPlayer = useStore(state => state.setCameraFocusPointOnPlayer);
  const player = useStore(state => state.player);
  const getAllCellLocationsOfType = useStore(state => state.cellMap.getAllCellLocationsOfType);
  const scatterRocks = useStore(state => state.items.scatterRocks);
  
  
  useEffect(() => {
    loadAssets();
    setActiveCellMapParameters({
      width: 45,
      height: 45,
      roomSizeRange: [15,15],
      maxRooms: 1,
      type: 'cellular'
    });

    setPlayerPositionToRandomOpenCell();
    setCameraFocusPointOnPlayer();

    scatterRocks(100, getAllCellLocationsOfType("floor"));

  }, [
    loadAssets, 
    setActiveCellMapParameters, 
    setPlayerPositionToRandomOpenCell, 
    setCameraFocusPointOnPlayer, 
    scatterRocks, 
    getAllCellLocationsOfType
  ])

  const { 
      dicrectionalLightTarget
    } = useMemo(()=>{
    return {
      dicrectionalLightTarget: new THREE.Object3D()
    }
  }, [])  

  if(!loadedAssetData || !player.position) return null  

  dicrectionalLightTarget.position.x = player.position[0];
  dicrectionalLightTarget.position.y = player.position[1];
  dicrectionalLightTarget.position.z = player.position[2];

  console.log("GameScene return...")
  return (
    <Fragment>
      <ThreeFibreHTMLCanvas>
        <Camera>
          <hemisphereLight color={0xffffff} intensity={1.9}/>

          <directionalLight
            intensity={0.9}
            color={0xffffff}
            position={[player.position[0] + 8, player.position[1] + 10, player.position[2] + 8]}
            target={dicrectionalLightTarget}
            
            castShadow={true}
            shadow-camera-near={0.5}
            shadow-camera-far={500}
            shadow-camera-left={-9}
            shadow-camera-bottom={-9}
            shadow-camera-top={9}
            shadow-camera-right={9}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />


          <primitive object={dicrectionalLightTarget}/>

          

          {/* <Swarm mouse={mouse} count={20} /> */}

          <Structural loadedAssetData={loadedAssetData}/>

          <Items textures={loadedAssetData}/>
          
          <Characters/>
      
          <StructuralOnTapPlane onTap={(event)=>{
            event.stopPropagation();
            console.log("On Plane Tap");


            // onPlaneTap([event.point.x, event.point.y, event.point.z]);
            // movePlayerTowardsCellAt([event.point.x, event.point.y, event.point.z]);
            // setCameraFocusPointOnPlayer();
            
            // setPlayerPositionFromTapPoint([event.point.x, event.point.y, event.point.z]);
            // setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
          }}/>
        </Camera>
      </ThreeFibreHTMLCanvas>
      <ModeManager/>
    </Fragment>
    
  );
}


