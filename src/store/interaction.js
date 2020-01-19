import * as THREE from 'three';

const origin = new THREE.Vector3(0,0,0);

export default function interaction(set){
  return {


    onPlaneTap: (positionVectorArray) => set(state=>{
      
      const cellTappedLocation = [Math.floor(positionVectorArray[0]/2 + state.cellMap.activeCellMapParameters.width/2), Math.floor(positionVectorArray[2]/2 + state.cellMap.activeCellMapParameters.height/2)];
      const cellTappedType = state.cellMap.activeCellMap[cellTappedLocation[0]][cellTappedLocation[1]].type;

      console.log("cellTappedLocation: ", cellTappedLocation);
      console.log("cellTappedType: ", cellTappedType);
      

      return {
        ...state.interaction,
        cellTappedLocation,
        cellTappedType
      }
    })
    
  }
}
