import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export default function assets(set){
  return {

    loadedAssetData: null,
    assets: {
      'grey_brick_wall_three_gltf': {
        url: '/assets/walls_on_ground.gltf',
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
      }
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
        console.log(assetData);
        state.setLoadedAssetData(assetData);
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
                    resolve({[assetKey]: texture});
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded' + assetKey);
                },
                function (error) {
                    console.log('An error happened' + assetKey, error);
                }
            );
        })
    })
}

function getGLTFLoadingPromises(assets) {
    const GLTFloader = new GLTFLoader();

    return Object.keys(assets).filter((assetKey) => assets[assetKey].url.endsWith('gltf')).map((assetKey, index) => {
        return new Promise((resolve, reject) => {
            GLTFloader.load(assets[assetKey].url,
                function (gltf) {
                    resolve({[assetKey]: gltf});
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded' + assetKey);
                },
                function (error) {
                    console.log('An error happened' + assetKey, error);
                }
            );
        })
    })
}

