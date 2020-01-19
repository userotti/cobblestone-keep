import React, { Fragment, useState, useEffect } from 'react';
import Robot from './characters/Robot';
import { getRandomInt } from '../../../utils/functions'
import useStore from '../../../store';

export default function Characters({loadedAssetData}) {

  const robotPosition = useStore(state => state.player.position);
  const robotHopping = useStore(state => state.player.hopping);
  
  
  return (
    <Fragment>
      <Robot position={robotPosition} loadedAssetData={loadedAssetData} hopping={robotHopping} /> 
    </Fragment>
  )
}
