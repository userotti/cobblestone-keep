import React, { Fragment } from 'react';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';
import useStore from '../../../../store'

export default function Robot({loadedAssetData, position}) {

    const { 
      cameraOrthographicAngle
    } = useStore()

    loadedAssetData['robot'].minFilter = THREE.NearestFilter;
    loadedAssetData['robot'].magFilter = THREE.NearestFilter;
    
    var spriteMaterial = new THREE.SpriteMaterial( { map: loadedAssetData['robot'], color: 0xffffff } );
 
    const springs = useSprings(2, [{
      to: {
        position: [...position],
      },  
      from: { 
        position: [...position],
      }
    },{
      to: {
        progress: 1
      },  
      from: { 
        progress: 0
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
       
      >
        <sprite 
          scale={[2,2,2]}
          position-x={0}
          position-y={0}
          position-z={0}>
          <primitive attach="material" object={spriteMaterial}/>
        </sprite>
        
      </animated.group>
    )
}
