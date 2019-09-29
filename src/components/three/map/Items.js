import React, { Fragment } from 'react';

import Barrel from './items/Barrel';
// import { getRandomInt } from '../../../utils/mapGenerators/basic/index';

export default function Items({textures, activeItemMap}) {

  if (!textures || !activeItemMap) return null;

  // const wallOffset = getOffesetsFromCellType(activeCellMap, 'wall');
  // const floorOffset = getOffesetsFromCellType(activeCellMap, 'floor');
  // const floorRotations = getRotationsFromCellType(activeCellMap, 'floor');
  
  // const voidOffset = getOffesetsFromCellType(activeCellMap, 'void');
  // const voidRotations = getRotationsFromCellType(activeCellMap, 'void');
  
  // const doorOffset = getOffesetsFromCellType(activeCellMap, 'door');
  // const doorRotations = getRotationsFromCellType(activeCellMap, 'door');
  
  
  
  return (
    <Fragment>
      <Barrel position={[-0.5,-0.25,-0.5]} texture={textures['barrel']} />
      <Barrel position={[0.5,-0.25,-0.5]} texture={textures['barrel']} />
      <Barrel position={[0.5,-0.25,0.5]} texture={textures['barrel']} />
      <Barrel position={[-0.5,-0.25,0.5]} texture={textures['barrel']} />
      
    </Fragment>
  )
}
