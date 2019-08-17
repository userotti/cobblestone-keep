import create from 'zustand'


const [useStore] = create(set => ({
  cameraSize: 6,
  cameraAspect: 4/3,
  canvasContainerSizeInPixels: [1024, 768], 

  UIButtonsColor: '#aa4',
    
  increaseCameraSize: (amount) => set(state=>({cameraSize: state.cameraSize + amount})),
  decreaseCameraSize: (amount) => set(state=>({cameraSize: state.cameraSize - amount})),
}))

export default useStore;