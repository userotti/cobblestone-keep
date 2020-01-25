import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export default function assets(set){
  return {

    loadedAssetData: null,
    assets: {
      'grey_brick_wall_three_gltf': {
        url: '/assets/walls_on_ground.gltf',
      },
      'model_gltf': {
        url: '/assets/models/robot1.gltf',
      },
      'brown_floor_three_gltf': {
        url: '/assets/tiled_floor.gltf',
      },
      'minecraft_atlas': {
        url: '/assets/atlas.png',
      },
      'texture_wall_sides': {
        url: '/assets/walls/bricks_shaded.png',
      },
      'texture_wall_top': {
        url: '/assets/walls/bricks-top2.png',
      },
      'texture_floor_stones': {
        url: '/assets/walls/floor-stones_64x64.png',
      },
      'texture_karoo_floor': {
        url: '/assets/walls/karoo_floor.png',
      },
      'karoo_wall': {
        url: '/assets/walls/karoo_wall.png',
      },
      'moon_floor': {
        url: '/assets/walls/moon_floor_16x16.png',
      },
      'barrel': {
        url: '/assets/sprites/barrel.png',
      },
      'robot': {
        url: '/assets/sprites/robot.png',
      },
      'robot_with_barrel': {
        url: '/assets/sprites/robot_with_barrel.png',
      },
      'enemy1': {
        url: '/assets/sprites/enemy1.png',
      },
      'basic_floor': {
        url: '/assets/walls/basic_floor_1_16x16.png',
      },
      'basic_floor2': {
        url: '/assets/walls/basic_floor_2_16x16.png',
      },
      'texture_share_floor': {
        url: '/assets/walls/basic_floor_combo_16x16-2.png',
      },
      'texture_share_floor_16_256': {
        url: '/assets/walls/basic_floor_combo_16x256_2.png',
      },
      'shroud': {
        url: '/assets/walls/shroud.png',
      },
    },

    setLoadedAssetData: (loadedAssetData) => set((state) => {
      return {
        loadedAssetData: loadedAssetData.reduce((total, item, index)=>{
          return {
            ...total,
            ...item
          }
        }, {})
      }
    }),

    loadAssets: () => set((state) => {
      
      const loadingAssetPromises = [
        ...getGLTFLoadingPromises(state.assets),
        ...getPNGLoadingPromises(state.assets),
      ];

      Promise.all(loadingAssetPromises).then((assetData) => {
        state.setLoadedAssetData(assetData)
      })

    }) 

  }  
}




function getPNGLoadingPromises(assets) {
    const textureLoader = new THREE.TextureLoader();

    return Object.keys(assets).filter((assetKey) => assets[assetKey].url.endsWith('png')).map((assetKey, index) => {
        return new Promise((resolve, reject) => {
            textureLoader.load(assets[assetKey].url,
                function (texture) {
                    resolve({[assetKey]: texture})
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded' + assetKey)
                },
                function (error) {
                    console.log('An error happened' + assetKey, error)
                }
            )
        })
    })
}

function getGLTFLoadingPromises(assets) {
    const GLTFloader = new GLTFLoader();

    return Object.keys(assets).filter((assetKey) => assets[assetKey].url.endsWith('gltf')).map((assetKey, index) => {
        return new Promise((resolve, reject) => {
            GLTFloader.load(assets[assetKey].url,
                function (gltf) {
                  const root = gltf.scene
                  root.traverse((obj) => {
                    if (obj.castShadow !== undefined) {
                      obj.castShadow = true
                      obj.receiveShadow = false
                    }
                  });
                  resolve({[assetKey]: gltf})
                },
                function (xhr) {
                    // console.log((xhr.loaded / xhr.total * 100) + '% loaded' + assetKey); // ! Infinity Issue?
                },
                function (error) {
                    console.log('An error happened' + assetKey, error);
                }
            )
        })
    })
}

