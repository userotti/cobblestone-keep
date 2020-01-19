import * as THREE from 'three'

const origin = new THREE.Vector3(0,0,0)

export default function camera(set){
  return {

    cameraAspect: 0,
    cameraSize: 5,
    cameraFocusPointPosition: origin.toArray(),
    cameraDistanceFromFocusPoint: 16,
    cameraOrthographicAngle: 0,
    cameraTiltValues: [0.0, 0.01, 0.3,  0.7,  1.0,  1.2,  1.5707],
    cameraTiltIndex: 6,
    cameraVisibleRadius: 16,

    setCameraAspectRatio: (width, height) => set((state) => {
      return {
        cameraAspect: width/height
      }
    }),
    setCameraFocusPointPosition: (newPostionArray) => set(state=>{
      let x = Math.floor((newPostionArray[0]+1) / (state.cellMap.cellSize[0]*2))*2; 
      let z = Math.floor((newPostionArray[2]+1) / (state.cellMap.cellSize[2]*2))*2; 
      return {
        cameraFocusPointPosition: [x, 0, z]
      }
    }),
    
    increaseCameraVisibleRadius: (amount) => set((state) => {
      return {
        cameraVisibleRadius: state.cameraVisibleRadius + amount
      }
    }),
    increaseCameraSize: (amount) => set((state) => {
      return {
        cameraSize: state.cameraSize + amount
      }
    }),
    rotateCamera: (amount) => set( (state) => {
      return {
        cameraOrthographicAngle: state.cameraOrthographicAngle + amount
      }
    }),
    tiltCamera: () => set( (state) => {
      return {
        cameraTiltIndex: state.cameraTiltIndex !== state.cameraTiltValues.length-1 ? state.cameraTiltIndex + 1 : 0
      }
    })
  }
}
