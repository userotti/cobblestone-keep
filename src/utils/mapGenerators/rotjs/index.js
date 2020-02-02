import * as ROT from 'rot-js';

export const GRID_HEIGHT = 60;
export const GRID_WIDTH = 80;

export function cellular(gridWidth = GRID_WIDTH, gridHeight = GRID_HEIGHT){

  var w = gridWidth, h = gridHeight;
  /* create a connected map where the player can reach all non-wall sections */
  var map = new ROT.Map.Cellular(w, h, { connected: true });

  /* cells with 1/2 probability */
  map.randomize(0.5);

  /* make a few generations */
  for (var i=0; i<4; i++) map.create((x,y,value)=>{
    // console.log("createCallBack values: ", x + " " + y + " " + value);
  });

  /* display only the final map */
  // var display = new ROT.Display({width:w, height:h, fontSize:4});
  // SHOW(display.getContainer());    
  map.create();

  /* now connect the maze */
  // var display = new ROT.Display({width:w, height:h, fontSize:4});
  // SHOW(display.getContainer());    
  map.connect(null, 0, function(from, to) {
      SHOW("Connection was made " + from + " to " + to);
  });

  map.connect(null, 0, function(from, to) {
      SHOW("Connection was made " + from + " to " + to);
  });

  map.connect(null, 0, function(from, to) {
      SHOW("Connection was made " + from + " to " + to);
  });

  return map._map;
} 

function SHOW(value){
  console.log("value: ", value);
}