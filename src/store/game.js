
export default function game(set, get){
  return {

    health: 7,

    armour: 0,

    damage: 2,

    shroudRemoved: [],
    
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
      } = get().camera

      const {
        scatterItemsOfType
      } = get().items;

      setActiveCellMapParameters({...cellMapParams});

      setPlayerPositionToRandomOpenCell();
      setCameraFocusPointOnPlayer();

    
      scatterItemsOfType(5, getAllCellLocationsOfType("floor"), 'rock', true);
      scatterItemsOfType(5, getAllCellLocationsOfType("floor"), 'scrap', false);
    }
  }
}
