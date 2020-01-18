import React, { Fragment } from 'react'
import Wall from './cells/Wall'
import Floor from './cells/Floor'

export default function Structural({textures, floorOffsets, floorRotations, doorOffsets, doorRotations}) {
  
  
  if (!(textures && floorOffsets && floorRotations)) return null;
  
  console.log("render structural")
  return (
    <Fragment>
      <Floor texture={textures['basic_floor']} offsets={floorOffsets} rotations={floorRotations}/>
      <Floor texture={textures['basic_floor']} offsets={doorOffsets} rotations={doorRotations}/>
    </Fragment>
  )
}
