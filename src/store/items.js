
import { cellToPositionVector } from './cellMap.js';


export default function items(set, get){
  return {

    rocks: [],
    scraps: [],

    findRockAtCellLocation: (location)=>{
      if (!location) return
      let foundit = get().items.rocks.find((rock)=>{
        return (rock.cellLocation[0] === location[0] && rock.cellLocation[1] === location[1]);
      })
      return foundit
    },

    findClosestRock: (location)=>{
      let rocks = get().items.rocks;
      let closestRockIndex = 0; 
      for (let i = 0; i < rocks.length; i++){
        const getDistance = get().items.getManhattanDistanceToItem;

        if (getDistance(location, rocks[closestRockIndex].cellLocation) > getDistance(location, rocks[i].cellLocation)){
          closestRockIndex = i;
        }
      }

      return rocks[closestRockIndex];
    },

    pickUpRocksAtLocation: (location)=>{
      get().items.removeRock(get().items.findRockAtCellLocation(location));
    },

    getManhattanDistanceToItem: (location, itemLocation)=>{
      
      return Math.abs(location[0] - itemLocation[0]) + Math.abs(location[1] - itemLocation[1])
    },

    makeRock: (cellLocation)=>{

      const { cellSize, activeCellMapParameters } = get().cellMap;
      
      return {
        id: Math.random(),
        cellLocation: cellLocation,
        position: cellToPositionVector(cellLocation, cellSize, activeCellMapParameters),
        Yrotation: Math.random() * Math.PI
      }
    },

    makeScrap: (cellLocation)=>{

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

    addScrap: (scrap) => set((state) => {
      return {
        items: {
          ...state.items,
          scraps: [...state.items.scraps, scrap]
        }
      }
    }),

    removeRock: (rock) => set((state) => {
      return {
        items: {
          ...state.items,
          rocks: state.items.rocks.filter((rockItem)=>{return rock.id !== rockItem.id})
        }
      }
    }),

    removeScrap: (scrap) => set((state) => {
      return {
        items: {
          ...state.items,
          scraps: state.items.scraps.filter((scrapItem)=>{return scrap.id !== scrapItem.id})
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
    }),

    scatterScraps: (scrapCount, openCellLocations) => set((state) => {
      
      let openCellsCount = openCellLocations.length;
      let newScraps = [];
      for (let i = 0; i < scrapCount; i++){
        newScraps.push(get().items.makeScrap(openCellLocations[Math.floor(Math.random()*openCellsCount)]));
      }

      return {
        items: {
          ...state.items,
          scraps: [...newScraps]
        }
      }
    })
    
    
  }
}
