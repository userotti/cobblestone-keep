
export default function game(set){
  return {

    health: 7,

    armour: 0,

    damage: 2,

    shroudRemoved: new Array(),
    
    playerPosition: [0,0,0],

    muted: true,

    muteSwitch: () => set(state => {
      return {
        muted: !state.muted
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
    })
  }
}
