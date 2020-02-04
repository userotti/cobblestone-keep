import * as THREE from 'three'

const origin = new THREE.Vector3(0,0,0)

export default function camera(set,get){
  return {

    cameraAspect: 0,
    cameraSize: 5,
    cameraFocusPointPosition: origin.toArray(),
    cameraDistanceFromFocusPoint: 16,
    cameraOrthographicAngle: 0.78,
    cameraTiltValues: [0.0, 0.01, 0.3,  0.7,  1.0,  1.2,  1.5707],
    cameraTiltIndex: 3,
    cameraVisibleRadius: 16,

    setCameraAspectRatio: (width, height) => set((state) => {
      return {
        camera: {
          ...state.camera,
          cameraAspect: width/height
        }
      }
    }),
    setCameraFocusPointPosition: (newPostionArray) => set(state=>{
      let x = Math.floor((newPostionArray[0]+1) / (state.cellMap.cellSize[0]*2))*2; 
      let z = Math.floor((newPostionArray[2]+1) / (state.cellMap.cellSize[2]*2))*2; 
      return {
        camera: {
          ...state.camera,
          cameraFocusPointPosition: [x, 0, z]
        }  
      }
    }),
    setCameraFocusPointOnPlayer: () => set(state=>{
      return {
        camera: {
          ...state.camera,
          cameraFocusPointPosition: state.player.position
        }  
      }
    }),
    increaseCameraVisibleRadius: (amount) => set((state) => {
      return {
        camera: {
          ...state.camera,
          cameraVisibleRadius: state.camera.cameraVisibleRadius + amount
        }
      }
    }),
    increaseCameraSize: (amount) => set((state) => {
      return {
        camera: {
          ...state.camera,
          cameraSize: state.camera.cameraSize + amount
        }
      }
    }),
    rotateCamera: (amount) => set( (state) => {
      return {
        camera: {
          ...state.camera,
          cameraOrthographicAngle: state.camera.cameraOrthographicAngle + amount
        }  
      }
    }),
    tiltCamera: () => set( (state) => {
      return {
        camera: {
          ...state.camera,  
          cameraTiltIndex: state.camera.cameraTiltIndex !== state.camera.cameraTiltValues.length-1 ? state.camera.cameraTiltIndex + 1 : 0
        }  
      }
    })
  }
}
