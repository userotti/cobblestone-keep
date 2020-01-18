import * as THREE from 'three';

const origin = new THREE.Vector3(0,0,0);

export default function interaction(set){
  return {


    onPlaneTap: (positionVectorArray) => set(state=>{
      
      console.log("positionVectorArray: ", positionVectorArray);

      return {
        ...state.interaction
      }
    })
    
  }
}
