import create from 'zustand'
import * as THREE from 'three';

const cameraStartingPosition = new THREE.Vector3(40,40,40);

const [useStore] = create(set => ({

  block_size: 1,
  map_size: 5,
  assets: {
    'grey_brick_wall_three_gltf': {
      url: '/assets/walls_on_ground.gltf',
    },
    'brown_floor_three_gltf': {
      url: '/assets/tiled_floor.gltf',
    },
    'minecraft_atlas': {
      url: '/assets/atlas.png',
    },

    'texture_wall_sides': {
      url: '/assets/walls/bricks_shaded.png',
    },
    'texture_wall_top': {
      url: '/assets/walls/bricks-top2.png',
    },
    'texture_floor_stones': {
      url: '/assets/walls/floor-stones.png',
    },
  },
  setAssets: (value) => set((value)=>{
    return ({
      assets: value
    })
  }),


  cameraAspect: 4/3,
  canvasContainerSizeInPixels: [800, 600], 
  cameraStartingDistanceVector: cameraStartingPosition,

  cameraPosition: cameraStartingPosition.toArray(),
  cameraSize: 6,

  increaseCameraSize: (amount) => set((state) =>{
    
    return ({
      cameraSize: state.cameraSize + amount
    })
  }),

  rotateCamera: (amount) => set((state)=>{

    const currentAngle = getCurrentAngle(state.cameraPosition);
    const newAngle = currentAngle + amount;
    const newPosition = getNewPositionXZ(newAngle, Math.hypot(state.cameraStartingDistanceVector.x, state.cameraStartingDistanceVector.z));  
    
    return ({
      cameraPosition: [newPosition.x,40,newPosition.z]
    })
  }),
  
    
}))

export default useStore;



function getCurrentAngle(position){
  return Math.atan2(position[2], position[0]);
}

function getNewPositionXZ(newAngle, hypotenuse){
  
  return {
    x: Math.cos(newAngle)*hypotenuse,
    z: Math.sin(newAngle)*hypotenuse,
  }
}   