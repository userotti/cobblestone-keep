import React, { Fragment, useState, useEffect } from 'react';
import Robot from './characters/Robot';
import Enemy from './characters/Enemy';
import { getRandomInt } from '../../../utils/functions'
import useStore from '../../../store';

export default function Characters({loadedAssetData}) {

  const robotPosition = useStore(state => state.player.position);
  const robotHopping = useStore(state => state.player.hopping);
  
  
  return (
    <Fragment>
      <Robot position={robotPosition} loadedAssetData={loadedAssetData} hopping={robotHopping} />
      <Enemy position={[-4,0,-2]} loadedAssetData={loadedAssetData} />
      <Enemy position={[2,0,12]} loadedAssetData={loadedAssetData} /> 
      <Enemy position={[4,0,-8]} loadedAssetData={loadedAssetData} /> 

    </Fragment>
  )
}
