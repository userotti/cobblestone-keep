import create from 'zustand'
import camera from './camera'
import assets from './assets'
import cellMap from './cellMap'
import interaction from './interaction'
import game from './game'
import player from './player'

const canvasContainerSizeInPixels = [500, 500];
const [useStore] = create(set => ({

  canvasContainerSizeInPixels: canvasContainerSizeInPixels,
  interactionPlanePosition: [0,-1,0],    
  setInteractionPlanePosition: (newPostionArray) => set(state=>({interactionPlanePosition: newPostionArray})),
  
  ...camera(set),
  ...assets(set),
  cellMap: cellMap(set),
  interaction: interaction(set),
  player: player(set),
  ...game(set)

}))

export default useStore
