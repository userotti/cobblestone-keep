import React, { Fragment } from 'react';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';

export default function Shroud({texture, position}) {

    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, color: 0xffffff } );
    
    var geometry = new THREE.CylinderGeometry(0.5,0.5,1.5,8);

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
        position-y={springs[1].progress.interpolate({
          range: [0, 0.65, 1],
          output: [0, 0.55, 1]
        }).interpolate((progress)=>{
          return (progress - 1)*7*(-progress) + 0.5
        })}
      >
        <sprite scale={[2,2,2]}>
          <primitive attach="material" object={spriteMaterial}/>
        </sprite>
        <mesh
          position-x={0.8}
          position-y={0.8}
          castShadow={true}
          onClick={(e) => {
            console.log('click shroud', e);
          }}
          material-colorWrite={false}
          material-depthWrite={false}>
          <primitive attach="geometry" object={geometry} visible={false}/>
        </mesh>
      </animated.group>
      
       
    )
}
