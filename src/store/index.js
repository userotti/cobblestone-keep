import create from 'zustand'
import camera from './camera';
import assets from './assets';
import cellMap from './cellMap';
import items from './items';
import characters from './characters';


const canvasContainerSizeInPixels = [800, 600];
const [useStore] = create(set => ({

  canvasContainerSizeInPixels: canvasContainerSizeInPixels,
  interactionPlanePosition: [-1,-1,-1],    
  setInteractionPlanePosition: (newPostionArray) => set(state=>({interactionPlanePosition: newPostionArray})),
  
  
  ...camera(set),
  ...assets(set),
  ...cellMap(set),
  ...items(set),
  ...characters(set)
  

}))

export default useStore;
