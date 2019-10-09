
import { buildOutTheMap } from '../utils/mapGenerators/basic';

export default function cellMap(set){
  return {


    cellSize: [1,1,1],
    activeCellMap: null,
    activeCellMapParameters: null,
    
    setActiveCellMapParameters: (cellMapParams) => set(state=>{
      return {
        activeCellMap: buildOutTheMap(cellMapParams.width, cellMapParams.height, cellMapParams.roomSizeRange, cellMapParams.maxRooms),
        activeCellMapParameters: cellMapParams,
      }
    }),

  }
}
