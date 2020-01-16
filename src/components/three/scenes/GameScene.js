import React, {Suspense, Fallback, useEffect} from 'react';

import Items from '../map/Items.js';
import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import FocusedCell from '../map/FocusedCell.js';
import Characters from '../map/Characters';
import Camera from '../Camera.js';

// import ModelX from '../../../models/Model'

import Shroud from '../map/tiles/Shroud';

import ActionTile from '../map/tiles/ActionTile';

import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';

// ! Ugly ... move out of here...
function arraysIdentical(a, b) {
  var i = a.length;
  if (i != b.length) return false;
  while (i--) {
      if (a[i] !== b[i]) return false;
  }
  return true;
};


export default function GameScene({assets}) {

  const activeCellMap = useStore(state => state.activeCellMap);
  const doCellClickAction = useStore(state => state.doCellClickAction);
  const setCameraFocusPointPosition = useStore(state => state.setCameraFocusPointPosition);
  const loadAssets = useStore(state => state.loadAssets);
  const loadedAssetData = useStore(state => state.loadedAssetData);

  const { 
    shroudRemoved
  } = useStore()

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

      {/* <Suspense fallback={<Fallback />}>
        <ModelX />
      </Suspense> */}

      <Structural textures={loadedAssetData} activeCellMap={activeCellMap}/>
      {/* <Items textures={loadedAssetData} activeItemMap={activeCellMap}/> */}
      <Characters loadedAssetData={loadedAssetData} activeItemMap={activeCellMap}/>

      {shroudRemoved.find(s => arraysIdentical(s,[-4,0,-4])) ? <ActionTile position={[-4,-.5,-4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-4,0,-4]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[-4,0,-2])) ? <ActionTile position={[-4,-.5,-2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-4,0,-2]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[-4,0,0])) ? <ActionTile position={[-4,-.5,0]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-4,0,0]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[-4,0,2])) ? <ActionTile position={[-4,-.5,2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-4,0,2]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[-4,0,4])) ? <ActionTile position={[-4,-.5,4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-4,0,4]} />}

      {shroudRemoved.find(s => arraysIdentical(s,[-2,0,-4])) ? <ActionTile position={[-2,-.5,-4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-2,0,-4]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[-2,0,-2])) ? <ActionTile position={[-2,-.5,-2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-2,0,-2]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[-2,0,0])) ? <ActionTile position={[-2,-.5,0]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-2,0,0]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[-2,0,2])) ? <ActionTile position={[-2,-.5,2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-2,0,2]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[-2,0,4])) ? <ActionTile position={[-2,-.5,4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[-2,0,4]} />}

      {shroudRemoved.find(s => arraysIdentical(s,[0,0,-4])) ? <ActionTile position={[0,-.5,-4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[0,0,-4]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[0,0,-2])) ? <ActionTile position={[0,-.5,-2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[0,0,-2]} />}
      <ActionTile position={[0,-.5,0]} texture={loadedAssetData['texture_karoo_floor']} />
      {shroudRemoved.find(s => arraysIdentical(s,[0,0,2])) ? <ActionTile position={[0,-.5,2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[0,0,2]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[0,0,4])) ? <ActionTile position={[0,-.5,4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[0,0,4]} />}

      {shroudRemoved.find(s => arraysIdentical(s,[2,0,-4])) ? <ActionTile position={[2,-.5,-4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[2,0,-4]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[2,0,-2])) ? <ActionTile position={[2,-.5,-2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[2,0,-2]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[2,0,0])) ? <ActionTile position={[2,-.5,0]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[2,0,0]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[2,0,2])) ? <ActionTile position={[2,-.5,2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[2,0,2]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[2,0,4])) ? <ActionTile position={[2,-.5,4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[2,0,4]} />}

      {shroudRemoved.find(s => arraysIdentical(s,[4,0,-4])) ? <ActionTile position={[4,-.5,-4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[4,0,-4]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[4,0,-2])) ? <ActionTile position={[4,-.5,-2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[4,0,-2]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[4,0,0])) ? <ActionTile position={[4,-.5,0]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[4,0,0]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[4,0,2])) ? <ActionTile position={[4,-.5,2]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[4,0,2]} />}
      {shroudRemoved.find(s => arraysIdentical(s,[4,0,4])) ? <ActionTile position={[4,-.5,4]} texture={loadedAssetData['texture_karoo_floor']} /> : <Shroud texture={loadedAssetData['shroud']} position={[4,0,4]} />}

      {/* <Shroud texture={loadedAssetData['moon_floor']} position={[-5,0,-4]} /> */}
      
      {/* <StructuralOnTapPlane onTap={(event)=>{
        doCellClickAction([event.point.x, event.point.y, event.point.z])
        // setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
      }}/> */}
      {/* <FocusedCell/> */}
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
}
