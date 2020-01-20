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

    position: [0,0,0],
    hopping: false,
    movePlayerTowardsCellAt: (positionVectorArray) => {

      const cellLocation = positionVectorToCell(positionVectorArray, get().cellMap.cellSize, get().cellMap.activeCellMapParameters);

      const passableCallback = function(x, y) {
        let type = get().cellMap.activeCellMap[x][y].type;
        return (type === "floor" || type === "door");
      }


      const dijkstra = new ROT.Path.Dijkstra(cellLocation[0], cellLocation[1], passableCallback, {
        topology: 4
      });


      const playerAtCell = positionVectorToCell(get().player.position, get().cellMap.cellSize, get().cellMap.activeCellMapParameters);
      const path = [];
      dijkstra.compute(playerAtCell[0], playerAtCell[1], function(x, y) {
        path.push([x,y]);    
      });

      get().player.setPositionFromCell(path[1]);



      // console.log("hi");
      // var w = 150, h = 80;
      // ROT.RNG.setSeed(12345);
      // var display = new ROT.Display({width:w, height:h, fontSize:6});
      // SHOW(display.getContainer());

      // /* generate map and store its data */
      // var data = {};
      // var map = new ROT.Map.Uniform(w, h);
      // map.create(function(x, y, value) {
      //     data[x+","+y] = value;
      //     display.DEBUG(x, y, value);
      // });

      // /* input callback informs about map structure */
      // var passableCallback = function(x, y) {
      //     return (data[x+","+y] === 0);
      // }

      // var d2 = new ROT.Path.Dijkstra()
      // /* prepare path to given coords */
      // var dijkstra = new ROT.Path.Dijkstra(98, 38, passableCallback);

      // /* compute from given coords #1 */
      // dijkstra.compute(8, 45, function(x, y) {
      //     display.draw(x, y, "", "", "#800");
      // });

      // /* compute from given coords #2 */
      // dijkstra.compute(130, 8, function(x, y) {
      //     display.draw(x, y, "", "", "#800");
      // });

      // /* highlight */
      // display.draw(8,  45, "", "", "#3f3");
      // display.draw(130, 8, "", "", "#3f3");
      // display.draw(98, 38, "", "", "#f33");

      // get().player.setPlayerPositionFromTapPoint(positionVectorArray);



    },
    setPlayerPositionFromTapPoint: (positionVectorArray) => {
      const cellLocation = positionVectorToCell(positionVectorArray, get().cellMap.cellSize, get().cellMap.activeCellMapParameters);
      get().player.setPositionFromCell(cellLocation);
    },

    setPositionFromCell: (cellLocation) => set(state=>{
      const position = cellToPositionVector(cellLocation, state.cellMap.cellSize, state.cellMap.activeCellMapParameters);
      return {
        player: {
          ...state.player,
          position: position,
          hopping: true
        }
      }
    })
    
  }
}

function SHOW(value){
  console.log("value: ", value);
}

