import * as THREE from 'three';

export default function items(set, get){
  return {

    visible: false,
    activeMode: null,
    availableModeMenuItems: [
      modes["collect_rocks"],
      modes["collect_scrap"]
    ],

    setMenuVisiblity: (bool) => set((state) => {
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

    modeIsAvailable: (mode) => {
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
      if (!get().modeManager.modeIsAvailable(mode)){
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
    }),

    testForModeDeactivation: () => set((state) => {
      const { findClosestItemOfType } = get().items;
      const { cellLocation } = get().player;
      const { activeMode, availableModeMenuItems } = get().modeManager;

      switch (activeMode.type){
        case "collect_rocks": 
          if (findClosestItemOfType(cellLocation, 'rock') == null){
            return {
              modeManager: {
                ...state.modeManager,
                activeMode: null,
              }
            }
          }
          break;

        case "collect_scrap": 
          if (findClosestItemOfType(cellLocation, 'scrap') == null){
            return {
              modeManager: {
                ...state.modeManager,
                activeMode: null,
              }
            }
          }
          break;
      }

      //do nothing
      return {
        modeManager: {
          ...state.modeManager,
        }
      }
    }),

    testForModeMenuRemoval: () => set((state) => {
      const { findClosestItemOfType } = get().items;
      const { cellLocation } = get().player;
      const { availableModeMenuItems } = get().modeManager;
      
      let result = availableModeMenuItems.filter((modeMenuItem)=>{
        switch (modeMenuItem.type){
          case "collect_rocks": 
            return !(findClosestItemOfType(cellLocation, 'rock') == null);  
            
          case "collect_scrap": 
            return !(findClosestItemOfType(cellLocation, 'scrap') == null);
            
        }
      })
      
      console.log("result: ", result);
      //do nothing
      return {
        modeManager: {
          ...state.modeManager,
          availableModeMenuItems: result
        }
      }
    })
    
    
  }
}

export const modes = {

  "collect_rocks" : {
    type: "collect_rocks",
    label: "collect rocks"
  },

  "collect_scrap" : {
    type: "collect_scrap",
    label: "collect scrap"
  }

}