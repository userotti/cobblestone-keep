import React, { Fragment } from 'react'
import FloorTextureShare from './cells/FloorTextureShare'
import Floor from './cells/Floor'

import useStore from '../../../store';

export default function Structural() {
  

  console.log("Structural")


  return (
    <Fragment>
      <FloorTextureShare />
    </Fragment>
  )
}
