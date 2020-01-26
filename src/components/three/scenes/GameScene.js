import React, {useEffect, useRef, useMemo} from 'react';
import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import Characters from '../map/Characters.js';
import Items from '../map/Items.js';


import Swarm from '../effects/Swarm.js';
import * as THREE from 'three';

import Camera from '../Camera.js';
import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';

export default function GameScene({assets}) {
  
  const setActiveCellMapParameters = useStore(state => state.cellMap.setActiveCellMapParameters);
  const movePlayerTowardsCellAt = useStore(state => state.player.movePlayerTowardsCellAt);
  const setPlayerPositionToRandomOpenCell = useStore(state => state.player.setPlayerPositionToRandomOpenCell);
  const setCameraFocusPointPosition = useStore(state => state.setCameraFocusPointPosition);
  const setCameraFocusPointOnPlayer = useStore(state => state.setCameraFocusPointOnPlayer);
  const player = useStore(state => state.player);

  const getCellFromPositionVectorArray = useStore(state => state.cellMap.getCellFromPositionVectorArray);

  
  const loadAssets = useStore(state => state.loadAssets);
  const loadedAssetData = useStore(state => state.loadedAssetData);
  const createRock = useStore(state => state.items.createRock);
  

  const mouse = useRef([0, 0])

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

    

  }, [loadAssets, setActiveCellMapParameters])

  const { 
      dicrectionalLightTarget
    } = useMemo(()=>{
    return {
      dicrectionalLightTarget: new THREE.Object3D()
    }
  })  

  if(!loadedAssetData) return null  

  dicrectionalLightTarget.position.x = player.position[0];
  dicrectionalLightTarget.position.y = player.position[1];
  dicrectionalLightTarget.position.z = player.position[2];
  

  // console.log("dicrectionalLightTarget: ", dicrectionalLightTarget);

  // console.log([65 + robotPosition[0], 60, 65 + robotPosition[2]])
  return (
    <ThreeFibreHTMLCanvas>
      <primitive object={dicrectionalLightTarget}/>
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
          shadow-camera-left={-18}
          shadow-camera-bottom={-18}
          shadow-camera-top={18}
          shadow-camera-right={18}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        

        {/* <Swarm mouse={mouse} count={20} /> */}

        <Structural loadedAssetData={loadedAssetData}/>

        <Items textures={loadedAssetData}/>
        
        <Characters loadedAssetData={loadedAssetData}/>
     
        <StructuralOnTapPlane onTap={(event)=>{
          // onPlaneTap([event.point.x, event.point.y, event.point.z]);
          movePlayerTowardsCellAt([event.point.x, event.point.y, event.point.z]);
          setCameraFocusPointOnPlayer()
      
          createRock(getCellFromPositionVectorArray([event.point.x, event.point.y, event.point.z]));
          // setPlayerPositionFromTapPoint([event.point.x, event.point.y, event.point.z]);
          // setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
        }}/>
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
}
