import create from 'zustand'
import * as THREE from 'three';


const origin = new THREE.Vector3(0,0,0);
const distanceFromOrigin = 16;

const canvasContainerSizeInPixels = [800, 600];

const [useStore] = create(set => ({

  canvasContainerSizeInPixels: canvasContainerSizeInPixels,

  block_size: 1,
  map_size: 12,
  active_map: null,
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
      url: '/assets/walls/floor-stones_64x64.png',
    },
  },



  cameraAspect: canvasContainerSizeInPixels[0]/canvasContainerSizeInPixels[1],
  cameraSize: 4,

  cameraFocusPointPosition: origin.toArray(),
  cameraDistanceFromFocusPoint: distanceFromOrigin,
  cameraOrthographicAngle: 0,
  cameraVisibleRadius: 16,
  loadedAssetData: null,
  setCameraFocusPointPosition: (newPostionArray) => set(state=>({cameraFocusPointPosition: newPostionArray})),
  setLoadedAssetData: (loadedAssetData) => set(state=>({
    loadedAssetData: loadedAssetData.reduce((total, item, index)=>{
      console.log("item: ", item)
      return {
        ...total,
        ...item
      }
    }, {})
  })),

  createActiveMap: (loadedAssetData) => set((state)=>{

    const map = createMap(state.map_size, state.block_size, loadedAssetData.reduce((total, item, index)=>{
      return {
        ...total,
        ...item
      }
    }, {}));

    return ({
      active_map: map
    })
  }),

  increaseCameraVisibleRadius: (amount) => set(state=>({cameraVisibleRadius: state.cameraVisibleRadius + amount})),
  increaseCameraSize: (amount) => set(state=>({cameraSize: state.cameraSize + amount})),
  rotateCamera: (amount) => set(state=>({cameraOrthographicAngle: state.cameraOrthographicAngle + amount}))


}))

export default useStore;


function createMap(MAP_SIZE,  BLOCK_SIZE, assets) {
  return [...Array(MAP_SIZE).keys()].map((itemCol, colIndex)=>{
    return [...Array(MAP_SIZE).keys()].map((itemRow, rowIndex)=>{
      const positionVector = new THREE.Vector3(colIndex*BLOCK_SIZE, 0, rowIndex*BLOCK_SIZE);
      const offset = new THREE.Vector3(-(MAP_SIZE-1)/2, 0, -(MAP_SIZE-1)/2);
      return Math.random() > 1 ? {
        type: 'wall',
        textures: {
          'texture_wall_sides': assets['texture_wall_sides'],
          'texture_wall_top': assets['texture_wall_top']
        },
        position: positionVector.clone().add(offset),
        size: new THREE.Vector3(1,1.333,1)
      } : {
        type: 'floor',
        textures: {
          'texture_floor_stones': assets['texture_floor_stones'],
        },
        position: positionVector.clone().add(offset),
        size: new THREE.Vector2(1,1),
        rotation: new THREE.Euler(-Math.PI/2, Math.PI/2*Math.floor(Math.random() * 4), 0, 'YXZ'),
      }
    })
  })
}