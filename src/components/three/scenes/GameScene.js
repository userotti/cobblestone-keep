import React, {useEffect} from 'react';

import Items from '../map/Items.js';
import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import FocusedCell from '../map/FocusedCell.js';
import Characters from '../map/Characters';
import Camera from '../Camera.js';

import Shroud from '../map/tiles/Shroud';

import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';

export default function GameScene({assets}) {

  const activeCellMap = useStore(state => state.activeCellMap);
  const doCellClickAction = useStore(state => state.doCellClickAction);
  const setCameraFocusPointPosition = useStore(state => state.setCameraFocusPointPosition);
  const loadAssets = useStore(state => state.loadAssets);
  const loadedAssetData = useStore(state => state.loadedAssetData);
  
  console.log("activeCellMap: ",  activeCellMap);
  useEffect(() => {
      loadAssets()
  }, [loadAssets])

  if(!loadedAssetData) return null

  return (
    <ThreeFibreHTMLCanvas>
      <Camera>
        <hemisphereLight color={0xffffff} intensity={0.9}/>
        <directionalLight
          intensity={0.9}
          color={0xffffff}
          position={[100, 200, -100]}
          castShadow={true}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-28}
          shadow-camera-bottom={-28}
          shadow-camera-top={28}
          shadow-camera-right={28}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

      <Structural textures={loadedAssetData} activeCellMap={activeCellMap}/>
      {/* <Items textures={loadedAssetData} activeItemMap={activeCellMap}/> */}
      <Characters textures={loadedAssetData} activeItemMap={activeCellMap}/>

      <Shroud texture={loadedAssetData['moon_floor']} position={[0,5,0]} />
      

      {/* <StructuralOnTapPlane onTap={(event)=>{
        doCellClickAction([event.point.x, event.point.y, event.point.z])
        // setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
      }}/> */}
      {/* <FocusedCell/> */}
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
}
