
export default function game(set, get){
  return {

    health: 7,

    armour: 0,

    damage: 2,

    shroudRemoved: new Array(),
    
    playerPosition: [0,0,0],

    muted: true,

    muteSwitch: () => set(state => {
      return {
        game: {
          ...state.game,
          muted: !state.muted
        }
        
      }
    }),

    updatePlayerPosition: (newPostionArray) => set(state=>{
      return {
        playerPosition: newPostionArray
      }
    }),

    removeShroud: (newPostionArray) => set(state=>{
      return {
        shroudRemoved: [...state.shroudRemoved, newPostionArray]
      }
    }),

    makeNewScene(cellMapParams, params){
      
      const {
        setActiveCellMapParameters,
        getAllCellLocationsOfType
      } = get().cellMap;

      const {
        setPlayerPositionToRandomOpenCell,
      } = get().player;

      const {
        setCameraFocusPointOnPlayer,
      } = get()

      const {
        scatterRocks
      } = get().items;

      setActiveCellMapParameters({...cellMapParams});

      setPlayerPositionToRandomOpenCell();
      setCameraFocusPointOnPlayer();

      scatterRocks(params.items.rocks.count, getAllCellLocationsOfType(params.items.rocks.placeOnTileType));
    }
  }
}
