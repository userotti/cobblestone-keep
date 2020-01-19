import * as THREE from 'three';
import { positionVectorToCell, cellToPositionVector } from './cellMap.js';

const origin = new THREE.Vector3(0,0,0);

export default function interaction(set){
  return {

    
    onPlaneTap: (positionVectorArray) => set(state=>{
      
      const cellTappedLocation = positionVectorToCell(positionVectorArray, state.cellMap.cellSize, state.cellMap.activeCellMapParameters);
      
      state.setCameraFocusPointPosition(positionVectorArray);
      
      const cellTappedType = state.cellMap.activeCellMap[cellTappedLocation[0]][cellTappedLocation[1]].type;

      return {
        interaction: {
          ...state.interaction,
          cellTappedLocation,
          cellTappedType
        }
       
        
      }
    })
    
  }
}
