import create from 'zustand'
import camera from './camera'
import assets from './assets'
import cellMap from './cellMap'
import game from './game'
import player from './player'
import items from './items'
import modeManager from './modeManager'


const canvasContainerSizeInPixels = [500, 500];
const [useStore] = create((set,get) => ({

  canvasContainerSizeInPixels: canvasContainerSizeInPixels,
  interactionPlanePosition: [0,0,0],    
  setInteractionPlanePosition: (newPostionArray) => set(state=>({interactionPlanePosition: newPostionArray})),
  
  camera: camera(set, get),
  assets: assets(set, get),
  cellMap: cellMap(set, get),
  player: player(set, get),
  game: game(set, get),
  items: items(set, get),
  modeManager: modeManager(set, get)

}))

export default useStore
