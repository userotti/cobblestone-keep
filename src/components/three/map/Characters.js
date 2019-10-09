import React, { Fragment } from 'react';

import Robot from './characters/Robot';

export default function Characters({textures, activeItemMap}) {

  if (!textures || !activeItemMap) return null;
  
  return (
    <Fragment>
      <Robot position={[-0.5,-0.25,-0.5]} texture={textures['barrel']} />
    </Fragment>
  )
}
