import React, { Fragment } from 'react';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';

export default function Robot({texture, position}) {

    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, color: 0xffffff } );
    
    var headGeometry = new THREE.BoxGeometry(0.5,0.5,0.4);
    var bodyGeometry = new THREE.BoxGeometry(1.5,1.3,0.5);
    var leftGeometry = new THREE.BoxGeometry(0.2,1.7,0.2);
    var rightGeometry = new THREE.BoxGeometry(0.2,1.7,0.2);

    // var geoCylinder = new THREE.CylinderGeometry(0.5,0.5,0.5);
    
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

        <group
          position-x={0.1}
          position-y={0}
          position-z={0.7}>
          <mesh
            position-x={0}
            position-y={1}
            position-z={0}
            material-colorWrite={false}
            material-depthWrite={false}
            castShadow={true}>
            <primitive attach="geometry" object={bodyGeometry} visible={false}/>
          </mesh>
          <mesh
            position-x={-0.3}
            position-y={0}
            position-z={0}
            material-colorWrite={false}
            material-depthWrite={false}
            castShadow={true}>
            <primitive attach="geometry" object={leftGeometry} visible={false}/>
          </mesh>
          <mesh
            position-x={0.3}
            position-y={0}
            position-z={0}
            material-colorWrite={false}
            material-depthWrite={false}
            castShadow={true}>
            <primitive attach="geometry" object={rightGeometry} visible={false}/>
          </mesh>
          <mesh
            position-x={0}
            position-y={2.1}
            position-z={0}
            material-colorWrite={false}
            material-depthWrite={false}
            castShadow={true}>
            <primitive attach="geometry" object={headGeometry} visible={false}/>
          </mesh>
        </group>
        
      </animated.group>
      
       
    )
}
