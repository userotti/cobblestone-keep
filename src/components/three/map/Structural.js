import React, { Fragment } from 'react'
import FloorTextureShare from './cells/FloorTextureShare'
import Floor from './cells/Floor'

import useStore from '../../../store';

export default function Structural({loadedAssetData}) {
  
  const floorOffsets = useStore(state => state.cellMap.floorOffsets);
  const floorRotations = useStore(state => state.cellMap.floorRotations);
  const floorUvs = useStore(state => state.cellMap.floorUvs);
  

  const doorOffsets = useStore(state => state.cellMap.doorOffsets);
  const doorRotations = useStore(state => state.cellMap.doorRotations);

  if (!loadedAssetData) return null

  return (
    <Fragment>
      <FloorTextureShare texture={loadedAssetData['texture_share_floor_16_256']} offsets={floorOffsets} rotations={floorRotations} instanceUvs={floorUvs} tileSize={[16,16]}/>
      <Floor texture={loadedAssetData['basic_floor']} offsets={doorOffsets} rotations={doorRotations}/>
    </Fragment>
  )
}
