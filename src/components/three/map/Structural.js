import React, { Fragment } from 'react';
import Wall from './cells/Wall';
import Floor from './cells/Floor';
import { getRandomInt } from '../../../utils/mapGenerators/basic/index';

export default function Structural({textures, activeCellMap}) {

  
  if (!textures || !activeCellMap) return null;

  const wallOffset = getOffesetsFromCellType(activeCellMap, 'wall');
  const floorOffset = getOffesetsFromCellType(activeCellMap, 'floor');
  const floorRotations = getRotationsFromCellType(activeCellMap, 'floor');
  
  const voidOffset = getOffesetsFromCellType(activeCellMap, 'void');
  const voidRotations = getRotationsFromCellType(activeCellMap, 'void');
  
  const doorOffset = getOffesetsFromCellType(activeCellMap, 'door');
  const doorRotations = getRotationsFromCellType(activeCellMap, 'door');
  
  
  
  return (
    <Fragment>
      <Wall texture={textures['moon_floor']} offsets={wallOffset}/>
      <Floor texture={textures['moon_floor']} offsets={floorOffset} rotations={floorRotations}/>
      <Floor texture={textures['moon_floor']} offsets={doorOffset} rotations={doorRotations}/>
      
    </Fragment>
  )
}

function getOffesetsFromCellType(activeCellMap, type){

  let typedCells = activeCellMap.reduce((total, cellColumn, xindex)=>{
    return [...total, ...cellColumn.map((cell, yindex)=>{
      return {
        type: cell.type,
        x: xindex * 2 - activeCellMap.length,
        y: 0,
        z: yindex * 2 - cellColumn.length
      }
    })]

  }, []).filter(cell=>cell.type === type)

  const offsets = new Float32Array( typedCells.length * 3 ); // xyz
  for ( let i = 0, l = typedCells.length; i < l; i++ ) {

      const index = 3 * i;
      // per-instance position offset
      offsets[ index ] = typedCells[i].x;
      offsets[ index + 1 ] = typedCells[i].y
      offsets[ index + 2 ] = typedCells[i].z;
  }
  
  return offsets;
}

function getRotationsFromCellType(activeCellMap, type){

  let typedCells = activeCellMap.reduce((total, cellColumn, xindex)=>{
    return [...total, ...cellColumn.map((cell, yindex)=>{
      return {
        type: cell.type,
        rotation: (Math.PI / 2) * getRandomInt(0,4),
      }
    })]

  }, []).filter(cell=>cell.type === type)

  const rotations = new Float32Array( typedCells.length * 1 ); // xyz
  for ( let i = 0, l = typedCells.length; i < l; i++ ) {

      const index = 1 * i;
      // per-instance position offset
      rotations[ index ] = typedCells[i].rotation;
      // rotations[ index + 1 ] = typedCells[i].rotation;
      // rotations[ index + 2] = typedCells[i].rotation;
      
     
  }
  
  return rotations;
}