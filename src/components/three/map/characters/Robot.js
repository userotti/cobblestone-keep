import React, { Fragment, useMemo } from 'react';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';
import {  useFrame } from 'react-three-fiber'

import useStore from '../../../../store'
import {Howl, Howler} from 'howler';

import { Dom } from 'react-three-fiber';

const sound = new Howl({
  src: ['/assets/sounds/sound_jump.wav'],
  volume: 0.3
});
const sound_end = new Howl({
  src: ['/assets/sounds/sound_robot_speak.wav'],
  volume: 0.1
});


export default function Robot({loadedAssetData, position, hopping, Yrotation}) {

    
    const cellSize = useStore(state => state.cellMap.cellSize);
    const {
      muted
    } = useStore(state => state.game);
    loadedAssetData['robot'].minFilter = THREE.NearestFilter;
    loadedAssetData['robot'].magFilter = THREE.NearestFilter;
    
    const { 
      shadowGeometry,
      shadowMaterial, 
      spriteMaterial,
      robotMesh
    } = useMemo(()=>{
      return {
        spriteMaterial: new THREE.SpriteMaterial( { map: loadedAssetData['robot'], color: 0xffffff }),
        shadowGeometry: new THREE.BoxGeometry(cellSize[0]*1.2,cellSize[1]*1.2,cellSize[2]/2,1,1,1),
        shadowMaterial: null,
        robotMesh : loadedAssetData['model_gltf'].scene.clone()
      }
    })  

    const springs = useSprings(3, [{
      from: { 
        position: [...position],
      },
      to: {
        position: [...position],
      },  
      
    },{
      from: { 
        progress: 0
      },
      to: {
        progress: hopping ? 1 : 0
      },
      onStart: () => { !muted && sound.play() },
      onRest: () => { !muted && sound_end.play() },
      reset: true,
      config: config.default//{ mass: 1, tension: 290, friction: 32 }
    },{
      from: { 
        Yrotation: Yrotation,
      },
      to: {
        Yrotation: Yrotation,
      }
    }])

    // useFrame(state => {
    //   let { children } = loadedAssetData['model_gltf'].scene
    //   children.forEach(element => {
    //     if(element.name == 'cube_head'){
    //       element.rotation.y = element.rotation.y + 0.01
    //       element.scale.x = 0.2
    //     }
    //   })
    // })

    
    return (
      <animated.group
        rotation-y={springs[2].Yrotation}
        position-x={springs[0].position.interpolate((x)=>{
          return x;
        })}
        position-z={springs[0].position.interpolate((x,y,z)=>{
          return z;
        })}
        position-y={springs[1].progress.interpolate({
          range: [0, 0.65, 1],
          output: [0, 0.55, 1]
        }).interpolate((progress)=>{
          return (progress - 1)*4*(-progress) + 0.1
        })}
      >
        <primitive object={robotMesh}/>
      </animated.group>
    )
}
