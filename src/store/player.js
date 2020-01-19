import * as THREE from 'three';
import { positionVectorToCell, cellToPositionVector } from './cellMap.js';

const origin = new THREE.Vector3(0,0,0);

export default function player(set){
  return {

    position: [0,0,0],
    hopping: false,
    setPositionFromPosition: (positionVectorArray) => set(state=>{
     
      const cellLocation = positionVectorToCell(positionVectorArray, state.cellMap.cellSize, state.cellMap.activeCellMapParameters);
      const position = cellToPositionVector(cellLocation, state.cellMap.cellSize, state.cellMap.activeCellMapParameters);

      const shouldHop = (state.player.position[0] != position[0] || state.player.position[2] != position[2]);
      return {
        player: {
          ...state.player,
          position: position,
          hopping: shouldHop
        }
      }

    }),
    setPositionFromCell: (cellCoord) => set(state=>{
      
      const position = cellToPositionVector(cellCoord, state.cellMap.cellSize, state.cellMap.activeCellMapParameters);
      
      return {
        player: {
          ...state.player,
          position: position,
          hopping: true
        }
      }

    })
    
  }
}
