import * as THREE from 'three';
import { positionVectorToCell, cellToPositionVector } from './cellMap.js';

import {Howl, Howler} from 'howler';

const sound = new Howl({
  src: ['/assets/sounds/sound_move_2.wav']
});

const origin = new THREE.Vector3(0,0,0);

export default function player(set, get){
  return {

    position: [0,0,0],
    hopping: false,
    movePlayerTowardsCellAt: (positionVectorArray) => {

      get().player.setPositionFromCell(positionVectorArray);
    },
    setPlayerPositionFromTapPoint: (positionVectorArray) => {
      const cellLocation = positionVectorToCell(positionVectorArray, get().cellMap.cellSize, get().cellMap.activeCellMapParameters);
      get().player.setPositionFromCell(cellLocation);
    },

    setPositionFromCell: (cellLocation) => set(state=>{
      const position = cellToPositionVector(cellLocation, state.cellMap.cellSize, state.cellMap.activeCellMapParameters);
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
