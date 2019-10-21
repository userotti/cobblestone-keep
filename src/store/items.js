import * as THREE from 'three';

export default function items(set){
  return {
    items: {
      all: [{
        id: Math.random(),
        materialTextureName: 'barrel',
        materialColor: 0xFFFFFF,
        position: [-0.5,0,-0.5],
        scale: [1.0,1.0,1.0]
      }],
      set: (all) => set((state) => {
        return {
          all: [...all]
        }
      }), 
      add: (newItem) => set((state) => {
        return {
          all: [...state.items.all, newItem]
        }
      }),
      remove: (item) => set((state) => {
        return {
          all: state.items.all.filter((_item)=>{return (_item.id !== item.id)})
        }
      }),
      update: (id, newItem) => set((state) => {
        return {
          all: state.items.all.map(function(_item) {
            if (id === _item) {
              return {
                id: id,
                ...newItem
              }
            } else {
              return _item;
            }
          })
        }
      })
    }
  }
}
