import React, { Fragment } from 'react';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';

import useStore from '../../../../store';

export default function Shroud({texture, position}) {

    const { 
      shroudRemoved,
      removeShroud
    } = useStore()

    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;


    let material = new THREE.MeshLambertMaterial({ 
      map : texture,
      side : THREE.DoubleSide
    });

    let planeGeometry = new THREE.PlaneGeometry(1, 1);

    return (
      
      <mesh
        receiveShadow={false}
        onClick={(e) => {
          console.log('click shroud');
          console.log(shroudRemoved)
          removeShroud(position)
        }}
        
        material-colorWrite={false}
        material-depthWrite={false}
        position={position}    
        scale={[2,2,2]}
        rotation={[Math.PI/2,0,0]}    
      >
        <primitive attach="geometry" object={planeGeometry}/>
        <primitive attach="material" object={material}/>
      </mesh>
      
    )
}
