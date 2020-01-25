import React, { Fragment } from 'react';
import * as THREE from 'three';

export default function Barrel({texture, position}) {

    // texture.minFilter = THREE.NearestFilter;
    // texture.magFilter = THREE.NearestFilter;
    // var spriteMaterial = new THREE.SpriteMaterial( { map: texture, color: 0xffffff } );

  
    var geometry = new THREE.CylinderGeometry(0.5,0.5,1,8); 
    return (
      <Fragment>
        <primitive
          object={texture.scene.clone()}
          
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
