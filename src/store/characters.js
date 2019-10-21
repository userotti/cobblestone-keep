import * as THREE from 'three';

export default function characters(set){
  return {
    characters: {
      all: [{
        id: Math.random(),
        materialTextureName: 'robot_with_barrel',
        materialColor: 0xFFFFFF,
        position: [0,0,0],
        scale: [1,1,1]
      }],
      set: (all) => set((state) => {
        return {
          all: [...all]
        }
      }), 
      add: (newCharacter) => set((state) => {
        return {
          all: [...state.characters.all, newCharacter]
        }
      }),
      remove: (character) => set((state) => {
        return {
          all: state.characters.all.filter((_character)=>{return (_character.id !== character.id)})
        }
      }),
      update: (id, newCharacter) => set((state) => {
        return {
          all: state.characters.all.map(function(_character) {
            if (id === _character) {
              return {
                id: id,
                ...newCharacter
              }
            } else {
              return _character;
            }
          })
        }
      })  
    }
  }
}
