import React, { Fragment } from 'react';
import Wall from './cells/wall';
import Floor from './cells/floor';

export default function Structural({textures, activeCellMap}) {

  
  if (!textures || !activeCellMap) return null;

  const wallOffset = getOffesetsFromCellType(activeCellMap, 'wall');
  const floorOffset = getOffesetsFromCellType(activeCellMap, 'floor');
  console.log("floorOffset: ",floorOffset)
  return (
    <Fragment>
      <Wall texture={textures['karoo_wall']} offsets={wallOffset}/>
      <Floor texture={textures['texture_karoo_floor']} offsets={floorOffset}/>
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