import React, { Fragment, useMemo } from 'react';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';
import useStore from '../../../../store'

export default function Robot({loadedAssetData, position, hopping}) {

    const cellSize = useStore(state => state.cellMap.cellSize);

    loadedAssetData['enemy1'].minFilter = THREE.NearestFilter;
    loadedAssetData['enemy1'].magFilter = THREE.NearestFilter;
    
  
    const { 
      shadowGeometry,
      shadowMaterial, 
      spriteMaterial
      
    } = useMemo(()=>{
      return {
        spriteMaterial: new THREE.SpriteMaterial( { map: loadedAssetData['enemy1'], color: 0xffffff }),
        shadowGeometry: new THREE.BoxGeometry(cellSize[0]*-0.8,cellSize[1]*0.8,cellSize[2]*0.8/2,1,1,1),
        shadowMaterial: null
      }
    })  
    
    const springs = useSprings(2, [{
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
      reset: true,
      config: config.default//{ mass: 1, tension: 290, friction: 32 }
    }])
    
    return (
      
      <animated.group

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
          return (progress - 1)*5*(-progress) + 0.1
        })}

      >
        <animated.sprite 
          scale={[2,2,2]}
          position-x={0}
          position-y={0}
          position-z={springs[1].progress.interpolate((progress)=>{
            return -(progress - 1)*2.8*(-progress) - cellSize[2]*0.50
          })}>
          <primitive attach="material" object={spriteMaterial}/>
        </animated.sprite>

        <mesh
          position-x={0.2}
          position-y={0.1}
          position-z={-0.1}
          material-colorWrite={false}
          material-depthWrite={false}
          castShadow={true}
        > 
          <primitive
            attach="geometry"
            object={shadowGeometry}
          />
        </mesh>
        
      </animated.group>
    )
}
