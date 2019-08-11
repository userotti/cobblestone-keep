import create from 'zustand'

const store = state => ({
  cameraSize: 15,
  increaseCameraSize: (amount) => state.cameraSize + amount,
  decreaseCameraSize: (amount) => state.cameraSize - amount
})

const [useStore] = create((store))

export default useStore;