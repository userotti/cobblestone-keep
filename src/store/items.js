
import { cellToPositionVector } from './cellMap.js';


export default function items(set, get){
  return {

    rocks: [],
    makeRock: (cellLocation)=>{

      const { cellSize, activeCellMapParameters } = get().cellMap;
      

      return {
        id: Math.random(),
        cellLocation: cellLocation,
        position: cellToPositionVector(cellLocation, cellSize, activeCellMapParameters),
        Yrotation: Math.random() * Math.PI
      }
    },
    
    addRock: (rock) => set((state) => {
      return {
        items: {
          ...state.items,
          rocks: [...state.items.rocks, rock]
        }
      }
    }),

    scatterRocks: (rockCount, openCellLocations) => set((state) => {
      
      let openCellsCount = openCellLocations.length;
      let newRocks = [];
      for (let i = 0; i < rockCount; i++){
        newRocks.push(get().items.makeRock(openCellLocations[Math.floor(Math.random()*openCellsCount)]));
      }

      return {
        items: {
          ...state.items,
          rocks: [...newRocks]
        }
      }
    })
    
  }
}
