import React, {Suspense, Fallback, useEffect} from 'react';

import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import Characters from '../map/Characters';
import Camera from '../Camera.js';
import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';


export default function GameScene({assets}) {

  const floorOffsets = useStore(state => state.cellMap.floorOffsets);
  const floorRotations = useStore(state => state.cellMap.floorRotations);

  const doorOffsets = useStore(state => state.cellMap.doorOffsets);
  const doorRotations = useStore(state => state.cellMap.doorRotations);
  
  const setActiveCellMapParameters = useStore(state => state.cellMap.setActiveCellMapParameters);

  const doCellClickAction = useStore(state => state.doCellClickAction);
  const setCameraFocusPointPosition = useStore(state => state.setCameraFocusPointPosition);
  const loadAssets = useStore(state => state.loadAssets);
  const loadedAssetData = useStore(state => state.loadedAssetData);


  useEffect(() => {
    loadAssets()
    setActiveCellMapParameters({
      width: 15,
      height: 15,
      roomSizeRange: [15,15],
      maxRooms: 1
    })
  }, [loadAssets, setActiveCellMapParameters])

  if(!loadedAssetData) return null

  return (
    <ThreeFibreHTMLCanvas>
      <Camera>
        <hemisphereLight color={0xffffff} intensity={0.9}/>
        <directionalLight
          intensity={0.9}
          color={0xffffff}
          position={[-45, 50, 45]}
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


        <Structural 
          textures={loadedAssetData} 
          floorOffsets={floorOffsets}
          floorRotations={floorRotations}
          doorOffsets={doorOffsets}
          doorRotations={doorRotations}
        />

      {/* <Items textures={loadedAssetData} activeItemMap={activeCellMap}/> */}
      {/* <Characters loadedAssetData={loadedAssetData} activeItemMap={activeCellMap}/> */}
     
      {/* <StructuralOnTapPlane onTap={(event)=>{
        doCellClickAction([event.point.x, event.point.y, event.point.z])
        // setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
      }}/> */}
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
}
