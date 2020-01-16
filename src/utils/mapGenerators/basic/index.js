import { getRandomInt } from '../../functions';

export const GRID_HEIGHT = 60;
export const GRID_WIDTH = 80;
export const MAX_ROOMS = 15;
export const ROOM_SIZE_RANGE = [7, 12];





// HELPER FUNCTIONS FOR CREATING THE MAP
function isValidRoomPlacement(grid, {x, y, width = 1, height = 1}){
  // check if on the edge of or outside of the grid
  if (y < 1 || y + height > grid.length - 1) {
    return false;
  }
  if (x < 1 || x + width > grid[0].length - 1) {
    return false;
  }

  // check if on or adjacent to existing room
  for (let i = y - 1; i < y + height + 1; i++) {
    for (let j = x - 1; j < x + width + 1; j++) {
      if (grid[i][j].type === 'floor') {
        return false;
      }
    }
  }
  // all grid cells are clear
  return true;
};

function cellIsCloseToFloor(grid, i, j){

  for ( var x = -1; x <= 1; x++){
    for ( var y = -1; y <= 1; y++){
      if (grid[i+x] && grid[i+x][j+y] && !(x === 0 && y === 0) && grid[i+x][j+y].type === 'floor'){
        return true;
      }
    } 
  }

  return false;

}

function placeCells(grid, {x, y, width = 1, height = 1}, type = 'floor'){
  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      grid[i][j] = {type};
    }
  }
  return grid;
};

function createRoomsFromSeed(grid, {x, y, width, height}, range = ROOM_SIZE_RANGE){
  // range for generating the random room heights and widths
  const [min, max] = range;

  // generate room values for each edge of the seed room
  const roomValues = [];

  const north = { height: getRandomInt(min, max), width: getRandomInt(min, max) };
  north.x = getRandomInt(x, x + width - 1);
  north.y = y - north.height - 1;
  north.doorx = getRandomInt(north.x, (Math.min(north.x + north.width, x + width)) - 1);
  north.doory = y - 1;
  roomValues.push(north);

  const east = { height: getRandomInt(min, max), width: getRandomInt(min, max) };
  east.x = x + width + 1;
  east.y = getRandomInt(y, height + y - 1);
  east.doorx = east.x - 1;
  east.doory = getRandomInt(east.y, (Math.min(east.y + east.height, y + height)) - 1);
  roomValues.push(east);

  const south = { height: getRandomInt(min, max), width: getRandomInt(min, max) };
  south.x = getRandomInt(x, width + x - 1);
  south.y = y + height + 1;
  south.doorx = getRandomInt(south.x, (Math.min(south.x + south.width, x + width)) - 1);
  south.doory = y + height;
  roomValues.push(south);

  const west = { height: getRandomInt(min, max), width: getRandomInt(min, max) };
  west.x = x - west.width - 1;
  west.y = getRandomInt(y, height + y - 1);
  west.doorx = x - 1;
  west.doory = getRandomInt(west.y, (Math.min(west.y + west.height, y + height)) - 1);
  roomValues.push(west);

  const placedRooms = [];
  roomValues.forEach(room => {
    if (isValidRoomPlacement(grid, room)) {

      // console.log("room: ", room);
      // place room
      grid = placeCells(grid, room);
      // place door
      grid = placeCells(grid, {x: room.doorx, y: room.doory}, 'door');
      // need placed room values for the next seeds
      placedRooms.push(room);
    }
  });
  return {grid, placedRooms};
};

export function buildOutTheMap(gridWidth = GRID_WIDTH, gridHeight = GRID_HEIGHT, roomSizeRange = ROOM_SIZE_RANGE, maxRooms = MAX_ROOMS){
	
	// BUILD OUT THE MAP

	// 1. make a grid of 'empty' cells, with a random opacity value (for styling)
	let grid = [];
	for (let i = 0; i < gridHeight; i++) {
		grid.push([]);
		for (let j = 0; j < gridWidth; j++) {
			grid[i].push({type: 'void'});
		}
	}

  // console.log("maxRooms", maxRooms);
  if (parseInt(maxRooms) === 0) {
    return grid;
  }
  
	// 2. random values for the first room
	const [min, max] = roomSizeRange;
	const firstRoomWidth = getRandomInt(min, max);
  const firstRoomHeight = getRandomInt(min, max);


  const firstRoom = {
		x: Math.floor(gridWidth/2) - Math.floor(firstRoomWidth/2),
		y: Math.floor(gridHeight/2) - Math.floor(firstRoomHeight/2),
		height: firstRoomHeight,
		width: firstRoomWidth
	};

  // console.log("firstRoom: ",firstRoom);

  // 3. place the first room on to grid
	grid = placeCells(grid, firstRoom);

	// 4. using the first room as a seed, recursivley add rooms to the grid
	const growMap = (grid, seedRooms, counter = 1, maxRooms) => {
		if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
			return grid;
		}

		grid = createRoomsFromSeed(grid, seedRooms.pop(), roomSizeRange);
		seedRooms.push(...grid.placedRooms);
		counter += grid.placedRooms.length;
		return growMap(grid.grid, seedRooms, counter, maxRooms);
	};
	return replaceVoidWithWalls(growMap(grid, [firstRoom], 1, maxRooms));
};

export function replaceVoidWithWalls(grid){
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].type === 'void' && cellIsCloseToFloor(grid,i,j)){
        grid[i][j].type = 'wall';
      }
    }
  }

  return grid;
}