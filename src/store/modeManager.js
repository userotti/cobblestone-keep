import * as THREE from 'three';

export default function items(set, get){
  return {

    visible: false,
    activeMode: null,
    availableModeMenuItems: [
      modes["move_to_closest_rock"]
    ],

    setVisible: (bool) => set((state) => {
      return {
        modeManager: {
          ...state.modeManager,
          visible: bool
        }
      }
    }),

    setActiveMode: (mode) => set((state) => {
      return {
        modeManager: {
          ...state.modeManager,
          activeMode: mode
        }
      }
    }),

    modeAvailable: (mode) => {
      get().modeManager.availableModeMenuItems.find((menuItem)=>{
        return menuItem.type == mode.type
      })
    },

    setAvailableModeMenuItems: (modes) => set((state) => {
      return {
        modeManager: {
          ...state.modeManager,
          availableModeMenuItems: [...modes]
        }
      }
    }),

    addModeToMenu: (mode) => set((state) => {
      if (!get().modeManager.modeAvailable(mode)){
        return {
          modeManager: {
            ...state.modeManager,
            availableModeMenuItems: [...state.modeManager.availableModeMenuItems, mode]
          }
        }
      }
    }),

    removeModeFromMenu: (mode) => set((state) => {
      return {
        modeManager: {
          ...state.modeManager,
          availableModeMenuItems: state.modeManager.availableModeMenuItems.filter((menuItem)=>{
            return menuItem.type != mode.type
          })
        }
      }
    })
    
    
  }
}

export const modes = {

  "move_to_closest_rock" : {
    type: "move_to_closest_rock",
    label: "find rock"
  },

  "pick_up_rock" : {
    type: "pick_up_rock",
    label: "pick up rock"
  }

}