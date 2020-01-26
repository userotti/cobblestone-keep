import React, { Fragment } from 'react';
import * as THREE from 'three';

import {  useFrame } from 'react-three-fiber'

export default function Barrel({texture, position}) {

    // texture.minFilter = THREE.NearestFilter;
    // texture.magFilter = THREE.NearestFilter;
    // var spriteMaterial = new THREE.SpriteMaterial( { map: texture, color: 0xffffff } )
    // var geometry = new THREE.CylinderGeometry(0.5,0.5,1,8); 
    // useFrame(state => {
    //   let { children } = texture.scene

    //   children.forEach(element => {
    //     if(element.name == 'cube_head'){
    //       element.rotation.y = element.rotation.y + 0.01
    //       element.scale.x = 0.1
    //     }
    //   });

    // })

    return (
      <Fragment>
        <primitive
          object={texture.scene}
          
          // rotation={[0, cameraOrthographicAngle*-1, 0]}
          position={position} 
        />
        {/* <sprite
          scale={[1.5,1.5,1.5]}
          position={new THREE.Vector3(...position)}
        >
            <primitive attach="material" object={spriteMaterial}/>
        </sprite>
        <mesh
            castShadow={true}
            position={new THREE.Vector3(...position)}
            material-colorWrite={false}
            material-depthWrite={false}
        >
            <primitive attach="geometry" object={geometry} visible={false}/>
        </mesh> */}
      </Fragment>  
       
    )
}
