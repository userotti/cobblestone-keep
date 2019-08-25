import create from 'zustand'
import * as THREE from 'three';

const origin = new THREE.Vector3(0,0,0);
const distanceFromOrigin = 20;

const canvasContainerSizeInPixels = [800, 600];

const [useStore] = create(set => ({

  canvasContainerSizeInPixels: canvasContainerSizeInPixels,
  
  block_size: 1,
  map_size: 7,
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
  


  cameraAspect: canvasContainerSizeInPixels[0]/canvasContainerSizeInPixels[1],
  cameraSize: 4,

  cameraFocusPointPosition: origin.toArray(),
  cameraDistanceFromFocusPoint: distanceFromOrigin,
  cameraOrthographicAngle: 0,
  cameraVisibleRadius: 3.5,
  
  setCameraFocusPointPosition: (newPostionArray) => set(state=>({cameraFocusPointPosition: newPostionArray})),
  increaseCameraVisibleRadius: (amount) => set(state=>({cameraVisibleRadius: state.cameraVisibleRadius + amount})),
  increaseCameraSize: (amount) => set(state=>({cameraSize: state.cameraSize + amount})),
  rotateCamera: (amount) => set(state=>({cameraOrthographicAngle: state.cameraOrthographicAngle + amount}))
  
    
}))

export default useStore;


