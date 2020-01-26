import * as THREE from 'three';
import { positionVectorToCell, cellToPositionVector } from './cellMap.js';


export default function items(set, get){
  return {

    rocks: [],
    createRock: (cellLocation) => set((state) => {

      let rock = {
        id: Math.random(),
        cellLocation: cellLocation,
        position: cellToPositionVector(cellLocation, state.cellMap.cellSize, state.cellMap.activeCellMapParameters)
      }

      console.log("state.items.rocks: ", state.items.rocks);
      return {
        items: {
          ...state.items,
          rocks: [...state.items.rocks, rock]
        }
      }
    })
    
  }
}
