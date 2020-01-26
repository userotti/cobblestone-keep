import React, {useEffect, useRef} from 'react';
import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import Characters from '../map/Characters.js';
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
  const robotPosition = useStore(state => state.player.position);

  
  const loadAssets = useStore(state => state.loadAssets);
  const loadedAssetData = useStore(state => state.loadedAssetData);

  const mouse = useRef([0, 0])

  useEffect(() => {
    loadAssets()
    setActiveCellMapParameters({
      width: 45,
      height: 45,
      roomSizeRange: [15,15],
      maxRooms: 1,
      type: 'cellular'
    })

    setPlayerPositionToRandomOpenCell()
    setCameraFocusPointOnPlayer()

  }, [loadAssets, setActiveCellMapParameters])

  if(!loadedAssetData) return null  

  let dicrectionalLightTarget = new THREE.Object3D();
  dicrectionalLightTarget.position.x = robotPosition[0];
  dicrectionalLightTarget.position.y = robotPosition[1];
  dicrectionalLightTarget.position.z = robotPosition[2];
  

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
          position={[robotPosition[0] + 8, robotPosition[1] + 10, robotPosition[2] + 8]}
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

        {/* <Items textures={loadedAssetData}/>
         */}
        <Characters loadedAssetData={loadedAssetData}/>
     
        <StructuralOnTapPlane onTap={(event)=>{
          // onPlaneTap([event.point.x, event.point.y, event.point.z]);
          movePlayerTowardsCellAt([event.point.x, event.point.y, event.point.z]);
          setCameraFocusPointOnPlayer()
          // setPlayerPositionFromTapPoint([event.point.x, event.point.y, event.point.z]);
          // setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
        }}/>
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
}
