import * as THREE from 'three';

const origin = new THREE.Vector3(0,0,0);

export default function characters(set){
  return {

 
    // cameraVisibleRadius: 16,

    doCellClickAction: (newPostionArray) => set(state=>{
      
      console.log('here',newPostionArray)
      return {
        characterPosition: [1, 0, 1]
      }
    })
  }
}
