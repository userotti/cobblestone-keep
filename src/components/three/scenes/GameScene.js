import React, {useEffect, useMemo} from 'react';
import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import Characters from '../map/Characters.js';
import Items from '../map/Items.js';
import * as THREE from 'three';
import Camera from '../Camera.js';
import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';

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
          setCameraFocusPointOnPlayer();
          
          // setPlayerPositionFromTapPoint([event.point.x, event.point.y, event.point.z]);
          // setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
        }}/>
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
}
