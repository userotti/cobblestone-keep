import React, { Fragment } from 'react'
import Wall from './cells/Wall'
import Floor from './cells/Floor'
import useStore from '../../../store';

export default function Structural({loadedAssetData}) {
  
  const floorOffsets = useStore(state => state.cellMap.floorOffsets);
  const floorRotations = useStore(state => state.cellMap.floorRotations);

  const doorOffsets = useStore(state => state.cellMap.doorOffsets);
  const doorRotations = useStore(state => state.cellMap.doorRotations);

  if (!loadedAssetData) return null

  return (
    <Fragment>
      <Floor texture={loadedAssetData['basic_floor2']} offsets={floorOffsets} rotations={floorRotations}/>
      <Floor texture={loadedAssetData['basic_floor']} offsets={doorOffsets} rotations={doorRotations}/>
    </Fragment>
  )
}
