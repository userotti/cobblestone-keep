import React, { Fragment } from 'react'
import Wall from './cells/Wall'
import Floor from './cells/Floor'

import { getRandomInt } from '../../../utils/functions'

export default function Structural({textures, floorOffsets, floorRotations}) {
  

  // console.log("render Structural textures:", textures);
  // console.log("render Structural floorOffsets:", floorOffsets);
  // console.log("render Structural floorRotations:", floorRotations);
  
  if (!(textures && floorOffsets && floorRotations)) return null;
  
  console.log("render structural")
  return (
    <Fragment>
      <Floor texture={textures['basic_floor']} offsets={floorOffsets} rotations={floorRotations}/>
    </Fragment>
  )
}
