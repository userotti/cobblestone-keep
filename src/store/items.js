
import { cellToPositionVector } from './cellMap.js';

export default function items(set, get){
  return {

    //State... 
    itemTypes: ['rock', 'scrap'],
    all: [],

    //Getters...

    //search for type by location
    findItemAtCellLocation: (location)=>{
      if (!location) return null
      return get().items.all.find((item)=>{
        return (item.cellLocation[0] === location[0] && item.cellLocation[1] === location[1]);
      })
    },

    //filter
    getItemsOfType: (type)=>{
      return get().items.all.filter((item)=>{
        return (item.type == type);
      })
    },

    //search for closest item of type
    findClosestItemOfType: (location, type)=>{
      const { getItemsOfType, getManhattanDistanceToItem } = get().items;
      let allItemsOfType = getItemsOfType(type);
      let closestItemOfTypeIndex = 0; 

      if (!allItemsOfType.length) return null;
      for (let i = 0; i < allItemsOfType.length; i++){
        if (getManhattanDistanceToItem(location, allItemsOfType[closestItemOfTypeIndex].cellLocation) > getManhattanDistanceToItem(location, allItemsOfType[i].cellLocation)){
          closestItemOfTypeIndex = i;
        }
      }

      return allItemsOfType[closestItemOfTypeIndex];
    },

    getManhattanDistanceToItem: (location, itemLocation)=>{
      return Math.abs(location[0] - itemLocation[0]) + Math.abs(location[1] - itemLocation[1])
    },

    makeItemOfTypeAtCellLocation: (cellLocation, type)=>{
      const { cellSize, activeCellMapParameters, getPositionVectorArrayFromCellLocation } = get().cellMap;

      let uniformScale = [1,1,1];
      switch(type){
        case 'rock':
          const randomness = Math.random() * 0.2;
          uniformScale = [0.1+randomness,0.1+randomness,0.1+randomness];
          break;
        case 'scrap':
          uniformScale = [0.25,0.25,0.25];
          break;  
      }

      return {
        id: Math.random(),
        type: type,
        cellLocation: cellLocation,
        position: getPositionVectorArrayFromCellLocation(cellLocation, cellSize, activeCellMapParameters),
        uniformScale: uniformScale,
        Yrotation: Math.random() * Math.PI
      }
    },

    //Setters...

    //nuke an item from the all array
    removeItemAtLocation: (location)=>{
      const { removeItem, findItemAtCellLocation } = get().items; 
      removeItem(findItemAtCellLocation(location));
    },

    //nuke an item by id
    removeItem: (itemToRemove) => set((state) => {
      
      //setState!
      return {
        items: {
          ...state.items,
          all: state.items.all.filter((item)=>{return item.id !== itemToRemove.id})
        }
      }
    }),

    //create new items of type
    scatterItemsOfType: (itemCount, openCellLocations, type, fresh) => set((state) => {
      const { makeItemOfTypeAtCellLocation, findItemAtCellLocation } = get().items; 

      
      //make sure there is nothing else there
      openCellLocations = openCellLocations.filter((location)=>{
        return !findItemAtCellLocation(location);
      })

      if (itemCount > openCellLocations.length){
        throw 'there is not enough room to place ' + itemCount + ' items';
      }
      
      const newItems = [];
      for (let i = 0; i < itemCount; i++){
        const randomLocationIndex = Math.floor(Math.random()*openCellLocations.length);
        const location = openCellLocations[randomLocationIndex];

        newItems.push(makeItemOfTypeAtCellLocation(location, type));
        //its not open any more!!!
        openCellLocations.splice(randomLocationIndex, 1)
        
      }


      //setState!
      // if fresh, nuke all the old stuff
      if (fresh){
        return {
          items: {
            ...state.items,
            all: [...newItems]
          }
        }
      } else {
        return {
          items: {
            ...state.items,
            all: [...state.items.all, ...newItems]
          }
        }
      }
      
    }),

    //old stuff
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
