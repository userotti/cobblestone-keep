import React, { Fragment } from 'react';
import * as THREE from 'three';


export default function Rock({position}) {

    var geometry = new THREE.BoxGeometry(1.2,1.2,1.2,8); 

    return (
      <mesh
        position={position}
        geometry={geometry}
      > 
      </mesh>  
       
    )
}
