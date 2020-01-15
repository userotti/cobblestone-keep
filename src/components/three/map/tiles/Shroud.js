import React, { Fragment } from 'react';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';

export default function Shroud({texture, position}) {

    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;


    let material = new THREE.MeshLambertMaterial({ 
      map : texture,
      side : THREE.DoubleSide
    });

    let planeGeometry = new THREE.PlaneGeometry(1, 1);

    return (
      
      <mesh
        receiveShadow={true}
        onClick={(e) => {
          console.log('click shroud', e);
        }}
        
        material-colorWrite={false}
        material-depthWrite={false}
        position={position}    
        rotation={[Math.PI/2,0,0]}    
      >
        <primitive attach="geometry" object={planeGeometry}/>
        <primitive attach="material" object={material}/>
      </mesh>
      
       
    )
}
