import create from 'zustand'
import camera from './camera'
import assets from './assets'
import cellMap from './cellMap'
import interaction from './interaction'
import game from './game'
import player from './player'
import items from './items'

const canvasContainerSizeInPixels = [1000, 500];
const [useStore] = create((set,get) => ({

  canvasContainerSizeInPixels: canvasContainerSizeInPixels,
  interactionPlanePosition: [0,-1,0],    
  setInteractionPlanePosition: (newPostionArray) => set(state=>({interactionPlanePosition: newPostionArray})),
  
  ...camera(set, get),
  ...assets(set, get),
  cellMap: cellMap(set, get),
  interaction: interaction(set, get),
  player: player(set, get),
  game: game(set, get),
  items: items(set, get)

}))

export default useStore
