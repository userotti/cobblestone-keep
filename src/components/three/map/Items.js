import React, { Fragment } from 'react';
import Barrel from './items/Barrel';

export default function Items({textures, activeItemMap}) {

  if (!textures || !activeItemMap) return null;
  
  return (
    <Fragment>
      <Barrel position={[-0.5,-0.25,-0.5]} texture={textures['barrel']} />
      <Barrel position={[0.5,-0.25,-0.5]} texture={textures['barrel']} />
      <Barrel position={[0.5,-0.25,0.5]} texture={textures['barrel']} />
      <Barrel position={[-0.5,-0.25,0.5]} texture={textures['barrel']} />
      
    </Fragment>
  )
}
