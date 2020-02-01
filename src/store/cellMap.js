
import { buildOutTheMap } from '../utils/mapGenerators/basic';
import { cellular } from '../utils/mapGenerators/rotjs';

export default function cellMap(set, get){
  return {


    cellSize: [1,1,1],
    activeCellMap: null,
    activeCellMapParameters: null,
    
    getAllCellLocationsOfType: (type)=>{
      const flatActiveCellMap = get().cellMap.flattenCellMap(get().cellMap.activeCellMap);
      return flatActiveCellMap.filter((cell)=>{
        return (cell.type === type); 
      }).map((cell)=>{
        return [...cell.cellLocation]
      })
    },

    flattenCellMap: (cellMap)=>{

      let flat = cellMap.reduce((total, cellColumn, xindex)=>{
        return [...total, ...cellColumn.map((cell, yindex)=>{
          return {
            ...cell,
            cellLocation: [xindex, yindex]
          }
        })]
      }, [])

      return flat
    },

    getCellFromPositionVectorArray: (position)=>{
      return positionVectorToCell(position, get().cellMap.cellSize, get().cellMap.activeCellMapParameters)
    },

    setActiveCellMapParameters: (cellMapParams) => set(state=>{

      let activeCellMap;
      if (cellMapParams) {
        switch (cellMapParams.type){

          case 'basic': 
            activeCellMap = buildOutTheMap(cellMapParams.width, cellMapParams.height, cellMapParams.roomSizeRange, cellMapParams.maxRooms);
            break;

          case 'cellular':
            activeCellMap = cellular(cellMapParams.width, cellMapParams.height);  
            break;

          default:
           break;  
        }
      }

      const floorOffsets = getOffesetsFromCellType(activeCellMap, 'floor');
      const floorRotations = getRotationsFromCellType(activeCellMap, 'floor');
      const floorUvs = getUVsFromCellType(activeCellMap, 'floor');

      const doorOffsets = getOffesetsFromCellType(activeCellMap, 'door');
      const doorRotations = getRotationsFromCellType(activeCellMap, 'door');
        
      return {
        cellMap: {
          ...state.cellMap,
          floorOffsets: floorOffsets,
          floorRotations: floorRotations,
          floorUvs: floorUvs,

          doorOffsets: doorOffsets,
          doorRotations: doorRotations,
          
          activeCellMap: activeCellMap,
          activeCellMapParameters: cellMapParams,
        }
      }
    }),

  }
}

export function positionVectorToCell(positionVectorArray, cellSize, activeCellMapParameters){
  const cellTappedLocation = [
    Math.floor(positionVectorArray[0]/(cellSize[0]*2) + activeCellMapParameters.width/2), 
    Math.floor(positionVectorArray[2]/(cellSize[2]*2) + activeCellMapParameters.height/2)
  ];
  return cellTappedLocation
}

export function cellToPositionVector(cellCoord, cellSize, activeCellMapParameters){
  return [
    (cellCoord[0] * cellSize[0]*2) - activeCellMapParameters.width + cellSize[0],
    0,
    (cellCoord[1] * cellSize[1]*2) - activeCellMapParameters.height + cellSize[1]
  ];
}


function getOffesetsFromCellType(activeCellMap, type){

  let typedCells = activeCellMap.reduce((total, cellColumn, xindex)=>{
    return [...total, ...cellColumn.map((cell, yindex)=>{
      return {
        type: cell.type,
        x: xindex * 2 - activeCellMap.length + 1, // ??  +1 to fix the offset issue
        y: 0,
        z: yindex * 2 - cellColumn.length + 1 // ??  +1 to fix the offset issue
      }
    })]

  }, []).filter(cell=>cell.type === type)

  const offsets = new Float32Array( typedCells.length * 3 ); // xyz
  for ( let i = 0, l = typedCells.length; i < l; i++ ) {

      const index = 3 * i;
      // per-instance position offset
      offsets[ index ] = typedCells[i].x;
      offsets[ index + 1 ] = typedCells[i].y
      offsets[ index + 2 ] = typedCells[i].z;
  }
  
  return offsets;
}

function getRotationsFromCellType(activeCellMap, type){

  let typedCells = activeCellMap.reduce((total, cellColumn, xindex)=>{
    return [...total, ...cellColumn.map((cell, yindex)=>{
      return {
        type: cell.type,
        rotation: (Math.PI / 2) * Math.floor(Math.random()*4)
      }
    })]

  }, []).filter(cell=>cell.type === type)

  const rotations = new Float32Array( typedCells.length * 1 ); // xyz
  for ( let i = 0, l = typedCells.length; i < l; i++ ) {

      const index = 1 * i;
      // per-instance position offset
      rotations[ index ] = typedCells[i].rotation;
      // rotations[ index + 1 ] = typedCells[i].rotation;
      // rotations[ index + 2] = typedCells[i].rotation;
      
     
  }
  
  return rotations;
}


function getUVsFromCellType(activeCellMap, type){

  let typedCells = activeCellMap.reduce((total, cellColumn, xindex)=>{
    return [...total, ...cellColumn.map((cell, yindex)=>{
      return {
        type: cell.type,
        x: 0, // ??  +1 to fix the offset issue
        y: Math.floor(Math.random() * 4)  
        
      }
    })]

  }, []).filter(cell=>cell.type === type)

  const uvs = new Float32Array( typedCells.length * 2 ); // xyz
  for ( let i = 0, l = typedCells.length; i < l; i++ ) {

      const index = 2 * i;
      // per-instance position offset
      uvs[ index ] = typedCells[i].x;
      uvs[ index + 1 ] = typedCells[i].y
  }
  
  return uvs;
}