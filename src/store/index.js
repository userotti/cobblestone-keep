import create from 'zustand'
import camera from './camera'
import assets from './assets'
import cellMap from './cellMap'
import characters from './characters'
import game from './game'

const canvasContainerSizeInPixels = [500, 500];
const [useStore] = create(set => ({

  canvasContainerSizeInPixels: canvasContainerSizeInPixels,
  interactionPlanePosition: [-1,-1,-1],    
  setInteractionPlanePosition: (newPostionArray) => set(state=>({interactionPlanePosition: newPostionArray})),
  
  ...camera(set),
  ...assets(set),
  ...cellMap(set),
  ...characters(set),
  ...game(set)

}))

export default useStore
