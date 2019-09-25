import create from 'zustand'
import * as THREE from 'three';
import { buildOutTheMap } from '../utils/mapGenerators/basic';

const origin = new THREE.Vector3(0,0,0);
const distanceFromOrigin = 16;
const canvasContainerSizeInPixels = [800, 600];
const [useStore] = create(set => ({

  canvasContainerSizeInPixels: canvasContainerSizeInPixels,

  
  interactionPlanePosition: [-1,-1,-1],    
  cellSize: [1,1,1],
  activeCellMap: null,
  activeCellMapParameters: null,
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
    'texture_karoo_floor': {
      url: '/assets/walls/karoo_floor.png',
    },
    'karoo_wall': {
      url: '/assets/walls/karoo_wall.png',
    },
  },

  cameraAspect: canvasContainerSizeInPixels[0]/canvasContainerSizeInPixels[1],
  cameraSize: 18,

  cameraFocusPointPosition: origin.toArray(),
  cameraDistanceFromFocusPoint: distanceFromOrigin,
  cameraOrthographicAngle: 2.356194490192345,
  cameraVisibleRadius: 16,
  loadedAssetData: null,
  setInteractionPlanePosition: (newPostionArray) => set(state=>({interactionPlanePosition: newPostionArray})),
  setCameraFocusPointPosition: (newPostionArray) => set(state=>{
    
    let x = Math.floor((newPostionArray[0]+1) / (state.cellSize[0]*2))*2; 
    let z = Math.floor((newPostionArray[2]+1) / (state.cellSize[2]*2))*2; 
    
    return {
      cameraFocusPointPosition: [x, 0, z]
    }
    
    
  }),
  setLoadedAssetData: (loadedAssetData) => set(state=>({
    loadedAssetData: loadedAssetData.reduce((total, item, index)=>{
      return {
        ...total,
        ...item
      }
    }, {})
  })),

  setActiveCellMapParameters: (cellMapParams) => set(state=>{
    return {
      activeCellMap: buildOutTheMap(cellMapParams.width, cellMapParams.height, cellMapParams.roomSizeRange, cellMapParams.maxRooms),
      activeCellMapParameters: cellMapParams,
    }
  }),


  increaseCameraVisibleRadius: (amount) => set(state=>({cameraVisibleRadius: state.cameraVisibleRadius + amount})),
  increaseCameraSize: (amount) => set(state=>({cameraSize: state.cameraSize + amount})),
  rotateCamera: (amount) => set(state=> {
    return {
      cameraOrthographicAngle: state.cameraOrthographicAngle + amount
    }
  })
  

}))

export default useStore;
