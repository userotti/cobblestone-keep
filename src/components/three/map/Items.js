import React, { Fragment } from 'react';
import Barrel from './items/Barrel';

export default function Items({textures, activeItemMap}) {

  if (!textures) return null;
  
  return (
    <Fragment>
      <Barrel position={[-2,-1,-2]} texture={textures['model_gltf']} />
      {/* <Barrel position={[8,-1,8]} texture={textures['model_gltf']} />
      <Barrel position={[-10,-1,8]} texture={textures['model_gltf']} />
      <Barrel position={[10,-1,-8]} texture={textures['model_gltf']} /> */}
      
    </Fragment>
  )
}
