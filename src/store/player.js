import * as THREE from 'three';
import { positionVectorToCell, cellToPositionVector } from './cellMap.js';
import * as ROT from 'rot-js';
import {Howl, Howler} from 'howler';

const sound = new Howl({
  src: ['/assets/sounds/sound_move_2.wav']
});

const origin = new THREE.Vector3(0,0,0);

export default function player(set, get){
  return {

    position: null,
    Yrotation: 0,
        
    hopping: false,
    setPlayerPositionToRandomOpenCell: () => { 
      let cellMap = get().cellMap;
      for (let x = 0; x < cellMap.activeCellMap.length; x++){
        for (let y = 0; y < cellMap.activeCellMap[x].length; y++){
          if (cellMap.activeCellMap[x][y].type == "floor"){
            get().player.setPositionFromCell([x, y]);
            
            //stop!!!
            y = cellMap.activeCellMap[x].length - 1;
            x = cellMap.activeCellMap.length - 1;
          }
        }
      }
    },

    movePlayerTowardsCellAt: (positionVectorArray) => {

      const cellLocation = positionVectorToCell(positionVectorArray, get().cellMap.cellSize, get().cellMap.activeCellMapParameters);
      const playerAtCell = positionVectorToCell(get().player.position, get().cellMap.cellSize, get().cellMap.activeCellMapParameters);

      if (!(
        get().cellMap.activeCellMap[cellLocation[0]] &&
        get().cellMap.activeCellMap[cellLocation[0]][cellLocation[1]] &&
        get().cellMap.activeCellMap[cellLocation[0]][cellLocation[1]].type === "floor" &&
        !(cellLocation[0] == playerAtCell[0] && cellLocation[1] == playerAtCell[1])
      )) {
       
        get().player.setHopping(false);
        
      } else {

        const passableCallback = function(x, y) {
          if (get().cellMap && get().cellMap.activeCellMap[x] && get().cellMap.activeCellMap[x][y]){
            let type = get().cellMap.activeCellMap[x][y].type;
            return (type === "floor" || type === "door");
          }
        }

        const dijkstra = new ROT.Path.Dijkstra(cellLocation[0], cellLocation[1], passableCallback, {
          topology: 4
        });
        
        const path = [];
        dijkstra.compute(playerAtCell[0], playerAtCell[1], function(x, y) {
          path.push([x,y]);    
        });
        
        if (path && path.length >= 2) {
          get().player.setYRotationFromPath(path);
          get().player.setPositionFromCell(path[1]);
        } 
        
      }

    },
    setPlayerPositionFromTapPoint: (positionVectorArray) => {
      const cellLocation = positionVectorToCell(positionVectorArray, get().cellMap.cellSize, get().cellMap.activeCellMapParameters);
      get().player.setPositionFromCell(cellLocation);
    },

    setYRotationFromPath: (path) => set(state=>{
      
      let Yrotation = Math.atan((path[0][1] - path[1][1])/(path[0][0] - path[1][0])) - (Math.PI/2);
    
      if (path[0][0] - path[1][0] > 0){
        Yrotation = Yrotation + Math.PI;
      }

      return {
        player: {
          ...state.player,
          Yrotation: Yrotation
        }
      }
    }),

    setPositionFromCell: (cellLocation) => set(state=>{
      const position = cellToPositionVector(cellLocation, state.cellMap.cellSize, state.cellMap.activeCellMapParameters);
      return {
        player: {
          ...state.player,
          position: position,
          cellLocation: cellLocation,
          hopping: true
        }
      }
    }),

    setHopping: (bool) => set(state=>{
      return {
        player: {
          ...state.player,
          hopping: bool
        }
      }
    })
    
  }
}

function SHOW(value){
  console.log("value: ", value);
}

